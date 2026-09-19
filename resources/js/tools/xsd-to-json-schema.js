import { xsdToJsonSchema } from '../lib/xsd.js';
import { createTool } from './_shared.js';

const SAMPLE_XSD = `<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
    <xs:element name="Produk">
        <xs:complexType>
            <xs:sequence>
                <xs:element name="id" type="xs:integer" minOccurs="1"/>
                <xs:element name="nama" type="xs:string" minOccurs="1"/>
                <xs:element name="harga" type="xs:decimal" minOccurs="1"/>
                <xs:element name="tersedia" type="xs:boolean"/>
                <xs:element name="kategori" type="xs:string" minOccurs="0" maxOccurs="unbounded"/>
            </xs:sequence>
            <xs:attribute name="sku" type="xs:string" use="required"/>
        </xs:complexType>
    </xs:element>
</xs:schema>`;

function convertXsd(tool) {
    const input = tool.value().trim();

    if (input === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input XSD');
        return;
    }

    try {
        const indent = tool.option('indent', '2');
        const jsonSchema = xsdToJsonSchema(input, indent);
        tool.setOutput(jsonSchema);
        tool.clearError();
        tool.setStatus('Skema XSD berhasil diubah ke JSON Schema', 'ok');
    } catch (e) {
        tool.fail(`Konversi XSD gagal: ${e.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    convert(tool) {
        convertXsd(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_XSD);
        convertXsd(tool);
    },

    download(tool) {
        tool.download('schema.json', 'application/json');
    },
});
