import { generateLorem } from '../lib/lorem.js';
import { createTool } from './_shared.js';

function makeLorem(tool) {
    const type = tool.option('type', 'paragraphs');
    const count = Number(tool.option('count', '3')) || 3;
    const startWithLorem = tool.checked('startWithLorem');

    try {
        const text = generateLorem({ type, count, startWithLorem });
        tool.setOutput(text);
        tool.clearError();
        tool.setStatus(`Teks ${count} ${type} berhasil dibuat`, 'ok');
    } catch (e) {
        tool.fail(`Gagal membuat teks: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
        makeLorem(tool);
    },

    generate(tool) {
        makeLorem(tool);
    },

    download(tool) {
        tool.download('lorem-ipsum.txt', 'text/plain');
    },
});
