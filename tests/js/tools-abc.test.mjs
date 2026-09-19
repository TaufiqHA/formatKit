/**
 * Unit test untuk tools Kategori A, B, dan C:
 * HTML Formatter, JWT Decoder, String Escape, HMAC Generator, dan Cron Generator.
 *
 * Dijalankan dengan:
 *   npm run test:js
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';

import { explainCron, getNextRuns, parseCron } from '../../resources/js/lib/cron.js';
import { escapeString, unescapeString } from '../../resources/js/lib/escape.js';
import { computeHmac } from '../../resources/js/lib/hmac.js';
import { formatHtml, minifyHtml } from '../../resources/js/lib/html.js';
import { decodeJwt } from '../../resources/js/lib/jwt.js';

/* ==========================================================================
   1. HTML Formatter & Minifier Tests
   ========================================================================== */

test('formatHtml merapikan potongan tag dengan indentasi hierarkis', () => {
    const raw = '<div><p>Halo</p><span>Dunia</span></div>';
    const formatted = formatHtml(raw, 2);
    assert.ok(formatted.includes('<div>\n  <p>\n    Halo\n  </p>\n  <span>\n    Dunia\n  </span>\n</div>'));
});

test('formatHtml mengenali void tags (seperti img dan br) tanpa menambah kedalaman indentasi', () => {
    const raw = '<main><img src="foto.jpg"><br><p>Teks</p></main>';
    const formatted = formatHtml(raw, 2);
    assert.ok(formatted.includes('<img src="foto.jpg">'));
    assert.ok(formatted.includes('<br>'));
});

test('minifyHtml menghapus komentar dan memadatkan whitespace antar tag', () => {
    const raw = '<div>  <!-- Komentar -->  <p>  Teks di dalam   </p>  </div>';
    const minified = minifyHtml(raw);
    assert.equal(minified, '<div><p> Teks di dalam </p></div>');
});

/* ==========================================================================
   2. JWT Decoder Tests
   ========================================================================== */

test('decodeJwt membedah token 3 bagian menjadi header dan payload yang sah', () => {
    // Header: {"alg":"HS256","typ":"JWT"}
    // Payload: {"sub":"user123","role":"admin","iat":1700000000,"exp":1900000000}
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMDAwMDAwLCJleHAiOjE5MDAwMDAwMDB9.signatureDummy';

    const result = decodeJwt(token);
    assert.equal(result.header.alg, 'HS256');
    assert.equal(result.header.typ, 'JWT');
    assert.equal(result.payload.sub, 'user123');
    assert.equal(result.payload.role, 'admin');
    assert.ok(result.claims.exp);
    assert.equal(result.claims.exp.isExpired, false);
});

test('decodeJwt melempar error untuk token yang tidak memiliki 3 bagian', () => {
    assert.throws(() => decodeJwt('token-acak-satu-bagian'), /harus terdiri dari 3 bagian/);
});

/* ==========================================================================
   3. String Escape / Unescape Tests
   ========================================================================== */

test('escapeString & unescapeString bekerja bolak-balik untuk JSON/JS', () => {
    const text = 'Halo "Dunia"!\nBaris baru\ttab & \\backslash\\';
    const escaped = escapeString(text, 'json');
    assert.ok(escaped.includes('\\"Dunia\\"'));
    assert.ok(escaped.includes('\\n'));
    assert.ok(escaped.includes('\\t'));

    const unescaped = unescapeString(escaped, 'json');
    assert.equal(unescaped, text);
});

test('escapeString untuk SQL menggandakan tanda kutip tunggal', () => {
    const sql = "O'Reilly & Associates";
    const escaped = escapeString(sql, 'sql');
    assert.equal(escaped, "O''Reilly & Associates");

    const unescaped = unescapeString(escaped, 'sql');
    assert.equal(unescaped, sql);
});

test('escapeString untuk HTML mengonversi karakter <, >, &', () => {
    const html = '<div class="alert">5 > 3 & 2 < 4</div>';
    const escaped = escapeString(html, 'html');
    assert.equal(escaped, '&lt;div class=&quot;alert&quot;&gt;5 &gt; 3 &amp; 2 &lt; 4&lt;/div&gt;');

    const unescaped = unescapeString(escaped, 'html');
    assert.equal(unescaped, html);
});

/* ==========================================================================
   4. HMAC Generator Tests
   ========================================================================== */

test('computeHmac menghasilkan hash HMAC-SHA256 yang tepat', async () => {
    // Vector standar: pesan = "hello", secret = "key"
    const sig = await computeHmac('hello', 'key', 'SHA-256', 'hex');
    assert.equal(sig, '9307b3b915efb5171ff14d8cb55fbcc798c6c0ef1456d66ded1a6aa723a58b7b');
});

test('computeHmac mendukung format Base64', async () => {
    const sigB64 = await computeHmac('hello', 'key', 'SHA-256', 'base64');
    assert.equal(sigB64, 'kwezuRXvtRcf8U2MtV+8x5jGwO8UVtZt7RpqpyOli3s=');
});

/* ==========================================================================
   5. Cron Expression Generator Tests
   ========================================================================== */

test('parseCron memisahkan 5 bagian ekspresi cron', () => {
    const parts = parseCron('*/15 9 * * 1-5');
    assert.equal(parts.minute, '*/15');
    assert.equal(parts.hour, '9');
    assert.equal(parts.dayOfMonth, '*');
    assert.equal(parts.month, '*');
    assert.equal(parts.dayOfWeek, '1-5');
});

test('explainCron menerjemahkan ekspresi cron ke Bahasa Indonesia', () => {
    const desc1 = explainCron('* * * * *');
    assert.equal(desc1, 'Berjalan setiap menit tanpa jeda.');

    const desc2 = explainCron('*/15 * * * *');
    assert.ok(desc2.includes('Setiap 15 menit'));

    const desc3 = explainCron('0 9 * * 1-5');
    assert.ok(desc3.includes('Pukul 09:00'));
    assert.ok(desc3.includes('hari kerja'));
});

test('getNextRuns menghasilkan daftar tanggal di masa depan', () => {
    const from = new Date('2026-09-20T00:00:00Z');
    const runs = getNextRuns('0 12 * * *', 3, from);
    assert.equal(runs.length, 3);
    assert.equal(runs[0].getHours(), 12);
    assert.equal(runs[0].getMinutes(), 0);
});
