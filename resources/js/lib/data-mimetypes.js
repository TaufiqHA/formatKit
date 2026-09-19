/**
 * Tabel Referensi MIME Types (Content-Type) Lengkap.
 */

export const MIME_TYPES = [
    // Web & Data
    { extension: 'html', mime: 'text/html', category: 'Web & Teks' },
    { extension: 'htm', mime: 'text/html', category: 'Web & Teks' },
    { extension: 'css', mime: 'text/css', category: 'Web & Teks' },
    { extension: 'js', mime: 'text/javascript', category: 'Web & Teks' },
    { extension: 'mjs', mime: 'text/javascript', category: 'Web & Teks' },
    { extension: 'json', mime: 'application/json', category: 'Aplikasi & Data' },
    { extension: 'xml', mime: 'application/xml', category: 'Aplikasi & Data' },
    { extension: 'csv', mime: 'text/csv', category: 'Web & Teks' },
    { extension: 'txt', mime: 'text/plain', category: 'Web & Teks' },
    { extension: 'md', mime: 'text/markdown', category: 'Web & Teks' },
    { extension: 'yaml', mime: 'application/yaml', category: 'Aplikasi & Data' },
    { extension: 'yml', mime: 'application/yaml', category: 'Aplikasi & Data' },

    // Dokumen
    { extension: 'pdf', mime: 'application/pdf', category: 'Dokumen' },
    { extension: 'doc', mime: 'application/msword', category: 'Dokumen' },
    { extension: 'docx', mime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', category: 'Dokumen' },
    { extension: 'xls', mime: 'application/vnd.ms-excel', category: 'Dokumen' },
    { extension: 'xlsx', mime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', category: 'Dokumen' },
    { extension: 'ppt', mime: 'application/vnd.ms-powerpoint', category: 'Dokumen' },
    { extension: 'pptx', mime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', category: 'Dokumen' },

    // Gambar
    { extension: 'png', mime: 'image/png', category: 'Gambar' },
    { extension: 'jpg', mime: 'image/jpeg', category: 'Gambar' },
    { extension: 'jpeg', mime: 'image/jpeg', category: 'Gambar' },
    { extension: 'gif', mime: 'image/gif', category: 'Gambar' },
    { extension: 'svg', mime: 'image/svg+xml', category: 'Gambar' },
    { extension: 'webp', mime: 'image/webp', category: 'Gambar' },
    { extension: 'avif', mime: 'image/avif', category: 'Gambar' },
    { extension: 'ico', mime: 'image/x-icon', category: 'Gambar' },
    { extension: 'bmp', mime: 'image/bmp', category: 'Gambar' },

    // Audio & Video
    { extension: 'mp3', mime: 'audio/mpeg', category: 'Audio' },
    { extension: 'wav', mime: 'audio/wav', category: 'Audio' },
    { extension: 'ogg', mime: 'audio/ogg', category: 'Audio' },
    { extension: 'mp4', mime: 'video/mp4', category: 'Video' },
    { extension: 'webm', mime: 'video/webm', category: 'Video' },
    { extension: 'mov', mime: 'video/quicktime', category: 'Video' },
    { extension: 'mkv', mime: 'video/x-matroska', category: 'Video' },

    // Font
    { extension: 'woff', mime: 'font/woff', category: 'Font' },
    { extension: 'woff2', mime: 'font/woff2', category: 'Font' },
    { extension: 'ttf', mime: 'font/ttf', category: 'Font' },
    { extension: 'otf', mime: 'font/otf', category: 'Font' },

    // Arsip & Biner
    { extension: 'zip', mime: 'application/zip', category: 'Arsip' },
    { extension: 'tar', mime: 'application/x-tar', category: 'Arsip' },
    { extension: 'gz', mime: 'application/gzip', category: 'Arsip' },
    { extension: '7z', mime: 'application/x-7z-compressed', category: 'Arsip' },
    { extension: 'bin', mime: 'application/octet-stream', category: 'Arsip' },
];

export function searchMimeTypes(query = '', format = 'table') {
    const q = (query || '').trim().toLowerCase();
    const list = q
        ? MIME_TYPES.filter((item) =>
            item.extension.toLowerCase().includes(q) ||
            item.mime.toLowerCase().includes(q) ||
            item.category.toLowerCase().includes(q),
        )
        : MIME_TYPES;

    if (format === 'json') {
        return JSON.stringify(list, null, 2);
    }

    if (format === 'csv') {
        const rows = ['ekstensi,mime_type,kategori'];
        for (const item of list) {
            rows.push(`.${item.extension},"${item.mime}","${item.category}"`);
        }
        return rows.join('\n');
    }

    if (format === 'nginx') {
        const lines = ['types {'];
        for (const item of list) {
            lines.push(`    ${item.mime.padEnd(50)} ${item.extension};`);
        }
        lines.push('}');
        return lines.join('\n');
    }

    // Default: table
    const lines = [];
    lines.push(`Ditemukan ${list.length} MIME Type:`);
    lines.push('');
    lines.push('Ekstensi | MIME Type / Content-Type                              | Kategori');
    lines.push('---------+------------------------------------------------------+--------------------');
    for (const item of list) {
        const ext = ('.' + item.extension).padEnd(8);
        const mime = item.mime.padEnd(52);
        lines.push(`${ext} | ${mime} | ${item.category}`);
    }
    return lines.join('\n');
}
