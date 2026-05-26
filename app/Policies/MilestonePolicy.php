<?php

namespace App\Policies;

use App\Models\Milestone;
use App\Models\User;

class MilestonePolicy
{
    public function view(User $user, Milestone $milestone): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas', 'Operador REM']) ||
            $milestone->visible_to_partners;
    }
}
