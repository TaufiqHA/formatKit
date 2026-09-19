# Daftar & Status Tools FormatKit

Dokumen ini mencatat inventaris seluruh tool yang ada pada FormatKit, mencakup status saat ini, tool yang sudah selesai, tool yang direncanakan (*planned*), serta potensi penambahan fitur masa depan.

---

## 1. Ringkasan Status

- **Total Tools Terdaftar di Katalog (`config/tools.php`):** 26 Tools
- **Sudah Selesai (`ready`):** 13 Tools (100% MVP Fase 1 + 100% Fase 2 Inti)
- **Belum Dibuat (`planned`):** 13 Tools (Tampil di navigasi dengan status/badge "segera", belum ada implementasi view & script)

---

## 2. Tools yang Sudah Selesai (`ready`)

Semua tool di bawah ini telah memiliki route aktif, template Blade di `resources/views/tools/`, dan logika pemrosesan sisi klien (client-side JS) di `resources/js/tools/`:

| No | Nama Tool | Slug | Kategori | Ringkasan Fungsi |
|---|---|---|---|---|
| 1 | **JSON Formatter & Validator** | `json-formatter` | Format & Validasi | Format, validasi, minify, dan sorting key JSON |
| 2 | **XML Formatter & Validator** | `xml-formatter` | Format & Validasi | Format, cek keseimbangan tag, dan minify XML |
| 3 | **SQL Formatter** | `sql-formatter` | Format & Validasi | Format klausa SQL, ubah casing kata kunci, dan minify |
| 4 | **CSS Formatter & Minifier** | `css-formatter` | Format & Validasi | Format indentasi dan minify stylesheet CSS |
| 5 | **JavaScript Formatter & Minifier** | `javascript-formatter` | Format & Validasi | Format sintaks, validasi AST aman, dan minify JS |
| 6 | **Base64 Encode / Decode** | `base64` | Encode & Decode | Konversi teks ⇄ Base64 dengan mode URL-safe & UTF-8 |
| 7 | **URL Encode / Decode** | `url-encoder` | Encode & Decode | Percent-encoding URL & query string parameter |
| 8 | **HTML Entity Encode / Decode** | `html-entities` | Encode & Decode | Konversi karakter khusus ke entitas bernama/numerik |
| 9 | **Hash Generator** | `hash-generator` | Hash & Generator | Checksum MD5, SHA-1, SHA-256, SHA-512 (teks & file) |
| 10 | **UUID / GUID Generator** | `uuid-generator` | Hash & Generator | Pembuat UUID v4 (random) dan v7 (time-ordered) bulk |
| 11 | **CSV ⇄ JSON Converter** | `csv-to-json` | Konversi Data | Konversi dua arah CSV ⇄ JSON standar RFC 4180 |
| 12 | **Penghitung Kata & Case Converter** | `word-counter` | Teks & Utilitas | Statistik kata/karakter & konversi camelCase, kebab-case, dll |
| 13 | **Regex Tester & Matcher** | `regex-tester` | Teks & Utilitas | Uji ekspresi reguler, capture groups, dan penggantian teks |

---

## 3. Tools yang Belum Dibuat (`planned`)

