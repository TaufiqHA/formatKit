/**
 * SQL formatter & minifier murni client-side.
 *
 * Mendukung pemformatan klausa utama (SELECT, FROM, WHERE, JOIN, GROUP BY, ORDER BY, dll),
 * indentasi bertingkat untuk subquery di dalam kurung, penataan koma,
 * serta kontrol kapitalisasi kata kunci (UPPERCASE / lowercase / preserve).
 */

const MAJOR_CLAUSES = [
    'SELECT',
    'FROM',
    'WHERE',
    'GROUP BY',
    'HAVING',
    'ORDER BY',
    'LIMIT',
    'OFFSET',
    'INSERT INTO',
    'INSERT',
    'VALUES',
    'UPDATE',
    'SET',
    'DELETE FROM',
    'DELETE',
    'LEFT OUTER JOIN',
    'RIGHT OUTER JOIN',
    'FULL OUTER JOIN',
    'LEFT JOIN',
    'RIGHT JOIN',
    'INNER JOIN',
    'CROSS JOIN',
    'OUTER JOIN',
    'JOIN',
    'ON',
    'UNION ALL',
    'UNION',
    'EXCEPT',
    'INTERSECT',
    'CREATE TABLE',
    'ALTER TABLE',
    'DROP TABLE',
    'WITH',
];

const SECONDARY_CLAUSES = ['AND', 'OR', 'WHEN', 'THEN', 'ELSE', 'END'];

const ALL_KEYWORDS = new Set([
    ...MAJOR_CLAUSES.flatMap((c) => c.split(' ')),
    ...SECONDARY_CLAUSES,
    'AS',
    'ASC',
    'DESC',
    'BY',
    'IN',
    'NOT',
    'IS',
    'NULL',
    'LIKE',
    'ILIKE',
    'BETWEEN',
    'EXISTS',
    'CASE',
    'DISTINCT',
    'ALL',
    'ANY',
    'SOME',
    'TABLE',
    'VIEW',
    'INDEX',
    'TRIGGER',
    'PRIMARY',
    'KEY',
    'FOREIGN',
    'REFERENCES',
    'DEFAULT',
    'CHECK',
    'UNIQUE',
    'CONSTRAINT',
    'AUTO_INCREMENT',
    'CASCADE',
    'COUNT',
    'SUM',
    'AVG',
    'MIN',
    'MAX',
    'COALESCE',
    'IFNULL',
    'CAST',
    'INT',
    'INTEGER',
    'VARCHAR',
    'TEXT',
    'BOOLEAN',
    'TIMESTAMP',
    'DATE',
    'DATETIME',
    'FLOAT',
    'DOUBLE',
    'DECIMAL',
    'TRUE',
    'FALSE',
]);

function getIndent(indent, level = 1) {
    const unit = indent === 'tab' ? '\t' : ' '.repeat(Math.max(1, Number(indent) || 2));

    return unit.repeat(Math.max(0, level));
}

/**
 * Memecah string SQL menjadi token: string literal, komentar, kata/kata kunci, tanda baca.
 */
