<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreReportRequest extends FormRequest
{
    public function authorize(): bool
    {
        return $this->user()?->can('manage reports') || $this->user()?->hasRole('Super Admin');
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'period' => ['nullable', 'string', 'max:80'],
            'type' => ['required', Rule::in(['financial', 'project_progress', 'capital_usage', 'sales', 'events', 'rem_store', 'rem_music', 'rem_educativo', 'rem_experience', 'rem_social', 'gira_angelo_rm'])],
            'report_file' => ['nullable', 'file', 'max:10240'],
            'image_file' => ['nullable', 'image', 'max:4096'],
            'status' => ['required', Rule::in(['draft', 'published', 'archived'])],
            'visibility' => ['required', Rule::in(['all_partners', 'admins_only', 'specific_partners'])],
            'published_at' => ['nullable', 'date'],
        ];
    }
}
