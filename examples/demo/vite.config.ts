import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    base: '/markdown-editor/',
    plugins: [
        react({
            // Disable React Fast Refresh in production builds
            babel: {
                compact: false,
            },
        }),
    ],
    resolve: {
        alias: {
            '@akiwiki/markdown-editor': path.resolve(__dirname, '../../src'),
        },
    },
    server: {
        fs: {
            // Allow serving files from the node_modules directory
            allow: ['..', '../..'],
        },
    },
});