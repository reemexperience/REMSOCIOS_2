<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreInvestmentRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage investments') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'investor_profile_id' => ['required', 'exists:investor_profiles,id'],
            'amount' => ['required', 'numeric', 'min:1'],
            'currency' => ['required', 'string', 'max:10'],
            'investment_date' => ['required', 'date'],
            'return_min_percentage' => ['required', 'numeric', 'min:0'],
            'return_max_percentage' => ['required', 'numeric', 'min:0'],
            'available_amount' => ['nullable', 'numeric', 'min:0'],
            'return_type' => ['required', Rule::in(['economic', 'hybrid', 'products_services', 'custom'])],
            'status' => ['required', Rule::in(['pending', 'active', 'paused', 'completed', 'cancelled'])],
            'contract_document_id' => ['nullable', 'exists:documents,id'],
            'notes' => ['nullable', 'string'],
        ];
    }
}
