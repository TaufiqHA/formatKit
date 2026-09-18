import { describeXmlError, formatXml, minifyXml, parseXml } from '../lib/xml.js';
import { createTool } from './_shared.js';

const SAMPLE = `<?xml version="1.0" encoding="UTF-8"?>
<invoice nomor="INV-2026-0042">
  <pelanggan>
    <nama>Toko Sumber Rejeki</nama>
    <kota>Yogyakarta</kota>
  </pelanggan>
  <item qty="3" satuan="pcs">
    <nama>Kabel HDMI 2m</nama>
    <harga>75000</harga>
  </item>
  <!-- catatan internal -->
  <catatan><![CDATA[Kirim sebelum pukul 15:00 & hubungi gudang]]></catatan>
</invoice>`;

function convert(tool, transform, label, options = {}) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        tool.setOutput(transform(source, { indent: tool.option('indent', '2'), ...options }));
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(error instanceof Error ? error.message : String(error));
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        convert(tool, formatXml, 'Diformat');
    },

    minify(tool) {
        convert(tool, minifyXml, 'Diperkecil');
    },

    validate(tool) {
        const source = tool.value();

        try {
            parseXml(source);
            tool.clearError();
            tool.setStatus('XML valid', 'ok');
        } catch (error) {
            const detail = describeXmlError(error instanceof Error ? error.message : String(error));

            tool.fail(detail.message);
        }
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        convert(tool, formatXml, 'Diformat dari contoh');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        convert(tool, formatXml, 'Diformat setelah ditukar');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('formatted.xml', 'application/xml');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            convert(tool, formatXml, 'Diformat');
        }
    },
});
