<?php

namespace App\Policies;

use App\Models\Report;
use App\Models\User;

class ReportPolicy
{
    public function view(User $user, Report $report): bool
    {
        if ($user->hasAnyRole(['Super Admin', 'Admin', 'Finanzas', 'Operador REM'])) {
            return true;
        }

        return $report->status === 'published' && $report->visibility === 'all_partners';
    }
}
