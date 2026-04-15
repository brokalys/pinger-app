<?php

namespace App\Jobs;

use App\Mail\PingerNotification;
use App\Models\Pinger;
use App\Models\PingerNotification as PingerNotificationModel;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Mail;

class SendPingerNotificationEmail implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public readonly Pinger $pinger,
        public readonly Collection $properties,
    ) {
    }

    public function handle(): void
    {
        Mail::to($this->pinger->email)->send(
            new PingerNotification($this->pinger, $this->properties)
        );

        // Mark notifications as sent
        PingerNotificationModel::whereIn('property_id', $this->properties->pluck('id'))
            ->where('pinger_id', $this->pinger->id)
            ->whereNull('sent_at')
            ->update(['sent_at' => now()]);

        // Update last notified timestamp
        $this->pinger->update(['last_notified_at' => now()]);
    }
}
