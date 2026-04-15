import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PingerSuccess() {
    return (
        <>
            <Head title="Check your email" />
            <div className="max-w-lg mx-auto px-4 sm:px-6 py-24 text-center">
                <div className="w-16 h-16 bg-[#0a0a0a] rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <Mail className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-4">
                    Check your email
                </h1>
                <p className="text-[#71717a] leading-relaxed mb-8">
                    We've sent a confirmation link to your email address. Click it to activate your
                    property ping alert. The email should arrive within a few minutes.
                </p>
                <p className="text-sm text-[#a1a1aa] mb-10">
                    Didn't receive it? Check your spam folder.
                </p>
                <Link href="/create">
                    <Button variant="outline" className="gap-2">
                        Create another alert
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </div>
        </>
    );
}
