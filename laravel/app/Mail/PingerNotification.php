<?php

namespace App\Mail;

use App\Models\Pinger;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Collection;

class PingerNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public readonly Pinger $pinger,
        public readonly Collection $properties,
    ) {
    }

    public function envelope(): Envelope
    {
        $count = $this->properties->count();
        $noun  = $count === 1 ? 'property' : 'properties';

        return new Envelope(
            subject: "{$count} new {$noun} matching your alert — PropertyPing.nz",
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pinger-notification',
            with: [
                'pinger'         => $this->pinger,
                'properties'     => $this->properties,
                'unsubscribeUrl' => route('pinger.unsubscribe', $this->pinger->unsubscribe_token),
                'manageUrl'      => route('pinger.manage', $this->pinger->unsubscribe_token),
            ],
        );
    }
}
