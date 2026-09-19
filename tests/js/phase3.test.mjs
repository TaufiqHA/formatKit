/**
 * Uji logika murni (tanpa DOM) untuk tool Fase 3:
 * SQL, CSS, JS, CSV, Word Counter, dan Regex Tester.
 *
 * Dijalankan dengan:
 *   npm run test:js
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { formatCss, minifyCss } from '../../resources/js/lib/css.js';
import { csvToJson, detectDelimiter, jsonToCsv, parseCsvToRows } from '../../resources/js/lib/csv.js';
import { formatJs, minifyJs, validateJs } from '../../resources/js/lib/javascript.js';
import { COMMON_PATTERNS, replaceRegex, testRegex } from '../../resources/js/lib/regex.js';
import { formatSql, minifySql, tokenizeSql } from '../../resources/js/lib/sql.js';
import {
    analyzeText,
    cleanSpaces,
    toCamelCase,
    toKebabCase,
    toSentenceCase,
    toSnakeCase,
    toTitleCase,
    toUpper,
} from '../../resources/js/lib/text-counter.js';

/* ==========================================================================
   1. SQL Formatter & Minifier Tests
   ========================================================================== */

test('SQL tokenizer memisahkan kata kunci, string, komentar, dan operator', () => {
    const tokens = tokenizeSql("SELECT id, 'user name' FROM users WHERE id = 10; -- komentar");
    assert.ok(tokens.length > 5);
    assert.equal(tokens[0].value, 'SELECT');
    assert.equal(tokens[1].value, 'id');
    assert.equal(tokens[3].value, "'user name'");
    assert.ok(tokens.some((t) => t.type === 'comment'));
});

test('SQL formatter merapikan klausa SELECT, FROM, WHERE, JOIN dengan indentasi', () => {
    const raw = 'select u.id, u.name, p.title from users u inner join posts p on u.id = p.user_id where u.active = 1 order by u.created_at desc';
    const formatted = formatSql(raw, { indent: '2', casing: 'upper' });

    assert.ok(formatted.includes('SELECT'));
    assert.ok(formatted.includes('FROM users u'));
    assert.ok(formatted.includes('INNER JOIN posts p'));
    assert.ok(formatted.includes('ON u.id = p.user_id'));
    assert.ok(formatted.includes('WHERE u.active = 1'));
    assert.ok(formatted.includes('ORDER BY u.created_at DESC'));
});

test('SQL formatter mendukung opsi kapitalisasi kata kunci (upper, lower, preserve)', () => {
    const raw = 'select id from users where active = 1';
    const upper = formatSql(raw, { casing: 'upper' });
    const lower = formatSql(raw, { casing: 'lower' });

    assert.ok(upper.includes('SELECT') && upper.includes('WHERE'));
    assert.ok(lower.includes('select') && lower.includes('where'));
});

test('SQL minifier memadatkan query menjadi satu baris dan membuang komentar', () => {
    const raw = `
        -- Ambil data pengguna
        SELECT id, name
        FROM users
        WHERE active = 1;
    `;
    const minified = minifySql(raw);
    assert.equal(minified, 'SELECT id,name FROM users WHERE active = 1;');
});

/* ==========================================================================
   2. CSS Formatter & Minifier Tests
   ========================================================================== */

test('CSS formatter merapikan selector, properti, dan kurung kurawal', () => {
    const raw = 'body{color:#333;background:#fff;margin:0}';
    const formatted = formatCss(raw, { indent: '2' });

    assert.ok(formatted.includes('body {'));
    assert.ok(formatted.includes('  color: #333;'));
    assert.ok(formatted.includes('  background: #fff;'));
    assert.ok(formatted.includes('}'));
});

test('CSS minifier menghapus komentar dan memadatkan spasi', () => {
    const raw = `
        /* Gaya utama */
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
    `;
    const minified = minifyCss(raw);
    assert.equal(minified, '.container{max-width:1200px;margin:0 auto}');
});

/* ==========================================================================
   3. JavaScript Formatter, Minifier & Validator Tests
   ========================================================================== */

test('JavaScript formatter merapikan blok fungsi dan percabangan', () => {
    const raw = 'function halo(nama){if(!nama){return "anonim";}return "halo "+nama;}';
    const formatted = formatJs(raw, { indent: '2' });

    assert.ok(formatted.includes('function halo(nama) {'));
    assert.ok(formatted.includes('return "halo " + nama;'));
    assert.ok(formatted.includes('}'));
});

test('JavaScript minifier membuang komentar dan merapatkan whitespace', () => {
    const raw = `
        // Ambil data
        const a = 10;
        /* blok komentar */
        const b = 20;
    `;
    const minified = minifyJs(raw);
    assert.ok(minified.includes('const a=10;') || minified.includes('const a = 10;'));
    assert.ok(minified.includes('const b=20;') || minified.includes('const b = 20;'));
    assert.ok(!minified.includes('Ambil data'));
    assert.ok(!minified.includes('blok komentar'));
});

