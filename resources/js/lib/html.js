/**
 * Formatter & Minifier HTML ringan dan andal.
 * Bekerja baik untuk potongan tag (snippet) maupun dokumen HTML lengkap.
 */

const VOID_TAGS = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
    'link', 'meta', 'param', 'source', 'track', 'wbr', '!doctype',
]);

const PRESERVE_TAGS = new Set(['pre', 'code', 'textarea', 'script', 'style']);

function getIndent(indent) {
    if (indent === 'tab') {
        return '\t';
    }

    return ' '.repeat(Math.max(1, Number(indent) || 2));
}

/**
 * Format string HTML dengan indentasi hierarkis.
 */
export function formatHtml(html, indent = 2) {
    if (! html || typeof html !== 'string') {
        return '';
    }

    const pad = getIndent(indent);
    const tokens = tokenizeHtml(html);
    const lines = [];
    let level = 0;

    for (const token of tokens) {
        if (token.type === 'comment' || token.type === 'doctype') {
            lines.push(pad.repeat(level) + token.content.trim());
        } else if (token.type === 'closing') {
            level = Math.max(0, level - 1);
            lines.push(pad.repeat(level) + token.content.trim());
        } else if (token.type === 'opening') {
            lines.push(pad.repeat(level) + token.content.trim());
            if (! token.isVoid) {
                level++;
            }
        } else if (token.type === 'preserve') {
            lines.push(pad.repeat(level) + token.content);
        } else if (token.type === 'text') {
            const trimmed = token.content.trim();
            if (trimmed.length > 0) {
                lines.push(pad.repeat(level) + trimmed);
            }
        }
    }

    return lines.join('\n');
}

/**
 * Minify HTML dengan menghapus komentar dan memadatkan whitespace.
 */
export function minifyHtml(html) {
    if (! html || typeof html !== 'string') {
        return '';
    }

    // Preserve pre/code/textarea/script/style contents during minify
    const preserved = [];
    let cleaned = html.replace(/<(pre|code|textarea|script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, (match) => {
        preserved.push(match);
        return `___PRESERVED_${preserved.length - 1}___`;
    });

    // Remove comments
    cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

    // Collapse whitespace between tags
    cleaned = cleaned.replace(/>\s+</g, '><');

    // Collapse multi-spaces into single space within text
    cleaned = cleaned.replace(/\s{2,}/g, ' ');

    // Restore preserved
    cleaned = cleaned.replace(/___PRESERVED_(\d+)___/g, (_, idx) => preserved[Number(idx)]);

    return cleaned.trim();
}

/**
 * Tokenize string HTML menjadi token terstruktur.
 */
function tokenizeHtml(html) {
    const tokens = [];
    let i = 0;
    const len = html.length;

    while (i < len) {
        if (html.startsWith('<!--', i)) {
            const end = html.indexOf('-->', i + 4);
            const closeIdx = end === -1 ? len : end + 3;
            tokens.push({ type: 'comment', content: html.slice(i, closeIdx) });
            i = closeIdx;
            continue;
        }

        if (html.slice(i, i + 9).toLowerCase() === '<!doctype') {
            const end = html.indexOf('>', i + 9);
            const closeIdx = end === -1 ? len : end + 1;
            tokens.push({ type: 'doctype', content: html.slice(i, closeIdx) });
            i = closeIdx;
            continue;
        }

        // Check for preserved tags like <pre>, <script>, <style>
        const preserveMatch = /^<(pre|code|textarea|script|style)\b[^>]*>/i.exec(html.slice(i));
        if (preserveMatch) {
            const tagName = preserveMatch[1].toLowerCase();
            const openTag = preserveMatch[0];
            const endTag = `</${tagName}>`;
            const endIdx = html.toLowerCase().indexOf(endTag, i + openTag.length);

            if (endIdx !== -1) {
                const fullBlock = html.slice(i, endIdx + endTag.length);
                tokens.push({ type: 'preserve', content: fullBlock });
                i = endIdx + endTag.length;
                continue;
            }
        }

        if (html[i] === '<') {
            const end = html.indexOf('>', i + 1);
            if (end !== -1) {
                const tag = html.slice(i, end + 1);
                if (tag.startsWith('</')) {
                    tokens.push({ type: 'closing', content: tag });
                } else {
                    const tagMatch = /^<([a-zA-Z0-9:-]+)/.exec(tag);
                    const name = tagMatch ? tagMatch[1].toLowerCase() : '';
                    const isSelfClosing = tag.endsWith('/>') || VOID_TAGS.has(name);
                    tokens.push({ type: 'opening', content: tag, isVoid: isSelfClosing, name });
                }
                i = end + 1;
                continue;
            }
        }

        // Text node
        const nextTag = html.indexOf('<', i);
        const textEnd = nextTag === -1 ? len : nextTag;
        const text = html.slice(i, textEnd);
        if (text.trim().length > 0) {
            tokens.push({ type: 'text', content: text });
        }
        i = textEnd;
    }

    return tokens;
}
