<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateRedemptionStatusRequest;
use App\Models\RedemptionRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminRedemptionController extends Controller
{
    public function index(Request $request): Response
    {
        $query = RedemptionRequest::query()->with(['investment', 'investorProfile.user'])->latest();

        if ($status = $request->string('status')->toString()) {
            $query->where('status', $status);
        }

        return Inertia::render('Admin/Redemptions/Index', [
            'redemptions' => $query->paginate(10)->withQueryString(),
            'filters' => $request->only('status'),
        ]);
    }

    public function show(RedemptionRequest $redemptionRequest): Response
    {
        $redemptionRequest->load(['investment', 'investorProfile.user', 'items.redeemableItem']);

        return Inertia::render('Admin/Redemptions/Show', [
            'redemption' => $redemptionRequest,
        ]);
    }

    public function underReview(UpdateRedemptionStatusRequest $request, RedemptionRequest $redemptionRequest): RedirectResponse
    {
        return $this->updateStatus($redemptionRequest, 'under_review', $request->validated('admin_notes'));
    }

    public function approve(UpdateRedemptionStatusRequest $request, RedemptionRequest $redemptionRequest): RedirectResponse
    {
        return $this->updateStatus($redemptionRequest, 'approved', $request->validated('admin_notes'));
    }

    public function reject(UpdateRedemptionStatusRequest $request, RedemptionRequest $redemptionRequest): RedirectResponse
    {
        return $this->updateStatus($redemptionRequest, 'rejected', $request->validated('admin_notes'));
    }

    public function cancel(UpdateRedemptionStatusRequest $request, RedemptionRequest $redemptionRequest): RedirectResponse
    {
        return $this->updateStatus($redemptionRequest, 'cancelled', $request->validated('admin_notes'));
    }

    public function complete(UpdateRedemptionStatusRequest $request, RedemptionRequest $redemptionRequest): RedirectResponse
    {
        if ((float) $redemptionRequest->requested_amount > (float) $redemptionRequest->investment->available_amount) {
            return back()->with('error', 'La solicitud supera el saldo disponible.');
        }

        $investment = $redemptionRequest->investment;
        $investment->available_amount = (float) $investment->available_amount - (float) $redemptionRequest->requested_amount;
        $investment->redeemed_amount = (float) $investment->redeemed_amount + (float) $redemptionRequest->requested_amount;
        $investment->save();

        return $this->updateStatus($redemptionRequest, 'completed', $request->validated('admin_notes'));
    }

    protected function updateStatus(RedemptionRequest $redemptionRequest, string $status, ?string $notes): RedirectResponse
    {
        $redemptionRequest->update([
            'status' => $status,
            'admin_notes' => $notes,
            'reviewed_at' => in_array($status, ['under_review', 'approved', 'rejected', 'completed', 'cancelled'], true) ? now() : $redemptionRequest->reviewed_at,
            'approved_at' => in_array($status, ['approved', 'completed'], true) ? now() : $redemptionRequest->approved_at,
            'completed_at' => $status === 'completed' ? now() : $redemptionRequest->completed_at,
            'rejected_at' => $status === 'rejected' ? now() : $redemptionRequest->rejected_at,
        ]);

        return back()->with('success', 'Estado de redención actualizado.');
    }
}