test('JavaScript validator mendeteksi sintaks valid dan sintaks error', () => {
    const valid = validateJs('const x = [1, 2, 3];');
    assert.equal(valid.valid, true);

    const invalid = validateJs('const x = {;');
    assert.equal(invalid.valid, false);
    assert.ok(invalid.message);
});

/* ==========================================================================
   4. CSV ⇄ JSON Converter Tests
   ========================================================================== */

test('CSV parser mengenali pemisah otomatis dan tanda kutip RFC 4180', () => {
    const csv = 'nama,pekerjaan,kota\n"Budi, S.Kom","Web Developer","Jakarta Pusat"\n"Ani","Desainer UI","Bandung"';
    const rows = parseCsvToRows(csv, ',');

    assert.equal(rows.length, 3);
    assert.equal(rows[1][0], 'Budi, S.Kom');
    assert.equal(rows[1][1], 'Web Developer');
    assert.equal(rows[2][2], 'Bandung');
});

test('csvToJson mengonversi CSV ke JSON dengan header dan casting angka', () => {
    const csv = 'id;nama;aktif;skor\n1;Taufiq;true;98.5\n2;Budi;false;75';
    const jsonStr = csvToJson(csv, { delimiter: ';', hasHeader: true, parseValues: true });
    const parsed = JSON.parse(jsonStr);

    assert.equal(parsed.length, 2);
    assert.equal(parsed[0].id, 1);
    assert.equal(parsed[0].nama, 'Taufiq');
    assert.equal(parsed[0].aktif, true);
    assert.equal(parsed[0].skor, 98.5);
});

test('jsonToCsv mengonversi array of objects menjadi CSV dengan escaping kutip', () => {
    const data = [
        { nama: 'Taufiq, H', role: 'Dev' },
        { nama: 'Budi "Pro"', role: 'Admin' },
    ];
    const csv = jsonToCsv(JSON.stringify(data));

    assert.ok(csv.includes('nama,role'));
    assert.ok(csv.includes('"Taufiq, H",Dev'));
    assert.ok(csv.includes('"Budi ""Pro""",Admin'));
});

/* ==========================================================================
   5. Word Counter & Case Converter Tests
   ========================================================================== */

test('Word counter menghitung kata, karakter, baris, paragraf, dan estimasi waktu', () => {
    const text = 'FormatKit adalah alat bantu pengembang web.\n\nSangat cepat dan gratis!';
    const stats = analyzeText(text);

    assert.equal(stats.words, 10);
    assert.equal(stats.paragraphs, 2);
    assert.equal(stats.lines, 3);
    assert.ok(stats.charsWithSpaces > 0);
    assert.ok(stats.charsNoSpaces > 0);
    assert.ok(stats.charsWithSpaces > stats.charsNoSpaces);
    assert.equal(stats.readingMinutes, 1);
});

test('Case converter mentransformasikan berbagai gaya penulisan teks', () => {
    const text = 'halo dunia digital';

    assert.equal(toUpper(text), 'HALO DUNIA DIGITAL');
    assert.equal(toTitleCase(text), 'Halo Dunia Digital');
    assert.equal(toSentenceCase(text), 'Halo dunia digital');
    assert.equal(toCamelCase(text), 'haloDuniaDigital');
    assert.equal(toKebabCase(text), 'halo-dunia-digital');
    assert.equal(toSnakeCase(text), 'halo_dunia_digital');
    assert.equal(cleanSpaces('  halo    dunia  '), 'halo dunia');
});

/* ==========================================================================
   6. Regex Tester Tests
   ========================================================================== */

test('Regex tester mendeteksi semua kecocokan dan posisi indeks', () => {
    const pattern = '\\b[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}\\b';
    const text = 'Hubungi kami di halo@formatkit.com atau support@example.co.id untuk info.';
    const result = testRegex(pattern, 'gi', text);

    assert.equal(result.valid, true);
    assert.equal(result.count, 2);
    assert.equal(result.matches[0].match, 'halo@formatkit.com');
    assert.equal(result.matches[1].match, 'support@example.co.id');
    assert.ok(result.highlightHtml.includes('<mark'));
});

test('Regex tester menangani pola error tanpa crash', () => {
    const result = testRegex('[a-z(', 'g', 'teks contoh');

    assert.equal(result.valid, false);
    assert.ok(result.error);
});

test('Regex tester mendukung penggantian teks (replace)', () => {
    const replaced = replaceRegex('\\d+', 'g', 'Pesanan 100 dan 200', 'XXX');
    assert.equal(replaced, 'Pesanan XXX dan XXX');
});

test('COMMON_PATTERNS memuat pola umum yang sah', () => {
    assert.ok(COMMON_PATTERNS.email);
    assert.ok(COMMON_PATTERNS.phone_id);
    assert.ok(COMMON_PATTERNS.uuid);

    const testEmail = testRegex(COMMON_PATTERNS.email.pattern, 'g', 'test@domain.com');
    assert.equal(testEmail.count, 1);
});
