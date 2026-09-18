/**
 * HTML entity encode/decode.
 *
 * Decode memakai peta entitas bernama (bukan DOM) supaya bisa diuji tanpa
 * browser dan tidak mengeksekusi markup apa pun.
 */

const NAMED = {
    amp: '&',
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    nbsp: '\u00a0',
    copy: '\u00a9',
    reg: '\u00ae',
    trade: '\u2122',
    hellip: '\u2026',
    mdash: '\u2014',
    ndash: '\u2013',
    lsquo: '\u2018',
    rsquo: '\u2019',
    ldquo: '\u201c',
    rdquo: '\u201d',
    bull: '\u2022',
    middot: '\u00b7',
    dagger: '\u2020',
    sect: '\u00a7',
    para: '\u00b6',
    deg: '\u00b0',
    plusmn: '\u00b1',
    times: '\u00d7',
    divide: '\u00f7',
    frac12: '\u00bd',
    frac14: '\u00bc',
    sup2: '\u00b2',
    sup3: '\u00b3',
    micro: '\u00b5',
    shy: '\u00ad',
    laquo: '\u00ab',
    raquo: '\u00bb',
    euro: '\u20ac',
    pound: '\u00a3',
    yen: '\u00a5',
    cent: '\u00a2',
    larr: '\u2190',
    rarr: '\u2192',
    harr: '\u2194',
    ne: '\u2260',
    le: '\u2264',
    ge: '\u2265',
    infin: '\u221e',
    check: '\u2713',
};

const CHARACTER_ENTITIES = {
    '&': 'amp',
    '<': 'lt',
    '>': 'gt',
    '"': 'quot',
    "'": 'apos',
};

/** Karakter di luar ASCII ikut di-encode supaya hasilnya aman di semua encoding. */
export function encodeEntities(text, { mode = 'named', asciiOnly = false } = {}) {
    return [...text]
        .map((character) => {
            if (CHARACTER_ENTITIES[character]) {
                return mode === 'numeric'
                    ? `&#${character.charCodeAt(0)};`
                    : `&${CHARACTER_ENTITIES[character]};`;
            }

            if (asciiOnly && character.codePointAt(0) > 127) {
                return `&#${character.codePointAt(0)};`;
            }

            return character;
        })
        .join('');
}

export function decodeEntities(text) {
    return text.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z][a-zA-Z0-9]*);/g, (match, body) => {
        if (body.startsWith('#')) {
            const isHex = body[1] === 'x' || body[1] === 'X';
            const code = Number.parseInt(isHex ? body.slice(2) : body.slice(1), isHex ? 16 : 10);

            if (!Number.isFinite(code) || code < 0 || code > 0x10ffff) {
                return match;
            }

            return String.fromCodePoint(code);
        }

        return Object.hasOwn(NAMED, body) ? NAMED[body] : match;
    });
}

export function knownEntityNames() {
    return Object.keys(NAMED);
}
