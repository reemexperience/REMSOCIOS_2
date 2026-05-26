<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CapitalAllocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'category',
        'description',
        'allocated_amount',
        'spent_amount',
        'percentage',
        'status',
    ];

    protected $casts = [
        'allocated_amount' => 'decimal:2',
        'spent_amount' => 'decimal:2',
        'percentage' => 'decimal:2',
    ];
}
