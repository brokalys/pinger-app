<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PingerNotification extends Model
{
    protected $fillable = ['pinger_id', 'property_id', 'sent_at'];

    protected $casts = [
        'sent_at' => 'datetime',
    ];

    public function pinger(): BelongsTo
    {
        return $this->belongsTo(Pinger::class);
    }

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
