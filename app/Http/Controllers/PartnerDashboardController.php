<?php

namespace App\Http\Controllers;

use App\Models\CapitalAllocation;
use App\Models\Milestone;
use App\Models\RedeemableItem;
use App\Models\Report;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as SymfonyResponse;
use Inertia\Inertia;
use Inertia\Response;

class PartnerDashboardController extends Controller
{
    public function __invoke(Request $request): Response|SymfonyResponse
    {
        if ($request->user()->hasAnyRole(['Super Admin', 'Admin', 'Finanzas', 'Operador REM'])) {
            return Inertia::location(route('admin.dashboard'));
        }

        $user = $request->user()->loadMissing([
            'investorProfile.investments.redemptionRequests',
            'investorProfile.documents',
        ]);

        $profile = $user->investorProfile;
        $investment = $profile?->investments->sortByDesc('investment_date')->first();

        $capitalGoal = 50000000;
        $raisedCapital = \App\Models\Investment::sum('amount');
        $overallProgress = $capitalGoal > 0 ? round(($raisedCapital / $capitalGoal) * 100) : 0;
        $recentRedemptions = $investment ? $investment->redemptionRequests()->latest()->take(5)->get() : [];
        $recentDocuments = $profile ? $profile->documents()->latest()->take(3)->get() : [];

        return Inertia::render('Partner/Dashboard', [
            'partner' => $profile?->only([
                'investor_type',
                'status',
                'city',
                'country',
                'joined_at',
            ]),
            'investment' => $investment,
            'redemptions' => $recentRedemptions,
            'reports' => Report::query()
                ->where('status', 'published')
                ->where('visibility', 'all_partners')
                ->latest('published_at')
                ->take(4)
                ->get(),
            'milestones' => Milestone::query()
                ->where('visible_to_partners', true)
                ->latest('date')
                ->take(5)
                ->get(),
            'redeemableItems' => RedeemableItem::query()
                ->where('visible_to_partners', true)
                ->where('status', 'active')
                ->take(6)
                ->get(),
            'documents' => $recentDocuments,
            'capitalAllocations' => CapitalAllocation::query()->take(5)->get(),
            'summary' => [
                'capital_goal' => $capitalGoal,
                'raised_capital' => $raisedCapital,
                'overall_progress' => min($overallProgress, 100),
                'next_report_at' => now()->addDays(12)->toDateString(),
                'last_updated_at' => now()->toDateTimeString(),
            ],
        ]);
    }
}
