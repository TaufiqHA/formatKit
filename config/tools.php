<?php

/*
 | Katalog tool: satu-satunya sumber kebenaran untuk navigasi, daftar di
 | halaman depan, dan pendaftaran route. Menambah tool baru = menambah entri
 | di sini + satu view di resources/views/tools/.
 |
 | status:
 |   ready   -> halaman sudah ada, route didaftarkan, tautan bisa diklik
 |   planned -> tampil sebagai roadmap (badge "segera"), tidak ada route
 |
 | accent dipakai untuk warna blok di UI; nilai yang valid ada di
 | resources/views/components/ui/badge.blade.php (tempat class Tailwind ditulis).
 */

return [
    'categories' => [
        'Format & Validasi' => [
            'accent' => 'wave',
            'blurb' => 'Rapikan dan validasi data terstruktur tanpa mengirim isinya ke server.',
        ],
        'Encode & Decode' => [
            'accent' => 'mint',
            'blurb' => 'Konversi representasi data bolak-balik, semuanya di sisi browser.',
        ],
        'Hash & Generator' => [
            'accent' => 'sun',
            'blurb' => 'Buat hash, UUID, dan ekspresi terjadwal langsung dari browser.',
        ],
        'Konversi Data' => [
            'accent' => 'punch',
            'blurb' => 'Ubah satu format ke format lain, termasuk pasangan yang jarang disediakan.',
        ],
        'Teks & Utilitas' => [
            'accent' => 'acid',
            'blurb' => 'Alat bantu untuk teks, pola pencarian, dan pemeriksaan harian.',
        ],
        'Data Referensi' => [
            'accent' => 'paper-dim',
            'blurb' => 'Daftar data siap pakai untuk kebutuhan formulir dan pengembangan aplikasi lokal.',
        ],
    ],

    'tools' => [
        'json-formatter' => [
            'name' => 'JSON Formatter & Validator',
            'short_name' => 'JSON Formatter',
            'tagline' => 'Rapikan, validasi, dan perkecil JSON langsung di browser.',
            'description' => 'Format dan validasi JSON online. Tempel JSON, dapatkan hasil rapi dengan indentasi 2 spasi, 4 spasi, atau tab, plus pesan error yang menunjukkan baris dan kolom. Diproses di browser, data tidak dikirim ke server.',
            'category' => 'Format & Validasi',
            'keywords' => 'json, json formatter, json validator, beautify, pretty print, minify, format json',
            'status' => 'ready',
            'view' => 'tools.json-formatter',
            'script' => 'resources/js/tools/json-formatter.js',
            'how_to' => [
                'Tempel JSON ke panel <strong>Input</strong>, atau klik <strong>Contoh</strong> untuk mencoba dengan data uji.',
                'Klik <strong>Format</strong> untuk merapikan, <strong>Minify</strong> untuk memadatkan, atau <strong>Validasi</strong> bila hanya ingin memeriksa.',
                'Klik <strong>Urutkan kunci</strong> untuk menyusun kunci objek dari A ke Z — berguna saat membandingkan dua respons API.',
                'Salin hasilnya lewat <strong>Salin hasil</strong>, atau unduh sebagai berkas <code>.json</code>.',
            ],
            'faq' => [
                ['q' => 'Apakah data JSON saya dikirim ke server?', 'a' => 'Tidak. Seluruh proses memakai JSON.parse dan JSON.stringify di browser Anda.'],
                ['q' => 'Pesan error menunjuk baris dan kolom — dari mana?', 'a' => 'Dari posisi karakter yang gagal dibaca parser. Pesan seperti "baris 3, kolom 5" bisa langsung Anda cari di panel input.'],
                ['q' => 'Penyebab error JSON yang paling sering apa?', 'a' => 'Koma berlebih di akhir objek atau array, tanda kutip tunggal, komentar, dan kunci tanpa tanda kutip — ketiganya tidak diizinkan dalam JSON yang sah.'],
                ['q' => 'Berapa besar berkas JSON yang bisa diproses?', 'a' => 'Beberapa megabyte masih nyaman. Karena diproses di sisi klien, kecepatannya bergantung pada perangkat Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan Lengkap JSON: Standar RFC 8259 dan Praktik Terbaik',
                'intro' => 'JSON (JavaScript Object Notation) adalah format pertukaran data standar terbuka berbasis teks yang bersifat ringan, independen dari bahasa pemrograman, dan mudah dibaca oleh manusia maupun mesin.',
                'sections' => [
                    [
                        'heading' => 'Struktur dan Tipe Data yang Sah dalam JSON',
                        'content' => 'Sesuai spesifikasi resmi <code>RFC 8259</code>, JSON hanya mendukung 6 tipe data dasar: <strong>String</strong> (harus dibungkus tanda kutip ganda <code>"..."</code>), <strong>Number</strong> (integer atau floating point tanpa koma desimal), <strong>Boolean</strong> (<code>true</code> atau <code>false</code> huruf kecil), <strong>Null</strong> (<code>null</code>), <strong>Array</strong> (urutan nilai dalam <code>[...]</code>), dan <strong>Object</strong> (koleksi pasangan kunci-nilai dalam <code>{...}</code>).',
                    ],
                    [
                        'heading' => 'Perbedaan Utama JSON dengan Objek JavaScript Biasa',
                        'content' => 'Banyak pengembang menganggap JSON identik dengan literal objek JavaScript. Kenyataannya, JSON jauh lebih ketat: nama kunci (key) wajib dibungkus tanda kutip ganda (tidak boleh kutip tunggal atau tanpa kutip), tidak mendukung komentar (<code>//</code> atau <code>/* */</code>), tidak boleh ada fungsi, dan dilarang menyertakan <em>trailing comma</em> (koma di akhir elemen).',
                    ],
                    [
                        'heading' => 'Penyebab Umum JSON Parse Error',
                        'content' => 'Tiga kesalahan paling sering saat memvalidasi JSON adalah: <strong>1) Trailing Comma</strong>, misalnya <code>{"a": 1,}</code>; <strong>2) Kutip Tunggal</strong>, misalnya <code>{\'nama\': \'budi\'}</code>; dan <strong>3) Karakter Kontrol</strong> tanpa escape seperti tab atau baris baru di dalam nilai string literal.',
                    ],
                ],
            ],
        ],
        'xml-formatter' => [
            'name' => 'XML Formatter & Validator',
            'short_name' => 'XML Formatter',
            'tagline' => 'Rapikan XML dan temukan tag yang tidak seimbang.',
            'description' => 'Format dan validasi XML online dengan indentasi yang bisa diatur dan penunjuk baris error.',
            'category' => 'Format & Validasi',
            'keywords' => 'xml, xml formatter, xml validator, beautify xml',
            'status' => 'ready',
            'view' => 'tools.xml-formatter',
            'script' => 'resources/js/tools/xml-formatter.js',
            'how_to' => [
                'Tempel XML ke panel <strong>Input</strong>, atau klik <strong>Contoh</strong> untuk data uji.',
                'Klik <strong>Format</strong> untuk merapikan, atau <strong>Minify</strong> untuk menghapus spasi antar tag.',
                'Klik <strong>Validasi</strong> bila hanya ingin memeriksa keseimbangan tag.',
                'Atur kedalaman indentasi (2 spasi, 4 spasi, atau tab) sesuai gaya proyek Anda.',
            ],
            'faq' => [
                ['q' => 'Apakah komentar, CDATA, dan namespace tetap utuh?', 'a' => 'Ya. Dokumen dibaca ulang sebagai pohon XML oleh parser bawaan browser, jadi namespace, komentar, CDATA, dan atribut dipertahankan — hanya spasi antar elemen yang dirapikan.'],
                ['q' => 'Kenapa referensi seperti &#65; berubah menjadi A?', 'a' => 'Karena hasil ditulis ulang dari pohon XML, referensi karakter dikembalikan ke bentuk karakternya. Isi dokumen tetap sama.'],
                ['q' => 'Berapa besar XML yang bisa diproses?', 'a' => 'Beberapa megabyte masih nyaman. Karena diproses di browser, kecepatannya bergantung pada perangkat Anda.'],
                ['q' => 'Apakah XML saya dikirim ke server?', 'a' => 'Tidak. Tidak ada request yang membawa isi input Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan XML: Dokumen Well-Formed, Validasi, dan Struktur Data',
                'intro' => 'XML (Extensible Markup Language) adalah bahasa markup yang dirancang untuk menyimpan dan mentransportasikan data terstruktur dengan fokus pada kesederhanaan, keterbacaan, dan interoperabilitas.',
                'sections' => [
                    [
                        'heading' => 'Perbedaan Dokumen Well-Formed dan Valid',
                        'content' => 'Sebuah dokumen XML disebut <strong>Well-Formed</strong> jika mematuhi sintaks dasar XML: memiliki tepat satu elemen akar (root element), semua tag pembuka memiliki tag penutup yang berpasangan dan bersarang rapi, nama elemen peka huruf besar-kecil (case-sensitive), dan semua nilai atribut diapit tanda kutip. Dokumen disebut <strong>Valid</strong> jika selain well-formed, ia juga mematuhi skema DTD atau XSD yang ditentukan.',
                    ],
                    [
                        'heading' => 'Penanganan Karakter Khusus dan CDATA',
                        'content' => 'Dalam XML, lima karakter khusus harus di-escape agar tidak mengacaukan parser: <code>&lt;</code> (&amp;lt;), <code>&gt;</code> (&amp;gt;), <code>&amp;</code> (&amp;amp;), <code>"</code> (&amp;quot;), dan <code>\'</code> (&amp;apos;). Jika Anda perlu memasukkan teks besar yang sarat karakter markup (seperti potongan skrip atau kode HTML), gunakan blok <code>&lt;![CDATA[ ... ]]&gt;</code>.',
                    ],
                ],
            ],
        ],
        'html-formatter' => [
            'name' => 'HTML Formatter',
            'short_name' => 'HTML Formatter',
            'tagline' => 'Rapikan markup HTML yang berantakan.',
            'description' => 'Format HTML online dengan indentasi konsisten, plus mode minify untuk produksi.',
            'category' => 'Format & Validasi',
            'keywords' => 'html, html formatter, html beautifier, minify html',
            'status' => 'planned',
        ],
        'sql-formatter' => [
            'name' => 'SQL Formatter',
            'short_name' => 'SQL Formatter',
            'tagline' => 'Bikin query panjang terbaca lagi.',
            'description' => 'Format query SQL dengan pilihan kapitalisasi kata kunci dan indentasi yang bisa diatur.',
            'category' => 'Format & Validasi',
            'keywords' => 'sql, sql formatter, query formatter, beautify sql, minify sql',
            'status' => 'ready',
            'view' => 'tools.sql-formatter',
            'script' => 'resources/js/tools/sql-formatter.js',
            'how_to' => [
                'Tempel kueri SQL ke panel <strong>Query SQL</strong>, atau klik <strong>Contoh</strong> untuk mencoba kueri uji.',
                'Klik <strong>Format</strong> untuk merapikan klausa, atau <strong>Minify</strong> untuk memadatkan menjadi satu baris.',
                'Atur opsi <strong>Indentasi</strong> (2 spasi, 4 spasi, atau tab) dan <strong>Kata Kunci</strong> (HURUF BESAR, huruf kecil, atau biarkan aslinya).',
                'Salin hasil query lewat <strong>Salin hasil</strong> atau unduh sebagai berkas <code>.sql</code>.',
            ],
            'faq' => [
                ['q' => 'Apakah query SQL saya dikirim ke server?', 'a' => 'Tidak. Pemformatan dijalankan 100% di browser Anda, sehingga skema database dan data rahasia Anda tetap aman.'],
                ['q' => 'Dialek database apa saja yang didukung?', 'a' => 'Standar ANSI SQL, MySQL, PostgreSQL, SQLite, dan MariaDB didukung untuk klausa umum seperti SELECT, INSERT, UPDATE, DELETE, JOIN, dan subquery.'],
                ['q' => 'Apakah komentar SQL dipertahankan saat diformat?', 'a' => 'Ya. Komentar satu baris (-- atau #) dan komentar blok (/* */) tetap dipertahankan saat menggunakan fungsi Format.'],
            ],
            'guide' => [
                'title' => 'Panduan SQL Formatter: Kerapian Kueri dan Standar Basis Data',
                'intro' => 'Structured Query Language (SQL) adalah bahasa standar untuk berinteraksi dengan sistem manajemen basis data relasional (RDBMS) seperti MySQL, PostgreSQL, MariaDB, SQLite, dan SQL Server.',
                'sections' => [
                    [
                        'heading' => 'Mengapa Format Kueri SQL Sangat Krusial?',
                        'content' => 'Kueri SQL yang panjang dan berantakan sering kali menyembunyikan kesalahan logika fatal, seperti kondisi <code>WHERE</code> yang salah kurung, klausul <code>JOIN</code> tanpa kondisi <code>ON</code> yang memicu perkalian Cartesian, atau subquery bertingkat yang tidak teratur. Pemformatan dengan indentasi yang konsisten mempermudah *code review* dan proses *debugging*.',
                    ],
                    [
                        'heading' => 'Konvensi Huruf Besar untuk Kata Kunci (Keyword Casing)',
                        'content' => 'Meskipun mesin SQL bersifat *case-insensitive* terhadap kata kunci, standar industri merekomendasikan penulisan kata kunci (seperti <code>SELECT</code>, <code>FROM</code>, <code>WHERE</code>, <code>INNER JOIN</code>) dalam huruf kapital (UPPERCASE) dan nama tabel/kolom dalam huruf kecil (*snake_case*). Konvensi ini langsung membedakan instruksi sintaks dengan identitas data.',
                    ],
                ],
            ],
        ],
        'css-formatter' => [
            'name' => 'CSS Formatter & Minifier',
            'short_name' => 'CSS Formatter',
            'tagline' => 'Rapikan atau padatkan CSS.',
            'description' => 'Format CSS agar mudah dibaca, atau minify untuk mengecilkan ukuran berkas.',
            'category' => 'Format & Validasi',
            'keywords' => 'css, css formatter, css minifier, beautify css, minify css',
            'status' => 'ready',
            'view' => 'tools.css-formatter',
            'script' => 'resources/js/tools/css-formatter.js',
            'how_to' => [
                'Tempel kode CSS ke panel <strong>CSS</strong>, atau gunakan <strong>Contoh</strong>.',
                'Klik <strong>Format</strong> untuk merapikan aturan dan kurung kurawal, atau <strong>Minify</strong> untuk membuang spasi dan komentar.',
                'Atur tingkat indentasi sesuai standar tim Anda.',
                'Salin hasilnya atau unduh sebagai berkas <code>.css</code>.',
            ],
            'faq' => [
                ['q' => 'Apakah aturan bersarang seperti @media didukung?', 'a' => 'Ya. Blok aturan di dalam @media, @keyframes, dan @supports diformat dengan indentasi bertingkat yang rapi.'],
                ['q' => 'Seberapa banyak ukuran CSS yang bisa dihemat dengan Minify?', 'a' => 'Minify menghapus seluruh komentar dan spasi berlebih, biasanya menghemat 20% hingga 50% ukuran berkas mentah.'],
                ['q' => 'Apakah ada request jaringan saat memformat?', 'a' => 'Tidak. Semua proses parsing dan pemadatan terjadi di memori browser Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan CSS: Format, Minifikasi, dan Pengaruhnya terhadap Web Vitals',
                'intro' => 'Cascading Style Sheets (CSS) mengatur tata letak, warna, tipografi, dan pengalaman visual antarmuka web. Menjaga CSS tetap terstruktur dan terkompresi sangat penting bagi efisiensi beban kerja peramban.',
                'sections' => [
                    [
                        'heading' => 'Format untuk Pengembangan vs Minify untuk Produksi',
                        'content' => 'Saat tahap pengembangan (development), CSS terformat dengan indentasi dan jeda baris sangat diperlukan agar mudah dikelola dan ditinjau dalam kontrol versi (Git). Namun untuk tahap produksi (production), CSS wajib di-minify: menghapus komentar, spasi ekstra, dan titik koma mubazir guna memangkas ukuran berkas yang dikirim melalui jaringan.',
                    ],
                    [
                        'heading' => 'Dampak Ukuran CSS terhadap First Contentful Paint (FCP)',
                        'content' => 'CSS adalah sumber daya pemblokir render (*render-blocking resource*). Peramban web tidak akan merender halaman sampai berkas CSS selesai diunduh dan diproses menjadi CSSOM. Memadatkan CSS secara langsung mempercepat metrik Core Web Vitals, khususnya <strong>First Contentful Paint (FCP)</strong> dan <strong>Largest Contentful Paint (LCP)</strong>.',
                    ],
                ],
            ],
        ],
        'javascript-formatter' => [
            'name' => 'JavaScript Formatter & Minifier',
            'short_name' => 'JS Formatter',
            'tagline' => 'Rapikan JavaScript tanpa mengubah perilakunya.',
            'description' => 'Format, validasi sintaks, dan minify JavaScript langsung di browser.',
            'category' => 'Format & Validasi',
            'keywords' => 'javascript, js formatter, js beautifier, minify javascript, js validator',
            'status' => 'ready',
            'view' => 'tools.javascript-formatter',
            'script' => 'resources/js/tools/javascript-formatter.js',
            'how_to' => [
                'Tempel skrip JavaScript ke panel <strong>JavaScript</strong>.',
                'Klik <strong>Format</strong> untuk merapikan indentasi blok kurung kurawal.',
                'Klik <strong>Validasi</strong> untuk mendeteksi kesalahan sintaks kode tanpa menjalankannya.',
                'Klik <strong>Minify</strong> bila ingin membuang komentar dan memadatkan kode untuk produksi.',
                'Salin atau unduh berkas <code>.js</code> yang sudah selesai.',
            ],
            'faq' => [
                ['q' => 'Apakah kode JavaScript saya dieksekusi di browser?', 'a' => 'Tidak. Validasi hanya memeriksa pohon parsing sintaks tanpa memicu eksekusi logika aplikasi Anda.'],
                ['q' => 'Apakah template string dan komentar aman?', 'a' => 'Ya. Tokenizer mempertahankan literal string template, kutip, dan regex tanpa merusak isinya.'],
                ['q' => 'Apakah data kode dikirim ke server?', 'a' => 'Sama sekali tidak. Prosesnya 100% lokal di browser pengguna.'],
            ],
            'guide' => [
                'title' => 'Panduan JavaScript Formatter: Keterbacaan Kode dan Validasi Sintaks',
                'intro' => 'JavaScript adalah bahasa pemrograman dinamis utama yang menggerakkan interaktivitas web modern. Pemformatan kode yang rapi dan deteksi dini galat sintaks mencegah bug yang sulit dilacak di lingkungan produksi.',
                'sections' => [
                    [
                        'heading' => 'Struktur Blok dan Hierarki Indentasi',
                        'content' => 'Kode JavaScript yang bersih mengandalkan indentasi konsisten (umumnya 2 atau 4 spasi) untuk setiap blok kurung kurawal (fungsi, kondisional <code>if/else</code>, perulangan <code>for/while</code>, dan deklarasi kelas). Hal ini mencegah kebingungan cakupan variabel (*variable scope*) dan penutupan fungsi (*closure*).',
                    ],
                    [
                        'heading' => 'Validasi Sintaks Tanpa Eksekusi (Safe AST Parsing)',
                        'content' => 'Banyak tool online yang salah mengevaluasi JavaScript menggunakan <code>eval()</code>, yang berisiko mengeksekusi kode berbahaya. Tool FormatKit menggunakan validasi deklaratif yang hanya memeriksa validitas pohon sintaks tanpa pernah mengeksekusi perintah di dalam memori, sehingga aman untuk menguji potongan kode apa pun.',
                    ],
                ],
            ],
        ],

        'base64' => [
            'name' => 'Base64 Encode / Decode',
            'short_name' => 'Base64',
            'tagline' => 'Ubah teks menjadi Base64 dan sebaliknya.',
            'description' => 'Encode dan decode Base64 online, termasuk dukungan UTF-8 dan mode URL-safe.',
            'category' => 'Encode & Decode',
            'keywords' => 'base64, base64 encode, base64 decode, url safe base64',
            'status' => 'ready',
            'view' => 'tools.base64',
            'script' => 'resources/js/tools/base64.js',
            'how_to' => [
                'Tempel teks biasa untuk <strong>Encode</strong>, atau Base64 untuk <strong>Decode</strong>.',
                'Tombol <strong>Otomatis</strong> menebak mode dari isi input — praktis kalau Anda menemukan string Base64 tanpa keterangan.',
                'Centang <strong>Base64 URL-safe</strong> bila hasilnya akan dipakai di URL, nama berkas, atau JWT.',
                'Salin atau unduh hasilnya lewat tombol di bilah atas.',
            ],
            'faq' => [
                ['q' => 'Kenapa hasil encode jadi sekitar sepertiga lebih panjang?', 'a' => 'Base64 mengubah 3 byte menjadi 4 karakter. Teks non-ASCII juga memakai lebih dari satu byte UTF-8, jadi hasilnya bisa lebih panjang lagi.'],
                ['q' => 'Decode gagal dengan pesan "bukan teks UTF-8" — kenapa?', 'a' => 'Isi Base64 tersebut kemungkinan data biner seperti gambar atau arsip. Centang "izinkan data biner" untuk melihat hasilnya sebagai teks dengan karakter pengganti.'],
                ['q' => 'Apa itu Base64 URL-safe?', 'a' => 'Varian yang mengganti + menjadi -, / menjadi _, dan menghapus padding =, supaya aman dipakai di dalam URL atau nama berkas.'],
                ['q' => 'Apakah teks saya dikirim ke server?', 'a' => 'Tidak. Encode dan decode memakai fungsi bawaan browser (btoa/atob), jadi tidak ada data yang keluar dari perangkat Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan Base64: Skema Encoding Biner ke Teks (RFC 4648)',
                'intro' => 'Base64 adalah kelompok skema encoding biner-ke-teks yang merepresentasikan data biner dalam urutan karakter ASCII menggunakan 64 simbol terpilih.',
                'sections' => [
                    [
                        'heading' => 'Cara Kerja Konversi 3 Byte Menjadi 4 Karakter',
                        'content' => 'Sesuai spesifikasi <code>RFC 4648</code>, Base64 mengambil setiap 3 byte (24 bit) data biner dan membaginya menjadi 4 kelompok 6-bit. Setiap nilai 6-bit (bernilai antara 0 hingga 63) dipetakan ke dalam karakter alfabet (A-Z, a-z, 0-9, serta tanda + dan /). Jika total byte tidak kelipatan 3, karakter padding <code>=</code> ditambahkan di akhir.',
                    ],
                    [
                        'heading' => 'Apa Itu Varian Base64 URL-Safe?',
                        'content' => 'Karakter standar <code>+</code> dan <code>/</code> memiliki arti khusus dalam query string URL dan nama berkas. Varian <strong>URL-Safe</strong> mengganti <code>+</code> dengan tanda hubung <code>-</code>, <code>/</code> dengan garis bawah <code>_</code>, dan membuang padding <code>=</code>. Varian ini lazim dipakai pada JSON Web Token (JWT) dan webhook payload.',
                    ],
                ],
            ],
        ],
        'url-encoder' => [
            'name' => 'URL Encode / Decode',
            'short_name' => 'URL Encoder',
            'tagline' => 'Persen-encode URL dan query string.',
            'description' => 'Encode dan decode komponen URL, termasuk mode encodeURIComponent dan encodeURI.',
            'category' => 'Encode & Decode',
            'keywords' => 'url encode, url decode, percent encoding, query string',
            'status' => 'ready',
            'view' => 'tools.url-encoder',
            'script' => 'resources/js/tools/url-encoder.js',
            'how_to' => [
                'Tempel URL atau nilai parameter ke panel <strong>Input</strong>.',
                'Pilih mode: <strong>Komponen</strong> (encodeURIComponent) untuk satu nilai, atau <strong>URL utuh</strong> (encodeURI) untuk alamat lengkap.',
                'Klik <strong>Encode</strong> atau <strong>Decode</strong>.',
                'Tombol <strong>Baca parameter</strong> memecah query string menjadi daftar <code>kunci = nilai</code>.',
            ],
            'faq' => [
                ['q' => 'Apa bedanya mode komponen dan URL utuh?', 'a' => 'Mode komponen meng-encode semua karakter khusus termasuk / ? & =, jadi cocok untuk satu nilai. Mode URL utuh membiarkan pemisah struktur URL apa adanya.'],
                ['q' => 'Kenapa spasi menjadi %20, bukan +?', 'a' => '%20 adalah bentuk resmi dalam standar URL. Tanda + hanya konvensi pengiriman form HTML, jadi kami tidak memakainya.'],
                ['q' => 'Decode gagal dengan pesan "escape tidak sah"?', 'a' => 'Artinya ada tanda % yang tidak diikuti dua digit heksadesimal, misalnya "%ZZ" atau "%" di akhir teks.'],
                ['q' => 'Apakah URL saya dicatat?', 'a' => 'Tidak. Seluruh proses berjalan di browser; tidak ada permintaan jaringan yang membawa isi input Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan URL Encoding: Persen-Encoding Standar RFC 3986',
                'intro' => 'URL Encoding (atau Percent-Encoding) adalah mekanisme untuk mengodekan informasi di dalam Uniform Resource Identifier (URI) agar tidak disalahartikan oleh server atau protokol internet.',
                'sections' => [
                    [
                        'heading' => 'Perbedaan encodeURI vs encodeURIComponent',
                        'content' => 'Fungsi <code>encodeURI</code> digunakan untuk meng-encode URL utuh karena membiarkan karakter pemisah protokol seperti <code>:</code>, <code>/</code>, <code>?</code>, dan <code>#</code> tetap apa adanya. Sebaliknya, <code>encodeURIComponent</code> meng-encode semua karakter khusus termasuk pemisah tersebut, sehingga wajib digunakan saat menyisipkan satu nilai parameter ke dalam query string.',
                    ],
                    [
                        'heading' => 'Kenapa Spasi Menjadi %20 atau +?',
                        'content' => 'Sesuai standar resmi <code>RFC 3986</code>, representasi spasi adalah <code>%20</code>. Tanda <code>+</code> hanya merupakan konvensi lama pengiriman formulir HTML tipe <code>application/x-www-form-urlencoded</code> dan sering memicu bug jika digunakan sembarangan di luar pengiriman form web.',
                    ],
                ],
            ],
        ],
        'html-entities' => [
            'name' => 'HTML Entity Encode / Decode',
            'short_name' => 'HTML Entities',
            'tagline' => 'Ubah karakter khusus jadi entitas HTML.',
            'description' => 'Encode dan decode entitas HTML untuk mencegah markup rusak atau celah XSS.',
            'category' => 'Encode & Decode',
            'keywords' => 'html entity, html encode, html decode, escape html',
            'status' => 'ready',
            'view' => 'tools.html-entities',
            'script' => 'resources/js/tools/html-entities.js',
            'how_to' => [
                'Tempel teks atau potongan markup ke panel <strong>Input</strong>.',
                'Klik <strong>Encode</strong>. Pilih entitas <strong>bernama</strong> (&amp;amp;) atau <strong>numerik</strong> (&amp;#38;).',
                'Centang <strong>ASCII saja</strong> bila hasilnya harus aman di encoding lama.',
                'Klik <strong>Decode</strong> untuk mengembalikan entitas menjadi karakter aslinya.',
            ],
            'faq' => [
                ['q' => 'Kapan perlu meng-encode entitas HTML?', 'a' => 'Saat menampilkan potongan kode di halaman web agar tidak dirender sebagai markup, dan saat menulis nilai pengguna ke HTML untuk mencegah XSS.'],
                ['q' => 'Entitas apa saja yang bisa di-decode?', 'a' => 'Sekitar 45 entitas bernama yang umum dipakai, ditambah semua referensi numerik desimal (&#38;) maupun heksadesimal (&#x26;).'],
                ['q' => 'Apakah markup yang ditempel bisa dieksekusi?', 'a' => 'Tidak. Decode memakai peta entitas, bukan parser DOM, jadi tidak ada script atau tag yang dijalankan.'],
                ['q' => 'Teks saya dikirim ke server?', 'a' => 'Tidak. Prosesnya murni di browser tanpa permintaan jaringan.'],
            ],
            'guide' => [
                'title' => 'Panduan Entitas HTML: Mencegah XSS dan Menjaga Integritas Markup',
                'intro' => 'Entitas HTML adalah potongan teks khusus yang dipakai untuk menampilkan karakter reservasi atau karakter tak terlihat di halaman web tanpa memicu perenderan tag oleh peramban.',
                'sections' => [
                    [
                        'heading' => 'Peran Entitas dalam Mencegah Serangan XSS',
                        'content' => 'Cross-Site Scripting (XSS) terjadi saat input pengguna yang tidak disanitasi dirender langsung sebagai markup HTML. Mengonversi karakter berbahaya seperti <code>&lt;</code> menjadi <code>&amp;lt;</code> dan <code>&gt;</code> menjadi <code>&amp;gt;</code> memastikan peramban menampilkan karakter tersebut sebagai teks biasa, bukan sebagai eksekusi skrip.',
                    ],
                    [
                        'heading' => 'Entitas Bernama vs Referensi Karakter Numerik',
                        'content' => 'Entitas bernama seperti <code>&amp;copy;</code> (&copy;) atau <code>&amp;euro;</code> (&euro;) mudah dihafal oleh manusia. Namun dalam lingkungan encoding lama atau pertukaran data lintas sistem, referensi karakter numerik desimal (seperti <code>&amp;#169;</code>) atau heksadesimal (<code>&amp;#xA9;</code>) lebih aman dan memiliki dukungan universal.',
                    ],
                ],
            ],
        ],
        'jwt-decoder' => [
            'name' => 'JWT Decoder',
            'short_name' => 'JWT Decoder',
            'tagline' => 'Baca header dan payload JWT.',
            'description' => 'Decode JWT dan lihat header, payload, serta waktu kedaluwarsa tanpa mengirim token ke server. Jangan pernah menempelkan token produksi ke tool yang menyimpan datanya.',
            'category' => 'Encode & Decode',
            'keywords' => 'jwt, jwt decoder, json web token, decode jwt',
            'status' => 'planned',
        ],
        'string-escape' => [
            'name' => 'String Escape / Unescape',
            'short_name' => 'String Escape',
            'tagline' => 'Escape string untuk JSON, JS, dan SQL.',
            'description' => 'Ubah string menjadi bentuk yang aman dipakai di dalam kode JSON, JavaScript, Java, atau SQL.',
            'category' => 'Encode & Decode',
            'keywords' => 'escape string, unescape, escape json, escape sql',
            'status' => 'planned',
        ],

        'hash-generator' => [
            'name' => 'Hash Generator (MD5, SHA-1, SHA-256, SHA-512)',
            'short_name' => 'Hash Generator',
            'tagline' => 'Hitung hash teks atau berkas.',
            'description' => 'Buat hash MD5, SHA-1, SHA-256, dan SHA-512 dari teks maupun berkas, dihitung di browser memakai Web Crypto API.',
            'category' => 'Hash & Generator',
            'keywords' => 'hash generator, md5, sha1, sha256, checksum',
            'status' => 'ready',
            'view' => 'tools.hash-generator',
            'script' => 'resources/js/tools/hash-generator.js',
            'how_to' => [
                'Centang algoritma yang dibutuhkan — boleh lebih dari satu sekaligus.',
                'Tempel teks ke <strong>Input</strong>, atau pilih berkas lewat <strong>Pilih berkas</strong>.',
                'Klik <strong>Hitung hash</strong>; hasilnya tampil sejajar per algoritma.',
                'Salin hasilnya untuk dibandingkan dengan checksum resmi dari situs penyedia unduhan.',
            ],
            'faq' => [
                ['q' => 'Apakah MD5 masih boleh dipakai?', 'a' => 'Untuk keamanan, tidak — MD5 dan SHA-1 sudah dianggap patah. Keduanya masih berguna sebagai checksum berkas atau untuk mencocokkan sistem lama. Untuk password, gunakan bcrypt atau Argon2, bukan hash cepat seperti di halaman ini.'],
                ['q' => 'Kenapa SHA gagal dihitung di lingkungan tertentu?', 'a' => 'SHA-1/256/384/512 memakai Web Crypto API yang hanya aktif di secure context (HTTPS atau localhost). MD5 tetap bekerja karena implementasinya murni JavaScript.'],
                ['q' => 'Apakah berkas yang saya pilih diunggah?', 'a' => 'Tidak. Berkas dibaca di memori browser dan hanya dipakai untuk menghitung hash di perangkat Anda.'],
                ['q' => 'Bisakah menghitung banyak berkas sekaligus?', 'a' => 'Belum. Untuk sekarang satu teks atau satu berkas per perhitungan.'],
            ],
            'guide' => [
                'title' => 'Panduan Hash Kriptografis: Perbedaan MD5, SHA-1, SHA-256, dan SHA-512',
                'intro' => 'Fungsi hash kriptografis adalah algoritma matematika satu arah yang mengubah input teks atau berkas berukuran apa pun menjadi string berkarakter acak dengan panjang tetap.',
                'sections' => [
                    [
                        'heading' => 'Karakteristik Utama Fungsi Hash',
                        'content' => 'Fungsi hash memiliki sifat deterministik (input yang sama selalu menghasilkan hash yang identik), efek *avalanche* (perubahan 1 huruf pada input mengubah total hasil hash), dan bersifat satu arah (mustahil mengembalikan hash menjadi teks asli tanpa *brute force*).',
                    ],
                    [
                        'heading' => 'Kapan MD5 Masih Boleh Digunakan dan Kapan Harus Dihindari?',
                        'content' => 'MD5 dan SHA-1 sudah terbukti rentan terhadap serangan tabrakan (*collision attack*) sehingga <strong>sangat dilarang</strong> untuk keamanan, tanda tangan digital, atau enkripsi kata sandi. Namun, MD5 masih sangat cepat dan praktis dipakai sebagai *checksum* integritas berkas unduhan atau pengelompokan cache.',
                    ],
                ],
            ],
        ],
        'hmac-generator' => [
            'name' => 'HMAC Generator',
            'short_name' => 'HMAC Generator',
            'tagline' => 'Hitung tanda tangan HMAC dengan kunci rahasia.',
            'description' => 'Buat HMAC berbasis SHA-256 dan SHA-512 dari pesan dan kunci rahasia, diproses sepenuhnya di browser.',
            'category' => 'Hash & Generator',
            'keywords' => 'hmac, hmac generator, signature, webhook signature',
            'status' => 'planned',
        ],
        'uuid-generator' => [
            'name' => 'UUID / GUID Generator',
            'short_name' => 'UUID Generator',
            'tagline' => 'Buat UUID v4 dan v7, satu atau sekaligus banyak.',
            'description' => 'Generator UUID v4 dan v7 (time-ordered) dengan opsi buat banyak sekaligus dan salin cepat.',
            'category' => 'Hash & Generator',
            'keywords' => 'uuid, uuid generator, guid, uuid v4, uuid v7',
            'status' => 'ready',
            'view' => 'tools.uuid-generator',
            'script' => 'resources/js/tools/uuid-generator.js',
            'how_to' => [
                'Pilih versi: <strong>v4</strong> (acak) atau <strong>v7</strong> (terurut menurut waktu).',
                'Tentukan jumlah UUID yang ingin dibuat (maksimal 1000 sekaligus).',
                'Atur format: huruf besar, tanpa tanda hubung, atau dibungkus kurung kurawal.',
                'Salin seluruh hasil atau unduh sebagai berkas teks.',
            ],
            'faq' => [
                ['q' => 'Kapan sebaiknya memakai UUID v7?', 'a' => 'Saat UUID dipakai sebagai primary key. v7 memuat timestamp di bagian depan sehingga nilainya terurut menurut waktu — indeks database jadi lebih efisien dibanding v4 yang acak.'],
                ['q' => 'Apakah UUID yang dibuat di sini aman?', 'a' => 'Ya. Nilai acaknya diambil dari crypto.getRandomValues, sumber acak kriptografis bawaan browser, bukan Math.random.'],
                ['q' => 'Apakah UUID saya dicatat di server?', 'a' => 'Tidak. Semuanya dibuat di browser dan tidak dikirim ke mana pun.'],
                ['q' => 'Bisakah membuat UUID tanpa tanda hubung?', 'a' => 'Bisa. Centang opsi "tanpa tanda hubung" — berguna untuk nama berkas atau kolom database bertipe string 32 karakter.'],
            ],
            'guide' => [
                'title' => 'Panduan UUID: Spesifikasi RFC 9562, Perbedaan UUID v4 vs UUID v7',
                'intro' => 'Universally Unique Identifier (UUID) adalah string 128-bit berstandar internasional yang dirancang untuk mengidentifikasi data secara unik di seluruh sistem terdistribusi tanpa koordinasi terpusat.',
                'sections' => [
                    [
                        'heading' => 'Kelemahan UUID v4 pada Database Relasional',
                        'content' => 'UUID v4 murni mengandalkan 122 bit angka acak. Saat digunakan sebagai kunci utama (*primary key*) pada database dengan indeks B-Tree (seperti InnoDB di MySQL atau PostgreSQL), sifat acak v4 menyebabkan fragmentasi halaman disk (*page split*) yang parah karena data baru disisipkan secara acak di tengah-tengah pohon indeks.',
                    ],
                    [
                        'heading' => 'Mengapa UUID v7 Menjadi Standar Baru?',
                        'content' => 'Diresmikan dalam <code>RFC 9562</code>, UUID v7 menyematkan *timestamp* Unix milidetik pada 48 bit pertama, diikuti angka acak pada bit sisanya. Hasilnya adalah UUID yang <strong>terurut menurut waktu (time-ordered)</strong>, menghasilkan efisiensi indeks basis data yang setara dengan auto-increment integer tradisional.',
                    ],
                ],
            ],
        ],
        'cron-generator' => [
            'name' => 'Cron Expression Generator',
            'short_name' => 'Cron Generator',
            'tagline' => 'Susun ekspresi cron dan baca artinya.',
            'description' => 'Buat dan uji ekspresi cron, lengkap dengan penjelasan waktu jalan dalam bahasa manusia.',
            'category' => 'Hash & Generator',
            'keywords' => 'cron, cron expression, cron generator, crontab, quartz',
            'status' => 'planned',
        ],

        'csv-to-json' => [
            'name' => 'CSV ke JSON / JSON ke CSV Converter',
            'short_name' => 'CSV ⇄ JSON',
            'tagline' => 'Konversi CSV ke JSON dan sebaliknya.',
            'description' => 'Konversi dua arah CSV ke JSON dan JSON ke CSV dengan standar RFC 4180, deteksi pemisah otomatis, dan parsing tipe data.',
            'category' => 'Konversi Data',
            'keywords' => 'csv to json, json to csv, konversi csv, csv converter, rfc 4180',
            'status' => 'ready',
            'view' => 'tools.csv-to-json',
            'script' => 'resources/js/tools/csv-to-json.js',
            'how_to' => [
                'Tempel data CSV atau JSON ke panel <strong>Input</strong>.',
                'Klik <strong>CSV → JSON</strong> untuk mengubah CSV menjadi array JSON, atau <strong>JSON → CSV</strong> untuk mengubah JSON menjadi tabel CSV.',
                'Pilih pemisah kolom (Koma, Titik koma, Tab, atau Pipe) jika ingin menentukan pemisah tertentu.',
                'Centang <strong>Baris 1 Header</strong> agar baris pertama menjadi nama kunci objek JSON.',
                'Salin hasil atau unduh sebagai berkas <code>.json</code> atau <code>.csv</code>.',
            ],
            'faq' => [
                ['q' => 'Apakah format CSV dengan tanda kutip ganda dan baris baru didukung?', 'a' => 'Ya. Parser ini sepenuhnya mematuhi RFC 4180 sehingga tanda kutip ganda di dalam data (""teks"") dan baris baru dalam kutip ditangani dengan benar.'],
                ['q' => 'Bagaimana jika CSV memakai pemisah titik koma (;)?', 'a' => 'Pilih opsi "Otomatis" atau tentukan pemisah "Titik Koma (;)" pada menu dropdown pemisah.'],
                ['q' => 'Apakah data tabel saya aman dari kebocoran?', 'a' => 'Sangat aman. Pemrosesan CSV dan JSON sepenuhnya berlangsung di perangkat Anda tanpa ada pengiriman data ke server mana pun.'],
            ],
            'guide' => [
                'title' => 'Panduan Konversi CSV & JSON: Standar RFC 4180 dan Pemetaan Tabel',
                'intro' => 'CSV (Comma-Separated Values) adalah format tabular berbasis baris untuk data lembar sebar (*spreadsheet*), sedangkan JSON adalah format pohon hierarkis standar untuk pertukaran data API.',
                'sections' => [
                    [
                        'heading' => 'Aturan Kritis Tanda Kutip dalam Standar RFC 4180',
                        'content' => 'Sebuah field dalam CSV wajib diapit tanda kutip ganda jika mengandung karakter pemisah (koma), baris baru (CRLF), atau tanda kutip itu sendiri. Jika di dalam nilai terdapat tanda kutip ganda asli, ia harus ditulis ganda berturut-turut (misalnya: <code>"Budi ""Pro"" Abdullah"</code>).',
                    ],
                    [
                        'heading' => 'Deteksi Pemisah Koma (,) vs Titik Koma (;)',
                        'content' => 'Di negara-negara Eropa dan sistem operasi berbahasa Indonesia yang menggunakan koma sebagai pemisah desimal, Microsoft Excel sering mengekspor CSV menggunakan pemisah titik koma (<code>;</code>). Tool FormatKit secara cerdas mendeteksi pemisah yang dominan agar data tabel tidak salah terpecah.',
                    ],
                ],
            ],
        ],
        'json-to-yaml' => [
            'name' => 'JSON ke YAML',
            'short_name' => 'JSON → YAML',
            'tagline' => 'Ubah JSON menjadi YAML yang rapi.',
            'description' => 'Konversi JSON ke YAML dan sebaliknya tanpa kehilangan struktur.',
            'category' => 'Konversi Data',
            'keywords' => 'json to yaml, yaml to json, konversi yaml',
            'status' => 'planned',
        ],
        'xml-to-json' => [
            'name' => 'XML ke JSON',
            'short_name' => 'XML → JSON',
            'tagline' => 'Ubah dokumen XML menjadi JSON.',
            'description' => 'Konversi XML ke JSON dengan penanganan atribut dan namespace yang bisa diatur.',
            'category' => 'Konversi Data',
            'keywords' => 'xml to json, konversi xml, xml converter',
            'status' => 'planned',
        ],
        'timestamp-converter' => [
            'name' => 'Unix Timestamp Converter',
            'short_name' => 'Timestamp Converter',
            'tagline' => 'Ubah epoch ke tanggal dan sebaliknya.',
            'description' => 'Konversi Unix timestamp ke tanggal ISO dan waktu lokal Indonesia, serta sebaliknya.',
            'category' => 'Konversi Data',
            'keywords' => 'unix timestamp, epoch converter, tanggal iso, timestamp online',
            'status' => 'planned',
        ],

        'word-counter' => [
            'name' => 'Penghitung Kata & Pengubah Kapitalisasi',
            'short_name' => 'Word Counter',
            'tagline' => 'Hitung kata, karakter, dan ubah besar-kecil huruf.',
            'description' => 'Hitung jumlah kata, karakter, kalimat, dan paragraf, plus ubah teks ke huruf besar, kecil, judul, camelCase, atau slug.',
            'category' => 'Teks & Utilitas',
            'keywords' => 'word counter, karakter, case converter, hitung kata, penghitung kata, slug generator',
            'status' => 'ready',
            'view' => 'tools.word-counter',
            'script' => 'resources/js/tools/word-counter.js',
            'how_to' => [
                'Ketik atau tempel teks ke panel <strong>Teks Asli</strong>.',
                'Lihat statistik kata, karakter, kalimat, paragraf, dan estimasi waktu baca secara langsung di bagian atas.',
                'Klik tombol format kasus seperti <strong>UPPERCASE</strong>, <strong>Title Case</strong>, <strong>camelCase</strong>, atau <strong>kebab-case</strong> untuk mengubah gaya teks.',
                'Klik <strong>Salin hasil</strong> untuk menggunakan teks hasil modifikasi.',
            ],
            'faq' => [
                ['q' => 'Bagaimana waktu baca dan waktu bicara dihitung?', 'a' => 'Estimasi waktu baca menggunakan acuan rata-rata 200 kata per menit, sedangkan waktu bicara menggunakan acuan 130 kata per menit.'],
                ['q' => 'Apakah teks non-Latin atau beraksara khusus didukung?', 'a' => 'Ya. Algoritma penghitung kata mengenali batas kata Unicode secara akurat, termasuk aksara beraksen dan tanda hubung.'],
                ['q' => 'Apakah tulisan saya disimpan?', 'a' => 'Tidak. Dokumen dan teks Anda hanya diproses di browser Anda dan tidak pernah disimpan di server.'],
            ],
            'guide' => [
                'title' => 'Panduan Analisis Teks: Metrik Kata, Segmentasi Karakter, dan Konvensi Casing',
                'intro' => 'Penghitungan kata dan analisis teks digital memerlukan pemahaman atas cara komputer membedakan kata, karakter beraksara Unicode, estimasi durasi membaca, serta konvensi penamaan dalam pemrograman.',
                'sections' => [
                    [
                        'heading' => 'Segmentasi Batas Kata dan Perhitungan Karakter',
                        'content' => 'Penghitungan kata tidak sesederhana memisahkan spasi tunggal. Karakter spasi berurutan, baris baru, serta tanda baca harus diabaikan. Selain itu, perhitungan karakter tanpa spasi sangat krusial bagi penulis naskah, penerjemah, dan pemasar digital yang tunduk pada batasan meta deskripsi SEO (155–160 karakter) atau iklan digital.',
                    ],
                    [
                        'heading' => 'Rumus Estimasi Waktu Baca dan Waktu Bicara',
                        'content' => 'Standar rata-rata kecepatan membaca dalam hati (*silent reading*) orang dewasa berkisar antara 200 hingga 250 kata per menit (WPM). Sedangkan kecepatan berbicara normal dalam pidato atau narasi audio berkisar antara 130 hingga 150 WPM. Metrik ini mempermudah penulis artikel, podcaster, dan pembicara publik memperkirakan durasi presentasi mereka.',
                    ],
                    [
                        'heading' => 'Perbedaan Casing: camelCase, PascalCase, snake_case, dan kebab-case',
                        'content' => 'Dalam rekayasa perangkat lunak, konversi casing sering dipakai antar bahasa pemrograman. <code>camelCase</code> umum pada variabel JavaScript, <code>PascalCase</code> pada nama kelas PHP/TypeScript, <code>snake_case</code> pada kolom basis data SQL dan kunci JSON, serta <code>kebab-case</code> pada URL slug dan selektor CSS.',
                    ],
                ],
            ],
        ],
        'regex-tester' => [
            'name' => 'Regex Tester & Matcher',
            'short_name' => 'Regex Tester',
            'tagline' => 'Uji pola regex beserta grup tangkapannya.',
            'description' => 'Uji ekspresi reguler terhadap teks contoh, periksa flag (g, i, m, s, u), lihat posisi kecocokan, capture groups, dan lakukan penggantian teks.',
            'category' => 'Teks & Utilitas',
            'keywords' => 'regex, regex tester, regular expression, uji regex, regex replace',
            'status' => 'ready',
            'view' => 'tools.regex-tester',
            'script' => 'resources/js/tools/regex-tester.js',
            'how_to' => [
                'Ketik pola ekspresi reguler di kolom <strong>Pola Regular Expression</strong>, atau pilih contoh dari dropdown pola populer.',
                'Centang flag yang diinginkan seperti <strong>g</strong> (global) atau <strong>i</strong> (case-insensitive).',
                'Tempel teks sampel ke panel input; kecocokan akan langsung dideteksi.',
                'Klik <strong>Ganti Teks</strong> bila ingin menguji penggantian pola dengan teks baru.',
                'Salin laporan kecocokan atau unduh hasilnya.',
            ],
            'faq' => [
                ['q' => 'Mesin regex apa yang digunakan?', 'a' => 'Tool ini menggunakan mesin RegExp bawaan browser JavaScript standar yang mendukung lookaround, capture groups bernama, dan flag Unicode.'],
                ['q' => 'Apa yang terjadi jika pola regex saya salah?', 'a' => 'Pesan kesalahan sintaks resmi akan langsung ditampilkan di panel status sehingga memudahkan pelacakan typo atau tanda kurung yang belum ditutup.'],
                ['q' => 'Apakah teks saya dikirim ke server?', 'a' => 'Tidak. Semua proses pencocokan berjalan di memori lokal peramban Anda.'],
            ],
            'guide' => [
                'title' => 'Panduan Regular Expression (RegEx): Pola Pencocokan, Flags, dan Optimasi Mesin',
                'intro' => 'Regular Expression (RegEx) adalah barisan karakter simbolis yang mendefinisikan pola pencarian teks. RegEx dipakai luas dalam validasi formulir input, ekstraksi token log, perayapan data web, dan manipulasi teks kompleks.',
                'sections' => [
                    [
                        'heading' => 'Memahami Flags Penting dalam Mesin RegExp JavaScript',
                        'content' => 'Ekspresi reguler dipengaruhi oleh flag yang menyertainya: flag <code>g</code> (global) mencocokkan seluruh kemunculan, flag <code>i</code> (ignore case) membuat pencocokan tidak sensitif huruf besar/kecil, flag <code>m</code> (multiline) memperlakukan simbol <code>^</code> dan <code>$</code> sebagai awal dan akhir setiap baris, serta flag <code>s</code> (dotAll) mengizinkan titik (<code>.</code>) mencocokkan karakter baris baru.',
                    ],
                    [
                        'heading' => 'Capture Groups dan Backreferences',
                        'content' => 'Tanda kurung <code>(...)</code> membentuk *capturing group* yang menangkap teks cocok untuk digunakan kembali pada operasi penggantian (replace) dengan referensi seperti <code>$1</code>, <code>$2</code>. Gunakan <code>(?:...)</code> untuk *non-capturing group* jika grup hanya dibutuhkan sebagai pengelompokan logika tanpa menyimpan hasil tangkapan, demi performa yang lebih optimal.',
                    ],
                    [
                        'heading' => 'Menghindari ReDoS (Regular Expression Denial of Service)',
                        'content' => 'Hindari pola yang memiliki percabangan bertumpuk (*catastrophic backtracking*) seperti <code>(a+)+$</code> pada input teks yang sangat panjang. Pemrosesan ekspresi reguler FormatKit berjalan sepenuhnya di peramban web sisi klien sehingga aman dari risiko server crashing.',
                    ],
                ],
            ],
        ],
        'xpath-tester' => [
            'name' => 'XPath Tester',
            'short_name' => 'XPath Tester',
            'tagline' => 'Cari node XML dengan ekspresi XPath.',
            'description' => 'Uji ekspresi XPath terhadap dokumen XML dan lihat node yang cocok.',
            'category' => 'Teks & Utilitas',
            'keywords' => 'xpath, xpath tester, xml query',
            'status' => 'planned',
        ],
        'lorem-ipsum' => [
            'name' => 'Lorem Ipsum Generator',
            'short_name' => 'Lorem Ipsum',
            'tagline' => 'Teks contoh untuk tata letak.',
            'description' => 'Buat teks contoh dalam satuan kata, kalimat, atau paragraf.',
            'category' => 'Teks & Utilitas',
            'keywords' => 'lorem ipsum, teks contoh, dummy text',
            'status' => 'planned',
        ],

        'provinsi-indonesia' => [
            'name' => 'Daftar Provinsi & Kota di Indonesia',
            'short_name' => 'Provinsi & Kota',
            'tagline' => 'Daftar provinsi dan kabupaten/kota siap salin.',
            'description' => 'Daftar provinsi, kabupaten/kota, dan kecamatan di Indonesia dalam format tabel, JSON, CSV, dan tag select HTML.',
            'category' => 'Data Referensi',
            'keywords' => 'daftar provinsi indonesia, daftar kota, select option indonesia',
            'status' => 'planned',
        ],
        'kode-pos-indonesia' => [
            'name' => 'Daftar Kode Pos Indonesia',
            'short_name' => 'Kode Pos',
            'tagline' => 'Cari kode pos berdasarkan wilayah.',
            'description' => 'Cari kode pos Indonesia berdasarkan kelurahan, kecamatan, atau kota.',
            'category' => 'Data Referensi',
            'keywords' => 'kode pos, cari kode pos, kodepos indonesia',
            'status' => 'planned',
        ],
        'mime-types' => [
            'name' => 'Daftar MIME Type',
            'short_name' => 'MIME Types',
            'tagline' => 'Tabel MIME type untuk konfigurasi berkas.',
            'description' => 'Daftar lengkap MIME type beserta ekstensi berkas, siap dipakai untuk header atau konfigurasi server.',
            'category' => 'Data Referensi',
            'keywords' => 'mime type, content type, daftar mime',
            'status' => 'planned',
        ],
    ],
];
