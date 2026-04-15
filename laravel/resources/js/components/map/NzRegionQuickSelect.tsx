import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { NZ_REGIONS } from '@/lib/nz-regions';
import { wktToLeafletLayer } from '@/lib/geo';
import { useMap } from 'react-leaflet';

interface NzRegionQuickSelectProps {
    onSelect: (wkt: string) => void;
}

function RegionSelectInner({ onSelect }: NzRegionQuickSelectProps) {
    const map = useMap();

    const handleSelect = (name: string) => {
        const region = NZ_REGIONS.find((r) => r.name === name);
        if (!region) return;

        // Pan to the region
        map.setView(region.center, region.zoom, { animate: true });

        // Notify parent with the WKT polygon
        onSelect(region.wkt);

        // Optionally draw the polygon on map for preview
        const layer = wktToLeafletLayer(region.wkt);
        if (layer) {
            // Remove via pm if supported, otherwise just fly to bounds
            map.eachLayer((l) => {
                if (l instanceof window.L.Polygon || l instanceof window.L.Rectangle) {
                    // Only remove pm-managed layers by checking pm property
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((l as any).pm) {
                        map.removeLayer(l);
                    }
                }
            });

            layer.setStyle({
                color: '#16a34a',
                fillColor: '#16a34a',
                fillOpacity: 0.15,
                weight: 2,
            });
            layer.addTo(map);

            try {
                map.fitBounds(layer.getBounds(), { padding: [20, 20] });
            } catch {
                // ignore
            }
        }
    };

    return (
        <Select onValueChange={handleSelect}>
            <SelectTrigger className="w-full sm:w-56">
                <SelectValue placeholder="Jump to NZ region..." />
            </SelectTrigger>
            <SelectContent>
                {NZ_REGIONS.map((region) => (
                    <SelectItem key={region.name} value={region.name}>
                        {region.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

export default function NzRegionQuickSelect({ onSelect }: NzRegionQuickSelectProps) {
    return <RegionSelectInner onSelect={onSelect} />;
}
