# Analisis Kompetitor — FormatKit

**Fase timeline:** 0 (Riset & Perencanaan)
**Tanggal riset:** 18 September 2026
**Metode:** pengambilan langsung (HTTP/browser) atas situs kompetitor + sitemap, arsip Wayback Machine, RDAP domain, dan pengecekan hasil pencarian. Semua angka di bawah adalah hasil pengukuran saya sendiri pada tanggal tersebut, bukan estimasi pihak ketiga.

---

## 1. Ringkasan Eksekutif

Lima temuan yang paling mengubah rencana:

1. **FreeFormatter.com — kompetitor referensi utama — sedang MATI.** Saat riset dilakukan, `freeformatter.com` merespons HTTP 200 tetapi isinya halaman parkir Network Solutions ("Domain Not Valid", 2.177 byte). Arsip Wayback menunjukkan halaman normal hingga 10 Sep 2026, lalu berubah jadi halaman parkir antara 10–15 Sep 2026. Ini jendela peluang paling nyata dari seluruh riset: nama yang paling sering dirujuk di niche ini kehilangan trafiknya saat ini juga.
2. **Dua raksasa generalis (JSONFormatter.org & CodeBeautify) baru saja kehilangan kredibilitas soal privasi.** watchTowr Labs (Nov 2025) menemukan 80.000+ file/5 GB data sensitif yang tersimpan publik di kedua situs — password, kredensial AD, kunci AWS, API key — akibat fitur "Save/Share link" yang datanya tersimpan di server dan bisa dienumerasi crawler. Fitur pemicunya, **"Recent Links" dan "Save"**, masih ada di navigasi utama kedua situs sampai hari ini. Ini bukan sekadar berita: ini dasar posisi "data Anda tidak pernah meninggalkan browser" yang bisa kita klaim dan buktikan.
3. **SERP tiap tool dikuasai spesialis, bukan generalis.** Untuk 10 kata kunci inti, situs multi-tool hanya menang di beberapa; masing-masing keyword punya "juara" tersendiri (base64decode.org, urldecode.org, sqlformat.org, uuidgenerator.net, dll). Artinya strategi "bikin 1.000 halaman tipis" (yang dipakai JSONFormatter/CodeBeautify) bukan resep yang bisa kita tiru dengan hasil cepat.
4. **Pasar berbahasa Indonesia belum digarap serius.** Untuk kueri Indonesia ("format xml online gratis", "cara format json"), halaman berbahasa Indonesia yang muncul sebagian besar hasil terjemahan mesin atau artikel blog, bukan tool lokal. Ini celah yang bisa diisi tanpa bertarung langsung di head term global.
5. **Ancaman eksekusi tetap sama: butuh waktu.** Trafik organik di niche ini dibangun dari kuantitas halaman + konten yang berguna, bukan dari fitur. Timeline 8–9 minggu untuk MVP tetap realistis, tetapi ekspektasi trafik harus diset: tool ke-8 sampai ke-40 yang akan membawa trafik, bukan 7 tool MVP saja.

---

## 2. Peta Kompetitor

| Tier | Situs | Posisi |
|---|---|---|
| Generalis besar | CodeBeautify.org, JSONFormatter.org | Ribuan halaman, iklan, login, share-link |
| Generalis terancang | ExtendsClass.com, BeautifyTools.com, FreeFormatter.com | Puluhan–ratusan tool, lebih rapi/lebih tua |
| Spesialis fokus | JSONLint.com, JSONEditorOnline.org, jsonformatter.curiousconcept.com | Satu domain fokus (JSON), kualitas tinggi |
| Spesialis per-tool | base64decode.org, urldecode.org, sqlformat.org, uuidgenerator.net, md5hashgenerator.com, csvjson.com | Menang di satu keyword spesifik |
| Pendatang baru | base64.sh, json-indent.com, json.site, formatjsononline.com, jam.dev | Mengangkat isu privat/ad-free |
| Penyusup merek | freeformatter.dev, freeformatter.app | Memakai nama FreeFormatter untuk menangkap trafik brand |

---

## 3. Profil Kompetitor

