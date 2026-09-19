/**
 * Generator Teks Dummy / Placeholder Lorem Ipsum Klasik.
 */

const WORDS = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud',
    'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo',
    'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate',
    'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum', 'faucibus', 'ornare',
    'suspendisse', 'sed', 'nisi', 'lacus', 'sed', 'viverra', 'tellus', 'in', 'hac',
    'habitasse', 'platea', 'dictumst', 'vestibulum', 'rhoncus', 'est', 'pellentesque',
];

const STANDARD_INTRO = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';

function randomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

function generateSentence() {
    const length = Math.floor(Math.random() * 10) + 8; // 8 - 17 kata
    const words = [];
    for (let i = 0; i < length; i++) {
        words.push(randomWord());
    }
    const sentence = words.join(' ');
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
}

function generateParagraph(sentenceCount = 5) {
    const sentences = [];
    for (let i = 0; i < sentenceCount; i++) {
        sentences.push(generateSentence());
    }
    return sentences.join(' ');
}

export function generateLorem({ type = 'paragraphs', count = 3, startWithLorem = true } = {}) {
    const num = Math.max(1, Math.min(100, Number(count) || 1));

    if (type === 'words') {
        const words = [];
        if (startWithLorem && num >= 5) {
            words.push('lorem', 'ipsum', 'dolor', 'sit', 'amet');
            for (let i = 5; i < num; i++) {
                words.push(randomWord());
            }
        } else {
            for (let i = 0; i < num; i++) {
                words.push(randomWord());
            }
        }
        const text = words.join(' ');
        return text.charAt(0).toUpperCase() + text.slice(1) + '.';
    }

    if (type === 'sentences') {
        const sentences = [];
        for (let i = 0; i < num; i++) {
            if (i === 0 && startWithLorem) {
                sentences.push(STANDARD_INTRO);
            } else {
                sentences.push(generateSentence());
            }
        }
        return sentences.join(' ');
    }

    // Default: paragraphs
    const paragraphs = [];
    for (let i = 0; i < num; i++) {
        if (i === 0 && startWithLorem) {
            const firstPara = STANDARD_INTRO + ' ' + generateParagraph(4);
            paragraphs.push(firstPara);
        } else {
            paragraphs.push(generateParagraph(5));
        }
    }

    return paragraphs.join('\n\n');
}
