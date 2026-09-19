/**
 * Regex Tester & Matcher murni client-side.
 */

function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');
}

export const COMMON_PATTERNS = {
    email: {
        name: 'Alamat Email',
        pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
        flags: 'g',
    },
    url: {
        name: 'URL Web (HTTP/HTTPS)',
        pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_+.~#?&//=]*)',
        flags: 'g',
    },
    phone_id: {
        name: 'Nomor HP Indonesia',
        pattern: '(?:\\+62|62|0)8[1-9][0-9]{7,10}',
        flags: 'g',
    },
    ipv4: {
        name: 'Alamat IPv4',
        pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
        flags: 'g',
    },
    date_iso: {
        name: 'Tanggal ISO (YYYY-MM-DD)',
        pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b',
        flags: 'g',
    },
    uuid: {
        name: 'UUID / GUID',
        pattern: '\\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-7][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\\b',
        flags: 'gi',
    },
    hex_color: {
        name: 'Warna Hex CSS (#fff, #ffffff)',
        pattern: '#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b',
        flags: 'g',
    },
};

/**
 * Uji kecocokan regex terhadap teks input.
 */
export function testRegex(pattern, flags = 'g', text = '') {
    if (!pattern || pattern.trim() === '') {
        return {
            valid: true,
            matches: [],
            count: 0,
            highlightHtml: escapeHtml(text),
        };
    }

    // Pastikan flag 'g' selalu aktif untuk menemukan semua kecocokan
    const effectiveFlags = flags.includes('g') ? flags : flags + 'g';
    let regex;

    try {
        regex = new RegExp(pattern, effectiveFlags);
    } catch (error) {
        return {
            valid: false,
            error: error.message,
            matches: [],
            count: 0,
            highlightHtml: escapeHtml(text),
        };
    }

    if (text === '') {
        return {
            valid: true,
            matches: [],
            count: 0,
            highlightHtml: '',
        };
    }

    const matches = [];
    let match;
    let lastIndex = 0;
    let highlightHtml = '';

    // Hindari infinite loop jika regex mencocokkan string kosong
    let guard = 0;
    const maxMatches = 1000;

    while ((match = regex.exec(text)) !== null && guard < maxMatches) {
        guard++;
        const matchStart = match.index;
        const matchEnd = matchStart + match[0].length;

        // Tambah teks sebelum kecocokan
        if (matchStart > lastIndex) {
            highlightHtml += escapeHtml(text.slice(lastIndex, matchStart));
        }

        // Bungkus kecocokan dengan mark
        highlightHtml += `<mark class="bg-acid px-0.5 font-bold border-b-2 border-ink">${escapeHtml(match[0])}</mark>`;

        matches.push({
            index: matchStart,
            match: match[0],
            length: match[0].length,
            groups: match.slice(1),
            namedGroups: match.groups ? { ...match.groups } : {},
        });

        lastIndex = matchEnd;

        // Jika panjang match 0 (misal pola ^ atau $), majukan pointer secara manual
        if (match[0].length === 0) {
            regex.lastIndex++;
            if (regex.lastIndex > text.length) {
                break;
            }
        }
    }

    if (lastIndex < text.length) {
        highlightHtml += escapeHtml(text.slice(lastIndex));
    }

    return {
        valid: true,
        matches,
        count: matches.length,
        highlightHtml,
    };
}

/**
 * Penggantian teks dengan regex.
 */
export function replaceRegex(pattern, flags, text, replacement) {
    if (!pattern) {
        return text;
    }

    const regex = new RegExp(pattern, flags);

    return text.replace(regex, replacement);
}
