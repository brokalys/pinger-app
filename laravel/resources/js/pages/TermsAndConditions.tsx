import React from 'react';
import { Head } from '@inertiajs/react';

export default function TermsAndConditions() {
    return (
        <>
            <Head title="Terms and Conditions" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-3">Legal</p>
                <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-10">Terms and Conditions</h1>

                <div className="prose prose-neutral max-w-none space-y-8 text-[#52525b] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">1. Service description</h2>
                        <p>
                            PropertyPing.nz provides a free property alert notification service for the New Zealand
                            property market. We send email notifications when properties matching your specified
                            criteria are listed.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">2. Use of service</h2>
                        <p>
                            By creating an alert, you agree to provide a valid email address and confirm
                            your alert via the confirmation email. Alerts are limited to{' '}
                            <strong>5 per email address</strong>. You must not use this service for commercial
                            data harvesting or automated alert creation.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">3. No guarantee of completeness</h2>
                        <p>
                            PropertyPing.nz does not guarantee that all properties listed in your search area
                            will be captured. Property data is sourced from various NZ listing platforms and
                            may not be complete or real-time. We do not accept liability for missed listings.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">4. No endorsement</h2>
                        <p>
                            Listing a property in our alert system does not constitute an endorsement of that
                            property, seller, landlord, or listing agent. Always conduct your own due diligence.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">5. Service availability</h2>
                        <p>
                            We aim to keep the service running but make no guarantee of uninterrupted service.
                            We may modify or discontinue the service at any time without notice.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">6. Liability</h2>
                        <p>
                            To the fullest extent permitted by New Zealand law, PropertyPing.nz is not liable
                            for any direct, indirect, or consequential damages arising from use of this service.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">7. Governing law</h2>
                        <p>
                            These terms are governed by the laws of New Zealand. Any disputes will be subject
                            to the exclusive jurisdiction of the New Zealand courts.
                        </p>
                    </section>

                    <p className="text-sm text-[#a1a1aa]">Last updated: April 2025</p>
                </div>
            </div>
        </>
    );
}
