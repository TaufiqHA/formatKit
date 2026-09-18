import { decodeBase64, encodeBase64, looksLikeBase64 } from '../lib/base64.js';
import { createTool } from './_shared.js';

const SAMPLE_TEXT = 'FormatKit — semua proses terjadi di browser Anda.';

function run(tool, mode = 'auto') {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    const options = {
        urlSafe: tool.checked('urlSafe'),
        allowBinary: tool.checked('allowBinary'),
    };

    const resolved = mode === 'auto' ? (looksLikeBase64(source) ? 'decode' : 'encode') : mode;

    try {
        if (resolved === 'decode') {
            tool.setOutput(decodeBase64(source, options));
            tool.setStatus('Berhasil di-decode', 'ok');
        } else {
            tool.setOutput(encodeBase64(source, options));
            tool.setStatus('Berhasil di-encode', 'ok');
        }

        tool.clearError();
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

    /** Pilih mode otomatis: kalau isinya tampak Base64, langsung decode. */
    auto(tool) {
        run(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_TEXT);
        run(tool, 'encode');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        tool.swap();
        run(tool);
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('base64.txt');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            run(tool);
        }
    },
});
