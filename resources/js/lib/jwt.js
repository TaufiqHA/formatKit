/**
 * Library decoder JSON Web Token (JWT) berbasis browser.
 * Tidak ada data rahasia atau token yang dikirimkan ke server jaringan.
 */

function base64UrlDecode(str) {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4 !== 0) {
        base64 += '=';
    }

    try {
        const binary = atob(base64);
        const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
        return new TextDecoder('utf-8').decode(bytes);
    } catch {
        throw new Error('Gagal mendekode Base64Url pada bagian token JWT.');
    }
}

function formatDate(epochSeconds) {
    if (! epochSeconds || typeof epochSeconds !== 'number') {
        return '-';
    }

    const date = new Date(epochSeconds * 1000);
    if (isNaN(date.getTime())) {
        return '-';
    }

    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'Asia/Jakarta',
    }).format(date) + ' WIB';
}

function formatRelativeTime(epochSeconds) {
    if (! epochSeconds || typeof epochSeconds !== 'number') {
        return '';
    }

    const nowSeconds = Math.floor(Date.now() / 1000);
    const diff = epochSeconds - nowSeconds;
    const isPast = diff < 0;
    const absDiff = Math.abs(diff);

    let span = '';
    if (absDiff < 60) {
        span = `${absDiff} detik`;
    } else if (absDiff < 3600) {
        span = `${Math.floor(absDiff / 60)} menit`;
    } else if (absDiff < 86400) {
        span = `${Math.floor(absDiff / 3600)} jam`;
    } else {
        span = `${Math.floor(absDiff / 86400)} hari`;
    }

    return isPast ? `${span} yang lalu` : `${span} lagi`;
}

/**
 * Decode token JWT menjadi komponen-komponennya beserta klaim waktu.
 */
export function decodeJwt(rawToken) {
    const trimmed = (rawToken || '').trim();

    if (! trimmed) {
        throw new Error('Token JWT kosong.');
    }

    const parts = trimmed.split('.');
    if (parts.length !== 3) {
        throw new Error(`Format token tidak valid. JWT harus terdiri dari 3 bagian yang dipisah titik, ditemukan ${parts.length} bagian.`);
    }

    const [headerRaw, payloadRaw, signatureRaw] = parts;

    let header;
    try {
        header = JSON.parse(base64UrlDecode(headerRaw));
    } catch (e) {
        throw new Error(`Bagian Header JWT tidak valid: ${e.message}`);
    }

    let payload;
    try {
        payload = JSON.parse(base64UrlDecode(payloadRaw));
    } catch (e) {
        throw new Error(`Bagian Payload JWT tidak valid: ${e.message}`);
    }

    const nowSeconds = Math.floor(Date.now() / 1000);

    const claims = {};

    if (typeof payload.exp === 'number') {
        const isExpired = nowSeconds >= payload.exp;
        claims.exp = {
            value: payload.exp,
            formatted: formatDate(payload.exp),
            relative: formatRelativeTime(payload.exp),
            isExpired,
        };
    }

    if (typeof payload.iat === 'number') {
        claims.iat = {
            value: payload.iat,
            formatted: formatDate(payload.iat),
            relative: formatRelativeTime(payload.iat),
        };
    }

    if (typeof payload.nbf === 'number') {
        claims.nbf = {
            value: payload.nbf,
            formatted: formatDate(payload.nbf),
            isFuture: nowSeconds < payload.nbf,
        };
    }

    return {
        header,
        payload,
        signature: signatureRaw,
        formattedHeader: JSON.stringify(header, null, 2),
        formattedPayload: JSON.stringify(payload, null, 2),
        claims,
    };
}
