<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreMilestoneRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage milestones') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'category' => ['required', 'string', 'max:80'],
            'progress_percentage' => ['required', 'integer', 'min:0', 'max:100'],
            'status' => ['required', Rule::in(['planned', 'in_progress', 'completed', 'delayed', 'cancelled'])],
            'media_file' => ['nullable', 'file', 'max:10240'],
            'visible_to_partners' => ['nullable', 'boolean'],
            'date' => ['nullable', 'date'],
        ];
    }
}
