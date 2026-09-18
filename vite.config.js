import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/css/app.css',
                'resources/js/app.js',
                'resources/js/tools/json-formatter.js',
                'resources/js/tools/xml-formatter.js',
                'resources/js/tools/base64.js',
                'resources/js/tools/url-encoder.js',
                'resources/js/tools/html-entities.js',
                'resources/js/tools/hash-generator.js',
                'resources/js/tools/uuid-generator.js',
            ],
            refresh: true,
            fonts: [
                bunny('Space Grotesk', {
                    weights: [400, 700],
                }),
                bunny('JetBrains Mono', {
                    weights: [400],
                    preload: false,
                }),
            ],
        }),
        tailwindcss(),
    ],
    server: {
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
    },
});
