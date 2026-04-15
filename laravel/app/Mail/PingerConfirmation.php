<?php

namespace App\Mail;

use App\Models\Pinger;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PingerConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public readonly Pinger $pinger)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Confirm your Property Ping Alert — PropertyPing.nz',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.pinger-confirmation',
            with: [
                'confirmUrl'     => route('pinger.confirm', $this->pinger->confirm_token),
                'unsubscribeUrl' => route('pinger.unsubscribe', $this->pinger->unsubscribe_token),
                'pinger'         => $this->pinger,
            ],
        );
    }
}
