<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreBulkInvestorInvitationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->hasAnyRole(['Super Admin', 'Admin']) ?? false;
    }

    protected function prepareForValidation(): void
    {
        $emails = preg_split('/[\s,;]+/', (string) $this->input('emails'), -1, PREG_SPLIT_NO_EMPTY);

        $this->merge([
            'email_list' => array_values(array_unique(array_map('trim', $emails))),
        ]);
    }

    public function rules(): array
    {
        return [
            'emails' => ['required', 'string'],
            'email_list' => ['required', 'array', 'min:1'],
            'email_list.*' => ['email', 'max:255'],
            'investor_type' => ['required', Rule::in(['founder', 'strategic_partner', 'investor', 'ally', 'custom'])],
            'status' => ['required', Rule::in(['pending', 'active', 'paused', 'completed', 'cancelled'])],
            'message' => ['nullable', 'string'],
        ];
    }
}
