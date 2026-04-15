<?php

namespace App\Jobs;

use App\Mail\PingerConfirmation;
use App\Models\Pinger;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Mail;

class SendPingerConfirmationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(public readonly Pinger $pinger)
    {
    }

    public function handle(): void
    {
        Mail::to($this->pinger->email)->send(new PingerConfirmation($this->pinger));
    }
}