### 3.1 FreeFormatter.com — MATI (peluang utama)
- **Status live 18 Sep 2026:** halaman parkir "Domain Not Valid" dari Network Solutions (2.177 byte). Diverifikasi dua jalur: koneksi langsung dan melalui proxy pihak ketiga → hasil sama, jadi ini bukan masalah jaringan/geo saya.
- **Timeline mati (dari arsip Wayback):** 10 Sep 2026 halaman masih normal (±10,8 KB) → 15 Sep 2026 sudah 1,6 KB (halaman parkir). Jadi rusak sekitar awal September 2026.
- **Inventaris historis:** 119 halaman unik terarsip = **80 halaman tool** + **39 halaman data/referensi** (daftar negara bagian/kota untuk `<select>`, daftar MIME type, daftar time zone, tabel ASCII, dll).
- **Yang menarik dari strategi mereka:** 39 halaman data/referensi itu bukan tool, tapi justru pintu masuk trafik organik murah (mis. "US state list html select", "ISO country list"). Halaman seperti ini tidak butuh maintenance dan hampir tanpa pesaing kualitas.
- **Peluang turunan:** kueri "freeformatter alternative" sudah diincar domain penyusup (freeformatter.dev — baru punya 1 tool, positioning "privacy-first, runs in your browser") dan situs komparasi pihak ketiga. Trafik brand FreeFormatter saat ini menguap tanpa penerima yang layak.

### 3.2 CodeBeautify.org — generalis terbesar
- **Skala:** 1.201 URL di sitemap. Rincian kategori (hasil pengelompokan saya): format/validasi data 356, lain-lain 230, generator 224, konversi X→Y 168, konverter lain 121, encode/hash/minify 53, teks/nama 33, kalkulator 16.
- **Distribusi aneh:** 114 halaman berawalan `random-*` (random dog breed generator, random scene generator, dsb) — jelas ekor panjang murah untuk trafik, bukan tool developer.
- **Matriks konversi:** 243 pasangan konversi unik, didominasi sumber `json` (22), `xml` (16), `base64` (14), `html` (13), dan tujuan `base64` (24), `json` (15), `html` (14). Ini pola "kombinasi silang A→B" yang murah diproduksi dan terindeks luas.
- **Teknis:** di belakang Cloudflare. Ukuran halaman 164 KB HTML, 79 request, ±647 KB transfer, 15 iframe (1 di antaranya iframe iklan), load ±2,5 s.
- **Monetisasi & retensi:** skrip iklan Google (Google Ad Manager/AdSense) terdeteksi; ada Login, "Save link", "Recent Links", "Favs", dan ekstensi Chrome. Tidak ada halaman pricing (404) → modelnya murni iklan.
- **Kelemahan yang bisa dieksploitasi:** (a) UI penuh iklan dan iframe, (b) fitur Save/Recent Links adalah penyebab insiden kebocoran data 2025 dan masih aktif, (c) kualitas halaman sangat tidak merata karena dikejar jumlah.

### 3.3 JSONFormatter.org — generalis terbesar kedua
- **Skala:** 1.643 URL di sitemap — terbanyak di antara semua yang saya ukur. Prefiks terbanyak: `xml` 345, `yaml` 335, `html` 320, `json` 113.
- **Pola:** jauh lebih agresif dari CodeBeautify dalam membuat halaman turunan per format dan per pasangan konversi (103 pasangan unik: json→25 sumber, xml→23, yaml→23).
- **Teknis:** Cloudflare; 181 KB HTML, 76 request, ±1.148 KB transfer, 13 iframe (1 iframe iklan), load ±3,1 s — halaman **terberat** di antara lima yang saya ukur.
- **UI:** tampilan bergaya lama (header hijau teal, editor gaya ACE), navigasi utama memuat "SAVE" dan "RECENT LINKS" — jalur yang sama dengan insiden kebocoran.
- **Pelajaran:** pola halaman turunan mereka berhasil secara SEO, tapi memakan waktu bertahun-tahun. Kita bisa meniru *polanya* (matriks konversi + halaman per format) tanpa meniru *skalanya* di awal.

### 3.4 ExtendsClass.com — generalis rapi (pesaing kualitas)
- **Skala:** 110 URL — jauh lebih sedikit tapi terkurasi (83 format/validasi, 19 konversi).
- **Kekuatan:** topik teknis niche yang tidak digarap pemain besar (parquet viewer, avro viewer, SQL-to-MongoDB, XPath-to-CSS, JWT decoder), memakai CodeMirror, iframe iklan nol.
- **Kelemahan:** TTFB 3,1 s dan load ±7,2 s di pengukuran saya — paling lambat. Server tampaknya bukan CDN.
- **Implikasi:** kualitas/kurasi bisa mengalahkan skala di keyword tertentu, tapi performa server tetap menentukan.

