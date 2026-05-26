<?php

namespace App\Policies;

use App\Models\Investment;
use App\Models\User;

class InvestmentPolicy
{
    public function view(User $user, Investment $investment): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas']) ||
            $investment->investorProfile?->user_id === $user->id;
    }
}
