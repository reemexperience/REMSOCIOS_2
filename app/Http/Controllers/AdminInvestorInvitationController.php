<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBulkInvestorInvitationRequest;
use App\Http\Requests\StorePublicInvestorInvitationRequest;
use App\Models\InvestorInvitation;
use App\Notifications\PartnerInvitationNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AdminInvestorInvitationController extends Controller
{
    public function index(Request $request): Response
    {
        abort_unless($request->user()->hasAnyRole(['Super Admin', 'Admin']), 403);

        return Inertia::render('Admin/InvestorInvitations/Index', [
            'invitations' => InvestorInvitation::query()
                ->with(['creator:id,name,email', 'usedByUser:id,name,email'])
                ->latest()
                ->paginate(12),
            'options' => [
                'types' => ['founder', 'strategic_partner', 'investor', 'ally', 'custom'],
                'statuses' => ['pending', 'active', 'paused', 'completed', 'cancelled'],
            ],
            'defaults' => [
                'expiration_hours' => InvestorInvitation::defaultExpirationHours(),
            ],
            'appUrl' => rtrim(config('app.url'), '/'),
            'requestUrl' => rtrim($request->getSchemeAndHttpHost(), '/'),
        ]);
    }

    public function storeEmail(StoreBulkInvestorInvitationRequest $request): JsonResponse
    {
        $created = collect();

        foreach ($request->validated('email_list') as $email) {
            $invitation = $this->createInvitation(
                $request->user()->id,
                $email,
                $request->validated('investor_type'),
                $request->validated('status'),
                $request->validated('message')
            );

            $publicUrl = $this->publicUrl($invitation->token);

            Notification::route('mail', $email)->notify(
                new PartnerInvitationNotification($invitation, $publicUrl)
            );

            $created->push($this->invitationPayload($invitation));
        }

        return response()->json([
            'message' => 'Invitaciones por correo enviadas correctamente.',
            'created_count' => $created->count(),
            'invitations' => $created->all(),
        ]);
    }

    public function storePublic(StorePublicInvestorInvitationRequest $request): JsonResponse
    {
        $invitation = $this->createInvitation(
            $request->user()->id,
            null,
            $request->validated('investor_type'),
            $request->validated('status'),
            $request->validated('message')
        );

        return response()->json([
            'message' => 'Ruta pública creada correctamente.',
            'invitation' => $this->invitationPayload($invitation),
        ]);
    }

    protected function createInvitation(
        int $creatorId,
        ?string $email,
        string $investorType,
        string $status,
        ?string $message
    ): InvestorInvitation {
        $hours = InvestorInvitation::defaultExpirationHours();

        return InvestorInvitation::create([
            'created_by' => $creatorId,
            'token' => Str::random(64),
            'email' => $email,
            'investor_type' => $investorType,
            'status' => $status,
            'expires_in_hours' => $hours,
            'expires_at' => InvestorInvitation::expirationDateFor($hours),
            'notes' => $message,
        ])->load(['creator:id,name,email', 'usedByUser:id,name,email']);
    }

    protected function invitationPayload(InvestorInvitation $invitation): array
    {
        return [
            'id' => $invitation->id,
            'token' => $invitation->token,
            'email' => $invitation->email,
            'investor_type' => $invitation->investor_type,
            'status' => $invitation->status,
            'expires_in_hours' => $invitation->expires_in_hours,
            'expires_at' => $invitation->expires_at?->toISOString(),
            'used_at' => $invitation->used_at?->toISOString(),
            'notes' => $invitation->notes,
            'creator' => $invitation->creator ? [
                'name' => $invitation->creator->name,
                'email' => $invitation->creator->email,
            ] : null,
            'used_by_user' => $invitation->usedByUser ? [
                'name' => $invitation->usedByUser->name,
                'email' => $invitation->usedByUser->email,
            ] : null,
            'public_url' => $this->publicUrl($invitation->token),
            'mode' => $invitation->email ? 'email' : 'public',
        ];
    }

    protected function publicUrl(string $token): string
    {
        return rtrim(config('app.url'), '/').'/join/partner/'.$token;
    }
}
