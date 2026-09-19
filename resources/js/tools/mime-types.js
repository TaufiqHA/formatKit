import { searchMimeTypes } from '../lib/data-mimetypes.js';
import { createTool } from './_shared.js';

function renderMimes(tool) {
    const format = tool.option('format', 'table');
    const query = tool.value().trim();

    try {
        const text = searchMimeTypes(query, format);
        tool.setOutput(text);
        tool.clearError();
        tool.setStatus('Tabel MIME Type siap', 'ok');
    } catch (e) {
        tool.fail(`Gagal memuat MIME: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        const formatSelect = tool.root.querySelector('[data-option="format"]');
        if (formatSelect) {
            formatSelect.addEventListener('change', () => {
                renderMimes(tool);
            });
        }

        renderMimes(tool);
    },

    search(tool) {
        renderMimes(tool);
    },

    sample(tool) {
        tool.setInput('video');
        renderMimes(tool);
    },

    download(tool) {
        const format = tool.option('format', 'table');
        const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : format === 'nginx' ? 'conf' : 'txt';
        const mime = format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : 'text/plain';
        tool.download(`mime-types.${ext}`, mime);
    },
});
