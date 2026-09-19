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
                'resources/js/tools/sql-formatter.js',
                'resources/js/tools/css-formatter.js',
                'resources/js/tools/javascript-formatter.js',
                'resources/js/tools/csv-to-json.js',
                'resources/js/tools/word-counter.js',
                'resources/js/tools/regex-tester.js',
            ],
            refresh: true,
            fonts: [
                bunny('Space Grotesk', {
                    weights: [400, 700],
                    optimizedFallbacks: false,
                }),
                bunny('JetBrains Mono', {
                    weights: [400],
                    preload: false,
                    optimizedFallbacks: false,
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
