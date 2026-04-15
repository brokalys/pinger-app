import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, ArrowRight, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
    manage_url: string;
}

export default function PingerConfirmed({ manage_url }: Props) {
    return (
        <>
            <Head title="Alert activated" />
            <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
                <div className="w-16 h-16 bg-[#16a34a] rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-4">
                    Your alert is live!
                </h1>
                <p className="text-[#71717a] leading-relaxed mb-10">
                    Your property ping alert is now active. We'll email you when matching properties
                    are listed in your selected area.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href={manage_url}>
                        <Button variant="outline" className="gap-2 w-full sm:w-auto">
                            <Settings className="w-4 h-4" />
                            Manage my alerts
                        </Button>
                    </a>
                    <Link href="/create">
                        <Button variant="accent" className="gap-2 w-full sm:w-auto">
                            Create another alert
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
