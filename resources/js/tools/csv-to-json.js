import { csvToJson, jsonToCsv } from '../lib/csv.js';
import { createTool } from './_shared.js';

const SAMPLE_CSV = `id,nama,pekerjaan,kota,gaji,aktif
1,"Budi, S.Kom","Web Developer","Jakarta Selatan",15000000,true
2,"Siti Aminah","UI/UX Designer","Bandung",12500000,true
3,"Ahmad Dani","DevOps Engineer","Surabaya",18000000,false`;

const SAMPLE_JSON = `[
  {
    "id": 1,
    "nama": "Budi, S.Kom",
    "pekerjaan": "Web Developer",
    "kota": "Jakarta Selatan",
    "gaji": 15000000,
    "aktif": true
  },
  {
    "id": 2,
    "nama": "Siti Aminah",
    "pekerjaan": "UI/UX Designer",
    "kota": "Bandung",
    "gaji": 12500000,
    "aktif": true
  }
]`;

let lastMode = 'csv-to-json';

function runCsvToJson(tool) {
    lastMode = 'csv-to-json';
    const source = tool.value();
    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const delimiter = tool.option('delimiter', 'auto');
        const hasHeader = tool.checked('hasHeader');
        const parseValues = tool.checked('parseValues');

        const json = csvToJson(source, { delimiter, hasHeader, parseValues, indent: '2' });
        tool.setOutput(json);
        tool.clearError();
        tool.setStatus('Berhasil diubah ke JSON', 'ok');
    } catch (error) {
        tool.fail(`Gagal konversi CSV ke JSON: ${error.message}`);
    }
}

function runJsonToCsv(tool) {
    lastMode = 'json-to-csv';
    const source = tool.value();
    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const delimiter = tool.option('delimiter', ',');
        const effectiveDelimiter = delimiter === 'auto' ? ',' : delimiter;
        const csv = jsonToCsv(source, { delimiter: effectiveDelimiter });
        tool.setOutput(csv);
        tool.clearError();
        tool.setStatus('Berhasil diubah ke CSV', 'ok');
    } catch (error) {
        tool.fail(`Gagal konversi JSON ke CSV: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    'csv-to-json'(tool) {
        runCsvToJson(tool);
    },

    'json-to-csv'(tool) {
        runJsonToCsv(tool);
    },

    'sample-csv'(tool) {
        tool.setInput(SAMPLE_CSV);
        runCsvToJson(tool);
    },

    'sample-json'(tool) {
        tool.setInput(SAMPLE_JSON);
        runJsonToCsv(tool);
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        tool.swap();
        if (lastMode === 'csv-to-json') {
            runJsonToCsv(tool);
        } else {
            runCsvToJson(tool);
        }
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        if (lastMode === 'csv-to-json') {
            tool.download('data.json', 'application/json');
        } else {
            tool.download('data.csv', 'text/csv');
        }
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            if (lastMode === 'csv-to-json') {
                runCsvToJson(tool);
            } else {
                runJsonToCsv(tool);
            }
        }
    },
});
