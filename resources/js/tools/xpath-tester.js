import { evaluateXPath } from '../lib/xpath.js';
import { createTool } from './_shared.js';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<perpustakaan>
    <buku kategori="web">
        <judul lang="id">Pemrograman Laravel Modern</judul>
        <penulis>Taufiq H.</penulis>
        <tahun>2026</tahun>
        <harga>150000</harga>
    </buku>
    <buku kategori="keamanan">
        <judul lang="id">Kriptografi dan Privasi Data</judul>
        <penulis>Abdullah</penulis>
        <tahun>2025</tahun>
        <harga>120000</harga>
    </buku>
</perpustakaan>`;

const SAMPLE_XPATH = '//buku[@kategori="web"]/judul';

function runXPath(tool) {
    const xml = tool.value();
    const queryInput = tool.root.querySelector('[data-option="xpath"]');
    const query = queryInput ? queryInput.value.trim() : '';

    if (! xml.trim()) {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input XML');
        return;
    }

    if (! query) {
        tool.fail('Harap isi ekspresi query XPath pada kolom opsi.');
        return;
    }

    try {
        const res = evaluateXPath(xml, query);
        const lines = [
            `/* Query: ${res.query} */`,
            `/* Total Cocok: ${res.totalMatches} node */`,
            '',
        ];

        if (res.totalMatches === 0) {
            lines.push('Tidak ditemukan node yang cocok dengan ekspresi XPath di atas.');
        } else {
            res.matches.forEach((m) => {
                lines.push(`[Node #${m.index}] (${m.name})`);
                lines.push(m.content);
                lines.push('----------------------------------------');
            });
        }

        tool.setOutput(lines.join('\n'));
        tool.clearError();
        tool.setStatus(`Ditemukan ${res.totalMatches} node cocok`, 'ok');
    } catch (e) {
        tool.fail(e.message);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    evaluate(tool) {
        runXPath(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_XML);
        const queryInput = tool.root.querySelector('[data-option="xpath"]');
        if (queryInput) {
            queryInput.value = SAMPLE_XPATH;
        }
        runXPath(tool);
    },

    download(tool) {
        tool.download('xpath-results.txt', 'text/plain');
    },
});
