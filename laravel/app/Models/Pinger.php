<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

class Pinger extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'email',
        'property_type',
        'listing_type',
        'price_min',
        'price_max',
        'bedrooms_min',
        'bedrooms_max',
        'area_m2_min',
        'area_m2_max',
        'polygon',
        'frequency',
        'is_confirmed',
        'confirm_token',
        'unsubscribe_token',
        'last_notified_at',
    ];

    protected $casts = [
        'is_confirmed'     => 'boolean',
        'last_notified_at' => 'datetime',
        'price_min'        => 'integer',
        'price_max'        => 'integer',
        'bedrooms_min'     => 'integer',
        'bedrooms_max'     => 'integer',
        'area_m2_min'      => 'integer',
        'area_m2_max'      => 'integer',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::creating(function (Pinger $pinger) {
            $pinger->confirm_token     = Str::random(64);
            $pinger->unsubscribe_token = Str::random(64);
        });
    }

    public function notifications(): HasMany
    {
        return $this->hasMany(PingerNotification::class);
    }

    public function scopeConfirmed($query)
    {
        return $query->where('is_confirmed', true);
    }

    public function scopeDueForNotification($query, string $frequency)
    {
        return $query->confirmed()
            ->where('frequency', $frequency)
            ->where(function ($q) use ($frequency) {
                $q->whereNull('last_notified_at')
                    ->orWhere('last_notified_at', '<', match ($frequency) {
                        'daily'   => now()->subDay(),
                        'weekly'  => now()->subWeek(),
                        'monthly' => now()->subMonth(),
                        default   => now(),
                    });
            });
    }

    public function getFormattedPropertyTypeAttribute(): string
    {
        return match ($this->property_type) {
            'house'       => 'House',
            'apartment'   => 'Apartment',
            'townhouse'   => 'Townhouse',
            'unit'        => 'Unit / Flat',
            'section'     => 'Section (Land)',
            'rural'       => 'Rural',
            'commercial'  => 'Commercial',
            default       => ucfirst($this->property_type),
        };
    }

    public function getFormattedListingTypeAttribute(): string
    {
        return $this->listing_type === 'rent' ? 'For Rent' : 'For Sale';
    }

    public function getFormattedFrequencyAttribute(): string
    {
        return match ($this->frequency) {
            'immediate' => 'Immediate',
            'daily'     => 'Daily digest',
            'weekly'    => 'Weekly digest',
            'monthly'   => 'Monthly digest',
            default     => ucfirst($this->frequency),
        };
    }
}
