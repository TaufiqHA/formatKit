/**
 * Konverter XML Schema Definition (XSD) ke JSON Schema (Draft-07).
 */

const TYPE_MAPPING = {
    'xs:string': { type: 'string' },
    'string': { type: 'string' },
    'xs:normalizedString': { type: 'string' },
    'xs:token': { type: 'string' },
    'xs:integer': { type: 'integer' },
    'integer': { type: 'integer' },
    'xs:int': { type: 'integer' },
    'xs:long': { type: 'integer' },
    'xs:short': { type: 'integer' },
    'xs:byte': { type: 'integer' },
    'xs:positiveInteger': { type: 'integer', minimum: 1 },
    'xs:nonNegativeInteger': { type: 'integer', minimum: 0 },
    'xs:decimal': { type: 'number' },
    'decimal': { type: 'number' },
    'xs:float': { type: 'number' },
    'xs:double': { type: 'number' },
    'xs:boolean': { type: 'boolean' },
    'boolean': { type: 'boolean' },
    'xs:date': { type: 'string', format: 'date' },
    'xs:dateTime': { type: 'string', format: 'date-time' },
    'xs:time': { type: 'string', format: 'time' },
    'xs:anyURI': { type: 'string', format: 'uri' },
};

function parseXsdElement(elNode) {
    const rawType = elNode.getAttribute('type') || '';
    const name = elNode.getAttribute('name') || '';
    const minOccurs = elNode.getAttribute('minOccurs');
    const maxOccurs = elNode.getAttribute('maxOccurs');

    const isArray = maxOccurs === 'unbounded' || (maxOccurs && Number(maxOccurs) > 1);
    const isRequired = minOccurs !== '0';

    let schemaNode = {};

    // Cek complexType langsung di dalam element
    let complexType = null;
    for (let i = 0; i < elNode.children.length; i++) {
        const child = elNode.children[i];
        if (child.localName === 'complexType') {
            complexType = child;
            break;
        }
    }

    if (complexType) {
        schemaNode = parseComplexType(complexType);
    } else if (rawType && TYPE_MAPPING[rawType]) {
        schemaNode = { ...TYPE_MAPPING[rawType] };
    } else if (rawType) {
        schemaNode = { type: 'string', description: `XSD Type: ${rawType}` };
    } else {
        schemaNode = { type: 'string' };
    }

    if (isArray) {
        return {
            name,
            isRequired,
            schema: {
                type: 'array',
                items: schemaNode,
            },
        };
    }

    return {
        name,
        isRequired,
        schema: schemaNode,
    };
}

function parseComplexType(ctNode) {
    const properties = {};
    const required = [];

    // Cari sequence, all, atau choice
    for (let i = 0; i < ctNode.children.length; i++) {
        const container = ctNode.children[i];
        if (['sequence', 'all', 'choice'].includes(container.localName)) {
            for (let j = 0; j < container.children.length; j++) {
                const child = container.children[j];
                if (child.localName === 'element') {
                    const parsed = parseXsdElement(child);
                    if (parsed.name) {
                        properties[parsed.name] = parsed.schema;
                        if (parsed.isRequired) {
                            required.push(parsed.name);
                        }
                    }
                }
            }
        } else if (container.localName === 'attribute') {
            const attrName = container.getAttribute('name');
            const attrType = container.getAttribute('type') || 'xs:string';
            const attrUse = container.getAttribute('use');
            if (attrName) {
                properties[`@${attrName}`] = TYPE_MAPPING[attrType] || { type: 'string' };
                if (attrUse === 'required') {
                    required.push(`@${attrName}`);
                }
            }
        }
    }

    const objSchema = {
        type: 'object',
        properties,
    };

    if (required.length > 0) {
        objSchema.required = required;
    }

    return objSchema;
}

export function xsdToJsonSchema(xsdText, indent = 2) {
    if (! xsdText || xsdText.trim() === '') {
        return '';
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(xsdText, 'application/xml');

    const err = doc.querySelector('parsererror');
    if (err) {
        throw new Error('Sintaks XSD tidak valid: ' + (err.textContent || 'Parser Error').split('\n')[0]);
    }

    const root = doc.documentElement;
    if (! root || ! root.localName.includes('schema')) {
        throw new Error('Elemen akar dokumen bukan skema XSD (<schema> atau <xs:schema>).');
    }

    // Cari root element utama
    let mainElement = null;
    for (let i = 0; i < root.children.length; i++) {
        const child = root.children[i];
        if (child.localName === 'element') {
            mainElement = child;
            break;
        }
    }

    let jsonSchema = {
        $schema: 'http://json-schema.org/draft-07/schema#',
    };

    if (mainElement) {
        const parsed = parseXsdElement(mainElement);
        jsonSchema = {
            ...jsonSchema,
            title: parsed.name || 'Root',
            ...parsed.schema,
        };
    } else {
        // Cek jika root langsung berisi complexType
        let mainCt = null;
        for (let i = 0; i < root.children.length; i++) {
            if (root.children[i].localName === 'complexType') {
                mainCt = root.children[i];
                break;
            }
        }
        if (mainCt) {
            jsonSchema = {
                ...jsonSchema,
                ...parseComplexType(mainCt),
            };
        } else {
            jsonSchema.type = 'object';
            jsonSchema.properties = {};
        }
    }

    const space = indent === 'tab' ? '\t' : Number(indent) || 2;
    return JSON.stringify(jsonSchema, null, space);
}
