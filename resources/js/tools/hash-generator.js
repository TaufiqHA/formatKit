import { ALGORITHMS, hashAll } from '../lib/hash.js';
import { byteSize } from '../lib/text.js';
import { createTool } from './_shared.js';

const SAMPLE = 'FormatKit';

function optionKey(algorithm) {
    return algorithm.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function selectedAlgorithms(tool) {
    const selected = ALGORITHMS.filter((algorithm) => tool.checked(optionKey(algorithm)));

    return selected.length > 0 ? selected : ALGORITHMS;
}

function formatResults(results) {
    const width = Math.max(...results.map((result) => result.algorithm.length));

    return results.map((result) => `${result.algorithm.padEnd(width)}  ${result.digest}`).join('\n');
}

async function fileBytes(tool) {
    const file = tool.root.querySelector('[data-file-input]')?.files?.[0];

    if (! file) {
        return null;
    }

    return { file, bytes: await file.arrayBuffer() };
}

createTool({
    ready(tool) {
        tool.setStatus('Pilih algoritma lalu klik Hitung');
    },

    async compute(tool) {
        const picked = await fileBytes(tool);
        const source = picked ? picked.bytes : tool.value();

        if (! picked && tool.value() === '') {
            tool.setOutput('');
            tool.clearError();
            tool.setStatus('Menunggu input');

            return;
        }

        const results = await hashAll(source, selectedAlgorithms(tool));

        tool.setOutput(formatResults(results));
        tool.clearError();
        tool.setStatus(picked ? `Dihitung dari berkas ${picked.file.name}` : 'Hash dihitung', 'ok');
    },

    async sample(tool) {
        tool.setInput(SAMPLE);

        const results = await hashAll(SAMPLE, selectedAlgorithms(tool));

        tool.setOutput(formatResults(results));
        tool.clearError();
        tool.setStatus(`Hash dihitung dari contoh (${byteSize(SAMPLE)} byte)`, 'ok');
    },

    clear(tool) {
        tool.clear();

        const fileField = tool.root.querySelector('[data-file-input]');

        if (fileField) {
            fileField.value = '';
        }
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('hash.txt');
    },

    onOptionChange(tool) {
        const hasFile = Boolean(tool.root.querySelector('[data-file-input]')?.files?.[0]);

        if (hasFile || tool.value() !== '') {
            tool.root.querySelector('[data-tool-actions] button[data-action="compute"]')?.click();
        }
    },
});