### 3.5 JSONLint.com — spesialis yang paling modern
- **Skala:** 147 URL; inti produk ±30 tool JSON (repair, diff, schema, JSONPath, flatten, token counter) + ekosistem (datasets, learn).
- **Teknis:** **Next.js di Vercel** (terdeteksi `x-powered-by: Next.js`, `x-nextjs-prerender`), di belakang Cloudflare. Performa terbaik dari lima yang diukur: TTFB 1,0 s, load 1,6 s.
- **Monetisasi:** aplikasi native macOS berbayar **$6,99** (JSONLint Pro) — model "tool web gratis sebagai kanal akuisisi untuk produk berbayar". Ini alternatif model iklan yang layak dicatat.
- **Pelajaran:** satu domain yang fokus pada satu keluarga format bisa jadi brand yang kuat. Untuk kita, ini alasan untuk tidak bertarung head-to-head di keyword "JSON formatter" pada tahun pertama.

### 3.6 JSONEditorOnline.org & BeautifyTools.com
- **JSONEditorOnline:** 53 URL, fokus editor JSON, Cloudflare, premium. Bersaing di ranah UX editor, bukan jumlah tool.
- **BeautifyTools.com:** ±129 halaman `.php` gaya lama (Apache, Bootstrap 3), iframe iklan nol di halaman yang saya cek. Katalognya luas termasuk konversi dokumen (Excel→JSON, HTML→SQL) dan converter satuan. Situs tua yang bertahan dari akumulasi indeks, bukan dari kualitas.

### 3.7 Pendatang baru & penyusup merek
- Beberapa pemain baru mengangkat **"100% in-browser / ad-free"** sebagai USP (base64.sh, json-indent.com, jam.dev dengan label "Free, Open Source & Ad-free"). Artinya posisi "ringan & privat" belum sepenuhnya kosong, tapi belum ada pemain dominan yang memilikinya.
- **freeformatter.dev** memakai nama merek "FreeFormatter", klaim privacy-first, dan baru menyediakan **1 tool** (JSON Formatter) dengan tombol donasi. Ini contoh nyata bahwa celah merek FreeFormatter sedang diperebutkan pemain yang belum matang.

---

## 4. Perbandingan Inventaris & Teknis

| Situs | URL di sitemap | Perkiraan jumlah alat nyata | Stack terdeteksi | Monetisasi | Status |
|---|---|---|---|---|---|
| FreeFormatter.com | 119 (arsip) | ~80 tool + 39 halaman data | openresty di VPS | iklan Google (historis) | **MATI (Sep 2026)** |
| JSONFormatter.org | 1.643 | ~1.600 (banyak halaman tipis) | Cloudflare | iklan Google + login/save-link | hidup |
| CodeBeautify.org | 1.201 | ~1.200 (banyak halaman tipis) | Cloudflare | iklan Google + login/save-link | hidup |
| JSONLint.com | 147 | ~30 alat inti + konten | Next.js/Vercel + Cloudflare | app macOS $6,99 | hidup |
| BeautifyTools.com | ±129 (dari homepage) | ~120 | Apache/PHP, Bootstrap 3 | iklan | hidup |
| ExtendsClass.com | 110 | ~100 | VPS, CodeMirror | sedikit iklan | hidup |
| JSONEditorOnline.org | 53 | ~30 | Cloudflare | premium | hidup |

**Performa (1 sampel per halaman, Chrome, dari Indonesia, 18 Sep 2026 — arahkan sebagai indikatif, bukan benchmark):**

| Halaman | TTFB | Load | Request | Transfer | iframe / iframe iklan |
|---|---|---|---|---|---|
| jsonlint.com | 1,0 s | 1,6 s | 63 | 545 KB | 3 / 0 |
| codebeautify.org/jsonviewer | 0,25 s | 2,5 s | 79 | 647 KB | 15 / 1 |
| jsonformatter.org/json-pretty-print | 0,45 s | 3,1 s | 76 | 1.148 KB | 13 / 1 |
| base64decode.org | 0,6 s | 3,3 s | **6** | **131 KB** | 0 / 0 |
| extendsclass.com/json-formatter.html | 3,1 s | 7,2 s | 30 | 764 KB | 4 / 0 |

