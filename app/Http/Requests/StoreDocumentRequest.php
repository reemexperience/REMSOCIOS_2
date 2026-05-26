<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreDocumentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage documents') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'investor_profile_id' => ['required', 'exists:investor_profiles,id'],
            'investment_id' => ['nullable', 'exists:investments,id'],
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['contract', 'participation_certificate', 'return_agreement', 'investment_receipt', 'redemption_receipt', 'legal_annex', 'other'])],
            'document_file' => ['required', 'file', 'max:10240'],
            'status' => ['required', Rule::in(['active', 'archived', 'pending_signature', 'signed'])],
            'visible_to_partner' => ['nullable', 'boolean'],
        ];
    }
}
