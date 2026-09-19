/**
 * CSS formatter & minifier murni client-side.
 *
 * Mengurai aturan CSS, deklarasi properti, komentar, blok bersarang
 * seperti @media, @keyframes, dan @supports dengan indentasi yang bisa diatur.
 */

function getIndent(indent, level = 1) {
    const unit = indent === 'tab' ? '\t' : ' '.repeat(Math.max(1, Number(indent) || 2));

    return unit.repeat(Math.max(0, level));
}

/**
 * Memecah string CSS menjadi token: komentar, string, tanda kurung, kurung kurawal, titik koma, teks.
 */
function tokenizeCss(css) {
    const tokens = [];
    let i = 0;
    const length = css.length;

    while (i < length) {
        const char = css[i];

        // Whitespace
        if (/\s/.test(char)) {
            i++;

            continue;
        }

        // Block comment (/* ... */)
        if (char === '/' && css[i + 1] === '*') {
            const start = i;
            i += 2;
            while (i < length && !(css[i] === '*' && css[i + 1] === '/')) {
                i++;
            }
            if (i < length) {
                i += 2;
            }
            tokens.push({ type: 'comment', value: css.slice(start, i) });

            continue;
        }

        // Strings ("..." or '...')
        if (char === '"' || char === "'") {
            const quote = char;
            let val = quote;
            i++;
            while (i < length) {
                const current = css[i];
                if (current === '\\' && i + 1 < length) {
                    val += current + css[i + 1];
                    i += 2;

                    continue;
                }
                val += current;
                i++;
                if (current === quote) {
                    break;
                }
            }
            tokens.push({ type: 'string', value: val });

            continue;
        }

        // Structural tokens
        if (char === '{' || char === '}' || char === ';' || char === ':') {
            tokens.push({ type: 'punct', value: char });
            i++;

            continue;
        }

        // Text (selector, property name, property value)
        let text = '';
        while (i < length && !/[\s{};:/*"']/.test(css[i])) {
            text += css[i];
            i++;
        }
        if (text) {
            tokens.push({ type: 'text', value: text });
        }
    }

    return tokens;
}

/**
 * Format CSS dengan indentasi teratur dan baris baru yang rapi.
 */
export function formatCss(css, options = {}) {
    const indentOption = options.indent ?? '2';

    if (typeof css !== 'string' || css.trim() === '') {
        return '';
    }

    const tokens = tokenizeCss(css);
    let formatted = '';
    let level = 0;
    let inProperty = false;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const next = tokens[i + 1];

        if (token.type === 'comment') {
            if (!formatted.endsWith('\n') && formatted.length > 0) {
                formatted += '\n';
            }
            formatted += getIndent(indentOption, level) + token.value + '\n';

            continue;
        }

        if (token.type === 'punct') {
            if (token.value === '{') {
                formatted = formatted.trimEnd() + ' {\n';
                level++;
                formatted += getIndent(indentOption, level);
                inProperty = false;

                continue;
            }

            if (token.value === '}') {
                level = Math.max(0, level - 1);
                if (!formatted.endsWith('\n')) {
                    formatted += '\n';
                }
                formatted += getIndent(indentOption, level) + '}\n';
                if (level === 0) {
                    formatted += '\n';
                } else if (next && next.value !== '}') {
                    formatted += getIndent(indentOption, level);
                }
                inProperty = false;

                continue;
            }

            if (token.value === ':') {
                formatted += ': ';
                inProperty = true;

                continue;
            }

            if (token.value === ';') {
                formatted += ';\n' + getIndent(indentOption, level);
                inProperty = false;

                continue;
            }
        }

        if (token.type === 'text' || token.type === 'string') {
            const prev = tokens[i - 1];
            if (prev && (prev.type === 'text' || prev.type === 'string') && !formatted.endsWith(' ') && !formatted.endsWith('\n')) {
                formatted += ' ';
            }
            formatted += token.value;
        }
    }

    return formatted
        .split('\n')
        .map((line) => line.trimEnd())
        .join('\n')
        .replace(/\n{3,}/g, '\n\n')
        .trim();
}

/**
 * Minify CSS: hapus komentar, spasi ekstra, dan titik koma penutup sebelum kurung kurawal.
 */
export function minifyCss(css) {
    if (typeof css !== 'string' || css.trim() === '') {
        return '';
    }

    return css
        .replace(/\/\*[\s\S]*?\*\//g, '') // Hapus komentar
        .replace(/\s+/g, ' ') // Padatkan spasi
        .replace(/\s*([;:{},>+~])\s*/g, '$1') // Buang spasi sekitar delimiter
        .replace(/;}/g, '}') // Buang titik koma penutup blok
        .trim();
}
