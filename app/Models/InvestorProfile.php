<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class InvestorProfile extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'document_type',
        'document_number',
        'phone',
        'city',
        'country',
        'investor_type',
        'status',
        'joined_at',
        'notes',
    ];

    protected $casts = [
        'joined_at' => 'date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function investments(): HasMany
    {
        return $this->hasMany(Investment::class);
    }

    public function redemptionRequests(): HasMany
    {
        return $this->hasMany(RedemptionRequest::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }
}
