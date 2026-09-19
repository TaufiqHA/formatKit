import { escapeString, unescapeString } from '../lib/escape.js';
import { createTool } from './_shared.js';

const SAMPLES = {
    json: 'Halo! Selamat datang di "FormatKit".\nBaris baru & tab:\t\\selesai.',
    sql: "O'Reilly & Associates -- select * from users where name = 'admin';",
    html: '<div class="alert alert-danger">Peringatan: 5 > 3 & 2 < 4!</div>',
    java: 'Baris pertama "kutip" dan baris kedua\ndengan tanda \\backslash\\',
    regex: 'https://example.com/user?id=100&name=foo[bar].*',
};

function processEscape(tool, action) {
    const text = tool.value();
    const mode = tool.option('mode', 'json');

    if (text === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input teks');
        return;
    }

    try {
        const result = action === 'escape' ? escapeString(text, mode) : unescapeString(text, mode);
        tool.setOutput(result);
        tool.clearError();
        tool.setStatus(action === 'escape' ? `Teks di-escape (${mode.toUpperCase()})` : `Teks di-unescape (${mode.toUpperCase()})`, 'ok');
    } catch (error) {
        tool.fail(`Gagal memproses escape: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    escape(tool) {
        processEscape(tool, 'escape');
    },

    unescape(tool) {
        processEscape(tool, 'unescape');
    },

    sample(tool) {
        const mode = tool.option('mode', 'json');
        tool.setInput(SAMPLES[mode] || SAMPLES.json);
        processEscape(tool, 'escape');
    },

    download(tool) {
        tool.download('escaped.txt', 'text/plain');
    },
});
