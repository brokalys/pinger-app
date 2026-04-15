import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PingerUnsubscribed() {
    return (
        <>
            <Head title="Unsubscribed" />
            <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
                <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-4">
                    You're unsubscribed
                </h1>
                <p className="text-[#71717a] leading-relaxed mb-10">
                    Your property ping alert has been removed. You won't receive any more emails
                    from this alert. You can always create a new one anytime.
                </p>
                <Link href="/create">
                    <Button variant="accent" className="gap-2">
                        Create a new alert
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </>
    );
}
