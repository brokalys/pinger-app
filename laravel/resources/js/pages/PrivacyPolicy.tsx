import React from 'react';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    return (
        <>
            <Head title="Privacy Policy" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-3">Legal</p>
                <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a] mb-10">Privacy Policy</h1>

                <div className="prose prose-neutral max-w-none space-y-8 text-[#52525b] leading-relaxed">
                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">1. What we collect</h2>
                        <p>
                            When you create a property ping alert, we collect your email address and the search
                            criteria you specify (property type, listing type, price range, geographic polygon,
                            and notification frequency). We do not collect any other personal information.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">2. How we use your information</h2>
                        <p>
                            Your email address is used solely to send you property ping alerts matching your
                            criteria, and to send the initial confirmation email. We do not sell, rent, or share
                            your email address with third parties for marketing purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">3. Data storage</h2>
                        <p>
                            Your alert preferences and email address are stored securely. We retain your data
                            only for as long as your alert is active. Upon unsubscribing, your data is removed
                            from our active records.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">4. Unsubscribing</h2>
                        <p>
                            Every email we send includes an unsubscribe link. Clicking this link will
                            immediately deactivate your alert and stop all future emails. You can also manage
                            your alerts via the management link included in your emails.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">5. Cookies</h2>
                        <p>
                            We use only essential session cookies required for the website to function. We do
                            not use tracking or advertising cookies.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-[#0a0a0a] mb-3">6. Contact</h2>
                        <p>
                            For any privacy-related queries, please contact us at{' '}
                            <a href="mailto:privacy@propertypingapp.nz" className="text-[#0a0a0a] underline hover:text-[#16a34a]">
                                privacy@propertypingapp.nz
                            </a>
                            .
                        </p>
                    </section>

                    <p className="text-sm text-[#a1a1aa]">Last updated: April 2025</p>
                </div>
            </div>
        </>
    );
}
