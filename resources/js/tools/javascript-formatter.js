import { formatJs, minifyJs, validateJs } from '../lib/javascript.js';
import { createTool } from './_shared.js';

const SAMPLE = `// Contoh Fungsi Utilitas FormatKit
async function hitungStatistik(teks) {
    if (!teks || typeof teks !== 'string') {
        return { kata: 0, karakter: 0 };
    }
    const kata = teks.trim().split(/\\s+/).filter(Boolean).length;
    const karakter = teks.length;
    return { kata, karakter, status: 'selesai' };
}

class PemrosesData {
    constructor(nama) {
        this.nama = nama;
    }
    jalankan(daftar) {
        return daftar.map((item, index) => ({ id: index + 1, nilai: item * 2 }));
    }
}`;

function convert(tool, transform, label) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const indent = tool.option('indent', '2');
        tool.setOutput(transform(source, { indent }));
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(`Gagal memproses JavaScript: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        convert(tool, (s, opts) => formatJs(s, opts), 'Diformat');
    },

    minify(tool) {
        convert(tool, (s) => minifyJs(s), 'Diperkecil');
    },

    validate(tool) {
        const source = tool.value();
        if (source.trim() === '') {
            tool.clearError();
            tool.setStatus('Menunggu input');

            return;
        }

        const res = validateJs(source);
        if (res.valid) {
            tool.clearError();
            tool.setStatus('Sintaks JS valid', 'ok');
        } else {
            tool.fail(`Sintaks JS tidak valid: ${res.message}`);
        }
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        convert(tool, (s, opts) => formatJs(s, opts), 'Diformat dari contoh');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        convert(tool, (s, opts) => formatJs(s, opts), 'Diformat setelah ditukar');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('script.js', 'application/javascript');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            convert(tool, (s, opts) => formatJs(s, opts), 'Diformat');
        }
    },
});
