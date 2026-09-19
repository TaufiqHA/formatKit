import { searchKodeBank } from '../lib/data-kodebank.js';
import { createTool } from './_shared.js';

function renderKodeBank(tool) {
    const format = tool.option('format', 'table');
    const query = tool.value().trim();

    try {
        const text = searchKodeBank(query, format);
        tool.setOutput(text);
        tool.clearError();
        tool.setStatus('Data kode bank siap', 'ok');
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
                renderKodeBank(tool);
            });
        }

        renderKodeBank(tool);
    },

    search(tool) {
        renderKodeBank(tool);
    },

    sample(tool) {
        tool.setInput('BCA');
        renderKodeBank(tool);
    },

    download(tool) {
        const format = tool.option('format', 'table');
        const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : 'txt';
        const mime = format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : 'text/plain';
        tool.download(`kode-bank-indonesia.${ext}`, mime);
    },
});
