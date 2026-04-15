import L from 'leaflet';

/**
 * Convert a Leaflet Polygon layer to a WKT POLYGON string.
 * WKT uses (longitude latitude) order.
 */
export function layerToWkt(polygon: L.Polygon): string {
    const latlngs = polygon.getLatLngs()[0] as L.LatLng[];
    const coords = latlngs.map((ll) => `${ll.lng} ${ll.lat}`);
    // Close the ring by repeating the first coordinate
    coords.push(`${latlngs[0].lng} ${latlngs[0].lat}`);
    return `POLYGON((${coords.join(',')}))`;
}

/**
 * Convert a WKT POLYGON string to a Leaflet Polygon layer.
 * WKT uses (longitude latitude) order, Leaflet uses [lat, lng].
 */
export function wktToLeafletLayer(wkt: string): L.Polygon | null {
    const match = wkt.match(/POLYGON\(\((.+)\)\)/i);
    if (!match) return null;

    const latlngs = match[1]
        .split(',')
        .map((pair) => {
            const parts = pair.trim().split(/\s+/);
            const lng = parseFloat(parts[0]);
            const lat = parseFloat(parts[1]);
            return [lat, lng] as [number, number];
        });

    // Remove the closing duplicate point
    latlngs.pop();

    return L.polygon(latlngs);
}

/**
 * Convert an array of [lat, lng] pairs to WKT POLYGON.
 */
export function coordsToWkt(coords: [number, number][]): string {
    const pairs = coords.map(([lat, lng]) => `${lng} ${lat}`);
    // Close the ring
    pairs.push(`${coords[0][1]} ${coords[0][0]}`);
    return `POLYGON((${pairs.join(',')}))`;
}
