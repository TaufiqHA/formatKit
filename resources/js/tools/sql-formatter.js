import { formatSql, minifySql } from '../lib/sql.js';
import { createTool } from './_shared.js';

const SAMPLE = `SELECT u.id, u.name, u.email, COUNT(o.id) AS total_orders, SUM(o.total_amount) AS revenue FROM users u LEFT JOIN orders o ON u.id = o.user_id WHERE u.status = 'active' AND u.created_at >= '2025-01-01' GROUP BY u.id, u.name, u.email HAVING COUNT(o.id) > 0 ORDER BY revenue DESC LIMIT 20;`;

function convert(tool, transform, label) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const indent = tool.option('indent', '2');
        const casing = tool.option('casing', 'upper');
        tool.setOutput(transform(source, { indent, casing }));
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(`Gagal memproses SQL: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        convert(tool, (s, opts) => formatSql(s, opts), 'Diformat');
    },

    minify(tool) {
        convert(tool, (s) => minifySql(s), 'Diperkecil');
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        convert(tool, (s, opts) => formatSql(s, opts), 'Diformat dari contoh');
    },

    clear(tool) {
        tool.clear();
    },

    swap(tool) {
        convert(tool, (s, opts) => formatSql(s, opts), 'Diformat setelah ditukar');
    },

    copy(tool) {
        return tool.copy();
    },

    download(tool) {
        tool.download('query.sql', 'application/sql');
    },

    onOptionChange(tool) {
        if (tool.value().trim() !== '') {
            convert(tool, (s, opts) => formatSql(s, opts), 'Diformat');
        }
    },
});
