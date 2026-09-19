/**
 * Library XPath Tester berbasis DOMParser dan XPathEvaluator bawaan peramban.
 */

export function evaluateXPath(xmlText, xpathQuery) {
    if (! xmlText || xmlText.trim() === '') {
        throw new Error('Dokumen XML tidak boleh kosong.');
    }

    if (! xpathQuery || xpathQuery.trim() === '') {
        throw new Error('Ekspresi query XPath tidak boleh kosong.');
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'application/xml');

    const err = doc.querySelector('parsererror');
    if (err) {
        throw new Error('Sintaks XML tidak valid: ' + (err.textContent || 'Parser Error').split('\n')[0]);
    }

    if (typeof doc.evaluate !== 'function') {
        throw new Error('Mesin evaluasi XPath (document.evaluate) tidak didukung pada peramban ini.');
    }

    let snapshot;
    try {
        snapshot = doc.evaluate(
            xpathQuery,
            doc,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null,
        );
    } catch (e) {
        throw new Error(`Sintaks ekspresi XPath tidak valid: ${e.message}`);
    }

    const matches = [];
    const serializer = typeof XMLSerializer !== 'undefined' ? new XMLSerializer() : null;

    for (let i = 0; i < snapshot.snapshotLength; i++) {
        const node = snapshot.snapshotItem(i);
        let content = '';

        if (node.nodeType === 1) { // Element
            content = serializer ? serializer.serializeToString(node) : node.outerHTML || node.nodeName;
        } else if (node.nodeType === 2) { // Attribute
            content = `${node.name}="${node.value}"`;
        } else if (node.nodeType === 3 || node.nodeType === 4) { // Text or CDATA
            content = node.nodeValue;
        } else {
            content = node.textContent || String(node);
        }

        matches.push({
            index: i + 1,
            nodeType: node.nodeType,
            name: node.nodeName,
            content: content.trim(),
        });
    }

    return {
        query: xpathQuery,
        totalMatches: snapshot.snapshotLength,
        matches,
    };
}
