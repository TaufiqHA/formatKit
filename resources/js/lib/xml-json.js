/**
 * Konversi Dokumen XML ke Objek JSON terstruktur.
 */

function xmlNodeToObject(node) {
    // Text node
    if (node.nodeType === 3 || node.nodeType === 4) { // TEXT_NODE or CDATA_SECTION_NODE
        const text = node.nodeValue.trim();
        return text ? text : null;
    }

    if (node.nodeType !== 1) { // ELEMENT_NODE
        return null;
    }

    const obj = {};

    // Attributes
    if (node.attributes && node.attributes.length > 0) {
        for (let i = 0; i < node.attributes.length; i++) {
            const attr = node.attributes[i];
            obj[`@${attr.name}`] = attr.value;
        }
    }

    // Children
    let hasElementChildren = false;
    let textContent = '';

    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];

        if (child.nodeType === 1) {
            hasElementChildren = true;
            const childObj = xmlNodeToObject(child);
            const childName = child.nodeName;

            if (childName in obj) {
                if (! Array.isArray(obj[childName])) {
                    obj[childName] = [obj[childName]];
                }
                obj[childName].push(childObj);
            } else {
                obj[childName] = childObj;
            }
        } else if (child.nodeType === 3 || child.nodeType === 4) {
            textContent += child.nodeValue.trim();
        }
    }

    if (! hasElementChildren) {
        if (Object.keys(obj).length === 0) {
            // Hanya teks polos tanpa atribut
            return textContent;
        }
        if (textContent) {
            obj['#text'] = textContent;
        }
    }

    return obj;
}

/**
 * Konversi string XML ke JSON string.
 */
export function xmlToJson(xmlText, indent = 2) {
    if (! xmlText || xmlText.trim() === '') {
        return '';
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');

    const err = doc.querySelector('parsererror');
    if (err) {
        throw new Error('Sintaks XML tidak valid: ' + (err.textContent || 'Parser Error').split('\n')[0]);
    }

    const root = doc.documentElement;
    if (! root) {
        throw new Error('Dokumen XML tidak memiliki elemen akar (root element).');
    }

    const result = {
        [root.nodeName]: xmlNodeToObject(root),
    };

    const space = indent === 'tab' ? '\t' : Number(indent) || 2;
    return JSON.stringify(result, null, space);
}
