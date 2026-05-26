<?php

namespace App\Policies;

use App\Models\RedeemableItem;
use App\Models\User;

class RedeemableItemPolicy
{
    public function view(User $user, RedeemableItem $redeemableItem): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas', 'Operador REM']) ||
            ($redeemableItem->visible_to_partners && $redeemableItem->status === 'active');
    }
}
