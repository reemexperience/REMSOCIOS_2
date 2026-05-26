<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RedeemableItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'type',
        'category',
        'description',
        'value',
        'stock',
        'image_path',
        'status',
        'visible_to_partners',
    ];

    protected $casts = [
        'value' => 'decimal:2',
        'visible_to_partners' => 'boolean',
    ];

    public function redemptionItems(): HasMany
    {
        return $this->hasMany(RedemptionItem::class);
    }
}
