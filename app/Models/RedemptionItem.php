<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RedemptionItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'redemption_request_id',
        'redeemable_item_id',
        'name',
        'type',
        'value',
        'quantity',
        'total',
        'status',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'total' => 'decimal:2',
    ];

    public function redemptionRequest(): BelongsTo
    {
        return $this->belongsTo(RedemptionRequest::class);
    }

    public function redeemableItem(): BelongsTo
    {
        return $this->belongsTo(RedeemableItem::class);
    }
}
