/**
 * CSV ⇄ JSON Converter murni client-side.
 *
 * Kepatuhan penuh RFC 4180: mendukung tanda kutip, kutip lolos ganda (""),
 * baris baru di dalam kutip, serta deteksi otomatis pemisah (koma, titik koma, tab, pipe).
 */

/**
 * Deteksi pemisah yang paling mungkin dipakai pada baris pertama CSV.
 */
export function detectDelimiter(text) {
    const firstLine = text.split(/\r\n|\n|\r/)[0] || '';
    const delimiters = [',', ';', '\t', '|'];
    let bestDelimiter = ',';
    let maxCount = -1;

    for (const d of delimiters) {
        // Hitung pemisah di luar tanda kutip
        let count = 0;
        let inQuote = false;
        for (let i = 0; i < firstLine.length; i++) {
            if (firstLine[i] === '"') {
                inQuote = !inQuote;
            } else if (firstLine[i] === d && !inQuote) {
                count++;
            }
        }
        if (count > maxCount) {
            maxCount = count;
            bestDelimiter = d;
        }
    }

    return maxCount > 0 ? bestDelimiter : ',';
}

/**
 * Parsing teks CSV menjadi array 2 dimensi.
 */
export function parseCsvToRows(text, delimiter = ',') {
    const rows = [];
    let currentRow = [];
    let currentField = '';
    let inQuote = false;
    let i = 0;
    const length = text.length;

    while (i < length) {
        const char = text[i];
        const next = text[i + 1];

        if (inQuote) {
            if (char === '"') {
                if (next === '"') {
                    currentField += '"';
                    i += 2;

                    continue;
                }
                inQuote = false;
                i++;

                continue;
            }
            currentField += char;
            i++;

            continue;
        }

        if (char === '"') {
            inQuote = true;
            i++;

            continue;
        }

        if (char === delimiter) {
            currentRow.push(currentField);
            currentField = '';
            i++;

            continue;
        }

        if (char === '\r' || char === '\n') {
            if (char === '\r' && next === '\n') {
                i++;
            }
            currentRow.push(currentField);
            currentField = '';
            // Jangan simpan baris kosong terakhir
            if (currentRow.length > 1 || (currentRow.length === 1 && currentRow[0] !== '')) {
                rows.push(currentRow);
            }
            currentRow = [];
            i++;

            continue;
        }

        currentField += char;
        i++;
    }

    if (inQuote) {
        throw new Error('Tanda kutip ganda (") tidak ditutup.');
    }

    if (currentField !== '' || currentRow.length > 0) {
        currentRow.push(currentField);
        rows.push(currentRow);
    }

    return rows;
}

/**
 * Konversi teks CSV menjadi JSON string.
 */
export function csvToJson(csvText, options = {}) {
    if (typeof csvText !== 'string' || csvText.trim() === '') {
        return '';
    }

    let delimiter = options.delimiter ?? 'auto';
    if (delimiter === 'auto') {
        delimiter = detectDelimiter(csvText);
    }

    const hasHeader = options.hasHeader ?? true;
    const parseValues = options.parseValues ?? true;
    const indent = options.indent ?? '2';

    const rows = parseCsvToRows(csvText, delimiter);
    if (rows.length === 0) {
        return '[]';
    }

    function castValue(val) {
        if (!parseValues) {
            return val;
        }
        const trimmed = val.trim();
        if (trimmed === '') {
            return '';
        }
        if (trimmed === 'true') {
            return true;
        }
        if (trimmed === 'false') {
            return false;
        }
        if (trimmed === 'null') {
            return null;
        }
        if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
            const num = Number(trimmed);
            if (!Number.isNaN(num)) {
                return num;
            }
        }

        return val;
    }

    let data;
    if (hasHeader && rows.length > 0) {
        const headers = rows[0].map((h) => h.trim());
        data = rows.slice(1).map((row) => {
            const item = {};
            for (let c = 0; c < headers.length; c++) {
                const key = headers[c] || `kolom_${c + 1}`;
                item[key] = c < row.length ? castValue(row[c]) : '';
            }

            return item;
        });
    } else {
        data = rows.map((row) => row.map(castValue));
    }

    const indentSpaces = indent === 'tab' ? '\t' : indent === '0' ? null : Math.max(1, Number(indent) || 2);

    return JSON.stringify(data, null, indentSpaces);
}

/**
 * Escape satu sel CSV sesuai aturan RFC 4180.
 */
function escapeCsvCell(val, delimiter = ',') {
    if (val === null || val === undefined) {
        return '';
    }

    const str = typeof val === 'object' ? JSON.stringify(val) : String(val);

    if (str.includes('"') || str.includes(delimiter) || str.includes('\n') || str.includes('\r')) {
        return `"${str.replaceAll('"', '""')}"`;
    }

    return str;
}

/**
 * Konversi JSON string (array of objects atau array of arrays) menjadi CSV string.
 */
export function jsonToCsv(jsonText, options = {}) {
    if (typeof jsonText !== 'string' || jsonText.trim() === '') {
        return '';
    }

    const delimiter = options.delimiter === 'auto' || !options.delimiter ? ',' : options.delimiter;
    let data;

    try {
        data = JSON.parse(jsonText);
    } catch {
        throw new Error('Format JSON tidak valid.');
    }

    if (!Array.isArray(data)) {
        if (typeof data === 'object' && data !== null) {
            data = [data];
        } else {
            throw new Error('Data JSON harus berupa array objek atau array data.');
        }
    }

    if (data.length === 0) {
        return '';
    }

    // Jika array of arrays (2D)
    if (Array.isArray(data[0])) {
        return data.map((row) => row.map((cell) => escapeCsvCell(cell, delimiter)).join(delimiter)).join('\n');
    }

    // Jika array of objects
    const headerSet = new Set();
    for (const item of data) {
        if (typeof item === 'object' && item !== null) {
            Object.keys(item).forEach((key) => headerSet.add(key));
        }
    }

    const headers = Array.from(headerSet);
    const lines = [];

    lines.push(headers.map((h) => escapeCsvCell(h, delimiter)).join(delimiter));

    for (const item of data) {
        if (typeof item === 'object' && item !== null) {
            const row = headers.map((key) => escapeCsvCell(item[key], delimiter));
            lines.push(row.join(delimiter));
        }
    }

    return lines.join('\n');
}
