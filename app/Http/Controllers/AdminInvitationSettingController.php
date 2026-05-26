<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateInvitationSettingRequest;
use App\Models\InvestorInvitation;
use App\Models\SystemSetting;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminInvitationSettingController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Settings/InvitationSettings/Edit', [
            'settings' => [
                'partner_invitation_expiration_hours' => InvestorInvitation::defaultExpirationHours(),
            ],
        ]);
    }

    public function update(UpdateInvitationSettingRequest $request): RedirectResponse
    {
        SystemSetting::putValue(
            'partner_invitation_expiration_hours',
            $request->validated('partner_invitation_expiration_hours')
        );

        return back()->with('success', 'Duración por defecto de invitaciones actualizada correctamente.');
    }
}
