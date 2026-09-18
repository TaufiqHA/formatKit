import { decodeUrl, encodeUrl, parseQueryString } from '../lib/url.js';
import { createTool } from './_shared.js';

const SAMPLE = 'https://contoh.id/cari?q=format json&kategori=alat tulis&aman=true';

function run(tool, mode) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    const urlMode = tool.option('mode', 'component');

    try {
        tool.setOutput(mode === 'decode' ? decodeUrl(source, urlMode) : encodeUrl(source, urlMode));
        tool.clearError();
        tool.setStatus(mode === 'decode' ? 'Berhasil di-decode' : 'Berhasil di-encode', 'ok');
    } catch (error) {
        tool.fail(error instanceof Error ? error.message : String(error));
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    encode(tool) {
        run(tool, 'encode');
    },

    decode(tool) {
        run(tool, 'decode');
    },

    query(tool) {
        const rows = parseQueryString(tool.value());

        tool.setOutput(rows.length === 0 ? '' : rows.map(([key, value]) => `${key} = ${value}`).join('\n'));
        tool.clearError();
        tool.setStatus(`${rows.length} parameter dibaca`, 'ok');
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        run(tool, 'encode');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        tool.swap();
        run(tool, 'decode');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('url-encoded.txt');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            run(tool, 'encode');
        }
    },
});
