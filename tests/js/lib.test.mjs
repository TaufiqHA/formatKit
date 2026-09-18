/**
 * Uji logika murni (tanpa DOM) untuk tool Fase 2.
 *
 * Dijalankan dengan test runner bawaan Node — tanpa dependency tambahan:
 *   npm run test:js
 */

import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';

import { decodeBase64, encodeBase64, looksLikeBase64 } from '../../resources/js/lib/base64.js';
import { decodeEntities, encodeEntities } from '../../resources/js/lib/entities.js';
import { hash, md5 } from '../../resources/js/lib/hash.js';
import { byteSize, stats } from '../../resources/js/lib/text.js';
import { decodeUrl, encodeUrl, parseQueryString } from '../../resources/js/lib/url.js';
import { formatUuid, randomHex, uuidV4, uuidV7, uuidVersion } from '../../resources/js/lib/uuid.js';

const referenceMd5 = (value) => createHash('md5').update(value, 'utf8').digest('hex');

test('MD5 cocok dengan vektor uji RFC 1321', () => {
    assert.equal(md5(''), 'd41d8cd98f00b204e9800998ecf8427e');
    assert.equal(md5('a'), '0cc175b9c0f1b6a831c399e269772661');
    assert.equal(md5('abc'), '900150983cd24fb0d6963f7d28e17f72');
    assert.equal(md5('message digest'), 'f96b697d7cb7938d525a2f31aaf161d0');
    assert.equal(md5('abcdefghijklmnopqrstuvwxyz'), 'c3fcd3d76192e4007dfb496cca67e13b');
    assert.equal(
        md5('12345678901234567890123456789012345678901234567890123456789012345678901234567890'),
        '57edf4a22be3c955ac49da2e2107b67a',
    );
});

test('MD5 cocok dengan implementasi acuan node:crypto, termasuk teks UTF-8', () => {
    const samples = [
        '',
        'a',
        'abc',
        'é',
        'FormatKit — tool developer 🇮🇩',
        'a'.repeat(55),
        'a'.repeat(56),
        'a'.repeat(63),
        'a'.repeat(64),
        'a'.repeat(65),
        'a'.repeat(1000),
        JSON.stringify({ nama: 'kopi susu', harga: 18000, pedas: true }),
    ];

    for (const sample of samples) {
        assert.equal(md5(sample), referenceMd5(sample), `MD5 tidak cocok untuk panjang ${sample.length}`);
    }
});

test('MD5 menerima string, ArrayBuffer, dan Uint8Array', () => {
    const encoded = new TextEncoder().encode('abc');

    assert.equal(md5(encoded.buffer), '900150983cd24fb0d6963f7d28e17f72');
    assert.equal(md5(encoded), '900150983cd24fb0d6963f7d28e17f72');
});

