import React, { Suspense, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { pingerSchema, type PingerFormValues } from '@/lib/validation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from '@inertiajs/react';

// Lazy load map to avoid SSR issues
const PolygonMap = lazy(() => import('@/components/map/PolygonMap'));

interface Option {
    value: string;
    label: string;
}

interface NzRegion {
    name: string;
    center: [number, number];
    zoom: number;
    wkt: string;
}

interface Props {
    propertyTypes: Option[];
    listingTypes: Option[];
    frequencies: Option[];
    nzRegions: NzRegion[];
    maxPingers: number;
    errors?: Record<string, string>;
}

function MapSkeleton() {
    return (
        <div className="w-full h-[420px] rounded-lg border border-[#e4e4e7] bg-[#f4f4f5] flex items-center justify-center">
            <div className="text-[#a1a1aa] text-sm animate-pulse">Loading map…</div>
        </div>
    );
}

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-red-600 text-xs mt-1">{message}</p>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-4">
            {children}
        </p>
    );
}

export default function CreatePinger({ propertyTypes, listingTypes, frequencies, nzRegions, errors: serverErrors }: Props) {
    const [showOptional, setShowOptional] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm<PingerFormValues>({
        resolver: zodResolver(pingerSchema),
        defaultValues: {
            frequency: 'weekly',
            property_type: 'house',
            listing_type: 'sale',
        },
    });

    const polygon = watch('polygon');
    const propertyType = watch('property_type');

    const onSubmit = (data: PingerFormValues) => {
        router.post('/pingers', data as Record<string, unknown>);
    };

    return (
        <>
            <Head title="Create Property Alert" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header */}
                <div className="mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-2">
                        New Alert
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a]">
                        Set up your property ping
                    </h1>
                    <p className="text-[#71717a] mt-2">
                        Draw your search area on the map, set your filters, and we'll email you when matching properties are listed.
                    </p>
                </div>

                {/* Server-side errors */}
                {serverErrors && Object.keys(serverErrors).length > 0 && (
                    <Alert variant="destructive" className="mb-6">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {Object.values(serverErrors).join('. ')}
                        </AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid lg:grid-cols-2 gap-10">
                        {/* Left: Form Fields */}
                        <div className="space-y-8">
                            {/* Property & Listing Type */}
                            <div>
                                <SectionLabel>Property details</SectionLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="property_type" className="mb-2 block">
                                            Property type
                                        </Label>
                                        <Controller
                                            name="property_type"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="property_type">
                                                        <SelectValue placeholder="Select type…" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {propertyTypes.map((t) => (
                                                            <SelectItem key={t.value} value={t.value}>
                                                                {t.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldError message={errors.property_type?.message} />
                                    </div>
                                    <div>
                                        <Label htmlFor="listing_type" className="mb-2 block">
                                            Listing type
                                        </Label>
                                        <Controller
                                            name="listing_type"
                                            control={control}
                                            render={({ field }) => (
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <SelectTrigger id="listing_type">
                                                        <SelectValue placeholder="Select…" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {listingTypes.map((t) => (
                                                            <SelectItem key={t.value} value={t.value}>
                                                                {t.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        />
                                        <FieldError message={errors.listing_type?.message} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Price range */}
                            <div>
                                <SectionLabel>Price range (NZD)</SectionLabel>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price_min" className="mb-2 block">
                                            Min price
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] text-sm font-medium">
                                                NZ$
                                            </span>
                                            <Input
                                                id="price_min"
                                                type="number"
                                                min={0}
                                                step={1000}
                                                placeholder="0"
                                                className="pl-11"
                                                {...register('price_min')}
                                            />
                                        </div>
                                        <FieldError message={errors.price_min?.message} />
                                    </div>
                                    <div>
                                        <Label htmlFor="price_max" className="mb-2 block">
                                            Max price
                                        </Label>
                                        <div className="relative">
                                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a] text-sm font-medium">
                                                NZ$
                                            </span>
                                            <Input
                                                id="price_max"
                                                type="number"
                                                min={0}
                                                step={1000}
                                                placeholder="No limit"
                                                className="pl-11"
                                                {...register('price_max')}
                                            />
                                        </div>
                                        <FieldError message={errors.price_max?.message} />
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            {/* Optional filters toggle */}
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setShowOptional(!showOptional)}
                                    className="flex items-center gap-2 text-sm font-semibold text-[#0a0a0a] hover:text-[#16a34a] transition-colors"
                                >
                                    {showOptional ? (
                                        <ChevronUp className="w-4 h-4" />
                                    ) : (
                                        <ChevronDown className="w-4 h-4" />
                                    )}
                                    {showOptional ? 'Hide' : 'Show'} optional filters
                                </button>

                                {showOptional && (
                                    <div className="mt-6 space-y-6">
                                        {/* Bedrooms */}
                                        {!['section', 'rural', 'commercial'].includes(propertyType) && (
                                            <div>
                                                <SectionLabel>Bedrooms</SectionLabel>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <Label htmlFor="bedrooms_min" className="mb-2 block">Min bedrooms</Label>
                                                        <Input
                                                            id="bedrooms_min"
                                                            type="number"
                                                            min={1}
                                                            max={20}
                                                            placeholder="Any"
                                                            {...register('bedrooms_min')}
                                                        />
                                                        <FieldError message={errors.bedrooms_min?.message} />
                                                    </div>
                                                    <div>
                                                        <Label htmlFor="bedrooms_max" className="mb-2 block">Max bedrooms</Label>
                                                        <Input
                                                            id="bedrooms_max"
                                                            type="number"
                                                            min={1}
                                                            max={20}
                                                            placeholder="Any"
                                                            {...register('bedrooms_max')}
                                                        />
                                                        <FieldError message={errors.bedrooms_max?.message} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Area */}
                                        <div>
                                            <SectionLabel>Floor / land area (m²)</SectionLabel>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <Label htmlFor="area_m2_min" className="mb-2 block">Min area</Label>
                                                    <Input
                                                        id="area_m2_min"
                                                        type="number"
                                                        min={1}
                                                        placeholder="Any"
                                                        {...register('area_m2_min')}
                                                    />
                                                    <FieldError message={errors.area_m2_min?.message} />
                                                </div>
                                                <div>
                                                    <Label htmlFor="area_m2_max" className="mb-2 block">Max area</Label>
                                                    <Input
                                                        id="area_m2_max"
                                                        type="number"
                                                        min={1}
                                                        placeholder="Any"
                                                        {...register('area_m2_max')}
                                                    />
                                                    <FieldError message={errors.area_m2_max?.message} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <Separator />

                            {/* Frequency */}
                            <div>
                                <SectionLabel>Notification frequency</SectionLabel>
                                <Controller
                                    name="frequency"
                                    control={control}
                                    render={({ field }) => (
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Choose frequency…" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {frequencies.map((f) => (
                                                    <SelectItem key={f.value} value={f.value}>
                                                        {f.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    )}
                                />
                                <FieldError message={errors.frequency?.message} />
                            </div>

                            <Separator />

                            {/* Email */}
                            <div>
                                <SectionLabel>Your email</SectionLabel>
                                <Label htmlFor="email" className="mb-2 block">
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    {...register('email')}
                                />
                                <FieldError message={errors.email?.message} />
                                <p className="text-xs text-[#a1a1aa] mt-2">
                                    We'll send a confirmation link. No spam, ever.
                                </p>
                            </div>

                            <Separator />

                            {/* Terms */}
                            <div>
                                <Controller
                                    name="agree_terms"
                                    control={control}
                                    render={({ field }) => (
                                        <div className="flex items-start gap-3">
                                            <Checkbox
                                                id="agree_terms"
                                                checked={field.value === true}
                                                onCheckedChange={(v) => field.onChange(v === true ? true : undefined)}
                                            />
                                            <Label
                                                htmlFor="agree_terms"
                                                className="text-sm font-normal normal-case tracking-normal text-[#52525b] cursor-pointer"
                                            >
                                                I agree to the{' '}
                                                <Link href="/terms-and-conditions" className="underline text-[#0a0a0a] hover:text-[#16a34a]">
                                                    Terms and Conditions
                                                </Link>{' '}
                                                and{' '}
                                                <Link href="/privacy-policy" className="underline text-[#0a0a0a] hover:text-[#16a34a]">
                                                    Privacy Policy
                                                </Link>
                                            </Label>
                                        </div>
                                    )}
                                />
                                <FieldError message={errors.agree_terms?.message} />
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                size="lg"
                                variant="accent"
                                disabled={isSubmitting}
                                className="w-full font-bold"
                            >
                                {isSubmitting ? 'Creating your alert…' : 'Create alert — it\'s free'}
                            </Button>
                        </div>

                        {/* Right: Map */}
                        <div className="lg:sticky lg:top-24 h-fit">
                            <SectionLabel>Draw your search area</SectionLabel>
                            <p className="text-sm text-[#71717a] mb-4">
                                Use the polygon or rectangle tool to outline the area you want alerts for.
                                You can also jump to a NZ city below.
                            </p>

                            {/* Quick region select — needs to be inside MapContainer context */}
                            <div className="mb-3">
                                <QuickSelectWrapper
                                    nzRegions={nzRegions}
                                    onSelect={(wkt) => setValue('polygon', wkt, { shouldValidate: true })}
                                />
                            </div>

                            <Suspense fallback={<MapSkeleton />}>
                                <PolygonMap
                                    value={polygon || null}
                                    onChange={(wkt) => setValue('polygon', wkt, { shouldValidate: true })}
                                />
                            </Suspense>

                            {errors.polygon && (
                                <Alert variant="destructive" className="mt-3">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{errors.polygon.message}</AlertDescription>
                                </Alert>
                            )}

                            <p className="text-xs text-[#a1a1aa] mt-3">
                                Draw a polygon or rectangle on the map. Right-click a vertex to remove it.
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

function QuickSelectWrapper({
    nzRegions,
    onSelect,
}: {
    nzRegions: NzRegion[];
    onSelect: (wkt: string) => void;
}) {
    return (
        <Select
            onValueChange={(name) => {
                const region = nzRegions.find((r) => r.name === name);
                if (region) onSelect(region.wkt);
            }}
        >
            <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Jump to NZ city…" />
            </SelectTrigger>
            <SelectContent>
                {nzRegions.map((region) => (
                    <SelectItem key={region.name} value={region.name}>
                        {region.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
