import { explainCron, getNextRuns } from '../lib/cron.js';
import { createTool } from './_shared.js';

const SAMPLE_CRON = '*/15 * * * *';

function formatDateWib(date) {
    return new Intl.DateTimeFormat('id-ID', {
        dateStyle: 'full',
        timeStyle: 'medium',
        timeZone: 'Asia/Jakarta',
    }).format(date) + ' WIB';
}

function processCron(tool) {
    const expr = tool.value().trim();

    if (expr === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu ekspresi cron');
        return;
    }

    try {
        const explanation = explainCron(expr);
        const nextRuns = getNextRuns(expr, 5);

        const lines = [];
        lines.push('/* ===============================');
        lines.push(' * PENJELASAN EKSPRESI CRON');
        lines.push(' * =============================== */');
        lines.push(explanation);
        lines.push('');
        lines.push('/* ===============================');
        lines.push(' * JADWAL 5 EKSEKUSI BERIKUTNYA');
        lines.push(' * =============================== */');

        if (nextRuns.length === 0) {
            lines.push('Tidak ada jadwal eksekusi berikutnya yang cocok dalam batas waktu pencarian.');
        } else {
            nextRuns.forEach((date, i) => {
                lines.push(`${i + 1}. ${formatDateWib(date)}`);
            });
        }

        tool.setOutput(lines.join('\n'));
        tool.clearError();
        tool.setStatus('Ekspresi cron valid', 'ok');
    } catch (error) {
        tool.fail(`Ekspresi cron tidak valid: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        // Handler perubahan dropdown preset
        const presetSelect = tool.root.querySelector('[data-option="preset"]');
        if (presetSelect) {
            presetSelect.addEventListener('change', () => {
                if (presetSelect.value) {
                    tool.setInput(presetSelect.value);
                    processCron(tool);
                }
            });
        }

        if (tool.value().trim()) {
            processCron(tool);
        }
    },

    explain(tool) {
        processCron(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_CRON);
        const presetSelect = tool.root.querySelector('[data-option="preset"]');
        if (presetSelect) {
            presetSelect.value = SAMPLE_CRON;
        }
        processCron(tool);
    },

    download(tool) {
        tool.download('cron-schedule.txt', 'text/plain');
    },
});
