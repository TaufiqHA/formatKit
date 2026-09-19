import { decodeJwt } from '../lib/jwt.js';
import { createTool } from './_shared.js';

// Contoh token JWT standar (HS256)
const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyXzEwMjQiLCJuYW1lIjoiQnVkaSBTYW50b3NvIiwiZW1haWwiOiJidWRpQGZvcm1hdGtpdC5pZCIsInJvbGUiOiJkZXZlbG9wZXIiLCJpYXQiOjE3NTgzMjAwMDAsImV4cCI6MTc1ODQwNjQwMH0.e_example_signature_hash_xyz12345';

function processToken(tool) {
    const raw = tool.value().trim();

    if (raw === '') {
        tool.setOutput('');
        tool.clearError();
        tool.setStatus('Menunggu token JWT');
        return;
    }

    try {
        const decoded = decodeJwt(raw);

        const lines = [];
        lines.push('/* ===============================');
        lines.push(' * HEADER: ALGORITHM & TOKEN TYPE');
        lines.push(' * =============================== */');
        lines.push(decoded.formattedHeader);
        lines.push('');
        lines.push('/* ===============================');
        lines.push(' * PAYLOAD: DATA & CLAIMS');
        lines.push(' * =============================== */');
        lines.push(decoded.formattedPayload);
        lines.push('');
        lines.push('/* ===============================');
        lines.push(' * STATUS & INFORMASI WAKTU');
        lines.push(' * =============================== */');

        if (decoded.claims.exp) {
            const exp = decoded.claims.exp;
            lines.push(`Kedaluwarsa (exp) : ${exp.formatted} (${exp.isExpired ? 'TELAH KEDALUWARSA ' + exp.relative : 'Aktif hingga ' + exp.relative})`);
        } else {
            lines.push('Kedaluwarsa (exp) : Tidak ditentukan (token tidak memiliki batas waktu)');
        }

        if (decoded.claims.iat) {
            const iat = decoded.claims.iat;
            lines.push(`Diterbitkan (iat) : ${iat.formatted} (${iat.relative})`);
        }

        if (decoded.claims.nbf) {
            const nbf = decoded.claims.nbf;
            lines.push(`Berlaku sejak (nbf): ${nbf.formatted} ${nbf.isFuture ? '(BELUM AKTIF)' : '(SUDAH AKTIF)'}`);
        }

        lines.push(`Signature         : ${decoded.signature}`);

        tool.setOutput(lines.join('\n'));
        tool.clearError();

        if (decoded.claims.exp?.isExpired) {
            tool.setStatus('JWT berhasil dibaca (Kedaluwarsa)', 'warn');
        } else {
            tool.setStatus('JWT berhasil dibaca (Aktif)', 'ok');
        }
    } catch (error) {
        tool.fail(error.message);
    }
}

createTool({
    ready(tool) {
        tool.setStatus('Siap');

        // Otomatis decode jika ada input saat halaman dimuat
        if (tool.value().trim()) {
            processToken(tool);
        }
    },

    decode(tool) {
        processToken(tool);
    },

    sample(tool) {
        tool.setInput(SAMPLE_JWT);
        processToken(tool);
        tool.setStatus('Contoh token dimuat', 'ok');
    },

    download(tool) {
        tool.download('jwt-decoded.json', 'application/json');
    },
});
