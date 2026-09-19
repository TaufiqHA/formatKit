import { xmlToJson } from '../lib/xml-json.js';
import { createTool } from './_shared.js';

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<toko nama="Buku FormatKit" lokasi="Jakarta">
    <katalog>
        <buku id="b1" format="hardcover">
            <judul>Arsitektur Web Modern</judul>
            <penulis>Taufiq Hidayah</penulis>
            <harga mata_uang="IDR">125000</harga>
        </buku>
        <buku id="b2" format="paperback">
            <judul>Panduan Kriptografi Browser</judul>
            <penulis>Budi Santoso</penulis>
            <harga mata_uang="IDR">98000</harga>
        </buku>
    </katalog>
</toko>`;

function convertXml(tool) {
    const input = tool.value().trim();

    if (input === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input XML');
        return;
    }

    try {
        const indent = tool.option('indent', '2');
        const json = xmlToJson(input, indent);
        tool.setOutput(json);
        tool.clearError();
        tool.setStatus('XML berhasil diubah ke JSON', 'ok');
    } catch (e) {
        tool.fail(`Konversi gagal: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    convert(tool) {
        convertXml(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_XML);
        convertXml(tool);
    },

    download(tool) {
        tool.download('converted.json', 'application/json');
    },
});
