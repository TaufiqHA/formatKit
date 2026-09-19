import {
    analyzeText,
    cleanSpaces,
    toCamelCase,
    toKebabCase,
    toSentenceCase,
    toSnakeCase,
    toTitleCase,
    toLower,
    toUpper,
} from '../lib/text-counter.js';
import { createTool } from './_shared.js';

const SAMPLE = `FormatKit adalah kumpulan tool web online gratis yang dirancang untuk pengembang dan pengguna umum.

Seluruh pemrosesan berjalan langsung di browser Anda, menjamin kecepatan maksimal dan privasi penuh tanpa pengiriman data ke server. Cobalah berbagai fitur pengubah kapitalisasi huruf di bawah ini!`;

function updateStats(text) {
    const stats = analyzeText(text);

    const wordsEl = document.querySelector('[data-stat="words"]');
    if (wordsEl) {
        wordsEl.textContent = stats.words.toLocaleString('id-ID');
    }

    const charsWithSpacesEl = document.querySelector('[data-stat="charsWithSpaces"]');
    if (charsWithSpacesEl) {
        charsWithSpacesEl.textContent = stats.charsWithSpaces.toLocaleString('id-ID');
    }

    const charsNoSpacesEl = document.querySelector('[data-stat="charsNoSpaces"]');
    if (charsNoSpacesEl) {
        charsNoSpacesEl.textContent = `${stats.charsNoSpaces.toLocaleString('id-ID')} tanpa spasi`;
    }

    const sentencesEl = document.querySelector('[data-stat="sentences"]');
    if (sentencesEl) {
        sentencesEl.textContent = stats.sentences.toLocaleString('id-ID');
    }

    const paragraphsEl = document.querySelector('[data-stat="paragraphs"]');
    if (paragraphsEl) {
        paragraphsEl.textContent = stats.paragraphs.toLocaleString('id-ID');
    }

    const readingEl = document.querySelector('[data-stat="readingMinutes"]');
    if (readingEl) {
        readingEl.textContent = `${stats.readingMinutes} mnt`;
    }

    const speakingEl = document.querySelector('[data-stat="speakingMinutes"]');
    if (speakingEl) {
        speakingEl.textContent = `${stats.speakingMinutes} mnt`;
    }
}

function transform(tool, fn, label) {
    const source = tool.value();
    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const result = fn(source);
        tool.setOutput(result);
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(`Gagal transformasi: ${error.message}`);
    }
}

const tool = createTool({
    ready(t) {
        t.setStatus('Siap');
        updateStats(t.value());

        t.input?.addEventListener('input', () => {
            updateStats(t.value());
        });
    },

    upper(t) {
        transform(t, toUpper, 'Diubah ke HURUF BESAR');
    },

    lower(t) {
        transform(t, toLower, 'Diubah ke huruf kecil');
    },

    title(t) {
        transform(t, toTitleCase, 'Diubah ke Title Case');
    },

    sentence(t) {
        transform(t, toSentenceCase, 'Diubah ke Sentence case');
    },

    camel(t) {
        transform(t, toCamelCase, 'Diubah ke camelCase');
    },

    kebab(t) {
        transform(t, toKebabCase, 'Diubah ke kebab-case');
    },

    snake(t) {
        transform(t, toSnakeCase, 'Diubah ke snake_case');
    },

    clean(t) {
        transform(t, cleanSpaces, 'Spasi dibersihkan');
    },

    sample(t) {
        t.setInput(SAMPLE);
        updateStats(SAMPLE);
        transform(t, toTitleCase, 'Diubah dari contoh');
    },

    clear(t) {
        t.clear();
        updateStats('');
    },

    swap(t) {
        t.swap();
        updateStats(t.value());
        t.setStatus('Teks ditukar', 'ok');
    },

    copy(t) {
        return t.copy();
    },

    download(t) {
        t.download('teks.txt', 'text/plain');
    },
});
