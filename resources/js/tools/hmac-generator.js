import { computeHmac } from '../lib/hmac.js';
import { createTool } from './_shared.js';

const SAMPLE_MESSAGE = 'GET /api/v1/orders?timestamp=1758320000&customer_id=9872';
const SAMPLE_SECRET = 'super-secret-hmac-key-2026';

async function generateHmac(tool) {
    const message = tool.value();
    const secret = tool.option('secret', '');
    const algorithm = tool.option('algorithm', 'SHA-256');
    const format = tool.option('format', 'hex');

    if (message.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu pesan input');
        return;
    }

    if (secret === '') {
        tool.fail('Harap isi Kunci Rahasia (Secret Key) di panel opsi.');
        return;
    }

    try {
        const signature = await computeHmac(message, secret, algorithm, format);
        tool.setOutput(signature);
        tool.clearError();
        tool.setStatus(`HMAC-${algorithm} berhasil dihitung (${format.toUpperCase()})`, 'ok');
    } catch (error) {
        tool.fail(`Perhitungan HMAC gagal: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    generate(tool) {
        generateHmac(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_MESSAGE);
        const secretInput = tool.root.querySelector('[data-option="secret"]');
        if (secretInput) {
            secretInput.value = SAMPLE_SECRET;
        }
        generateHmac(tool);
    },

    download(tool) {
        tool.download('hmac-signature.txt', 'text/plain');
    },
});
