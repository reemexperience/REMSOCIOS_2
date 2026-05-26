<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRedemptionStatusRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage redemptions') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'admin_notes' => ['nullable', 'string'],
        ];
    }
}
