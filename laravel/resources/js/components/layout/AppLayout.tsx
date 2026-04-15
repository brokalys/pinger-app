import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin } from 'lucide-react';
import { Toaster } from 'sonner';

interface AppLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Toaster position="top-right" richColors />
            <header className="border-b border-[#e4e4e7] bg-white sticky top-0 z-40">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-8 h-8 bg-[#0a0a0a] rounded-lg flex items-center justify-center group-hover:bg-[#16a34a] transition-colors">
                                <MapPin className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-[#0a0a0a] text-base tracking-tight">
                                PropertyPing<span className="text-[#16a34a]">.nz</span>
                            </span>
                        </Link>
                        <nav className="hidden sm:flex items-center gap-1">
                            <Link
                                href="/"
                                className="text-sm text-[#71717a] hover:text-[#0a0a0a] px-3 py-2 rounded-lg hover:bg-[#f4f4f5] transition-colors"
                            >
                                Home
                            </Link>
                            <Link
                                href="/create"
                                className="text-sm font-semibold bg-[#0a0a0a] text-white px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                            >
                                Create Alert
                            </Link>
                        </nav>
                        <div className="sm:hidden">
                            <Link
                                href="/create"
                                className="text-sm font-semibold bg-[#0a0a0a] text-white px-4 py-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                            >
                                Create Alert
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
            <main className="flex-1">
                {children}
            </main>
            <footer className="border-t border-[#e4e4e7] bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#0a0a0a] rounded flex items-center justify-center">
                                <MapPin className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm font-semibold text-[#0a0a0a]">PropertyPing.nz</span>
                        </div>
                        <nav className="flex items-center gap-6">
                            <Link href="/privacy-policy" className="text-sm text-[#71717a] hover:text-[#0a0a0a] transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms-and-conditions" className="text-sm text-[#71717a] hover:text-[#0a0a0a] transition-colors">
                                Terms
                            </Link>
                        </nav>
                        <p className="text-xs text-[#a1a1aa]">
                            © {new Date().getFullYear()} PropertyPing.nz · New Zealand
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
