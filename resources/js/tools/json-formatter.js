import { describeJsonError, formatJson, minifyJson, sortJsonKeys } from '../lib/json.js';
import { createTool } from './_shared.js';

const SAMPLE = JSON.stringify(
    {
        project: 'FormatKit',
        fase: 2,
        privat: true,
        tools: [
            { slug: 'json-formatter', status: 'ready' },
            { slug: 'base64', status: 'ready' },
        ],
        meta: { build: 2, penulis: ['Taufiq'] },
    },
    null,
    2,
);

function convert(tool, transform, label) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        tool.setOutput(transform(source, tool.option('indent', '2')));
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        const detail = describeJsonError(error, source);
        const where = detail.line ? ` (baris ${detail.line}, kolom ${detail.column})` : '';

        tool.fail(`JSON tidak valid${where}: ${detail.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        convert(tool, formatJson, 'Diformat');
    },

    minify(tool) {
        convert(tool, minifyJson, 'Diperkecil');
    },

    validate(tool) {
        convert(tool, formatJson, 'JSON valid');
    },

    sort(tool) {
        const source = tool.value();

        try {
            tool.setOutput(sortJsonKeys(source));
            tool.clearError();
            tool.setStatus('Kunci diurutkan', 'ok');
        } catch (error) {
            tool.fail(`JSON tidak valid: ${describeJsonError(error, source).message}`);
        }
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        convert(tool, formatJson, 'Diformat dari contoh');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        convert(tool, formatJson, 'Diformat setelah ditukar');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('formatted.json', 'application/json');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            convert(tool, formatJson, 'Diformat');
        }
    },
});
