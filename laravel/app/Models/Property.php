<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Property extends Model
{
    protected $fillable = [
        'external_id',
        'source',
        'property_type',
        'listing_type',
        'price',
        'bedrooms',
        'area_m2',
        'latitude',
        'longitude',
        'address',
        'suburb',
        'city',
        'region',
        'url',
        'image_url',
        'description',
        'is_processed',
    ];

    protected $casts = [
        'price'        => 'integer',
        'bedrooms'     => 'integer',
        'area_m2'      => 'integer',
        'latitude'     => 'float',
        'longitude'    => 'float',
        'is_processed' => 'boolean',
    ];

    public function notifications(): HasMany
    {
        return $this->hasMany(PingerNotification::class);
    }

    public function getFormattedPriceAttribute(): string
    {
        if ($this->price === null) {
            return 'Price on application';
        }

        return 'NZ$' . number_format($this->price / 100);
    }
}