Berikut adalah 13 tools yang sudah masuk ke katalog konfigurasi [`config/tools.php`](file:///home/padikering/Documents/KERJA/formatKit/config/tools.php) namun belum memiliki halaman dan logika skrip:

### A. Format & Validasi
* **HTML Formatter** (`html-formatter`)
  * **Tagline:** Rapikan markup HTML yang berantakan.
  * **Deskripsi:** Format HTML online dengan indentasi konsisten dan mode minifikasi untuk produksi.

### B. Encode & Decode
* **JWT Decoder** (`jwt-decoder`)
  * **Tagline:** Baca header dan payload JWT.
  * **Deskripsi:** Decode token JSON Web Token untuk melihat header, payload, klausa waktu kedaluwarsa tanpa mengirim token ke server.
* **String Escape / Unescape** (`string-escape`)
  * **Tagline:** Escape string untuk JSON, JS, dan SQL.
  * **Deskripsi:** Mengubah karakter string mentah menjadi representasi escape yang aman disematkan pada kode pemrograman.

### C. Hash & Generator
* **HMAC Generator** (`hmac-generator`)
  * **Tagline:** Hitung tanda tangan HMAC dengan kunci rahasia.
  * **Deskripsi:** Buat signature HMAC berbasis SHA-256 dan SHA-512 untuk validasi webhook atau request API.
* **Cron Expression Generator** (`cron-generator`)
  * **Tagline:** Susun ekspresi cron dan baca artinya.
  * **Deskripsi:** Generator visual ekspresi cron (Linux crontab / Quartz) dengan penjelasan jadwal dalam bahasa manusia.

### D. Konversi Data
* **JSON ke YAML / YAML ke JSON** (`json-to-yaml`)
  * **Tagline:** Ubah JSON menjadi YAML yang rapi.
  * **Deskripsi:** Konversi bolak-balik antara struktur JSON dan dokumen YAML tanpa merusak hierarki data.
* **XML ke JSON** (`xml-to-json`)
  * **Tagline:** Ubah dokumen XML menjadi JSON.
  * **Deskripsi:** Konversi dokumen XML ke format JSON terstruktur dengan penanganan atribut dan namespace.
* **Unix Timestamp Converter** (`timestamp-converter`)
  * **Tagline:** Ubah epoch ke tanggal dan sebaliknya.
  * **Deskripsi:** Konversi nilai Unix timestamp (detik/milidetik) ke format tanggal ISO dan waktu lokal Indonesia (WIB, WITA, WIT), serta sebaliknya.

### E. Teks & Utilitas
* **XPath Tester** (`xpath-tester`)
  * **Tagline:** Cari node XML dengan ekspresi XPath.
  * **Deskripsi:** Uji query ekspresi XPath terhadap dokumen XML dan visualisasikan daftar node yang cocok.
* **Lorem Ipsum Generator** (`lorem-ipsum`)
  * **Tagline:** Teks contoh untuk tata letak.
  * **Deskripsi:** Buat teks *dummy* dalam satuan kata, kalimat, atau paragraf untuk pengujian layout desain.

### F. Data Referensi (Lokal & Spesifik)
* **Daftar Provinsi & Kota di Indonesia** (`provinsi-indonesia`)
  * **Tagline:** Daftar provinsi dan kabupaten/kota siap salin.
  * **Deskripsi:** Kumpulan data wilayah Indonesia (Provinsi, Kabupaten/Kota, Kecamatan) dalam format Tabel, JSON, CSV, dan tag `<select>` HTML.
* **Daftar Kode Pos Indonesia** (`kode-pos-indonesia`)
  * **Tagline:** Cari kode pos berdasarkan wilayah.
  * **Deskripsi:** Direktori pencarian kode pos di seluruh wilayah Indonesia.
* **Daftar MIME Type** (`mime-types`)
  * **Tagline:** Tabel MIME type untuk konfigurasi berkas.
  * **Deskripsi:** Referensi lengkap Content-Type / MIME type beserta ekstensi berkas untuk konfigurasi web server dan HTTP header.

---

## 4. Ide Tambahan dari Riset Kompetitor (Belum Masuk Katalog)

Fitur bernilai tinggi yang diidentifikasi dalam dokumen [`analisis-kompetitor.md`](file:///home/padikering/Documents/KERJA/formatKit/analisis-kompetitor.md) dengan tingkat persaingan rendah di Indonesia:

1. **Konverter XSD / JSON Schema:** Mengisi celah yang ditinggalkan FreeFormatter.
2. **Daftar Kode Bank Indonesia:** Tabel kode transfer antarbank (BCA, Mandiri, BRI, BNI, bank digital, dll) siap pakai.
3. **Format & Validator NIK / NPWP:** Penjelasan struktur digit dan pengecekan format resmi identitas pajak/kependudukan lokal.
4. **Time Zone Converter Indonesia:** Konversi zona waktu UTC / GMT ke WIB, WITA, WIT.
