<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Milestone extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'category',
        'progress_percentage',
        'status',
        'media_path',
        'visible_to_partners',
        'date',
    ];

    protected $casts = [
        'visible_to_partners' => 'boolean',
        'date' => 'date',
        'progress_percentage' => 'integer',
    ];
}
