import { formatUuid, uuidV4, uuidV7 } from '../lib/uuid.js';
import { createTool } from './_shared.js';

function options(tool) {
    return {
        uppercase: tool.checked('uppercase'),
        hyphens: ! tool.checked('noHyphens'),
        braces: tool.checked('braces'),
    };
}

function generate(tool) {
    const version = tool.option('version', 'v4');
    const count = Math.min(Math.max(Number.parseInt(tool.option('count', '5'), 10) || 1, 1), 1000);
    const settings = options(tool);

    const values = Array.from({ length: count }, () => formatUuid(version === 'v7' ? uuidV7() : uuidV4(), settings));

    tool.setOutput(values.join('\n'));
    tool.clearError();
    tool.setStatus(`${count} UUID ${version} dibuat`, 'ok');
}

createTool({
    ready(tool) {
        generate(tool);
    },

    generate(tool) {
        generate(tool);
    },

    clear(tool) {
        tool.clear();
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('uuid.txt');
    },

    onOptionChange(tool) {
        generate(tool);
    },
});
