<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePublicInvestorOnboardingRequest;
use App\Models\InvestorInvitation;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicInvestorOnboardingController extends Controller
{
    public function show(string $token): Response
    {
        $invitation = InvestorInvitation::query()->where('token', $token)->firstOrFail();

        return Inertia::render('Public/PartnerOnboarding', [
            'token' => $token,
            'invitation' => $this->invitationPayload($invitation),
            'isAvailable' => $invitation->isAvailable(),
        ]);
    }

    public function store(StorePublicInvestorOnboardingRequest $request, string $token): RedirectResponse
    {
        $invitation = InvestorInvitation::query()->where('token', $token)->firstOrFail();

        if (! $invitation->isAvailable()) {
            return redirect()
                ->route('partner.onboarding.show', $token)
                ->with('error', 'Este enlace ya fue usado o venció.');
        }

        $data = $request->validated();

        if ($invitation->email && strcasecmp($invitation->email, $data['email']) !== 0) {
            return back()->withErrors([
                'email' => 'Este enlace fue emitido para otro correo.',
            ]);
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'email_verified_at' => now(),
        ]);
        $user->assignRole('Socio');

        $user->investorProfile()->create([
            'document_type' => $data['document_type'] ?? null,
            'document_number' => $data['document_number'] ?? null,
            'phone' => $data['phone'] ?? null,
            'city' => $data['city'] ?? null,
            'country' => $data['country'] ?? 'Colombia',
            'investor_type' => $invitation->investor_type,
            'status' => $invitation->status,
            'joined_at' => now(),
            'notes' => $data['notes'] ?? $invitation->notes,
        ]);

        $invitation->update([
            'used_at' => now(),
            'used_by_user_id' => $user->id,
        ]);

        return redirect()->route('login')->with('success', 'Tu perfil fue creado correctamente. Ya puedes ingresar al portal.');
    }

    protected function invitationPayload(InvestorInvitation $invitation): array
    {
        $invitation->loadMissing('creator:id,name');

        return [
            'email' => $invitation->email,
            'investor_type' => $invitation->investor_type,
            'status' => $invitation->status,
            'expires_at' => $invitation->expires_at?->toDateTimeString(),
            'created_by_name' => $invitation->creator?->name,
            'notes' => $invitation->notes,
            'used_at' => $invitation->used_at?->toDateTimeString(),
        ];
    }
}
