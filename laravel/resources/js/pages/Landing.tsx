import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { MapPin, Bell, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
    {
        icon: MapPin,
        title: 'Draw your area',
        description: 'Use our map tool to draw a custom polygon around any suburb, street, or region in NZ.',
    },
    {
        icon: Search,
        title: 'Set your filters',
        description: 'Choose property type, listing type, price range, bedrooms — only see what matters.',
    },
    {
        icon: Bell,
        title: 'Get instant alerts',
        description: 'Receive email notifications the moment a matching property is listed. Immediate or digest.',
    },
];

const features = [
    'Draw any custom area on the map — not limited to suburbs',
    'Covers all of New Zealand, every region',
    'For Sale and For Rent alerts',
    'Houses, apartments, townhouses, sections, rural, commercial',
    'Immediate, daily, weekly, or monthly digest',
    'No account required — just your email',
    'Free to use',
];

export default function Landing() {
    return (
        <>
            <Head title="Never miss a property" />

            {/* Hero */}
            <section className="bg-[#0a0a0a] text-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
                    <div className="max-w-3xl">
                        <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 mb-8">
                            <span className="w-2 h-2 bg-[#16a34a] rounded-full animate-pulse" />
                            <span className="text-sm font-medium text-white/80">New Zealand's property ping service</span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none mb-6">
                            Never miss{' '}
                            <span className="text-[#16a34a]">the one.</span>
                        </h1>
                        <p className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed">
                            Draw a custom area on the map. Set your filters. Get an email the moment
                            a matching property is listed — anywhere in New Zealand.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link href="/create">
                                <Button size="lg" variant="accent" className="gap-2 text-base font-bold px-8">
                                    Create your first alert
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Social proof bar */}
            <section className="border-b border-[#e4e4e7] bg-[#f4f4f5]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-sm font-medium text-[#52525b]">
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                            All NZ regions
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                            Free to use
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                            No account needed
                        </span>
                        <span className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
                            Instant alerts
                        </span>
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-3">How it works</p>
                        <h2 className="text-4xl font-black tracking-tight text-[#0a0a0a]">
                            Set up in under 60 seconds
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-8">
                        {steps.map((step, i) => (
                            <div key={i} className="group">
                                <div className="w-12 h-12 bg-[#0a0a0a] group-hover:bg-[#16a34a] transition-colors rounded-xl flex items-center justify-center mb-5">
                                    <step.icon className="w-5 h-5 text-white" />
                                </div>
                                <div className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-2">
                                    Step {i + 1}
                                </div>
                                <h3 className="text-xl font-bold text-[#0a0a0a] mb-2">{step.title}</h3>
                                <p className="text-[#71717a] leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-24 bg-[#f4f4f5]">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-3">Everything you need</p>
                            <h2 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-8">
                                Built for NZ property hunters
                            </h2>
                            <ul className="space-y-3">
                                {features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-3 text-[#52525b]">
                                        <CheckCircle2 className="w-5 h-5 text-[#16a34a] mt-0.5 shrink-0" />
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-[#0a0a0a] rounded-2xl p-8 text-white">
                            <p className="text-xs font-semibold uppercase tracking-widest text-white/50 mb-4">
                                Ready to start?
                            </p>
                            <h3 className="text-3xl font-black tracking-tight mb-4">
                                Set up your first alert now
                            </h3>
                            <p className="text-white/60 mb-8 leading-relaxed">
                                Draw your ideal area on the map, choose your filters, and enter your email.
                                That's it. We'll ping you the moment something comes up.
                            </p>
                            <Link href="/create">
                                <Button size="lg" variant="accent" className="w-full gap-2 font-bold">
                                    Create a free alert
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
