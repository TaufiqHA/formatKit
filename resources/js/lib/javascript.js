/**
 * JavaScript formatter, minifier & syntax validator murni client-side.
 */

function getIndent(indent, level = 1) {
    const unit = indent === 'tab' ? '\t' : ' '.repeat(Math.max(1, Number(indent) || 2));

    return unit.repeat(Math.max(0, level));
}

/**
 * Tokenizer JavaScript sederhana yang membedakan string, regex, komentar, kurung, dan kata.
 */
function tokenizeJs(code) {
    const tokens = [];
    let i = 0;
    const length = code.length;

    while (i < length) {
        const char = code[i];

        // Whitespace
        if (/\s/.test(char)) {
            i++;

            continue;
        }

        // Single line comment (//)
        if (char === '/' && code[i + 1] === '/') {
            const start = i;
            while (i < length && code[i] !== '\n' && code[i] !== '\r') {
                i++;
            }
            tokens.push({ type: 'comment', value: code.slice(start, i) });

            continue;
        }

        // Multi-line comment (/* ... */)
        if (char === '/' && code[i + 1] === '*') {
            const start = i;
            i += 2;
            while (i < length && !(code[i] === '*' && code[i + 1] === '/')) {
                i++;
            }
            if (i < length) {
                i += 2;
            }
            tokens.push({ type: 'comment', value: code.slice(start, i) });

            continue;
        }

        // Template string (`...`) or Regular string ('...', "...")
        if (char === '`' || char === '"' || char === "'") {
            const quote = char;
            let val = quote;
            i++;
            while (i < length) {
                const current = code[i];
                if (current === '\\' && i + 1 < length) {
                    val += current + code[i + 1];
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

        // Punctuation and brackets
        if (/[{}[\]();,:]/.test(char)) {
            tokens.push({ type: 'punct', value: char });
            i++;

            continue;
        }

        // Operators
        if (/^[+\-*/%=&|!<>?~^]/.test(char)) {
            let op = char;
            i++;
            while (i < length && /^[+\-*/%=&|!<>?~^]/.test(code[i])) {
                op += code[i];
                i++;
            }
            tokens.push({ type: 'operator', value: op });

            continue;
        }

        // Words / Identifiers / Numbers
        let word = '';
        while (i < length && !/[\s{}[\]();,:+\-*/%=&|!<>?~^'"`]/.test(code[i])) {
            word += code[i];
            i++;
        }
        if (word) {
            tokens.push({ type: 'word', value: word });
        }
    }

    return tokens;
}

/**
 * Format kode JavaScript dengan indentasi dan jeda baris yang rapi.
 */
export function formatJs(code, options = {}) {
    const indentOption = options.indent ?? '2';

    if (typeof code !== 'string' || code.trim() === '') {
        return '';
    }

    const tokens = tokenizeJs(code);
    let formatted = '';
    let level = 0;

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const prev = tokens[i - 1];
        const next = tokens[i + 1];

        if (token.type === 'comment') {
            if (!formatted.endsWith('\n') && formatted.length > 0) {
                formatted += '\n';
            }
            formatted += getIndent(indentOption, level) + token.value + '\n';
            if (next && next.value !== '}') {
                formatted += getIndent(indentOption, level);
            }

            continue;
        }

        if (token.type === 'punct') {
            if (token.value === '{') {
                formatted = formatted.trimEnd() + ' {\n';
                level++;
                formatted += getIndent(indentOption, level);

                continue;
            }

            if (token.value === '}') {
                level = Math.max(0, level - 1);
                if (!formatted.endsWith('\n')) {
                    formatted += '\n';
                }
                formatted += getIndent(indentOption, level) + '}';
                if (next && next.value !== ';' && next.value !== ',' && next.value !== ')') {
                    formatted += '\n' + getIndent(indentOption, level);
                }

                continue;
            }

            if (token.value === ';') {
                formatted += ';\n' + getIndent(indentOption, level);

                continue;
            }

            if (token.value === ',') {
                formatted += ', ';

                continue;
            }

            if (token.value === ':') {
                formatted += ': ';

                continue;
            }

            if (token.value === '(' || token.value === '[') {
                if (prev && prev.type === 'word' && ['if', 'for', 'while', 'switch', 'catch'].includes(prev.value)) {
                    formatted += ' ';
                }
                formatted += token.value;

                continue;
            }

            if (token.value === ')' || token.value === ']') {
                formatted += token.value;
                if (next && next.value === '{') {
                    formatted += ' ';
                }

                continue;
            }
        }

        if (token.type === 'operator') {
            if (!formatted.endsWith(' ') && !formatted.endsWith('\n') && !formatted.endsWith('(')) {
                formatted += ' ';
            }
            formatted += token.value + ' ';

            continue;
        }

        if (token.type === 'word') {
            if (prev && (prev.type === 'word' || prev.type === 'string' || prev.value === ')') && !formatted.endsWith(' ') && !formatted.endsWith('\n')) {
                formatted += ' ';
            }
            formatted += token.value;
            if (['return', 'const', 'let', 'var', 'function', 'class', 'import', 'export', 'case', 'new', 'typeof', 'instanceof'].includes(token.value)) {
                formatted += ' ';
            }

            continue;
        }

        if (token.type === 'string') {
            if (prev && (prev.type === 'word' || prev.type === 'string') && !formatted.endsWith(' ') && !formatted.endsWith('\n')) {
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
 * Minify JavaScript dengan membuang komentar dan whitespace berlebih.
 */
export function minifyJs(code) {
    if (typeof code !== 'string' || code.trim() === '') {
        return '';
    }

    const tokens = tokenizeJs(code);
    let minified = '';

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === 'comment') {
            continue;
        }

        const prev = tokens[i - 1];

        if (token.type === 'word') {
            if (prev && (prev.type === 'word' || prev.type === 'string' || prev.value === ')')) {
                minified += ' ';
            }
            minified += token.value;

            continue;
        }

        if (token.type === 'string') {
            if (prev && (prev.type === 'word' || prev.type === 'string')) {
                minified += ' ';
            }
            minified += token.value;

            continue;
        }

        if (token.type === 'operator') {
            // Jaga spasi jika operator bisa bergabung (mis. + + atau - -)
            if (minified.endsWith(token.value[0])) {
                minified += ' ';
            }
            minified += token.value;

            continue;
        }

        minified += token.value;
    }

    return minified.trim();
}

/**
 * Validasi sintaks kode JavaScript.
 */
export function validateJs(code) {
    if (typeof code !== 'string' || code.trim() === '') {
        throw new Error('Kode JavaScript kosong.');
    }

    try {
        // Menggunakan Function constructor untuk mengecek sintaks
        // eslint-disable-next-line no-new-func
        new Function(code);

        return { valid: true, message: 'Sintaks JavaScript valid.' };
    } catch (error) {
        return {
            valid: false,
            message: error.message,
            line: error.lineNumber ?? null,
        };
    }
}
