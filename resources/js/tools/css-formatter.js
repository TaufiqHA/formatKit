import { formatCss, minifyCss } from '../lib/css.js';
import { createTool } from './_shared.js';

const SAMPLE = `/* FormatKit UI Styles */
:root { --font-sans: 'Space Grotesk', sans-serif; --color-primary: #facc15; }
body { margin: 0; padding: 0; font-family: var(--font-sans); background: #fdfbf7; color: #111; }
.card { border: 3px solid #111; box-shadow: 4px 4px 0 #111; background: #fff; padding: 1.5rem; }
.card:hover { transform: translate(-2px, -2px); box-shadow: 6px 6px 0 #111; }
@media (max-width: 768px) { .card { padding: 1rem; border-width: 2px; } }`;

function convert(tool, transform, label) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const indent = tool.option('indent', '2');
        tool.setOutput(transform(source, { indent }));
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(`Gagal memproses CSS: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        convert(tool, (s, opts) => formatCss(s, opts), 'Diformat');
    },

    minify(tool) {
        convert(tool, (s) => minifyCss(s), 'Diperkecil');
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        convert(tool, (s, opts) => formatCss(s, opts), 'Diformat dari contoh');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        convert(tool, (s, opts) => formatCss(s, opts), 'Diformat setelah ditukar');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('style.css', 'text/css');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            convert(tool, (s, opts) => formatCss(s, opts), 'Diformat');
        }
    },
});
