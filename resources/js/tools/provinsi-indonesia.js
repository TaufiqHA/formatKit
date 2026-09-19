import { exportProvinces } from '../lib/data-indonesia.js';
import { createTool } from './_shared.js';

function renderProvinces(tool) {
    const format = tool.option('format', 'table');
    const filterInput = tool.root.querySelector('[data-option="search"]');
    const query = filterInput ? filterInput.value.trim() : '';

    try {
        const text = exportProvinces(format, query);
        tool.setOutput(text);
        tool.clearError();
        tool.setStatus(`Data provinsi (${format.toUpperCase()}) siap`, 'ok');
    } catch (e) {
        tool.fail(`Gagal memuat data: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        const searchInput = tool.root.querySelector('[data-option="search"]');
        if (searchInput) {
            searchInput.addEventListener('input', () => {
                renderProvinces(tool);
            });
        }

        const formatSelect = tool.root.querySelector('[data-option="format"]');
        if (formatSelect) {
            formatSelect.addEventListener('change', () => {
                renderProvinces(tool);
            });
        }

        renderProvinces(tool);
    },

    refresh(tool) {
        renderProvinces(tool);
    },

    download(tool) {
        const format = tool.option('format', 'table');
        const ext = format === 'json' ? 'json' : format === 'csv' ? 'csv' : format === 'select' ? 'html' : 'txt';
        const mime = format === 'json' ? 'application/json' : format === 'csv' ? 'text/csv' : format === 'select' ? 'text/html' : 'text/plain';
        tool.download(`provinsi-indonesia.${ext}`, mime);
    },
});
