/**
 * Penghitung Kata, Karakter & Pengubah Kapitalisasi murni client-side.
 */

/**
 * Analisis statistik teks lengkap.
 */
export function analyzeText(text) {
    if (typeof text !== 'string' || text === '') {
        return {
            words: 0,
            charsWithSpaces: 0,
            charsNoSpaces: 0,
            paragraphs: 0,
            sentences: 0,
            lines: 0,
            readingMinutes: 0,
            speakingMinutes: 0,
        };
    }

    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, '').length;

    // Penghitungan kata (mendukung aksara Unicode dan kata terhubung tanda hubung)
    const wordsMatch = text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu);
    const words = wordsMatch ? wordsMatch.length : 0;

    // Baris
    const lines = text.split(/\r\n|\r|\n/).length;

    // Paragraf (blok yang dipisah baris kosong atau baris baru berurutan)
    const paragraphs = text
        .split(/\r?\n\s*\r?\n/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0).length || (text.trim().length > 0 ? 1 : 0);

    // Kalimat
    const sentences = text
        .split(/[.!?]+(?:\s+|$)/)
        .map((s) => s.trim())
        .filter((s) => s.length > 0).length;

    // Kecepatan membaca rata-rata ~200 kata/menit, bicara ~130 kata/menit
    const readingMinutes = words > 0 ? Math.max(1, Math.round(words / 200)) : 0;
    const speakingMinutes = words > 0 ? Math.max(1, Math.round(words / 130)) : 0;

    return {
        words,
        charsWithSpaces,
        charsNoSpaces,
        paragraphs,
        sentences,
        lines,
        readingMinutes,
        speakingMinutes,
    };
}

export function toUpper(text) {
    return text.toUpperCase();
}

export function toLower(text) {
    return text.toLowerCase();
}

export function toTitleCase(text) {
    return text.toLowerCase().replace(/(?:^|\s|["'([{])[\p{L}]/gu, (match) => match.toUpperCase());
}

export function toSentenceCase(text) {
    return text.toLowerCase().replace(/(^\s*[\p{L}]|[.!?]\s*[\p{L}])/gu, (match) => match.toUpperCase());
}

function extractWords(text) {
    const match = text.match(/[\p{L}\p{N}]+/gu);

    return match ? match.map((w) => w.toLowerCase()) : [];
}

export function toCamelCase(text) {
    const words = extractWords(text);
    if (words.length === 0) {
        return '';
    }

    return (
        words[0] +
        words
            .slice(1)
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join('')
    );
}

export function toKebabCase(text) {
    const words = extractWords(text);

    return words.join('-');
}

export function toSnakeCase(text) {
    const words = extractWords(text);

    return words.join('_');
}

export function cleanSpaces(text) {
    return text
        .split(/\r?\n/)
        .map((line) => line.trim().replace(/[ \t]+/g, ' '))
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}
