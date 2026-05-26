<?php

namespace App\Policies;

use App\Models\RedemptionRequest;
use App\Models\User;

class RedemptionRequestPolicy
{
    public function view(User $user, RedemptionRequest $redemptionRequest): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas']) ||
            $redemptionRequest->investorProfile?->user_id === $user->id;
    }
}
