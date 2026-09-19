# Daftar & Status Tools FormatKit

Dokumen ini mencatat inventaris seluruh tool yang ada pada FormatKit, mencakup status saat ini, tool yang sudah selesai, serta potensi penambahan fitur masa depan.

---

## 1. Ringkasan Status

- **Total Tools Terdaftar di Katalog (`config/tools.php`):** 28 Tools
- **Sudah Selesai (`ready`):** 28 Tools (**100% Seluruh Tool Katalog Selesai**)
- **Roadmap Mendatang (`planned`):** 0 Tools

Semua tool telah memiliki rute aktif, tampilan antarmuka Blade konsisten (gaya neobrutalisme / *bold contrast*), logika pemrosesan lokal di browser (client-side JS), pengujian otomatis, dan terdaftar dalam manifest Vite.

---

## 2. Tools yang Sudah Selesai (`ready` — 28/28)

| No | Nama Tool | Slug | Kategori | Ringkasan Fungsi |
|---|---|---|---|---|
| 1 | **JSON Formatter & Validator** | `json-formatter` | Format & Validasi | Format, validasi, minify, dan sorting key JSON |
| 2 | **XML Formatter & Validator** | `xml-formatter` | Format & Validasi | Format, cek keseimbangan tag, dan minify XML |
| 3 | **HTML Formatter & Minifier** | `html-formatter` | Format & Validasi | Format hierarki markup HTML & pemadatan whitespace/komentar |
| 4 | **SQL Formatter** | `sql-formatter` | Format & Validasi | Format klausa SQL, ubah casing kata kunci, dan minify |
| 5 | **CSS Formatter & Minifier** | `css-formatter` | Format & Validasi | Format indentasi dan minify stylesheet CSS |
| 6 | **JavaScript Formatter & Minifier** | `javascript-formatter` | Format & Validasi | Format sintaks, validasi AST aman, dan minify JS |
| 7 | **Base64 Encode / Decode** | `base64` | Encode & Decode | Konversi teks ⇄ Base64 dengan mode URL-safe & UTF-8 |
| 8 | **URL Encode / Decode** | `url-encoder` | Encode & Decode | Percent-encoding URL & query string parameter |
| 9 | **HTML Entity Encode / Decode** | `html-entities` | Encode & Decode | Konversi karakter khusus ke entitas bernama/numerik |
| 10 | **JWT Decoder** | `jwt-decoder` | Encode & Decode | Decode token JWT (header, payload, status kedaluwarsa) lokal |
| 11 | **String Escape / Unescape** | `string-escape` | Encode & Decode | Escape/unescape string untuk JSON, SQL, HTML, Java, & RegEx |
| 12 | **Hash Generator** | `hash-generator` | Hash & Generator | Checksum MD5, SHA-1, SHA-256, SHA-512 (teks & file) |
| 13 | **HMAC Generator** | `hmac-generator` | Hash & Generator | Hitung signature HMAC (SHA-256, SHA-512) dengan Web Crypto |
| 14 | **UUID / GUID Generator** | `uuid-generator` | Hash & Generator | Pembuat UUID v4 (random) dan v7 (time-ordered) bulk |
| 15 | **Cron Expression Generator** | `cron-generator` | Hash & Generator | Generator ekspresi cron, arti bahasa Indonesia & jadwal berikutnya |
| 16 | **CSV ⇄ JSON Converter** | `csv-to-json` | Konversi Data | Konversi dua arah CSV ⇄ JSON standar RFC 4180 |
| 17 | **JSON ⇄ YAML Converter** | `json-to-yaml` | Konversi Data | Konversi dua arah JSON ke YAML dan YAML ke JSON |
| 18 | **XML ke JSON Converter** | `xml-to-json` | Konversi Data | Konversi dokumen XML ke objek JSON hierarkis |
| 19 | **Konverter XSD ke JSON Schema** | `xsd-to-json-schema` | Konversi Data | Ubah skema XML XSD (element, complexType, sequence) ke JSON Schema Draft-07 |
| 20 | **Unix Timestamp Converter** | `timestamp-converter` | Konversi Data | Konversi Unix epoch ke ISO, UTC, dan waktu WIB/WITA/WIT |
| 21 | **Penghitung Kata & Case Converter** | `word-counter` | Teks & Utilitas | Statistik kata/karakter & konversi camelCase, kebab-case, dll |
| 22 | **Regex Tester & Matcher** | `regex-tester` | Teks & Utilitas | Uji ekspresi reguler, capture groups, dan penggantian teks |
| 23 | **XPath Tester & Evaluator** | `xpath-tester` | Teks & Utilitas | Uji query XPath terhadap dokumen XML secara interaktif |
| 24 | **Lorem Ipsum Generator** | `lorem-ipsum` | Teks & Utilitas | Generator teks dummy placeholder (paragraf, kalimat, kata) |
| 25 | **Daftar Provinsi & Kota Indonesia** | `provinsi-indonesia` | Data Referensi | Direktori 38 provinsi resmi RI ekspor Tabel, JSON, CSV, Select |
| 26 | **Daftar Kode Pos Indonesia** | `kode-pos-indonesia` | Data Referensi | Direktori pencarian kode pos kota, kecamatan, dan kelurahan |
| 27 | **Daftar MIME Type Lengkap** | `mime-types` | Data Referensi | Tabel Content-Type lengkap & generator konfigurasi Nginx |
| 28 | **Daftar Kode Bank di Indonesia** | `kode-bank-indonesia` | Data Referensi | Daftar kode transfer antarbank lengkap (BUMN, Swasta, Digital, BPD) |

---

## 3. Ide Tambahan untuk Pengembangan Lanjutan

Fitur-fitur masa depan di luar katalog dasar yang bisa dipertimbangkan berdasarkan riset pasar:

1. **Validator & Generator NIK / NPWP:** Validasi struktur nomor identitas kependudukan dan perpajakan Indonesia.
2. **Kalkulator Subnet / CIDR IP:** Utilitas kalkulasi netmask dan IP range untuk network engineer.
3. **Markdown to HTML / HTML to Markdown:** Konversi dua arah dokumen Markdown dan HTML lengkap dengan preview.
4. **Color Palette & Contrast Checker:** Generator palet warna hex/hsl/rgb dan uji rasio kontras WCAG AA/AAA.
