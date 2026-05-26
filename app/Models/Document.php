<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    use HasFactory;

    protected $fillable = [
        'investor_profile_id',
        'investment_id',
        'name',
        'type',
        'file_path',
        'status',
        'visible_to_partner',
        'uploaded_by',
    ];

    protected $casts = [
        'visible_to_partner' => 'boolean',
    ];

    public function investorProfile(): BelongsTo
    {
        return $this->belongsTo(InvestorProfile::class);
    }

    public function investment(): BelongsTo
    {
        return $this->belongsTo(Investment::class);
    }

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }
}
