import { COMMON_PATTERNS, replaceRegex, testRegex } from '../lib/regex.js';
import { createTool } from './_shared.js';

const SAMPLE_PATTERN = '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}';
const SAMPLE_TEXT = `FormatKit Contact Directory:
- Customer Support: support@formatkit.com
- Technical Inquiries: dev-team@formatkit.com
- General Info: info@domain.co.id
- Non-matching text: admin AT localhost, 123-456-789`;

function getFlags() {
    let flags = '';
    document.querySelectorAll('[data-flag]').forEach((checkbox) => {
        if (checkbox.checked) {
            flags += checkbox.dataset.flag;
        }
    });

    return flags;
}

function getPattern() {
    return document.querySelector('[data-option="pattern"]')?.value ?? '';
}

function setPattern(val) {
    const el = document.querySelector('[data-option="pattern"]');
    if (el) {
        el.value = val;
    }
}

function runTest(tool) {
    const pattern = getPattern();
    const flags = getFlags();
    const text = tool.value();

    if (!pattern.trim()) {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Masukkan pola regex');

        return;
    }

    const result = testRegex(pattern, flags, text);

    if (!result.valid) {
        tool.fail(`Regex Error: ${result.error}`);

        return;
    }

    tool.clearError();

    if (result.count === 0) {
        tool.setOutput('Tidak ada kecocokan ditemukan.');
        tool.setStatus('0 kecocokan', 'warn');

        return;
    }

    const lines = [`Ditemukan ${result.count} kecocokan:`, ''];
    result.matches.forEach((m, idx) => {
        lines.push(`[Kecocokan #${idx + 1}]`);
        lines.push(`  Teks    : "${m.match}"`);
        lines.push(`  Posisi  : Indeks ${m.index} (panjang: ${m.length})`);
        if (m.groups && m.groups.length > 0) {
            m.groups.forEach((g, gIdx) => {
                lines.push(`  Grup ${gIdx + 1} : "${g}"`);
            });
        }
        if (Object.keys(m.namedGroups || {}).length > 0) {
            Object.entries(m.namedGroups).forEach(([k, v]) => {
                lines.push(`  Grup "${k}": "${v}"`);
            });
        }
        lines.push('');
    });

    tool.setOutput(lines.join('\n'));
    tool.setStatus(`${result.count} kecocokan ditemukan`, 'ok');
}

function runReplace(tool) {
    const pattern = getPattern();
    const flags = getFlags();
    const text = tool.value();
    const replacement = tool.option('replacement', '') ?? '';

    if (!pattern.trim()) {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Masukkan pola regex');

        return;
    }

    try {
        const replaced = replaceRegex(pattern, flags, text, replacement);
        tool.setOutput(replaced);
        tool.clearError();
        tool.setStatus('Teks berhasil diganti', 'ok');
    } catch (error) {
        tool.fail(`Gagal mengganti teks: ${error.message}`);
    }
}

const tool = createTool({
    ready(t) {
        t.setStatus('Siap');

        // Event listener pola dan flags
        document.querySelector('[data-option="pattern"]')?.addEventListener('input', () => {
            if (t.value().trim()) {
                runTest(t);
            }
        });

        document.querySelectorAll('[data-flag]').forEach((cb) => {
            cb.addEventListener('change', () => {
                if (t.value().trim()) {
                    runTest(t);
                }
            });
        });

        document.getElementById('regex-preset')?.addEventListener('change', (e) => {
            const key = e.target.value;
            if (key && COMMON_PATTERNS[key]) {
                const preset = COMMON_PATTERNS[key];
                setPattern(preset.pattern);
                document.querySelectorAll('[data-flag]').forEach((cb) => {
                    cb.checked = preset.flags.includes(cb.dataset.flag);
                });
                if (t.value().trim()) {
                    runTest(t);
                }
            }
        });
    },

    test(t) {
        runTest(t);
    },

    replace(t) {
        runReplace(t);
    },

    sample(t) {
        setPattern(SAMPLE_PATTERN);
        t.setInput(SAMPLE_TEXT);
        runTest(t);
    },

    clear(t) {
        setPattern('');
        t.clear();
    },

    copy(t) {
        return t.copy();
    },

    download(t) {
        t.download('hasil-regex.txt', 'text/plain');
    },
});