Kesimpulan performa: pesaing utama kita **berat** (76–79 request, 0,5–1,1 MB, belasan iframe). `base64decode.org` membuktikan 6 request/131 KB masih cukup untuk memenangkan keyword besar → target realistis kita: **< 15 request dan < 200 KB untuk halaman tool**.

---

## 5. Lanskap Hasil Pencarian per Tool MVP

Catatan kejujuran data: pengecekan hasil pencarian dilakukan lewat backend pencarian yang saya pakai (bukan langsung Google Search Console/SERP API resmi), jadi urutan bisa berbeda sedikit dari Google. Yang diambil adalah **pola**: siapa saja pemain yang bertahan di halaman 1.

| Keyword inti | Pemenang halaman 1 | Tingkat kesulitan untuk pendatang |
|---|---|---|
| json formatter | wikipedia, jsonformatter.org, curiousconcept, ekstensi Chrome, json-indent.com | **Sangat tinggi** — jangan jadikan target peringkat utama |
| json validator online | jsonlint.com, jsonformatter.org, jsonchecker.com | Tinggi |
| base64 decode | base64decode.org, emn178, base64.sh, w3schools, calculator.net | **Tinggi** — tapi base64.sh (baru) sudah masuk → celah masih ada |
| url encode decode | urldecode.org, urlencoder.org, meyerweb, url-encode-decode.com | Tinggi |
| xml formatter online | jsonformatter.org, codeshack.io, codebeautify, xmlformatter.org, w3schools, **freeformatter.com (ranking #2 untuk kueri Indonesia)** | Sedang — ada slot dari FreeFormatter yang kosong |
| sql formatter online | sqlformat.org, dpriver, red-gate, sql-formatter.com | Sedang–tinggi |
| uuid generator | uuidgenerator.net, kinde, guidgenerator, uuidtools | Sedang — banyak pesaing lemah/berisi iklan padat |
| md5 hash generator | md5hashgenerator.com, miraclesalad, cryptii, md5file | **Rendah–sedang** — pesaing tua, desain usang |
| html encoder decoder | w3docs, w3schools, devtoollab, mothereff | **Rendah–sedang** — tidak ada dominator kuat |
| csv to json converter | csvjson.com, convertcsv.com, jam.dev, jsonifyit | Sedang |
| format xml online gratis (ID) | format-xml.com, freeformatter.com, elmah.io, **turboutilkit.com (terjemahan mesin)**, jsonformatter.org | **Rendah** — kualitas konten berbahasa Indonesia lemah |
| cara format json (ID) | aspose, json-prettify, jsonformatter.org, **fieldari.com (blog)**, hostinger | **Rendah** — didominasi konten blog, bukan tool |

**Implikasi prioritas:** jangan bertaruh pada peringkat cepat di `json formatter`/`base64 decode`/`url encode`. Pertaruhkan tenaga awal pada keyword berkesulitan rendah–sedang (HTML entity, hash generator, UUID, CSV→JSON, versi bahasa Indonesia) sambil tool JSON/XML tetap dibangun sebagai jangkar situs.

---

## 6. Temuan Kunci yang Mengubah Strategi

### 6.1 Insiden kebocoran data pesaing (Nov 2025) — senjata positioning terkuat
Fakta yang terverifikasi dari pemberitaan (The Hacker News, SecurityAffairs, cyberpress, laporan watchTowr Labs):
- Dataset **80.000+ file / 5 GB** terkumpul dari JSONFormatter.org dan CodeBeautify.org (5 tahun data JSONFormatter, 1 tahun CodeBeautify).
- Isinya: username, password, kunci repositori, kredensial Active Directory, kredensial database/FTP, kunci environment cloud, konfigurasi LDAP, API key helpdesk, rekaman sesi SSH, data pribadi.
- Sektor terdampak: pemerintah, telekomunikasi, infrastruktur kritis, perbankan, asuransi, kesehatan, pendidikan, aerospace.
- **Akar masalah:** fitur "Save/Share" menyimpan data user di server dengan URL yang bisa diprediksi (`situs/{tipe-formatter}/{id}`), dan halaman "Recent Links" mempublikasikan daftar link tersimpan → crawler mudah memanen semuanya.
- watchTowr mengunggah kunci AWS palsu ke salah satu situs dan **dalam 48 jam** sudah ada pihak yang mencoba memakainya.
- **Masih berlaku hari ini:** saat riset ini, "Save"/"Recent Links" masih ada di navigasi utama kedua situs.

Konsekuensi untuk kita:
- Aturan keras: **tidak ada data user yang disimpan di server kita** untuk fitur format/validasi. Semua proses di browser.
- Kalau nanti membuat "share hasil" (Fase 3 di planning), desainnya harus **menyimpan data di URL fragment (`#`) sehingga tidak dikirim ke server**, atau menyimpan terenkripsi dengan masa kedaluwarsa — dan **tidak pernah** membuat halaman "recent links" publik.
- Ini bisa jadi halaman konten: "Mengapa menempel JSON berisi kredensial ke tool online itu berbahaya" → relevan, terverifikasi, dan langsung menjelaskan kenapa situs kita berbeda.

### 6.2 FreeFormatter mati = permintaan "alternatif" yang belum terlayani
- Halaman berbahasa Indonesia untuk "format xml online gratis" masih menempatkan FreeFormatter di peringkat atas, padahal situsnya sedang menampilkan halaman parkir. Pengguna yang mengklik akan kecewa → mereka mencari alternatif.
- Penerima saat ini lemah: `freeformatter.dev` (1 tool), situs komparasi pihak ketiga. Belum ada yang menyediakan katalog lengkap yang setara.
- Aksi konkret: siapkan halaman perbandingan/alternatif ("Alternatif FreeFormatter yang masih berfungsi", "FreeFormatter vs FormatKit") + pastikan tool yang dulu jadi andalan mereka (JSON/XML/SQL formatter, validator XSD, XPath tester, cron generator) ada di roadmap kita lebih awal dari rencana semula.

### 6.3 Pola SEO yang layak dicontek (dan batasnya)
Yang layak diambil dari JSONFormatter/CodeBeautify/FreeFormatter:
- **Halaman per pasangan konversi** (json-to-yaml, yaml-to-xml, ...) — masing-masing menargetkan satu kueri spesifik.
- **Halaman data/referensi** ala FreeFormatter (daftar negara bagian, MIME type, time zone, tabel ASCII) — trafik bagus, biaya produksi rendah, perawatan hampir nol.
- **Halaman varian satu tool** (formatter, viewer, editor, pretty print, minify) — beberapa situs memisahkannya, beberapa menggabungkan; pemisahan menambah pintu masuk indeks.

Yang **tidak** layak ditiru:
- 114 halaman generator acak (`random-dog-breed-generator`) — menaikkan jumlah halaman, tapi tak membangun otoritas tematik dan berisiko dianggap konten tipis.
- Skala 1.200–1.600 halaman di tahun pertama.

### 6.4 Celah bahasa Indonesia & lokal
- Kueri berbahasa Indonesia dilayani artikel blog dan halaman hasil terjemahan mesin (`turboutilkit.com`, `anicetool.com`) — bukan tool lokal yang benar-benar dibuat untuk pasar ini.
- Peluang: UI berbahasa Indonesia + penjelasan tiap tool dalam bahasa Indonesia + contoh kasus lokal (format data dari API Midtrans/Xendit, KTP/NIK, kode pos, nomor telepon, mata uang Rupiah). Ini sulit ditiru pesaing global dan murah bagi kita.
- Tambahan: kebutuhan data referensi khas Indonesia (daftar provinsi/kota/kabupaten, kode pos, kode bank, format NIK/NPWP) — inilah versi lokal dari strategi "39 halaman data" FreeFormatter, dan hampir tanpa pesaing.

---

## 7. Peluang Posisi Pembeda (Positioning)

Urutan berdasarkan kekuatan bukti:

1. **Privat sejati, bisa dibuktikan.** Proses 100% di browser + tanpa penyimpanan data + tanpa halaman "recent links" publik. Bukti pendukung: insiden 80.000 file pesaing. Ini posisi yang bisa diklaim dan diverifikasi user lewat DevTools/Network tab — bukan klaim kosong.
2. **Cepat & ringan.** Target < 15 request dan < 200 KB per halaman tool vs 76–79 request pesaing, tanpa iframe iklan yang mendorong konten keluar layar.
3. **Bahasa Indonesia + kebutuhan data lokal.** Pasar yang belum digarap pemain global, dan sulit mereka masuki secara kualitas.
4. **Menampung pengungsi FreeFormatter.** Tool set yang sengaja tumpang-tindih dengan inventaris historis FreeFormatter + halaman komparasi untuk kueri brand.
5. **Ekosistem "hasil" yang aman.** Fitur share nanti: data di URL fragment, tidak tersimpan di server. Kalau ini diumumkan sebagai kebijakan, ia langsung membedakan kita dari dua pemain terbesar.

Yang sebaiknya **tidak** diklaim: "formatter terbaik/terlengkap" (kalah jumlah halaman dari 1.643 URL), "paling cepat" tanpa pengukuran, dan "gratis tanpa iklan selamanya" kalau monetisasi tetap direncanakan via AdSense.

---

## 8. Implikasi ke Daftar Tools Final (usulan revisi)

Basis penilaian: (kesulitan SERP + apakah pesaing utama lemah di sana + nilai bagi pengguna + biaya implementasi).

**MVP — tetap 7 tool, tapi dengan ekspektasi peringkat yang realistis:**
| Tool | Kesulitan | Catatan |
|---|---|---|
| JSON Formatter & Validator | Sangat tinggi | Jangkar situs, wajib ada — jangan harapkan peringkat atas tahun pertama; menangkan lewat varian long-tail |
| XML Formatter & Validator | Sedang | Slot FreeFormatter kosong; ada peluang nyata |
| Base64 Encode/Decode | Tinggi | Bersaing di kualitas UX & privasi, bukan volume |
| URL Encode/Decode | Tinggi | Sama seperti Base64 |
| HTML Entity Encode/Decode | **Rendah–sedang** | Prioritas menang tercepat |
| Hash Generator (MD5/SHA-1/SHA-256/SHA-512) | **Rendah–sedang** | Pesaing tua, halaman beriklan padat |
| UUID/GUID Generator | Sedang | Banyak pesaing lemah; tambahkan v7 + bulk (pembeda) |

**Tambahan yang direkomendasikan naik ke Fase 2 (menggeser tool lain):**
- **Cron expression generator** + **XPath tester** + **konverter XSD/JSON Schema** — warisan inventaris FreeFormatter yang pesaingnya paling tipis.
- **Satu klaster matriks konversi** (JSON↔YAML↔XML↔CSV) — pola yang terbukti menyumbang ratusan pintu masuk indeks.
- **Halaman data/referensi Indonesia** (provinsi, kota/kabupaten, kode pos, kode bank, format NIK/NPWP, MIME type, time zone) — murah, cepat terindeks, hampir tanpa pesaing.
- **Artikel penjelas per tool dalam bahasa Indonesia** — bukan pelengkap, tapi bagian utama strategi (SERP Indonesia didominasi artikel, bukan tool).

**Yang sebaiknya ditunda:** seluruh katalog generator acak, tool non-developer (kalkulator satuan, konverter mata uang), dan apa pun yang menambah halaman tanpa menambah otoritas tematik.

**Aturan desain yang diambil dari data ini:**
- Proses di browser; tidak ada endpoint yang menyimpan data user.
- Satu halaman per tool, URL bersih tanpa ekstensi (`.html` sudah usang — dipakai justru oleh situs yang paling tua).
- Berat halaman tool < 200 KB, library di-lazy-load per tool (sesuai planning).
- Tanpa iframe iklan di dalam area tool; kalau iklan dipasang nanti, letakkan di luar viewport area kerja.

---

## 9. Nama & Domain (hasil pengecekan 18 Sep 2026)

Dicek lewat RDAP (404 = belum terdaftar, 200 = sudah terdaftar):

| Domain | Status | Catatan |
|---|---|---|
| formatkit.io | **belum terdaftar** | Kandidat terkuat — cocok untuk tools developer |
| formatkit.net | **belum terdaftar** | Cadangan |
| formatkit.id | **belum terdaftar** | Untuk pasar Indonesia |
| formatkit.co.id | **belum terdaftar** | Untuk badan usaha lokal |
| devformat.io | belum terdaftar | Alternatif nama |
| formatify.io | belum terdaftar | Alternatif nama |
| formatkit.com | terdaftar (registrar HiChina/Alibaba) | — |
| formatkit.dev | terdaftar (Name.com) | — |
| formatkit.app | terdaftar (Cloudflare) | — |

Catatan penting: status "belum terdaftar" dari RDAP **bukan** jaminan harga normal — domain bisa belum terdaftar tapi premium, atau terdaftar setelah pengecekan ini. Verifikasi akhir harus di registrar sebelum diputuskan.

Rekomendasi: **formatkit.io** sebagai domain utama + **formatkit.id** untuk versi Indonesia. Kalau nama "FormatKit" dipakai, periksa dulu merek terdaftar (DJKI) dan nama paket npm/GitHub agar tidak menabrak yang sudah ada.

---

## 10. Risiko & Hal yang Perlu Dipantau

1. **FreeFormatter bisa hidup kembali.** Kalau ia pulih, jendela peluang menyempit dalam hitungan hari. Karena itu halaman "alternatif FreeFormatter" dan tool warisannya sebaiknya dikerjakan lebih awal, bukan di Fase 4.
2. **Pesaing besar bisa membaik soal privasi.** Kalau JSONFormatter/CodeBeautify menghapus fitur share-link dan mengumumkan "client-side processing", pembeda terkuat kita melemah. Antisipasi: perkuat pembeda lain (bahasa Indonesia, kecepatan, data lokal) sejak awal.
3. **Perubahan algoritma Google.** Situs yang bertumpu pada 1.600 halaman tipis rentan terhadap update kualitas; strategi kita (lebih sedikit tapi lebih dalam + konten berbahasa Indonesia) justru lebih tahan.
4. **Kesalahan yang harus dihindari sejak awal:** jangan pernah menyimpan input user di server, jangan membuat URL hasil yang bisa diprediksi, jangan membuat halaman daftar hasil publik. Satu kesalahan di sini akan menghapus seluruh keunggulan posisi kita.

---

## 11. Langkah Berikutnya (Fase 0 lanjutan)

1. Susun wireframe kasar: layout tool (area input–output + panel opsi), header, daftar tool, halaman artikel per tool.
2. Putuskan nama & domain (verifikasi harga registrar untuk formatkit.io/formatkit.id).
3. Kunci daftar tools final 7 MVP + 8–10 Fase 2 berdasarkan tabel di §8, termasuk prioritas "warisan FreeFormatter" dan "data referensi Indonesia".
4. Tulis 3 artikel pertama dalam bahasa Indonesia (format JSON, kenapa jangan menempel kredensial ke tool online, daftar alternatif FreeFormatter) — ini bisa hidup bahkan sebelum toolnya lengkap.

---

## Lampiran A — Reproduksi Riset

Perintah inti yang dipakai (dapat dijalankan ulang untuk memverifikasi angka di atas):

```
# Inventaris tool dari sitemap
curl -s https://codebeautify.org/sitemap.xml | grep -o '<loc>[^<]*' | wc -l      # 1201
curl -s https://jsonformatter.org/sitemap.xml | grep -o '<loc>[^<]*' | wc -l     # 1643
curl -s https://extendsclass.com/sitemap.xml | grep -o '<loc>[^<]*' | wc -l      # 110
curl -s https://jsonlint.com/sitemap.xml | grep -o '<loc>[^<]*' | wc -l          # 147

# Status FreeFormatter (halaman parkir = 2177 byte)
curl -s https://www.freeformatter.com/ | wc -c

# Riwayat mati FreeFormatter dari arsip
curl -s "http://web.archive.org/cdx/search/cdx?url=freeformatter.com&fl=timestamp,length,statuscode&from=20260601"

# Daftar tool historis FreeFormatter
curl -s "http://web.archive.org/cdx/search/cdx?url=freeformatter.com*&fl=original&collapse=urlkey&filter=original:.*\.html$"

# Ketersediaan domain (404 = belum terdaftar)
curl -s -o /dev/null -w "%{http_code}\n" https://rdap.org/domain/formatkit.io
```

Pengukuran performa diambil lewat browser sungguhan memakai `PerformanceNavigationTiming` dan daftar resource (jumlah request, ukuran transfer, iframe), satu sampel per halaman pada 18 Sep 2026 dari jaringan Indonesia.

**Sumber pemberitaan insiden:** The Hacker News (25 Nov 2025), SecurityAffairs (28 Nov 2025), CyberPress, Intelligence X blog — semuanya merujuk riset watchTowr Labs.
