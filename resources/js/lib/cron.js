/**
 * Parser, validator, dan penerjemah ekspresi cron standar (5 bagian) ke Bahasa Indonesia.
 */

const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const MONTHS = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember',
];

export const CRON_PRESETS = [
    { label: 'Setiap menit', value: '* * * * *' },
    { label: 'Setiap 5 menit', value: '*/5 * * * *' },
    { label: 'Setiap 15 menit', value: '*/15 * * * *' },
    { label: 'Setiap jam (menit 0)', value: '0 * * * *' },
    { label: 'Setiap 2 jam', value: '0 */2 * * *' },
    { label: 'Setiap hari pukul 00:00 (Tengah malam)', value: '0 0 * * *' },
    { label: 'Setiap hari pukul 08:00 pagi', value: '0 8 * * *' },
    { label: 'Hari kerja (Senin–Jumat) pukul 09:00', value: '0 9 * * 1-5' },
    { label: 'Setiap akhir pekan (Sabtu & Minggu) pukul 10:00', value: '0 10 * * 6,0' },
    { label: 'Setiap minggu (Minggu pukul 00:00)', value: '0 0 * * 0' },
    { label: 'Setiap tanggal 1 tiap bulan pukul 00:00', value: '0 0 1 * *' },
    { label: 'Setiap tanggal 1 Januari (Tahun Baru)', value: '0 0 1 1 *' },
];

/**
 * Validasi ekspresi cron 5 kolom.
 */
export function parseCron(expression) {
    const parts = (expression || '').trim().split(/\s+/);
    if (parts.length !== 5) {
        throw new Error(`Ekspresi cron harus memiliki 5 bagian (Menit Jam Hari-Bulan Bulan Hari-Minggu), ditemukan ${parts.length} bagian.`);
    }

    return {
        minute: parts[0],
        hour: parts[1],
        dayOfMonth: parts[2],
        month: parts[3],
        dayOfWeek: parts[4],
    };
}

/**
 * Terjemahkan ekspresi cron menjadi kalimat deskriptif dalam Bahasa Indonesia.
 */
export function explainCron(expression) {
    const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(expression);

    const descParts = [];

    // Kasus umum setiap menit
    if (minute === '*' && hour === '*' && dayOfMonth === '*' && month === '*' && dayOfWeek === '*') {
        return 'Berjalan setiap menit tanpa jeda.';
    }

    // Menit & Jam
    if (minute.startsWith('*/')) {
        const step = minute.slice(2);
        descParts.push(`Setiap ${step} menit`);
    } else if (minute === '*') {
        descParts.push('Setiap menit');
    } else if (hour === '*') {
        descParts.push(`Pada menit ke-${minute} setiap jam`);
    } else if (hour.startsWith('*/')) {
        const hStep = hour.slice(2);
        descParts.push(`Pada menit ke-${minute}, setiap ${hStep} jam`);
    } else {
        const padHour = hour.padStart(2, '0');
        const padMin = minute.padStart(2, '0');
        descParts.push(`Pukul ${padHour}:${padMin}`);
    }

    // Hari dalam Minggu
    if (dayOfWeek !== '*') {
        if (dayOfWeek === '1-5') {
            descParts.push('setiap hari kerja (Senin sampai Jumat)');
        } else if (dayOfWeek === '6,0' || dayOfWeek === '0,6') {
            descParts.push('setiap akhir pekan (Sabtu dan Minggu)');
        } else if (dayOfWeek.includes('-')) {
            const [start, end] = dayOfWeek.split('-').map(Number);
            descParts.push(`dari hari ${DAYS[start]} sampai ${DAYS[end]}`);
        } else if (dayOfWeek.includes(',')) {
            const daysListed = dayOfWeek.split(',').map((d) => DAYS[Number(d)]).filter(Boolean);
            descParts.push(`pada hari ${daysListed.join(', ')}`);
        } else {
            const d = Number(dayOfWeek);
            if (! isNaN(d) && DAYS[d]) {
                descParts.push(`pada hari ${DAYS[d]}`);
            }
        }
    }

    // Hari dalam Bulan
    if (dayOfMonth !== '*') {
        if (dayOfMonth.startsWith('*/')) {
            descParts.push(`setiap ${dayOfMonth.slice(2)} hari`);
        } else {
            descParts.push(`pada tanggal ${dayOfMonth}`);
        }
    }

    // Bulan
    if (month !== '*') {
        if (month.startsWith('*/')) {
            descParts.push(`setiap ${month.slice(2)} bulan`);
        } else {
            const m = Number(month);
            if (! isNaN(m) && MONTHS[m]) {
                descParts.push(`di bulan ${MONTHS[m]}`);
            }
        }
    }

    return descParts.join(', ') + '.';
}

function matchesField(value, pattern, min, max) {
    if (pattern === '*') {
        return true;
    }
    if (pattern.startsWith('*/')) {
        const step = parseInt(pattern.slice(2), 10);
        return value % step === 0;
    }
    if (pattern.includes(',')) {
        return pattern.split(',').some((p) => matchesField(value, p, min, max));
    }
    if (pattern.includes('-')) {
        const [start, end] = pattern.split('-').map((v) => parseInt(v, 10));
        return value >= start && value <= end;
    }
    return parseInt(pattern, 10) === value;
}

/**
 * Hitung N jadwal eksekusi berikutnya berdasarkan waktu saat ini.
 */
export function getNextRuns(expression, count = 5, fromDate = new Date()) {
    const { minute, hour, dayOfMonth, month, dayOfWeek } = parseCron(expression);
    const results = [];
    const current = new Date(fromDate.getTime());
    current.setSeconds(0, 0);
    current.setMinutes(current.getMinutes() + 1); // Mulai dari menit berikutnya

    const maxIterations = 100000; // Pencegah infinite loop
    let iterations = 0;

    while (results.length < count && iterations < maxIterations) {
        iterations++;
        const curMonth = current.getMonth() + 1; // 1-12
        const curDate = current.getDate(); // 1-31
        const curDay = current.getDay(); // 0-6
        const curHour = current.getHours(); // 0-23
        const curMin = current.getMinutes(); // 0-59

        if (! matchesField(curMonth, month, 1, 12)) {
            current.setMonth(current.getMonth() + 1, 1);
            current.setHours(0, 0, 0, 0);
            continue;
        }

        if (! matchesField(curDate, dayOfMonth, 1, 31) || ! matchesField(curDay, dayOfWeek, 0, 6)) {
            current.setDate(current.getDate() + 1);
            current.setHours(0, 0, 0, 0);
            continue;
        }

        if (! matchesField(curHour, hour, 0, 23)) {
            current.setHours(current.getHours() + 1, 0, 0, 0);
            continue;
        }

        if (! matchesField(curMin, minute, 0, 59)) {
            current.setMinutes(current.getMinutes() + 1);
            continue;
        }

        results.push(new Date(current.getTime()));
        current.setMinutes(current.getMinutes() + 1);
    }

    return results;
}
