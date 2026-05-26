<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;

class DocumentPolicy
{
    public function view(User $user, Document $document): bool
    {
        return $user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas']) ||
            $document->investorProfile?->user_id === $user->id;
    }
}
