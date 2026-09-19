/**
 * Parser dan Serializer JSON ⇄ YAML murni sisi klien.
 */

function stringifyValue(val, indentLevel = 0) {
    const indent = '  '.repeat(indentLevel);

    if (val === null || val === undefined) {
        return 'null';
    }

    if (typeof val === 'boolean') {
        return val ? 'true' : 'false';
    }

    if (typeof val === 'number') {
        return String(val);
    }

    if (typeof val === 'string') {
        if (val.includes('\n')) {
            const lines = val.split('\n').map((line) => '  '.repeat(indentLevel + 1) + line).join('\n');
            return `|\n${lines}`;
        }
        if (/[:#[\]{},&*!|>'"%@`]/.test(val) || val.trim() !== val || val === '') {
            return JSON.stringify(val);
        }
        return val;
    }

    if (Array.isArray(val)) {
        if (val.length === 0) {
            return '[]';
        }
        return '\n' + val.map((item) => {
            const itemStr = stringifyValue(item, indentLevel + 1);
            if (typeof item === 'object' && item !== null && ! Array.isArray(item)) {
                const trimmed = itemStr.replace(/^\s+/, '');
                return `${indent}- ${trimmed}`;
            }
            return `${indent}- ${itemStr.trim()}`;
        }).join('\n');
    }

    if (typeof val === 'object') {
        const keys = Object.keys(val);
        if (keys.length === 0) {
            return '{}';
        }
        const lines = keys.map((k) => {
            const safeKey = /[:#\s]/.test(k) ? JSON.stringify(k) : k;
            const childVal = val[k];
            if (typeof childVal === 'object' && childVal !== null) {
                return `${indent}${safeKey}:\n${stringifyValue(childVal, indentLevel + 1)}`;
            }
            return `${indent}${safeKey}: ${stringifyValue(childVal, indentLevel)}`;
        });
        return lines.join('\n');
    }

    return String(val);
}

/**
 * Konversi JSON string ke format YAML.
 */
export function jsonToYaml(jsonText) {
    if (! jsonText || jsonText.trim() === '') {
        return '';
    }
    const parsed = JSON.parse(jsonText);
    return stringifyValue(parsed, 0).trim();
}

/**
 * Parser sederhana YAML ke objek JavaScript / JSON.
 */
export function parseYaml(yamlText) {
    if (! yamlText || yamlText.trim() === '') {
        return null;
    }

    const rawLines = yamlText.split('\n');
    const lines = [];

    for (const raw of rawLines) {
        const trimmed = raw.trim();
        // Lewati komentar penuh atau baris kosong
        if (! trimmed || trimmed.startsWith('#')) {
            continue;
        }
        const indent = raw.match(/^\s*/)[0].length;
        lines.push({ indent, text: trimmed });
    }

    let index = 0;

    function parseBlock(currentIndent) {
        if (index >= lines.length) {
            return null;
        }

        const firstLine = lines[index];
        if (firstLine.text.startsWith('- ')) {
            // Parse Array
            const list = [];
            while (index < lines.length && lines[index].indent === currentIndent && lines[index].text.startsWith('- ')) {
                const lineContent = lines[index].text.slice(2).trim();
                index++;
                if (lineContent === '') {
                    list.push(parseBlock(currentIndent + 2));
                } else if (lineContent.includes(': ') || lineContent.endsWith(':')) {
                    // Objek di dalam list
                    index--;
                    lines[index].text = lineContent;
                    lines[index].indent = currentIndent + 2;
                    list.push(parseBlock(currentIndent + 2));
                } else {
                    list.push(parseScalar(lineContent));
                }
            }
            return list;
        } else if (firstLine.text.includes(': ') || firstLine.text.endsWith(':')) {
            // Parse Objek
            const obj = {};
            while (index < lines.length && lines[index].indent === currentIndent) {
                const line = lines[index];
                const colonIdx = line.text.indexOf(':');
                if (colonIdx === -1) {
                    break;
                }

                const key = line.text.slice(0, colonIdx).trim().replace(/^['"]|['"]$/g, '');
                const rest = line.text.slice(colonIdx + 1).trim();
                index++;

                if (rest === '') {
                    if (index < lines.length && lines[index].indent > currentIndent) {
                        obj[key] = parseBlock(lines[index].indent);
                    } else {
                        obj[key] = null;
                    }
                } else {
                    obj[key] = parseScalar(rest);
                }
            }
            return obj;
        } else {
            const val = parseScalar(firstLine.text);
            index++;
            return val;
        }
    }

    function parseScalar(val) {
        if (val === 'null' || val === '~') return null;
        if (val === 'true') return true;
        if (val === 'false') return false;
        if (/^-?\d+$/.test(val)) return parseInt(val, 10);
        if (/^-?\d+\.\d+$/.test(val)) return parseFloat(val);
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            return val.slice(1, -1);
        }
        return val;
    }

    const result = parseBlock(lines[0].indent);
    return result;
}

/**
 * Konversi YAML string ke JSON string terformat.
 */
export function yamlToJson(yamlText, indent = 2) {
    const parsed = parseYaml(yamlText);
    const space = indent === 'tab' ? '\t' : Number(indent) || 2;
    return JSON.stringify(parsed, null, space);
}
