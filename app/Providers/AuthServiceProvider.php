<?php

namespace App\Providers;

use App\Models\CapitalAllocation;
use App\Models\Document;
use App\Models\Investment;
use App\Models\InvestorProfile;
use App\Models\Milestone;
use App\Models\RedeemableItem;
use App\Models\RedemptionRequest;
use App\Models\Report;
use App\Policies\CapitalAllocationPolicy;
use App\Policies\DocumentPolicy;
use App\Policies\InvestmentPolicy;
use App\Policies\InvestorProfilePolicy;
use App\Policies\MilestonePolicy;
use App\Policies\RedeemableItemPolicy;
use App\Policies\RedemptionRequestPolicy;
use App\Policies\ReportPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        InvestorProfile::class => InvestorProfilePolicy::class,
        Investment::class => InvestmentPolicy::class,
        RedemptionRequest::class => RedemptionRequestPolicy::class,
        Document::class => DocumentPolicy::class,
        Report::class => ReportPolicy::class,
        Milestone::class => MilestonePolicy::class,
        RedeemableItem::class => RedeemableItemPolicy::class,
        CapitalAllocation::class => CapitalAllocationPolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        Gate::before(function ($user) {
            return $user->hasRole('Super Admin') ? true : null;
        });
    }
}
