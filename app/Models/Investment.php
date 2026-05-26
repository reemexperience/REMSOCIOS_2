<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Investment extends Model
{
    use HasFactory;

    protected $fillable = [
        'investor_profile_id',
        'amount',
        'currency',
        'investment_date',
        'return_min_percentage',
        'return_max_percentage',
        'projected_min_return',
        'projected_max_return',
        'redeemed_amount',
        'available_amount',
        'return_type',
        'status',
        'contract_document_id',
        'notes',
    ];

    protected $casts = [
        'investment_date' => 'date',
        'amount' => 'decimal:2',
        'return_min_percentage' => 'decimal:2',
        'return_max_percentage' => 'decimal:2',
        'projected_min_return' => 'decimal:2',
        'projected_max_return' => 'decimal:2',
        'redeemed_amount' => 'decimal:2',
        'available_amount' => 'decimal:2',
    ];

    protected static function booted(): void
    {
        static::creating(function (Investment $investment) {
            $investment->calculateReturns();
        });
    }

    public function investorProfile(): BelongsTo
    {
        return $this->belongsTo(InvestorProfile::class);
    }

    public function contractDocument(): BelongsTo
    {
        return $this->belongsTo(Document::class, 'contract_document_id');
    }

    public function redemptionRequests(): HasMany
    {
        return $this->hasMany(RedemptionRequest::class);
    }

    public function calculateReturns(): void
    {
        $baseAmount = (float) $this->amount;
        $minMultiplier = 1 + ((float) $this->return_min_percentage / 100);
        $maxMultiplier = 1 + ((float) $this->return_max_percentage / 100);

        $this->projected_min_return = round($baseAmount * $minMultiplier, 2);
        $this->projected_max_return = round($baseAmount * $maxMultiplier, 2);
        $this->redeemed_amount ??= 0;
        $this->available_amount ??= $this->projected_min_return;
    }
}
