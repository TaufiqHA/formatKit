/**
 * Library string escape & unescape multi-bahasa.
 */

export function escapeString(text, mode = 'json') {
    if (typeof text !== 'string') {
        return '';
    }

    switch (mode) {
        case 'json':
        case 'javascript':
            return text
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t')
                .replace(/[\b]/g, '\\b')
                .replace(/\f/g, '\\f');

        case 'sql':
            return text
                .replace(/\\/g, '\\\\')
                .replace(/'/g, "''")
                .replace(/\0/g, '\\0')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r');

        case 'html':
            return text
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');

        case 'java':
            return text
                .replace(/\\/g, '\\\\')
                .replace(/"/g, '\\"')
                .replace(/\n/g, '\\n')
                .replace(/\r/g, '\\r')
                .replace(/\t/g, '\\t');

        case 'regex':
            return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        default:
            return text;
    }
}

export function unescapeString(text, mode = 'json') {
    if (typeof text !== 'string') {
        return '';
    }

    switch (mode) {
        case 'json':
        case 'javascript':
        case 'java':
            return text.replace(/\\(["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, (match, p1) => {
                switch (p1) {
                    case '"': return '"';
                    case '\\': return '\\';
                    case '/': return '/';
                    case 'b': return '\b';
                    case 'f': return '\f';
                    case 'n': return '\n';
                    case 'r': return '\r';
                    case 't': return '\t';
                    default:
                        if (p1.startsWith('u')) {
                            return String.fromCharCode(parseInt(p1.slice(1), 16));
                        }
                        return match;
                }
            });

        case 'sql':
            return text
                .replace(/''/g, "'")
                .replace(/\\(["'\\0nrtZ%_])/g, (match, p1) => {
                    switch (p1) {
                        case "'": return "'";
                        case '"': return '"';
                        case '\\': return '\\';
                        case '0': return '\0';
                        case 'n': return '\n';
                        case 'r': return '\r';
                        case 't': return '\t';
                        case 'Z': return '\x1a';
                        default: return p1;
                    }
                });

        case 'html':
            return text
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&amp;/g, '&');

        case 'regex':
            return text.replace(/\\([.*+?^${}()|[\]\\])/g, '$1');

        default:
            return text;
    }
}
