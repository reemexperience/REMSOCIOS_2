<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRedemptionRequest;
use App\Models\RedemptionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerRedemptionController extends Controller
{
    public function index(Request $request): Response
    {
        $profile = $request->user()->investorProfile()->firstOrFail();

        return Inertia::render('Partner/Redemptions/Index', [
            'redemptions' => RedemptionRequest::with('investment')
                ->where('investor_profile_id', $profile->id)
                ->latest()
                ->paginate(10),
        ]);
    }

    public function create(Request $request): Response
    {
        $profile = $request->user()->investorProfile()->with('investments')->firstOrFail();

        return Inertia::render('Partner/Redemptions/Create', [
            'investments' => $profile->investments,
            'types' => ['cash', 'products', 'services', 'experiences', 'hybrid', 'custom'],
        ]);
    }

    public function store(StoreRedemptionRequest $request): RedirectResponse
    {
        $profile = $request->user()->investorProfile()->firstOrFail();
        $data = $request->validated();
        $investment = $profile->investments()->findOrFail($data['investment_id']);

        if ((float) $data['requested_amount'] > (float) $investment->available_amount) {
            return back()->withErrors(['requested_amount' => 'El monto solicitado supera el saldo disponible.'])->withInput();
        }

        $redemption = RedemptionRequest::create([
            'investment_id' => $investment->id,
            'investor_profile_id' => $profile->id,
            'requested_amount' => $data['requested_amount'],
            'redemption_type' => $data['redemption_type'],
            'cash_amount' => $data['cash_amount'] ?? 0,
            'products_amount' => $data['products_amount'] ?? 0,
            'services_amount' => $data['services_amount'] ?? 0,
            'experiences_amount' => $data['experiences_amount'] ?? 0,
            'status' => 'pending',
            'partner_notes' => $data['partner_notes'] ?? null,
            'requested_at' => now(),
        ]);

        return redirect()->route('partner.redemptions.show', $redemption)->with('success', 'Solicitud de redención creada correctamente.');
    }

    public function show(Request $request, RedemptionRequest $redemptionRequest): Response
    {
        abort_unless($redemptionRequest->investorProfile?->user_id === $request->user()->id, 403);

        return Inertia::render('Partner/Redemptions/Show', [
            'redemption' => $redemptionRequest->load('investment', 'items'),
        ]);
    }
}
