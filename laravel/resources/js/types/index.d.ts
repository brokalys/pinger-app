import { route as routeFn } from 'ziggy-js';

declare global {
    const route: typeof routeFn;
}

export interface Pinger {
    id: number;
    email: string;
    property_type: string;
    listing_type: string;
    price_min: number | null;
    price_max: number | null;
    bedrooms_min: number | null;
    bedrooms_max: number | null;
    area_m2_min: number | null;
    area_m2_max: number | null;
    polygon: string;
    frequency: string;
    is_confirmed: boolean;
    unsubscribe_token: string;
    created_at: string;
}

export interface Property {
    id: number;
    property_type: string;
    listing_type: string;
    price: number | null;
    formatted_price: string;
    bedrooms: number | null;
    area_m2: number | null;
    address: string | null;
    suburb: string | null;
    city: string | null;
    url: string | null;
    image_url: string | null;
}

export interface SharedData {
    flash: {
        success: string | null;
        error: string | null;
    };
}
