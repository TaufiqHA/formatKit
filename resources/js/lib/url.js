/** URL encoding/decoding dengan mode komponen dan mode URL utuh. */

export const MODES = ['component', 'uri'];

export function encodeUrl(text, mode = 'component') {
    return mode === 'uri' ? encodeURI(text) : encodeURIComponent(text);
}

export function decodeUrl(text, mode = 'component') {
    try {
        return mode === 'uri' ? decodeURI(text) : decodeURIComponent(text);
    } catch {
        throw new Error('Teks mengandung escape yang tidak sah, misalnya "%" tanpa dua digit heksadesimal setelahnya.');
    }
}

/**
 * Ubah hasil encode komponen menjadi query string yang bisa dibaca.
 * Nilai tanpa "=" dianggap sebagai kunci tanpa nilai.
 */
export function parseQueryString(text) {
    const params = new URLSearchParams(text.replace(/^\?/, ''));

    return [...params.entries()];
}
