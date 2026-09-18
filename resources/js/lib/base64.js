/**
 * Base64 dengan dukungan UTF-8.
 *
 * btoa()/atob() bawaan browser hanya bekerja untuk karakter Latin-1, jadi teks
 * dikonversi ke byte UTF-8 lebih dulu.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder('utf-8', { fatal: true });
const forgivingDecoder = new TextDecoder('utf-8');

function bytesToBinary(bytes) {
    let binary = '';

    // Diproses per blok supaya tidak melampaui batas argumen String.fromCharCode.
    for (let index = 0; index < bytes.length; index += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
    }

    return binary;
}

export function encodeBase64(text, { urlSafe = false } = {}) {
    const result = btoa(bytesToBinary(encoder.encode(text)));

    return urlSafe ? result.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/, '') : result;
}

export function decodeBase64(text, { urlSafe = false, allowBinary = false } = {}) {
    let normalized = text.replace(/\s+/g, '');

    if (normalized === '') {
        return '';
    }

    if (urlSafe || normalized.includes('-') || normalized.includes('_')) {
        normalized = normalized.replaceAll('-', '+').replaceAll('_', '/');
    }

    normalized = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, '=');

    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(normalized)) {
        throw new Error('Bukan Base64 yang sah: hanya huruf, angka, +, /, dan = yang diizinkan.');
    }

    const bytes = Uint8Array.from(atob(normalized), (character) => character.charCodeAt(0));

    try {
        return decoder.decode(bytes);
    } catch {
        if (!allowBinary) {
            throw new Error('Hasil decode bukan teks UTF-8 (kemungkinan data biner). Centang "izinkan data biner" untuk melihat hasilnya.');
        }

        return forgivingDecoder.decode(bytes);
    }
}

/** Deteksi kasar apakah sebuah teks kemungkinan Base64. */
export function looksLikeBase64(text) {
    const normalized = text.replace(/\s+/g, '');

    return normalized.length >= 8 && /^[A-Za-z0-9+/_-]+={0,2}$/.test(normalized) && normalized.length % 4 !== 1;
}