test('SHA-1/256/384/512 cocok dengan vektor uji standar', async () => {
    assert.equal(await hash('abc', 'sha1'), 'a9993e364706816aba3e25717850c26c9cd0d89d');
    assert.equal(await hash('abc', 'SHA-256'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
    assert.equal(
        await hash('abc', 'sha384'),
        'cb00753f45a35e8bb5a03d699ac65007272c32ab0eded1631a8b605a43ff5bed8086072ba1e7cc2358baeca134c825a7',
    );
    assert.equal(
        await hash('abc', 'sha512'),
        'ddaf35a193617abacc417349ae20413112e6fa4e89a97ea20a9eeee64b55d39a2192992a274fc1a836ba3c23a3feebbd454d4423643ce80e2a9ac94fa54ca49f',
    );
});

test('hash menolak algoritma yang tidak dikenal', async () => {
    await assert.rejects(() => hash('abc', 'sha3'), /tidak dikenal/);
});

test('Base64 encode/decode menangani UTF-8, whitespace, dan padding', () => {
    assert.equal(encodeBase64('Man'), 'TWFu');
    assert.equal(encodeBase64('Ma'), 'TWE=');
    assert.equal(encodeBase64('M'), 'TQ==');
    assert.equal(encodeBase64('é'), 'w6k=');
    assert.equal(decodeBase64('aGFs\nbw=='), 'halo');
    assert.equal(decodeBase64('w6k='), 'é');
    assert.equal(decodeBase64(encodeBase64('FormatKit — tool developer 🇮🇩')), 'FormatKit — tool developer 🇮🇩');
});

test('encodeBase64 sama dengan acuan Buffer untuk berbagai teks', () => {
    const samples = ['', 'Man', 'Ma', 'M', 'é', '\uffff', '\u0000\u0000\u0000', 'kopi & susu', 'FormatKit — 🇮🇩'];

    for (const sample of samples) {
        assert.equal(encodeBase64(sample), Buffer.from(sample, 'utf8').toString('base64'));
    }
});

test('mode URL-safe mengganti + dan / serta membuang padding', () => {
    const sample = '\uffff';
    const standard = encodeBase64(sample);

    assert.ok(/[+/]/.test(standard), 'sampel uji harus menghasilkan + atau / pada mode standar');
    assert.equal(
        encodeBase64(sample, { urlSafe: true }),
        standard.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, ''),
    );
    assert.equal(decodeBase64(encodeBase64(sample, { urlSafe: true }), { urlSafe: true }), sample);
});

test('deteksi otomatis isi Base64', () => {
    assert.equal(looksLikeBase64('aGVsbG8gd29ybGQ='), true);
    assert.equal(looksLikeBase64('aGFsbG8='), true);
    assert.equal(looksLikeBase64('aGFsbw'), false, 'terlalu pendek untuk ditebak otomatis');
    assert.equal(looksLikeBase64('halo dunia'), false);
    assert.equal(looksLikeBase64(''), false);
});

test('Base64 menolak input yang tidak sah dan data biner', () => {
    assert.throws(() => decodeBase64('bukan base64!'), /Bukan Base64/);
    assert.throws(() => decodeBase64('//79'), /bukan teks UTF-8/);
    assert.equal(decodeBase64('//79', { allowBinary: true }).length, 3);
});

test('URL encode/decode mode komponen dan URL utuh', () => {
    assert.equal(encodeUrl('kopi susu'), 'kopi%20susu');
    assert.equal(decodeUrl('kopi%20susu'), 'kopi susu');
    assert.equal(encodeUrl('https://a.id/b?c=d e', 'uri'), 'https://a.id/b?c=d%20e');
    assert.equal(encodeUrl('a/b?c=d', 'component'), 'a%2Fb%3Fc%3Dd');
    assert.throws(() => decodeUrl('%ZZ'), /escape yang tidak sah/);
});

test('parse query string mengembalikan pasangan kunci nilai', () => {
    assert.deepEqual(parseQueryString('?q=kopi&urut=harga'), [['q', 'kopi'], ['urut', 'harga']]);
});

test('HTML entity encode dan decode', () => {
    assert.equal(encodeEntities('<a & "b">'), '&lt;a &amp; &quot;b&quot;&gt;');
    assert.equal(encodeEntities('&', { mode: 'numeric' }), '&#38;');
    assert.equal(encodeEntities('é'), 'é');
    assert.equal(encodeEntities('é', { asciiOnly: true }), '&#233;');
    assert.equal(decodeEntities('&lt;p&gt;AB&#x43;&#68;&euro;&nbsp;'), '<p>ABCD€\u00a0');
    assert.equal(decodeEntities('&tidakdikenal;'), '&tidakdikenal;');
    assert.equal(decodeEntities(encodeEntities('campur "kutip" & <tag>')), 'campur "kutip" & <tag>');
});

test('UUID v4 punya versi dan varian yang benar', () => {
    const uuid = uuidV4();

    assert.match(uuid, /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.equal(uuidVersion(uuid), 4);
    assert.notEqual(uuidV4(), uuidV4());
});

test('UUID v7 menyimpan timestamp sehingga terurut menurut waktu', () => {
    const timestamp = 1_700_000_000_000;
    const early = uuidV7(timestamp);
    const later = uuidV7(timestamp + 1_000);
    const expectedPrefix = BigInt(timestamp).toString(16).padStart(12, '0').slice(0, 8);

    assert.match(early, /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    assert.equal(uuidVersion(early), 7);
    assert.equal(early.replaceAll('-', '').slice(0, 8), expectedPrefix);
    assert.ok(early < later, 'UUID v7 dengan timestamp lebih awal harus lebih kecil');
});

test('format UUID mengikuti opsi tampilan', () => {
    const uuid = uuidV7(1_700_000_000_000);

    assert.equal(formatUuid(uuid, { uppercase: true }), uuid.toUpperCase());
    assert.equal(formatUuid(uuid, { hyphens: false }).length, 32);
    assert.ok(formatUuid(uuid, { hyphens: false, braces: true }).startsWith('{'));
});

test('randomHex menghasilkan panjang dan karakter yang benar', () => {
    const value = randomHex(8);

    assert.equal(value.length, 8);
    assert.match(value, /^[0-9a-f]{8}$/);
});

test('ringkasan statistik menghitung baris dan byte UTF-8', () => {
    assert.equal(stats('a\nb'), '2 baris · 3 byte');
    assert.equal(stats(''), '0 baris · 0 byte');
    assert.equal(byteSize('é'), '2');
});
