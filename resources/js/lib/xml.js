/**
 * XML formatter berbasis DOMParser.
 *
 * Pendekatan: dokumen divalidasi dulu oleh parser XML bawaan browser, lalu
 * disusun ulang dari pohon DOM. Dengan begitu format hanya menyentuh dokumen
 * yang memang sah, dan struktur (namespace, komentar, CDATA) tetap utuh.
 */

const WHITESPACE_ONLY = /^[\t\r\n ]*$/;

function indentation(indent) {
    if (indent === 'tab') {
        return '\t';
    }

    return ' '.repeat(Math.max(1, Number(indent) || 2));
}

/** Ambil baris/kolom dari pesan parsererror Chrome maupun Firefox. */
export function describeXmlError(message) {
    const cleaned = message
        .replace(/This page contains the following errors:\s*/i, '')
        .replace(/Below is a rendering of the page up to the first error\.?\s*/i, '')
        .trim();

    const chrome = /error on line (\d+) at column (\d+):\s*([\s\S]*)/i.exec(cleaned);

    if (chrome) {
        return { message: chrome[3].trim(), line: Number(chrome[1]), column: Number(chrome[2]) };
    }

    const firefox = /Line Number (\d+), Column (\d+):\s*([\s\S]*)/i.exec(cleaned);

    if (firefox) {
        return { message: firefox[3].trim(), line: Number(firefox[1]), column: Number(firefox[2]) };
    }

    return { message: cleaned.split('\n').filter((line) => line.trim() !== '').pop()?.trim() ?? 'XML tidak valid' };
}

export function parseXml(text) {
    const document_ = new DOMParser().parseFromString(text, 'application/xml');
    const failure = document_.querySelector('parsererror');

    if (failure) {
        const detail = describeXmlError(failure.textContent);

        throw new Error(`XML tidak valid${detail.line ? ` (baris ${detail.line}, kolom ${detail.column})` : ''}: ${detail.message}`);
    }

    if (! document_.documentElement) {
        throw new Error('Dokumen XML kosong.');
    }

    return document_;
}

function escapeText(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeAttribute(value) {
    return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
}

function attributesOf(node) {
    return [...node.attributes].map((attribute) => ` ${attribute.name}="${escapeAttribute(attribute.value)}"`).join('');
}

function isPreservingSpace(node) {
    return node.getAttribute?.('xml:space') === 'preserve';
}

function isWhitespaceNode(node) {
    return node.nodeType === 3 && WHITESPACE_ONLY.test(node.data);
}

function renderNode(node, depth, unit, minify) {
    const padding = minify ? '' : unit.repeat(depth);
    const newline = minify ? '' : '\n';

    if (node.nodeType === 3) {
        return escapeText(node.data);
    }

    if (node.nodeType === 4) {
        return `<![CDATA[${node.data}]]>`;
    }

    if (node.nodeType === 8) {
        return `${padding}<!--${node.data}-->${newline}`;
    }

    if (node.nodeType === 7) {
        return `${padding}<?${node.target}${node.data ? ' ' + node.data : ''}?>${newline}`;
    }

    if (node.nodeType !== 1) {
        return '';
    }

    const children = [...node.childNodes].filter((child) => ! isWhitespaceNode(child));
    const open = `<${node.nodeName}${attributesOf(node)}>`;
    const close = `</${node.nodeName}>`;

    if (children.length === 0) {
        return minify ? `<${node.nodeName}${attributesOf(node)}/>` : `${padding}<${node.nodeName}${attributesOf(node)}/>${newline}`;
    }

    const hasTextContent = children.some((child) => child.nodeType === 4 || (child.nodeType === 3 && child.data.trim() !== ''));
    const keepAsIs = hasTextContent || isPreservingSpace(node);

    if (keepAsIs) {
        const inline = children.map((child) => renderNode(child, 0, unit, true)).join('');

        return `${padding}${open}${inline}${close}${newline}`;
    }

    if (minify) {
        return open + children.map((child) => renderNode(child, 0, unit, true)).join('') + close;
    }

    const inner = children.map((child) => renderNode(child, depth + 1, unit, false)).join('');

    return `${padding}${open}\n${inner}${padding}${close}\n`;
}

function declarationOf(text) {
    const match = /^\s*<\?xml[^>]*\?>/.exec(text);

    return match ? match[0].trim() : null;
}

function doctypeOf(text) {
    const match = /<!DOCTYPE[^>\[]*(\[[^\]]*\])?[^>]*>/i.exec(text);

    return match ? match[0].trim() : null;
}

export function formatXml(text, { indent = 2, pretty = true } = {}) {
    const document_ = parseXml(text);
    const lines = [];

    if (pretty) {
        const declaration = declarationOf(text);
        const doctype = doctypeOf(text);

        if (declaration) {
            lines.push(declaration);
        }

        if (doctype) {
            lines.push(doctype);
        }
    }

    const body = renderNode(document_.documentElement, 0, indentation(indent), ! pretty).trimEnd();

    lines.push(body);

    return lines.join('\n') + '\n';
}

export function minifyXml(text) {
    return formatXml(text, { pretty: false }).trim();
}