export function tokenizeSql(sql) {
    const tokens = [];
    let i = 0;
    const length = sql.length;

    while (i < length) {
        const char = sql[i];

        // Whitespace
        if (/\s/.test(char)) {
            i++;

            continue;
        }

        // Line comment (-- or #)
        if ((char === '-' && sql[i + 1] === '-') || char === '#') {
            const start = i;
            while (i < length && sql[i] !== '\n' && sql[i] !== '\r') {
                i++;
            }
            tokens.push({ type: 'comment', value: sql.slice(start, i) });

            continue;
        }

        // Block comment (/* ... */)
        if (char === '/' && sql[i + 1] === '*') {
            const start = i;
            i += 2;
            while (i < length && !(sql[i] === '*' && sql[i + 1] === '/')) {
                i++;
            }
            if (i < length) {
                i += 2;
            }
            tokens.push({ type: 'comment', value: sql.slice(start, i) });

            continue;
        }

        // String literal ('...', "...", `...`)
        if (char === "'" || char === '"' || char === '`') {
            const quote = char;
            let val = quote;
            i++;
            while (i < length) {
                const current = sql[i];
                if (current === '\\' && i + 1 < length) {
                    val += current + sql[i + 1];
                    i += 2;

                    continue;
                }
                if (current === quote) {
                    val += current;
                    i++;
                    if (quote === "'" && sql[i] === "'") {
                        val += "'";
                        i++;

                        continue;
                    }
                    break;
                }
                val += current;
                i++;
            }
            tokens.push({ type: 'string', value: val });

            continue;
        }

        // Parentheses
        if (char === '(' || char === ')') {
            tokens.push({ type: 'paren', value: char });
            i++;

            continue;
        }

        // Punctuation: comma, semicolon
        if (char === ',' || char === ';') {
            tokens.push({ type: 'punct', value: char });
            i++;

            continue;
        }

        // Comparison / math operators
        if (/^[=<>!+\-*/%&|^]/.test(char)) {
            let op = char;
            i++;
            if (i < length && /^[=<>!+\-*/%]/.test(sql[i])) {
                op += sql[i];
                i++;
            }
            tokens.push({ type: 'operator', value: op });

            continue;
        }

        // Words / Numbers / Identifiers
        let word = '';
        while (i < length && !/[\s(),;=<>!+\-*/%&|^#'"`]/.test(sql[i])) {
            word += sql[i];
            i++;
        }
        tokens.push({ type: 'word', value: word });
    }

    return tokens;
}

/**
 * Format SQL query dengan opsi indentasi dan kapitalisasi kata kunci.
 */
export function formatSql(sql, options = {}) {
    const indentOption = options.indent ?? '2';
    const keywordCasing = options.casing ?? 'upper'; // 'upper' | 'lower' | 'preserve'

    if (typeof sql !== 'string' || sql.trim() === '') {
        return '';
    }

    const rawTokens = tokenizeSql(sql);
    if (rawTokens.length === 0) {
        return '';
    }

    // Normalisasi token kata kunci gabungan (misal 'LEFT' + 'JOIN' -> 'LEFT JOIN', 'GROUP' + 'BY' -> 'GROUP BY')
    const tokens = [];
    for (let i = 0; i < rawTokens.length; i++) {
        const token = rawTokens[i];
        if (token.type === 'word') {
            const next1 = rawTokens[i + 1];
            const next2 = rawTokens[i + 2];
            const upper = token.value.toUpperCase();
            const next1Upper = next1?.type === 'word' ? next1.value.toUpperCase() : '';
            const next2Upper = next2?.type === 'word' ? next2.value.toUpperCase() : '';

            const threeWords = `${upper} ${next1Upper} ${next2Upper}`;
            const twoWords = `${upper} ${next1Upper}`;

            if (MAJOR_CLAUSES.includes(threeWords)) {
                tokens.push({ type: 'major_clause', value: threeWords });
                i += 2;

                continue;
            }

            if (MAJOR_CLAUSES.includes(twoWords)) {
                tokens.push({ type: 'major_clause', value: twoWords });
                i += 1;

                continue;
            }

            if (MAJOR_CLAUSES.includes(upper)) {
                tokens.push({ type: 'major_clause', value: upper });

                continue;
            }

            if (SECONDARY_CLAUSES.includes(upper)) {
                tokens.push({ type: 'secondary_clause', value: upper });

                continue;
            }
        }
        tokens.push(token);
    }

    let result = '';
    let level = 0;
    const parenStack = []; // 'subquery' | 'list'

    function applyCasing(word) {
        if (keywordCasing === 'upper') {
            return word.toUpperCase();
        }
        if (keywordCasing === 'lower') {
            return word.toLowerCase();
        }

        return word;
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const prev = tokens[i - 1];
        const next = tokens[i + 1];

        if (token.type === 'major_clause') {
            const formattedClause = applyCasing(token.value);
            if (result.length > 0 && !result.endsWith('\n')) {
                result += '\n';
            }
            result += getIndent(indentOption, level) + formattedClause;
            if (next && next.value !== ';') {
                result += ' ';
            }

            continue;
        }

        if (token.type === 'secondary_clause') {
            const formattedClause = applyCasing(token.value);
            if (result.length > 0 && !result.endsWith('\n')) {
                result += '\n';
            }
            result += getIndent(indentOption, level + 1) + formattedClause;
            if (next && next.value !== ';') {
                result += ' ';
            }

            continue;
        }

        if (token.type === 'paren') {
            if (token.value === '(') {
                // Periksa apakah ini subquery (diikuti SELECT)
                const isSubquery = next && (next.type === 'major_clause' || next.value.toUpperCase() === 'SELECT');
                if (isSubquery) {
                    parenStack.push('subquery');
                    result += '(\n';
                    level++;
                    result += getIndent(indentOption, level);
                } else {
                    parenStack.push('list');
                    result += '(';
                }

                continue;
            }

            if (token.value === ')') {
                const parenType = parenStack.pop();
                if (parenType === 'subquery') {
                    level = Math.max(0, level - 1);
                    if (!result.endsWith('\n')) {
                        result += '\n';
                    }
                    result += getIndent(indentOption, level) + ')';
                } else {
                    result += ')';
                }
                if (next && next.value !== ',' && next.value !== ';' && next.value !== ')') {
                    result += ' ';
                }

                continue;
            }
        }

        if (token.type === 'punct') {
            if (token.value === ',') {
                result = result.trimEnd() + ',';
                // Jika di dalam klausa SELECT atau daftar kolom pada subquery, berikan baris baru
                if (parenStack[parenStack.length - 1] === 'subquery' || parenStack.length === 0) {
                    result += '\n' + getIndent(indentOption, level + 1);
                } else {
                    result += ' ';
                }

                continue;
            }

            if (token.value === ';') {
                result = result.trimEnd() + ';\n';

                continue;
            }
        }

        if (token.type === 'operator') {
            // Beri spasi sebelum dan sesudah operator
            if (!result.endsWith(' ') && !result.endsWith('\n') && !result.endsWith('(')) {
                result += ' ';
            }
            result += token.value + ' ';

            continue;
        }

        if (token.type === 'word') {
            const upper = token.value.toUpperCase();
            const formatted = ALL_KEYWORDS.has(upper) ? applyCasing(token.value) : token.value;

            if (prev && (prev.type === 'word' || prev.type === 'string' || prev.value === ')') && !result.endsWith(' ') && !result.endsWith('\n')) {
                result += ' ';
            }
            result += formatted;
            if (next && next.type === 'word' && next.value !== ',' && next.value !== ';') {
                result += ' ';
            }

            continue;
        }

        if (token.type === 'string') {
            if (prev && (prev.type === 'word' || prev.type === 'string') && !result.endsWith(' ') && !result.endsWith('\n')) {
                result += ' ';
            }
            result += token.value;

            continue;
        }

        if (token.type === 'comment') {
            if (!result.endsWith('\n') && result.length > 0) {
                result += '\n';
            }
            result += getIndent(indentOption, level) + token.value + '\n';

            continue;
        }

        result += token.value;
    }

    return result.trim();
}

/**
 * Perkecil query SQL menjadi satu baris bersih tanpa komentar.
 */
export function minifySql(sql) {
    if (typeof sql !== 'string' || sql.trim() === '') {
        return '';
    }

    const tokens = tokenizeSql(sql);
    let minified = '';

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        if (token.type === 'comment') {
            continue;
        }

        const prev = tokens[i - 1];

        if (token.type === 'word' || token.type === 'major_clause' || token.type === 'secondary_clause') {
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
            minified += ` ${token.value} `;

            continue;
        }

        minified += token.value;
    }

    return minified.replace(/\s+/g, ' ').replace(/\s*([,;()])\s*/g, '$1').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').trim();
}
