<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PartnerInvestmentController extends Controller
{
    public function show(Request $request): Response
    {
        $profile = $request->user()->investorProfile()->with(['investments.redemptionRequests', 'documents'])->firstOrFail();
        $investment = $profile->investments->sortByDesc('investment_date')->first();

        return Inertia::render('Partner/MyInvestment', [
            'profile' => $profile,
            'investment' => $investment,
            'redemptions' => $investment?->redemptionRequests()->latest()->get() ?? [],
            'documents' => $profile->documents,
        ]);
    }
}
