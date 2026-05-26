<?php

namespace App\Policies;

use App\Models\CapitalAllocation;
use App\Models\User;

class CapitalAllocationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas', 'Operador REM', 'Socio']);
    }

    public function view(User $user, CapitalAllocation $capitalAllocation): bool
    {
        return $this->viewAny($user);
    }
}
