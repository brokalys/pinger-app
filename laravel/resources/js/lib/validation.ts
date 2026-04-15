import { z } from 'zod';

export const pingerSchema = z
    .object({
        email: z.string().email('Please enter a valid email address'),
        property_type: z.enum(['house', 'apartment', 'townhouse', 'unit', 'section', 'rural', 'commercial'], {
            errorMap: () => ({ message: 'Please select a property type' }),
        }),
        listing_type: z.enum(['sale', 'rent'], {
            errorMap: () => ({ message: 'Please select a listing type' }),
        }),
        price_min: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(0).max(10_000_000).optional()),
        price_max: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(0).max(10_000_000).optional()),
        bedrooms_min: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(1).max(20).optional()),
        bedrooms_max: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(1).max(20).optional()),
        area_m2_min: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(1).optional()),
        area_m2_max: z
            .string()
            .optional()
            .transform((v) => (v ? Number(v) : undefined))
            .pipe(z.number().int().min(1).optional()),
        polygon: z.string().min(1, 'Please draw an area on the map'),
        frequency: z.enum(['immediate', 'daily', 'weekly', 'monthly'], {
            errorMap: () => ({ message: 'Please select a notification frequency' }),
        }),
        agree_terms: z.literal(true, {
            errorMap: () => ({ message: 'You must agree to the terms and conditions' }),
        }),
    })
    .refine(
        (data) => {
            if (data.price_min !== undefined && data.price_max !== undefined) {
                return data.price_max >= data.price_min;
            }
            return true;
        },
        { message: 'Maximum price must be ≥ minimum', path: ['price_max'] },
    )
    .refine(
        (data) => {
            if (data.bedrooms_min !== undefined && data.bedrooms_max !== undefined) {
                return data.bedrooms_max >= data.bedrooms_min;
            }
            return true;
        },
        { message: 'Maximum bedrooms must be ≥ minimum', path: ['bedrooms_max'] },
    )
    .refine(
        (data) => {
            if (data.area_m2_max === undefined) return true;
            const isLand = ['section', 'rural'].includes(data.property_type);
            return data.area_m2_max <= (isLand ? 1_000_000 : 1_000);
        },
        { message: 'Area exceeds maximum for this property type', path: ['area_m2_max'] },
    );

export type PingerFormValues = z.input<typeof pingerSchema>;
