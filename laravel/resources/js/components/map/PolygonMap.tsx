import React, { useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { layerToWkt, wktToLeafletLayer } from '@/lib/geo';

// NZ default center
const NZ_CENTER: [number, number] = [-41.2865, 174.7762];
const NZ_ZOOM = 5;

interface DrawControlProps {
    value: string | null;
    onChange: (wkt: string) => void;
}

function DrawControl({ value, onChange }: DrawControlProps) {
    const map = useMap();
    const layerRef = useRef<L.Polygon | null>(null);
    const initializedRef = useRef(false);

    const handleLayerChange = useCallback(
        (layer: L.Polygon) => {
            layerRef.current = layer;
            onChange(layerToWkt(layer));
        },
        [onChange],
    );

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Add Geoman draw controls
        map.pm.addControls({
            position: 'topleft',
            drawMarker: false,
            drawCircleMarker: false,
            drawPolyline: false,
            drawRectangle: true,
            drawPolygon: true,
            drawCircle: false,
            editMode: true,
            dragMode: true,
            cutPolygon: false,
            removalMode: true,
            rotateMode: false,
        });

        // Style options for drawn polygons
        map.pm.setGlobalOptions({
            pathOptions: {
                color: '#16a34a',
                fillColor: '#16a34a',
                fillOpacity: 0.15,
                weight: 2,
            },
        });

        // When a shape is created
        map.on('pm:create', (e) => {
            // Remove previous layer if exists
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
                layerRef.current = null;
            }
            const polygon = e.layer as L.Polygon;
            handleLayerChange(polygon);
        });

        // When a shape is edited
        map.on('pm:edit', (e) => {
            const polygon = e.layer as L.Polygon;
            handleLayerChange(polygon);
        });

        // When a shape is removed
        map.on('pm:remove', () => {
            layerRef.current = null;
            onChange('');
        });

        return () => {
            map.pm.removeControls();
            map.off('pm:create');
            map.off('pm:edit');
            map.off('pm:remove');
        };
    }, [map, handleLayerChange, onChange]);

    // Load existing polygon on mount
    useEffect(() => {
        if (value && !layerRef.current) {
            const layer = wktToLeafletLayer(value);
            if (layer) {
                layer.setStyle({
                    color: '#16a34a',
                    fillColor: '#16a34a',
                    fillOpacity: 0.15,
                    weight: 2,
                });
                layer.addTo(map);
                layerRef.current = layer;
                try {
                    map.fitBounds(layer.getBounds(), { padding: [40, 40] });
                } catch {
                    // ignore invalid bounds
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return null;
}

interface PolygonMapProps {
    value: string | null;
    onChange: (wkt: string) => void;
    height?: string;
}

export default function PolygonMap({ value, onChange, height = '420px' }: PolygonMapProps) {
    return (
        <div style={{ height }} className="w-full rounded-lg overflow-hidden border border-[#e4e4e7]">
            <MapContainer
                center={NZ_CENTER}
                zoom={NZ_ZOOM}
                style={{ height: '100%', width: '100%' }}
                zoomControl={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <DrawControl value={value} onChange={onChange} />
            </MapContainer>
        </div>
    );
}
