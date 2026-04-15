<?php

namespace App\Services;

use App\Models\Pinger;
use App\Models\Property;

class GeoService
{
    /**
     * Parse a WKT POLYGON string into an array of [lat, lng] pairs.
     * WKT format uses (longitude latitude) order per spec.
     */
    public function parseWktPolygon(string $wkt): array
    {
        preg_match('/POLYGON\(\((.+)\)\)/i', $wkt, $matches);

        if (empty($matches[1])) {
            return [];
        }

        $points = [];
        foreach (explode(',', $matches[1]) as $pair) {
            $parts = preg_split('/\s+/', trim($pair));
            if (count($parts) >= 2) {
                $points[] = [
                    'lat' => (float) $parts[1],
                    'lng' => (float) $parts[0],
                ];
            }
        }

        return $points;
    }

    /**
     * Ray casting algorithm: is point (lat, lng) inside the given polygon?
     *
     * @param array $polygon Array of ['lat' => float, 'lng' => float]
     */
    public function isPointInPolygon(float $lat, float $lng, array $polygon): bool
    {
        $n      = count($polygon);
        $inside = false;
        $j      = $n - 1;

        for ($i = 0; $i < $n; $i++) {
            $xi = $polygon[$i]['lng'];
            $yi = $polygon[$i]['lat'];
            $xj = $polygon[$j]['lng'];
            $yj = $polygon[$j]['lat'];

            $intersect = (($yi > $lat) !== ($yj > $lat))
                && ($lng < ($xj - $xi) * ($lat - $yi) / ($yj - $yi) + $xi);

            if ($intersect) {
                $inside = !$inside;
            }

            $j = $i;
        }

        return $inside;
    }

    /**
     * Check if a property matches all criteria of a pinger.
     */
    public function propertyMatchesPinger(Property $property, Pinger $pinger): bool
    {
        // Property type must match
        if ($property->property_type !== $pinger->property_type) {
            return false;
        }

        // Listing type must match
        if ($property->listing_type !== $pinger->listing_type) {
            return false;
        }

        // Price range (stored in cents)
        if ($pinger->price_min !== null && $property->price !== null && $property->price < $pinger->price_min) {
            return false;
        }
        if ($pinger->price_max !== null && $property->price !== null && $property->price > $pinger->price_max) {
            return false;
        }

        // Bedrooms
        if ($pinger->bedrooms_min !== null && $property->bedrooms !== null && $property->bedrooms < $pinger->bedrooms_min) {
            return false;
        }
        if ($pinger->bedrooms_max !== null && $property->bedrooms !== null && $property->bedrooms > $pinger->bedrooms_max) {
            return false;
        }

        // Area
        if ($pinger->area_m2_min !== null && $property->area_m2 !== null && $property->area_m2 < $pinger->area_m2_min) {
            return false;
        }
        if ($pinger->area_m2_max !== null && $property->area_m2 !== null && $property->area_m2 > $pinger->area_m2_max) {
            return false;
        }

        // Geographic polygon check
        if ($property->latitude === null || $property->longitude === null) {
            return false;
        }

        $polygon = $this->parseWktPolygon($pinger->polygon);

        if (empty($polygon)) {
            return false;
        }

        return $this->isPointInPolygon($property->latitude, $property->longitude, $polygon);
    }
}
