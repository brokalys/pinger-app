<?php

namespace App\Http\Controllers;

use App\Models\Pinger;
use Inertia\Inertia;
use Inertia\Response;

class PingerConfirmController extends Controller
{
    public function confirm(string $token): Response
    {
        $pinger = Pinger::where('confirm_token', $token)->firstOrFail();

        if (!$pinger->is_confirmed) {
            $pinger->update(['is_confirmed' => true]);
        }

        return Inertia::render('PingerConfirmed', [
            'manage_url' => route('pinger.manage', $pinger->unsubscribe_token),
        ]);
    }
}
