<?php

namespace App\Console\Commands;

use App\Models\Property;
use Illuminate\Console\Command;

class AddProperty extends Command
{
    protected $signature = 'pinger:add-property
                            {--type=house : Property type (house|apartment|townhouse|unit|section|rural|commercial)}
                            {--listing=sale : Listing type (sale|rent)}
                            {--price=0 : Price in NZD dollars (e.g. 850000)}
                            {--bedrooms=3 : Number of bedrooms}
                            {--area=120 : Area in m²}
                            {--lat=-36.8509 : Latitude}
                            {--lng=174.7645 : Longitude}
                            {--address= : Full address}
                            {--suburb= : Suburb}
                            {--city=Auckland : City}
                            {--url= : Listing URL}
                            {--dispatch : Also run dispatch-notifications after adding}';

    protected $description = 'Add a test property for developing and testing pinger notifications';

    public function handle(): int
    {
        $property = Property::create([
            'source'        => 'manual',
            'property_type' => $this->option('type'),
            'listing_type'  => $this->option('listing'),
            'price'         => (int) round((float) $this->option('price') * 100),
            'bedrooms'      => (int) $this->option('bedrooms') ?: null,
            'area_m2'       => (int) $this->option('area') ?: null,
            'latitude'      => (float) $this->option('lat'),
            'longitude'     => (float) $this->option('lng'),
            'address'       => $this->option('address') ?: null,
            'suburb'        => $this->option('suburb') ?: null,
            'city'          => $this->option('city'),
            'is_processed'  => false,
        ]);

        $this->info("Created property #{$property->id}:");
        $this->table(
            ['Field', 'Value'],
            [
                ['Type',     $property->property_type . ' / ' . $property->listing_type],
                ['Price',    $property->formatted_price],
                ['Bedrooms', $property->bedrooms ?? '—'],
                ['Area',     $property->area_m2 ? $property->area_m2 . ' m²' : '—'],
                ['Location', $property->latitude . ', ' . $property->longitude],
                ['Address',  $property->address ?? '—'],
            ]
        );

        if ($this->option('dispatch')) {
            $this->call('pinger:dispatch-notifications');
        }

        return self::SUCCESS;
    }
}
