/**
 * Library Konversi Unix Timestamp dan Waktu Lokal Indonesia.
 */

export function parseTimestampInput(input) {
    const trimmed = (input || '').trim();

    if (! trimmed) {
        throw new Error('Nilai timestamp atau tanggal kosong.');
    }

    // Cek apakah angka murni
    if (/^-?\d+$/.test(trimmed)) {
        const num = Number(trimmed);
        // Jika panjang <= 11 digit, anggap detik (seconds)
        if (trimmed.length <= 11) {
            return new Date(num * 1000);
        }
        // Jika lebih, anggap milidetik
        return new Date(num);
    }

    // Coba parse string tanggal
    const parsedDate = new Date(trimmed);
    if (isNaN(parsedDate.getTime())) {
        throw new Error(`Format tanggal atau angka timestamp tidak dikenali: "${trimmed}".`);
    }

    return parsedDate;
}

function formatTz(date, timeZone, suffix) {
    const formatted = new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone,
    }).format(date);

    return `${formatted} ${suffix}`;
}

function formatRelative(date) {
    const diffMs = date.getTime() - Date.now();
    const diffSec = Math.round(diffMs / 1000);
    const isPast = diffSec < 0;
    const absSec = Math.abs(diffSec);

    let span = '';
    if (absSec < 60) {
        span = `${absSec} detik`;
    } else if (absSec < 3600) {
        span = `${Math.floor(absSec / 60)} menit`;
    } else if (absSec < 86400) {
        span = `${Math.floor(absSec / 3600)} jam`;
    } else {
        span = `${Math.floor(absSec / 86400)} hari`;
    }

    return isPast ? `${span} yang lalu` : `${span} yang akan datang`;
}

export function convertTimestamp(input) {
    const date = parseTimestampInput(input);
    const epochSec = Math.floor(date.getTime() / 1000);
    const epochMs = date.getTime();

    return {
        epochSeconds: epochSec,
        epochMilliseconds: epochMs,
        iso8601: date.toISOString(),
        utc: date.toUTCString(),
        wib: formatTz(date, 'Asia/Jakarta', 'WIB (UTC+7)'),
        wita: formatTz(date, 'Asia/Makassar', 'WITA (UTC+8)'),
        wit: formatTz(date, 'Asia/Jayapura', 'WIT (UTC+9)'),
        relative: formatRelative(date),
    };
}
