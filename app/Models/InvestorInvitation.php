<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

class InvestorInvitation extends Model
{
    use HasFactory;

    protected $fillable = [
        'created_by',
        'token',
        'email',
        'investor_type',
        'status',
        'expires_in_hours',
        'expires_at',
        'used_at',
        'used_by_user_id',
        'notes',
    ];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function usedByUser(): BelongsTo
    {
        return $this->belongsTo(User::class, 'used_by_user_id');
    }

    public function isExpired(): bool
    {
        return $this->expires_at->isPast();
    }

    public function isAvailable(): bool
    {
        return $this->used_at === null && ! $this->isExpired();
    }

    public static function defaultExpirationHours(): int
    {
        return max(1, (int) SystemSetting::getValue('partner_invitation_expiration_hours', 3));
    }

    public static function expirationDateFor(int $hours): Carbon
    {
        return now()->addHours(max(1, $hours));
    }
}
