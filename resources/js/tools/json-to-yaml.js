import { jsonToYaml, yamlToJson } from '../lib/yaml.js';
import { createTool } from './_shared.js';

const SAMPLE_JSON = JSON.stringify({
    server: {
        nama: 'FormatKit Production',
        port: 8080,
        ssl: true,
        lingkungan: 'production',
    },
    database: {
        driver: 'mysql',
        host: '127.0.0.1',
        database: 'formatkit_db',
    },
    fitur_aktif: ['kompresi', 'rate_limiting', 'cache'],
}, null, 2);

function processConvert(tool, direction) {
    const input = tool.value().trim();

    if (input === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');
        return;
    }

    try {
        if (direction === 'json2yaml') {
            const yaml = jsonToYaml(input);
            tool.setOutput(yaml);
            tool.clearError();
            tool.setStatus('JSON berhasil diubah ke YAML', 'ok');
        } else {
            const json = yamlToJson(input, 2);
            tool.setOutput(json);
            tool.clearError();
            tool.setStatus('YAML berhasil diubah ke JSON', 'ok');
        }
    } catch (e) {
        tool.fail(`Gagal mengonversi: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    toYaml(tool) {
        processConvert(tool, 'json2yaml');
    },

    toJson(tool) {
        processConvert(tool, 'yaml2json');
    },

    sample(tool) {
        tool.setInput(SAMPLE_JSON);
        processConvert(tool, 'json2yaml');
    },

    download(tool) {
        const isYaml = tool.output?.value?.trim()?.startsWith('server:');
        tool.download(isYaml ? 'converted.yaml' : 'converted.json', isYaml ? 'text/yaml' : 'application/json');
    },
});
