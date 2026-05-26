<?php

namespace App\Http\Controllers;

use App\Models\CapitalAllocation;
use App\Models\Investment;
use App\Models\InvestorProfile;
use App\Models\Milestone;
use App\Models\RedemptionRequest;
use App\Models\Report;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function __invoke(): Response
    {
        $capitalGoal = 50000000;
        $raisedCapital = Investment::sum('amount');
        $projectedMin = Investment::sum('projected_min_return');
        $projectedMax = Investment::sum('projected_max_return');
        $redeemedTotal = Investment::sum('redeemed_amount');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'capital_goal' => $capitalGoal,
                'raised_capital' => $raisedCapital,
                'goal_progress' => $capitalGoal > 0 ? round(($raisedCapital / $capitalGoal) * 100) : 0,
                'active_partners' => InvestorProfile::where('status', 'active')->count(),
                'active_investments' => Investment::where('status', 'active')->count(),
                'projected_min_return' => $projectedMin,
                'projected_max_return' => $projectedMax,
                'total_redeemed' => $redeemedTotal,
                'pending_redemptions' => RedemptionRequest::where('status', 'pending')->count(),
            ],
            'capitalAllocations' => CapitalAllocation::all(),
            'recentPartners' => InvestorProfile::with('user')->latest()->take(5)->get(),
            'recentRedemptions' => RedemptionRequest::with('investorProfile.user')->latest()->take(5)->get(),
            'recentReports' => Report::latest('published_at')->take(4)->get(),
            'recentMilestones' => Milestone::latest('date')->take(4)->get(),
        ]);
    }
}
