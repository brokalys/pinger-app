<?php

namespace App\Http\Controllers;

use App\Models\Pinger;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class PingerUnsubscribeController extends Controller
{
    public function unsubscribe(string $token): RedirectResponse
    {
        $pinger = Pinger::withTrashed()
            ->where('unsubscribe_token', $token)
            ->first();

        if ($pinger && !$pinger->trashed()) {
            $pinger->delete();
        }

        return redirect()->route('pinger.unsubscribed');
    }

    public function unsubscribed(): Response
    {
        return Inertia::render('PingerUnsubscribed');
    }
}
