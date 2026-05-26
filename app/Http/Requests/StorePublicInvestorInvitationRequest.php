<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePublicInvestorInvitationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasAnyRole(['Super Admin', 'Admin']) ?? false;
    }

    public function rules(): array
    {
        return [
            'investor_type' => ['required', Rule::in(['founder', 'strategic_partner', 'investor', 'ally', 'custom'])],
            'status' => ['required', Rule::in(['pending', 'active', 'paused', 'completed', 'cancelled'])],
            'message' => ['nullable', 'string'],
        ];
    }
}
