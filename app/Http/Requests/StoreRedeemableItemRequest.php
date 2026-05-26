<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRedeemableItemRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage redeemable items') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'type' => ['required', Rule::in(['product', 'service', 'experience', 'discount', 'ticket', 'booking', 'formation', 'travel'])],
            'category' => ['required', 'string', 'max:120'],
            'description' => ['nullable', 'string'],
            'value' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', Rule::in(['active', 'inactive', 'out_of_stock', 'hidden'])],
            'visible_to_partners' => ['nullable', 'boolean'],
        ];
    }
}
