<?php

namespace App\Policies;

use App\Models\InvestorProfile;
use App\Models\User;

class InvestorProfilePolicy
{
    public function view(User $user, InvestorProfile $investorProfile): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas']) ||
            $investorProfile->user_id === $user->id;
    }
}
