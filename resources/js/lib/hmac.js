/**
 * Generator HMAC menggunakan Web Crypto API standar.
 * Seluruh pemrosesan dilakukan secara lokal di perangkat klien.
 */

const SUPPORTED_ALGORITHMS = {
    'SHA-256': 'SHA-256',
    'SHA-512': 'SHA-512',
    'SHA-384': 'SHA-384',
    'SHA-1': 'SHA-1',
};

function bufferToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

function bufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}

/**
 * Hitung HMAC dari pesan dan secret key.
 *
 * @param {string} message - Pesan/teks payload yang ingin di-hash
 * @param {string} secret - Kunci rahasia (secret key)
 * @param {string} algorithm - 'SHA-256', 'SHA-512', 'SHA-384', 'SHA-1'
 * @param {string} format - 'hex' atau 'base64'
 * @returns {Promise<string>}
 */
export async function computeHmac(message, secret, algorithm = 'SHA-256', format = 'hex') {
    const algoName = SUPPORTED_ALGORITHMS[algorithm.toUpperCase()];
    if (! algoName) {
        throw new Error(`Algoritma tidak didukung: ${algorithm}. Gunakan SHA-256, SHA-512, SHA-384, atau SHA-1.`);
    }

    const subtle = typeof crypto !== 'undefined' ? crypto.subtle : null;
    if (! subtle) {
        throw new Error('Web Crypto API tidak tersedia pada peramban ini atau membutuhkan konteks HTTPS yang aman.');
    }

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret || '');
    const messageData = encoder.encode(message || '');

    const cryptoKey = await subtle.importKey(
        'raw',
        keyData,
        { name: 'HMAC', hash: algoName },
        false,
        ['sign'],
    );

    const signatureBuffer = await subtle.sign('HMAC', cryptoKey, messageData);

    if (format === 'base64') {
        return bufferToBase64(signatureBuffer);
    }

    return bufferToHex(signatureBuffer);
}
