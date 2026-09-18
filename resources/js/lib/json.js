/** Logika format & validasi JSON. */

export function formatJson(text, indent = 2) {
    const space = indent === 'tab' ? '\t' : Number(indent);

    return JSON.stringify(JSON.parse(text), null, space);
}

export function minifyJson(text) {
    return JSON.stringify(JSON.parse(text));
}

export function sortJsonKeys(text) {
    return JSON.stringify(sortValue(JSON.parse(text)), null, 2);
}

function sortValue(value) {
    if (Array.isArray(value)) {
        return value.map(sortValue);
    }

    if (value !== null && typeof value === 'object') {
        return Object.fromEntries(
            Object.keys(value)
                .sort((left, right) => left.localeCompare(right))
                .map((key) => [key, sortValue(value[key])]),
        );
    }

    return value;
}

/**
 * Terjemahkan error bawaan JSON.parse menjadi posisi baris/kolom yang bisa dibaca.
 * Pesan V8 modern sudah memuat posisi; kalau tidak, posisinya dihitung sendiri.
 */
export function describeJsonError(error, text) {
    const message = error instanceof Error ? error.message : String(error);
    const position = Number(/position (\d+)/.exec(message)?.[1] ?? NaN);

    if (Number.isNaN(position)) {
        return { message };
    }

    const before = text.slice(0, position);
    const line = before.split('\n').length;
    const column = position - before.lastIndexOf('\n');

    return {
        message: message.replace(/\s*at position \d+.*$/, ''),
        line,
        column,
        position,
    };
}

export function looksLikeJson(text) {
    const trimmed = text.trim();

    return (trimmed.startsWith('{') && trimmed.endsWith('}')) || (trimmed.startsWith('[') && trimmed.endsWith(']'));
}
