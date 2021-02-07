type Coordinates = [number, number];

interface GeoJson {
  features: {
    properties: {
      id: string;
      name: string;
    };
    geometry: {
      type: string;
      coordinates: Array<Coordinates[]>;
    };
  }[];
}

declare module "@brokalys/location-json-schemas" {
  export const riga: GeoJson;
}
