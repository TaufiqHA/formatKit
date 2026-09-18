/** Pembuat UUID v4 (acak) dan v7 (berbasis waktu, terurut). */

const HEX = [...'0123456789abcdef'];

function randomBytes(length) {
    if (! globalThis.crypto?.getRandomValues) {
        throw new Error('Generator acak kriptografis tidak tersedia di browser ini.');
    }

    return crypto.getRandomValues(new Uint8Array(length));
}

function bytesToUuid(bytes) {
    const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, '0'));

    return [
        hex.slice(0, 4).join(''),
        hex.slice(4, 6).join(''),
        hex.slice(6, 8).join(''),
        hex.slice(8, 10).join(''),
        hex.slice(10, 16).join(''),
    ].join('-');
}

export function uuidV4() {
    const bytes = randomBytes(16);

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    return bytesToUuid(bytes);
}

/**
 * UUID v7: 48 bit timestamp milidetik dalam urutan big-endian, lalu acak.
 * Cocok untuk primary key karena terurut menurut waktu pembuatan.
 */
export function uuidV7(timestamp = Date.now()) {
    const bytes = randomBytes(16);
    const time = BigInt(timestamp);

    for (let index = 0; index < 6; index += 1) {
        bytes[index] = Number((time >> BigInt(40 - index * 8)) & 0xffn);
    }

    bytes[6] = (bytes[6] & 0x0f) | 0x70;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    return bytesToUuid(bytes);
}

export function formatUuid(uuid, { uppercase = false, hyphens = true, braces = false } = {}) {
    let result = hyphens ? uuid : uuid.replaceAll('-', '');

    if (braces) {
        result = `{${result}}`;
    }

    return uppercase ? result.toUpperCase() : result.toLowerCase();
}

export function uuidVersion(uuid) {
    const match = /^[0-9a-f]{8}-[0-9a-f]{4}-([0-9a-f])/i.exec(uuid);

    return match ? Number(match[1]) : null;
}

export function randomHex(length) {
    return [...randomBytes(Math.ceil(length / 2))].map((byte) => HEX[byte & 0x0f] + HEX[byte >> 4]).join('').slice(0, length);
}
