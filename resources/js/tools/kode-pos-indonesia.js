import { searchKodePos } from '../lib/data-kodepos.js';
import { createTool } from './_shared.js';

function renderKodePos(tool) {
    const format = tool.option('format', 'table');
    const query = tool.value().trim();

    try {
        const text = searchKodePos(query, format);
        tool.setOutput(text);
        tool.clearError();
        tool.setStatus('Data kode pos siap', 'ok');
    } catch (e) {
        tool.fail(`Gagal mencari data: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        const formatSelect = tool.root.querySelector('[data-option="format"]');
        if (formatSelect) {
            formatSelect.addEventListener('change', () => {
                renderKodePos(tool);
            });
        }

        renderKodePos(tool);
    },

    search(tool) {
        renderKodePos(tool);
    },

    sample(tool) {
        tool.setInput('Bandung');
        renderKodePos(tool);
    },

    download(tool) {
        const format = tool.option('format', 'table');
        const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'txt';
        const mime = format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : 'text/plain';
        tool.download(`kode-pos-indonesia.${ext}`, mime);
    },
});
