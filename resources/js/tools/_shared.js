/**
 * Kontrak bersama semua halaman tool.
 *
 * Markup yang diharapkan (semua opsional kecuali input/output):
 *   [data-tool-root]
 *     [data-tool-actions]  button[data-action="..."]
 *     [data-tool-options]  select|input[data-option="..."]
 *     [data-tool-input]    textarea
 *     [data-tool-output]   textarea
 *     [data-tool-error]    elemen pesan error
 *     [data-tool-status]   status singkat (aria-live)
 *     [data-tool-stats]    ringkasan baris/byte hasil
 */

import { describeError, stats } from '../lib/text.js';

export function createTool(handlers = {}) {
    const root = document.querySelector('[data-tool-root]');

    if (! root) {
        return null;
    }

    const input = root.querySelector('[data-tool-input]');
    const output = root.querySelector('[data-tool-output]');
    const statusField = root.querySelector('[data-tool-status]');
    const errorField = root.querySelector('[data-tool-error]');
    const statsField = root.querySelector('[data-tool-stats]');

    function setStatus(message, tone = 'neutral') {
        if (! statusField) {
            return;
        }

        statusField.textContent = message;
        statusField.dataset.tone = tone;
    }

    function clearError() {
        if (! errorField) {
            return;
        }

        errorField.textContent = '';
        errorField.hidden = true;
    }

    function showError(message) {
        if (errorField) {
            errorField.textContent = message;
            errorField.hidden = false;
        }

        setStatus('Ada error', 'error');
    }

    const tool = {
        root,
        input,
        output,

        value: () => input?.value ?? '',

        option: (name, fallback = null) => root.querySelector(`[data-option="${name}"]`)?.value ?? fallback,

        checked: (name) => Boolean(root.querySelector(`[data-option="${name}"]`)?.checked),

        setInput(text) {
            if (input) {
                input.value = text;
            }
        },

        setOutput(text) {
            const value = text ?? '';

            if (output) {
                output.value = value;
            }

            if (statsField) {
                statsField.textContent = stats(value);
            }
        },

        setStatus,
        clearError,
        showError,

        /** Kosongkan hasil sekaligus tampilkan alasannya. */
        fail(message) {
            tool.setOutput('');
            showError(message);
        },

        clear() {
            tool.setInput('');
            tool.setOutput('');
            clearError();
            setStatus('Dibersihkan');
        },

        /** Ganti isi input dengan isi hasil. */
        swap() {
            const previous = output?.value ?? '';

            tool.setInput(previous);
            tool.setOutput('');

            return previous;
        },

        async copy() {
            if ((output?.value ?? '') === '') {
                setStatus('Belum ada hasil untuk disalin', 'warn');

                return;
            }

            try {
                await navigator.clipboard.writeText(output.value);
                setStatus('Hasil disalin ke clipboard', 'ok');
            } catch {
                showError('Browser menolak akses clipboard. Salin manual dari panel hasil.');
            }
        },

        download(filename, mime = 'text/plain') {
            if ((output?.value ?? '') === '') {
                setStatus('Belum ada hasil untuk diunduh', 'warn');

                return;
            }

            const url = URL.createObjectURL(new Blob([output.value], { type: mime }));
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;
            link.click();
            URL.revokeObjectURL(url);
        },
    };

    function invoke(name, button) {
        const handler = handlers[name];

        if (! handler) {
            return;
        }

        try {
            const result = handler(tool, button);

            if (result instanceof Promise) {
                result.catch((error) => showError(describeError(error)));
            }
        } catch (error) {
            showError(describeError(error));
        }
    }

    root.querySelector('[data-tool-actions]')?.addEventListener('click', (event) => {
        const button = event.target.closest('button[data-action]');

        if (button && root.contains(button)) {
            invoke(button.dataset.action, button);
        }
    });

    root.querySelector('[data-tool-options]')?.addEventListener('change', (event) => {
        handlers.onOptionChange?.(tool, event.target);
    });

    handlers.ready?.(tool);

    return tool;
}
