<?php

namespace App\Console\Commands;

use App\Jobs\SendPingerNotificationEmail;
use App\Models\Pinger;
use App\Models\PingerNotification;
use App\Models\Property;
use App\Services\GeoService;
use Illuminate\Console\Command;

class DispatchPingerNotifications extends Command
{
    protected $signature   = 'pinger:dispatch-notifications';
    protected $description = 'Match new properties against pingers and dispatch notification emails';

    public function handle(GeoService $geo): int
    {
        // Step 1: Match unprocessed properties against all confirmed pingers
        $unprocessed = Property::where('is_processed', false)->get();

        if ($unprocessed->isEmpty()) {
            $this->info('No unprocessed properties found.');
        } else {
            $this->info("Processing {$unprocessed->count()} propert(ies)...");
        }

        $confirmedPingers = Pinger::confirmed()->get();

        foreach ($unprocessed as $property) {
            $matchCount = 0;

            foreach ($confirmedPingers as $pinger) {
                if (!$geo->propertyMatchesPinger($property, $pinger)) {
                    continue;
                }

                // Create notification record (deduplication via unique constraint)
                PingerNotification::insertOrIgnore([
                    'pinger_id'   => $pinger->id,
                    'property_id' => $property->id,
                    'sent_at'     => null,
                    'created_at'  => now(),
                    'updated_at'  => now(),
                ]);

                $matchCount++;

                // Immediate: send right away
                if ($pinger->frequency === 'immediate') {
                    SendPingerNotificationEmail::dispatch($pinger, collect([$property]));

                    PingerNotification::where('pinger_id', $pinger->id)
                        ->where('property_id', $property->id)
                        ->whereNull('sent_at')
                        ->update(['sent_at' => now()]);

                    $pinger->update(['last_notified_at' => now()]);
                }
            }

            $property->update(['is_processed' => true]);
            $this->line("  Property #{$property->id} ({$property->address}) → {$matchCount} pinger match(es)");
        }

        // Step 2: Dispatch batched digests for daily/weekly/monthly
        foreach (['daily', 'weekly', 'monthly'] as $frequency) {
            $duePingers = Pinger::scopeDueForNotification(Pinger::query(), $frequency)->get();

            foreach ($duePingers as $pinger) {
                $unsentProperties = Property::whereHas('notifications', function ($q) use ($pinger) {
                    $q->where('pinger_id', $pinger->id)->whereNull('sent_at');
                })->get();

                if ($unsentProperties->isEmpty()) {
                    continue;
                }

                $this->line("  Dispatching {$frequency} digest for pinger #{$pinger->id} ({$pinger->email}) — {$unsentProperties->count()} propert(ies)");
                SendPingerNotificationEmail::dispatch($pinger, $unsentProperties);
            }
        }

        $this->info('Done.');

        return self::SUCCESS;
    }
}
