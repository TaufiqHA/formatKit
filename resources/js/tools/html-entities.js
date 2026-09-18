import { decodeEntities, encodeEntities, knownEntityNames } from '../lib/entities.js';
import { createTool } from './_shared.js';

const SAMPLE = '<a href="/cari?q=kopi & teh">Harga "kopi" < 10rb</a>';

function run(tool, mode) {
    const source = tool.value();

    if (source === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    if (mode === 'decode') {
        tool.setOutput(decodeEntities(source));
        tool.clearError();
        tool.setStatus('Entitas di-decode', 'ok');

        return;
    }

    tool.setOutput(
        encodeEntities(source, {
            mode: tool.option('entityStyle', 'named'),
            asciiOnly: tool.checked('asciiOnly'),
        }),
    );
    tool.clearError();
    tool.setStatus('Karakter di-encode', 'ok');
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

    table(tool) {
        tool.setOutput(knownEntityNames().map((name) => `&${name};`).join(' '));
        tool.clearError();
        tool.setStatus(`${knownEntityNames().length} entitas didukung`, 'ok');
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
        tool.download('html-entities.txt');
    },

    onOptionChange(tool) {
        if (tool.value() !== '') {
            run(tool, 'encode');
        }
    },
});
