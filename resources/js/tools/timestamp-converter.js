import { convertTimestamp } from '../lib/timestamp.js';
import { createTool } from './_shared.js';

function processTimestamp(tool) {
    const raw = tool.value().trim();

    if (raw === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input timestamp');
        return;
    }

    try {
        const res = convertTimestamp(raw);
        const lines = [
            '/* ===============================',
            ' * HASIL KONVERSI UNIX TIMESTAMP',
            ' * =============================== */',
            `Epoch Detik (Seconds)      : ${res.epochSeconds}`,
            `Epoch Milidetik (Millis)    : ${res.epochMilliseconds}`,
            `Relatif                    : ${res.relative}`,
            '',
            '/* ===============================',
            ' * FORMAT WAKTU STANDAR DUNIA',
            ' * =============================== */',
            `ISO 8601 (UTC)             : ${res.iso8601}`,
            `GMT / UTC String           : ${res.utc}`,
            '',
            '/* ===============================',
            ' * FORMAT WAKTU LOKAL INDONESIA',
            ' * =============================== */',
            `WIB  (Jakarta/Sumatera)    : ${res.wib}`,
            `WITA (Bali/Makassar)       : ${res.wita}`,
            `WIT  (Jayapura/Maluku)     : ${res.wit}`,
        ];

        tool.setOutput(lines.join('\n'));
        tool.clearError();
        tool.setStatus('Konversi waktu berhasil', 'ok');
    } catch (e) {
        tool.fail(`Konversi gagal: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        // Tombol Sekarang
        const nowBtn = tool.root.querySelector('[data-action="now"]');
        if (nowBtn) {
            nowBtn.addEventListener('click', () => {
                const nowSec = Math.floor(Date.now() / 1000);
                tool.setInput(String(nowSec));
                processTimestamp(tool);
            });
        }

        if (tool.value().trim()) {
            processTimestamp(tool);
        }
    },

    convert(tool) {
        processTimestamp(tool);
    },

    sample(tool) {
        tool.setInput('1758320000');
        processTimestamp(tool);
    },

    download(tool) {
        tool.download('timestamp-converted.txt', 'text/plain');
    },
});
