import { formatHtml, minifyHtml } from '../lib/html.js';
import { createTool } from './_shared.js';

const SAMPLE = `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>FormatKit - Web Tools</title>
<!-- Catatan header -->
<link rel="stylesheet" href="/app.css">
</head>
<body>
<header class="navbar">
<h1>FormatKit</h1>
<nav>
<ul>
<li><a href="/">Beranda</a></li>
<li><a href="/tools">Daftar Tools</a></li>
</ul>
</nav>
</header>
<main>
<article>
<h2>Cepat, Ringan, dan Privat</h2>
<p>Semua pemrosesan data dilakukan 100% di dalam peramban Anda.</p>
<img src="/logo.svg" alt="FormatKit Logo">
</article>
</main>
</body>
</html>`;

function execute(tool, action, label) {
    const source = tool.value();

    if (source.trim() === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu input');

        return;
    }

    try {
        const indent = tool.option('indent', '2');
        const result = action === 'minify' ? minifyHtml(source) : formatHtml(source, indent);
        tool.setOutput(result);
        tool.clearError();
        tool.setStatus(label, 'ok');
    } catch (error) {
        tool.fail(`HTML tidak dapat diproses: ${error.message}`);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');
    },

    format(tool) {
        execute(tool, 'format', 'HTML Diformat');
    },

    minify(tool) {
        execute(tool, 'minify', 'HTML Diperkecil (Minified)');
    },

    sample(tool) {
        tool.setInput(SAMPLE);
        execute(tool, 'format', 'Contoh dimuat');
    },

    download(tool) {
        tool.download('formatted.html', 'text/html');
    },
});
