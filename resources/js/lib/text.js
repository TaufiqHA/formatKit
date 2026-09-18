/** Utilitas teks yang dipakai bersama oleh semua tool. */

const encoder = new TextEncoder();

export function byteLength(text) {
    return encoder.encode(text).length;
}

export function byteSize(text) {
    return new Intl.NumberFormat('id-ID').format(byteLength(text));
}

export function lineCount(text) {
    return text === '' ? 0 : text.split('\n').length;
}

/** Ringkasan pendek untuk bilah hasil: "12 baris · 340 byte". */
export function stats(text) {
    return `${lineCount(text)} baris · ${byteSize(text)} byte`;
}

/** Ubah pesan error menjadi kalimat yang enak dibaca di panel error. */
export function describeError(error) {
    return error instanceof Error ? error.message : String(error);
}
