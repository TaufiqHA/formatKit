/**
 * Hash generator.
 *
 * SHA-1/256/384/512 memakai Web Crypto API (crypto.subtle) yang hanya tersedia
 * di secure context (HTTPS atau localhost). MD5 tidak ada di Web Crypto,
 * jadi implementasinya ada di bawah mengikuti RFC 1321.
 */

const SHIFT = [
    7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22,
    5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20,
    4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23,
    6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21,
];

/** K[i] = floor(abs(sin(i + 1)) * 2^32), sesuai definisi RFC 1321. */
const TABLE = Array.from({ length: 64 }, (_, index) => Math.floor(Math.abs(Math.sin(index + 1)) * 4294967296));

export const SUBTLE_ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
export const ALGORITHMS = ['MD5', ...SUBTLE_ALGORITHMS];

/** Kunci pencocokan: "SHA-256", "sha256", dan "Sha-256" dianggap sama. */
const CANONICAL = Object.fromEntries(
    ALGORITHMS.map((algorithm) => [algorithm.replace(/[^A-Za-z0-9]/g, '').toUpperCase(), algorithm]),
);

function toBytes(input) {
    if (typeof input === 'string') {
        return new TextEncoder().encode(input);
    }

    if (input instanceof ArrayBuffer) {
        return new Uint8Array(input);
    }

    return new Uint8Array(input.buffer, input.byteOffset, input.byteLength);
}

function rotateLeft(value, count) {
    return (value << count) | (value >>> (32 - count));
}

function toLittleEndianHex(word) {
    return [0, 8, 16, 24].map((shift) => ((word >>> shift) & 0xff).toString(16).padStart(2, '0')).join('');
}

export function md5(input) {
    const bytes = toBytes(input);
    const bitLength = BigInt(bytes.length) * 8n;
    const paddedLength = Math.ceil((bytes.length + 9) / 64) * 64;

    const buffer = new Uint8Array(paddedLength);
    buffer.set(bytes);
    buffer[bytes.length] = 0x80;

    const view = new DataView(buffer.buffer);
    view.setUint32(paddedLength - 8, Number(bitLength & 0xffffffffn), true);
    view.setUint32(paddedLength - 4, Number((bitLength >> 32n) & 0xffffffffn), true);

    let a = 0x67452301;
    let b = 0xefcdab89;
    let c = 0x98badcfe;
    let d = 0x10325476;

    for (let offset = 0; offset < paddedLength; offset += 64) {
        const words = Array.from({ length: 16 }, (_, index) => view.getUint32(offset + index * 4, true));

        let [aa, bb, cc, dd] = [a, b, c, d];

        for (let index = 0; index < 64; index += 1) {
            let mixed;
            let slot;

            if (index < 16) {
                mixed = (bb & cc) | (~bb & dd);
                slot = index;
            } else if (index < 32) {
                mixed = (dd & bb) | (~dd & cc);
                slot = (5 * index + 1) % 16;
            } else if (index < 48) {
                mixed = bb ^ cc ^ dd;
                slot = (3 * index + 5) % 16;
            } else {
                mixed = cc ^ (bb | ~dd);
                slot = (7 * index) % 16;
            }

            mixed = (mixed + aa + TABLE[index] + words[slot]) | 0;
            aa = dd;
            dd = cc;
            cc = bb;
            bb = (bb + rotateLeft(mixed, SHIFT[index])) | 0;
        }

        a = (a + aa) | 0;
        b = (b + bb) | 0;
        c = (c + cc) | 0;
        d = (d + dd) | 0;
    }

    return [a, b, c, d].map(toLittleEndianHex).join('');
}

async function subtleDigest(algorithm, input) {
    if (! globalThis.crypto?.subtle) {
        throw new Error('Web Crypto API tidak tersedia. Buka halaman ini lewat HTTPS atau localhost untuk memakai SHA.');
    }

    const digest = await crypto.subtle.digest(algorithm, toBytes(input));

    return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

/** Hitung satu algoritma. Nama algoritma tidak peka huruf besar/kecil dan tanda hubung. */
export async function hash(input, algorithm = 'SHA-256') {
    const canonical = CANONICAL[String(algorithm).replace(/[^A-Za-z0-9]/g, '').toUpperCase()];

    if (canonical === 'MD5') {
        return md5(input);
    }

    if (! canonical) {
        throw new Error(`Algoritma ${algorithm} tidak dikenal.`);
    }

    return subtleDigest(canonical, input);
}

/** Hitung beberapa algoritma sekaligus: [{ algorithm, digest }]. */
export async function hashAll(input, algorithms = ALGORITHMS) {
    return Promise.all(
        algorithms.map(async (algorithm) => ({ algorithm, digest: await hash(input, algorithm) })),
    );
}
