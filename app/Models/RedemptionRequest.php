<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RedemptionRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'investment_id',
        'investor_profile_id',
        'requested_amount',
        'redemption_type',
        'cash_amount',
        'products_amount',
        'services_amount',
        'experiences_amount',
        'status',
        'partner_notes',
        'admin_notes',
        'requested_at',
        'reviewed_at',
        'approved_at',
        'completed_at',
        'rejected_at',
    ];

    protected $casts = [
        'requested_amount' => 'decimal:2',
        'cash_amount' => 'decimal:2',
        'products_amount' => 'decimal:2',
        'services_amount' => 'decimal:2',
        'experiences_amount' => 'decimal:2',
        'requested_at' => 'datetime',
        'reviewed_at' => 'datetime',
        'approved_at' => 'datetime',
        'completed_at' => 'datetime',
        'rejected_at' => 'datetime',
    ];

    public function investment(): BelongsTo
    {
        return $this->belongsTo(Investment::class);
    }

    public function investorProfile(): BelongsTo
    {
        return $this->belongsTo(InvestorProfile::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(RedemptionItem::class);
    }
}
