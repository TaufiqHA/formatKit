/**
 * Unit test untuk tools Kategori D, E, dan F:
 * JSON-YAML, XML-JSON, Timestamp, XPath, Lorem Ipsum, Provinsi, Kode Pos, MIME Types.
 *
 * Dijalankan dengan:
 *   bun test tests/js/*.test.mjs
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { exportProvinces, PROVINSI_INDONESIA } from '../../resources/js/lib/data-indonesia.js';
import { DATA_KODE_BANK, searchKodeBank } from '../../resources/js/lib/data-kodebank.js';
import { DATA_KODEPOS, searchKodePos } from '../../resources/js/lib/data-kodepos.js';
import { MIME_TYPES, searchMimeTypes } from '../../resources/js/lib/data-mimetypes.js';
import { generateLorem } from '../../resources/js/lib/lorem.js';
import { convertTimestamp, parseTimestampInput } from '../../resources/js/lib/timestamp.js';
import { xsdToJsonSchema } from '../../resources/js/lib/xsd.js';
import { jsonToYaml, parseYaml, yamlToJson } from '../../resources/js/lib/yaml.js';

/* ==========================================================================
   1. JSON ⇄ YAML Tests
   ========================================================================== */

test('jsonToYaml mengonversi objek bersarang dan array ke YAML dengan benar', () => {
    const json = JSON.stringify({
        app: 'FormatKit',
        port: 8080,
        debug: true,
        tags: ['tool', 'utility'],
    });

    const yaml = jsonToYaml(json);
    assert.ok(yaml.includes('app: FormatKit'));
    assert.ok(yaml.includes('port: 8080'));
    assert.ok(yaml.includes('debug: true'));
    assert.ok(yaml.includes('- tool'));
    assert.ok(yaml.includes('- utility'));
});

test('yamlToJson dan parseYaml mengonversi YAML ke objek dan JSON string', () => {
    const yaml = `
server:
  host: 127.0.0.1
  port: 3000
ssl: false
`;
    const json = yamlToJson(yaml);
    const parsed = JSON.parse(json);
    assert.equal(parsed.server.host, '127.0.0.1');
    assert.equal(parsed.server.port, 3000);
    assert.equal(parsed.ssl, false);
});

/* ==========================================================================
   2. Timestamp Converter Tests
   ========================================================================== */

test('parseTimestampInput mengenali epoch detik dan milidetik', () => {
    const date1 = parseTimestampInput('1700000000'); // 10 digit -> detik
    assert.equal(date1.getTime(), 1700000000000);

    const date2 = parseTimestampInput('1700000000000'); // 13 digit -> milidetik
    assert.equal(date2.getTime(), 1700000000000);
});

test('convertTimestamp menghasilkan output ISO, UTC, dan waktu Indonesia', () => {
    const res = convertTimestamp('1700000000');
    assert.equal(res.epochSeconds, 1700000000);
    assert.ok(res.iso8601.startsWith('2023-11-14T22:13:20'));
    assert.ok(res.wib.includes('WIB'));
    assert.ok(res.wita.includes('WITA'));
    assert.ok(res.wit.includes('WIT'));
});

/* ==========================================================================
   3. Lorem Ipsum Generator Tests
   ========================================================================== */

test('generateLorem menghasilkan jumlah kata, kalimat, dan paragraf sesuai permintaan', () => {
    const words = generateLorem({ type: 'words', count: 10, startWithLorem: true });
    assert.ok(words.toLowerCase().startsWith('lorem ipsum dolor sit amet'));
    assert.equal(words.split(' ').length, 10);

    const sentences = generateLorem({ type: 'sentences', count: 3, startWithLorem: true });
    assert.ok(sentences.includes('.'));

    const paragraphs = generateLorem({ type: 'paragraphs', count: 2, startWithLorem: true });
    assert.ok(paragraphs.includes('\n\n'));
    assert.equal(paragraphs.split('\n\n').length, 2);
});

/* ==========================================================================
   4. Data Referensi Indonesia Tests
   ========================================================================== */

test('PROVINSI_INDONESIA memuat tepat 38 provinsi resmi', () => {
    assert.equal(PROVINSI_INDONESIA.length, 38);
    assert.ok(PROVINSI_INDONESIA.some((p) => p.nama === 'DKI Jakarta'));
    assert.ok(PROVINSI_INDONESIA.some((p) => p.nama === 'Papua Barat Daya'));
});

