<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRedemptionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('request redemption') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'investment_id' => ['required', 'exists:investments,id'],
            'requested_amount' => ['required', 'numeric', 'min:1'],
            'redemption_type' => ['required', Rule::in(['cash', 'products', 'services', 'experiences', 'hybrid', 'custom'])],
            'cash_amount' => ['nullable', 'numeric', 'min:0'],
            'products_amount' => ['nullable', 'numeric', 'min:0'],
            'services_amount' => ['nullable', 'numeric', 'min:0'],
            'experiences_amount' => ['nullable', 'numeric', 'min:0'],
            'partner_notes' => ['nullable', 'string'],
        ];
    }
}
