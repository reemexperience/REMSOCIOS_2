<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreCapitalAllocationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage capital allocations') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'category' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'allocated_amount' => ['required', 'numeric', 'min:0'],
            'spent_amount' => ['required', 'numeric', 'min:0'],
            'percentage' => ['required', 'numeric', 'min:0', 'max:100'],
            'status' => ['required', Rule::in(['planned', 'active', 'completed', 'paused'])],
        ];
    }
}
