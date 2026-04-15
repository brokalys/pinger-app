import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import { Trash2, Plus, Bell, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface PingerItem {
    id: number;
    formatted_property_type: string;
    formatted_listing_type: string;
    formatted_frequency: string;
    price_min: number | null;
    price_max: number | null;
    bedrooms_min: number | null;
    bedrooms_max: number | null;
    is_confirmed: boolean;
    unsubscribe_token: string;
    created_at: string;
}

interface Props {
    pingers: PingerItem[];
    email: string;
    management_token: string;
}

function formatPrice(cents: number | null): string {
    if (cents === null) return '—';
    return 'NZ$' + new Intl.NumberFormat('en-NZ').format(cents);
}

export default function ManageAlerts({ pingers, email, management_token }: Props) {
    const handleDelete = (pinger: PingerItem) => {
        if (!confirm('Delete this alert? This cannot be undone.')) return;
        router.delete(`/pingers/${pinger.id}?token=${pinger.unsubscribe_token}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Manage Alerts" />
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#71717a] mb-2">
                        Alert management
                    </p>
                    <h1 className="text-4xl font-black tracking-tight text-[#0a0a0a]">
                        Your alerts
                    </h1>
                    <p className="text-[#71717a] mt-2">
                        Managing alerts for <span className="font-medium text-[#0a0a0a]">{email}</span>
                    </p>
                </div>

                {pingers.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-[#e4e4e7] rounded-xl">
                        <Bell className="w-10 h-10 text-[#a1a1aa] mx-auto mb-4" />
                        <p className="font-semibold text-[#0a0a0a] mb-1">No active alerts</p>
                        <p className="text-sm text-[#71717a] mb-6">Create your first property ping alert to get started.</p>
                        <Link href="/create">
                            <Button variant="accent" className="gap-2">
                                <Plus className="w-4 h-4" />
                                Create an alert
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {pingers.map((pinger) => (
                            <Card key={pinger.id} className="hover:shadow-sm transition-shadow">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                                <Badge variant="default">
                                                    {pinger.formatted_property_type}
                                                </Badge>
                                                <Badge variant="secondary">
                                                    {pinger.formatted_listing_type}
                                                </Badge>
                                                {pinger.is_confirmed ? (
                                                    <Badge variant="accent" className="gap-1">
                                                        <CheckCircle2 className="w-3 h-3" />
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="outline" className="gap-1 text-[#71717a]">
                                                        <Clock className="w-3 h-3" />
                                                        Pending confirmation
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-1 text-sm">
                                                {(pinger.price_min !== null || pinger.price_max !== null) && (
                                                    <div className="flex justify-between sm:block">
                                                        <span className="text-[#71717a]">Price</span>
                                                        <span className="font-medium text-[#0a0a0a] sm:ml-0">
                                                            {formatPrice(pinger.price_min)} – {formatPrice(pinger.price_max)}
                                                        </span>
                                                    </div>
                                                )}
                                                {(pinger.bedrooms_min !== null || pinger.bedrooms_max !== null) && (
                                                    <div className="flex justify-between sm:block">
                                                        <span className="text-[#71717a]">Bedrooms</span>
                                                        <span className="font-medium text-[#0a0a0a]">
                                                            {pinger.bedrooms_min ?? 'Any'} – {pinger.bedrooms_max ?? 'Any'}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="flex justify-between sm:block">
                                                    <span className="text-[#71717a]">Frequency</span>
                                                    <span className="font-medium text-[#0a0a0a]">{pinger.formatted_frequency}</span>
                                                </div>
                                                <div className="flex justify-between sm:block">
                                                    <span className="text-[#71717a]">Created</span>
                                                    <span className="font-medium text-[#0a0a0a]">{pinger.created_at}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleDelete(pinger)}
                                            className="shrink-0 p-2 text-[#a1a1aa] hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete alert"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        <Separator />

                        <div className="flex justify-between items-center pt-2">
                            <p className="text-sm text-[#71717a]">
                                {pingers.length} alert{pingers.length !== 1 ? 's' : ''}
                            </p>
                            <Link href="/create">
                                <Button variant="outline" size="sm" className="gap-2">
                                    <Plus className="w-4 h-4" />
                                    Add another
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