test('exportProvinces mendukung format JSON, CSV, Select, dan Table', () => {
    const jsonStr = exportProvinces('json');
    const parsed = JSON.parse(jsonStr);
    assert.equal(parsed.length, 38);

    const csvStr = exportProvinces('csv');
    assert.ok(csvStr.includes('kode,nama_provinsi,ibu_kota,pulau'));
    assert.ok(csvStr.includes('DKI Jakarta'));

    const selectStr = exportProvinces('select');
    assert.ok(selectStr.includes('<select name="provinsi"'));
    assert.ok(selectStr.includes('<option value="31">DKI Jakarta</option>'));
});

test('searchKodePos mencari data kelurahan/kecamatan/kota', () => {
    assert.ok(DATA_KODEPOS.length > 20);
    const res = searchKodePos('Bandung', 'table');
    assert.ok(res.includes('Bandung'));
});

/* ==========================================================================
   5. Data MIME Types Tests
   ========================================================================== */

test('searchMimeTypes mencari ekstensi dan mengembalikan konfigurasi nginx / table', () => {
    assert.ok(MIME_TYPES.length > 30);

    const resNginx = searchMimeTypes('json', 'nginx');
    assert.ok(resNginx.includes('application/json'));
    assert.ok(resNginx.includes('types {'));

    const resCsv = searchMimeTypes('png', 'csv');
    assert.ok(resCsv.includes('image/png'));
});

/* ==========================================================================
   6. Kode Bank Indonesia Tests
   ========================================================================== */

test('DATA_KODE_BANK memuat bank utama Indonesia (BCA, Mandiri, BRI, BNI, Jago)', () => {
    assert.ok(DATA_KODE_BANK.length >= 30);
    assert.ok(DATA_KODE_BANK.some((b) => b.kode === '014' && b.nama.includes('BCA')));
    assert.ok(DATA_KODE_BANK.some((b) => b.kode === '008' && b.nama.includes('Mandiri')));
    assert.ok(DATA_KODE_BANK.some((b) => b.kode === '002' && b.nama.includes('BRI')));
    assert.ok(DATA_KODE_BANK.some((b) => b.kode === '542' && b.nama.includes('Jago')));
});

test('searchKodeBank mendukung format table, JSON, dan CSV', () => {
    const tableRes = searchKodeBank('BCA', 'table');
    assert.ok(tableRes.includes('014'));
    assert.ok(tableRes.includes('Bank BCA'));

    const jsonRes = searchKodeBank('008', 'json');
    const parsed = JSON.parse(jsonRes);
    assert.equal(parsed[0].kode, '008');
    assert.equal(parsed[0].nama, 'Bank Mandiri');

    const csvRes = searchKodeBank('Syariah', 'csv');
    assert.ok(csvRes.includes('kode_bank,nama_bank,kategori'));
    assert.ok(csvRes.includes('Bank Syariah Indonesia'));
});

/* ==========================================================================
   7. XSD to JSON Schema Tests
   ========================================================================== */

test('xsdToJsonSchema mengonversi skema XSD ke JSON Schema Draft-07', () => {
    // Minimal mock for DOMParser in node/bun test environment
    globalThis.DOMParser = class {
        parseFromString() {
            return {
                querySelector: () => null,
                documentElement: {
                    localName: 'xs:schema',
                    children: [
                        {
                            localName: 'element',
                            getAttribute: (attr) => attr === 'name' ? 'Pengguna' : null,
                            children: [
                                {
                                    localName: 'complexType',
                                    children: [
                                        {
                                            localName: 'sequence',
                                            children: [
                                                {
                                                    localName: 'element',
                                                    getAttribute: (attr) => attr === 'name' ? 'id' : (attr === 'type' ? 'xs:integer' : null),
                                                    children: [],
                                                },
                                                {
                                                    localName: 'element',
                                                    getAttribute: (attr) => attr === 'name' ? 'nama' : (attr === 'type' ? 'xs:string' : null),
                                                    children: [],
                                                },
                                            ],
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            };
        }
    };

    const dummyXsd = '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Pengguna"/></xs:schema>';
    const schemaStr = xsdToJsonSchema(dummyXsd);
    const schema = JSON.parse(schemaStr);
    assert.equal(schema.$schema, 'http://json-schema.org/draft-07/schema#');
    assert.equal(schema.title, 'Pengguna');
    assert.equal(schema.type, 'object');
    assert.equal(schema.properties.id.type, 'integer');
    assert.equal(schema.properties.nama.type, 'string');
});
