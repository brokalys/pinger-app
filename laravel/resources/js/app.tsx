import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import AppLayout from '@/components/layout/AppLayout';
import 'leaflet/dist/leaflet.css';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';

createInertiaApp({
    title: (title) => title ? `${title} — PropertyPing.nz` : 'PropertyPing.nz',
    resolve: async (name) => {
        const page = await resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (!(page as any).default.layout) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (page as any).default.layout = (page: React.ReactNode) => (
                <AppLayout>{page}</AppLayout>
            );
        }
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: '#16a34a',
    },
});
