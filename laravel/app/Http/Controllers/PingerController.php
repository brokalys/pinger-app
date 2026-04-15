<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePingerRequest;
use App\Jobs\SendPingerConfirmationEmail;
use App\Models\Pinger;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PingerController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('CreatePinger', [
            'propertyTypes' => [
                ['value' => 'house',      'label' => 'House'],
                ['value' => 'apartment',  'label' => 'Apartment'],
                ['value' => 'townhouse',  'label' => 'Townhouse'],
                ['value' => 'unit',       'label' => 'Unit / Flat'],
                ['value' => 'section',    'label' => 'Section (Land)'],
                ['value' => 'rural',      'label' => 'Rural'],
                ['value' => 'commercial', 'label' => 'Commercial'],
            ],
            'listingTypes' => [
                ['value' => 'sale', 'label' => 'For Sale'],
                ['value' => 'rent', 'label' => 'For Rent'],
            ],
            'frequencies' => [
                ['value' => 'immediate', 'label' => 'Immediate — one email per new listing'],
                ['value' => 'daily',     'label' => 'Daily digest'],
                ['value' => 'weekly',    'label' => 'Weekly digest'],
                ['value' => 'monthly',   'label' => 'Monthly digest'],
            ],
            'nzRegions'  => config('pinger.nz_regions'),
            'maxPingers' => config('pinger.max_per_email'),
        ]);
    }

    public function store(StorePingerRequest $request): RedirectResponse
    {
        $validated = $request->validated();

        // Check existing confirmed pinger count for this email
        $existingCount = Pinger::where('email', $validated['email'])
            ->confirmed()
            ->count();

        if ($existingCount >= config('pinger.max_per_email')) {
            return back()->withErrors([
                'email' => "You already have the maximum of " . config('pinger.max_per_email') . " active alerts for this email address.",
            ]);
        }

        $pinger = Pinger::create([
            'email'         => $validated['email'],
            'property_type' => $validated['property_type'],
            'listing_type'  => $validated['listing_type'],
            'price_min'     => $validated['price_min'] ?? null,
            'price_max'     => $validated['price_max'] ?? null,
            'bedrooms_min'  => $validated['bedrooms_min'] ?? null,
            'bedrooms_max'  => $validated['bedrooms_max'] ?? null,
            'area_m2_min'   => $validated['area_m2_min'] ?? null,
            'area_m2_max'   => $validated['area_m2_max'] ?? null,
            'polygon'       => $validated['polygon'],
            'frequency'     => $validated['frequency'],
        ]);

        SendPingerConfirmationEmail::dispatch($pinger);

        return redirect()->route('pinger.success');
    }

    public function success(): Response
    {
        return Inertia::render('PingerSuccess');
    }

    public function manage(string $token): Response
    {
        $pinger = Pinger::where('unsubscribe_token', $token)->firstOrFail();

        $pingers = Pinger::where('email', $pinger->email)
            ->orderByDesc('created_at')
            ->get()
            ->map(fn($p) => [
                'id'                     => $p->id,
                'property_type'          => $p->property_type,
                'formatted_property_type' => $p->formatted_property_type,
                'listing_type'           => $p->listing_type,
                'formatted_listing_type' => $p->formatted_listing_type,
                'price_min'              => $p->price_min ? $p->price_min / 100 : null,
                'price_max'              => $p->price_max ? $p->price_max / 100 : null,
                'bedrooms_min'           => $p->bedrooms_min,
                'bedrooms_max'           => $p->bedrooms_max,
                'frequency'              => $p->frequency,
                'formatted_frequency'    => $p->formatted_frequency,
                'is_confirmed'           => $p->is_confirmed,
                'unsubscribe_token'      => $p->unsubscribe_token,
                'created_at'             => $p->created_at->toDateString(),
            ]);

        return Inertia::render('ManageAlerts', [
            'pingers'         => $pingers,
            'email'           => $pinger->email,
            'management_token' => $token,
        ]);
    }

    public function destroy(Request $request, Pinger $pinger): RedirectResponse
    {
        // Verify ownership via token query param
        if ($request->query('token') !== $pinger->unsubscribe_token) {
            abort(403);
        }

        $token = $pinger->unsubscribe_token;
        $pinger->delete();

        return redirect()->route('pinger.manage', $token)
            ->with('success', 'Alert deleted successfully.');
    }
}
