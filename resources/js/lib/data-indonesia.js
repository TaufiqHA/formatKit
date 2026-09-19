/**
 * Dataset 38 Provinsi di Indonesia dan utilitas ekspor data.
 */

export const PROVINSI_INDONESIA = [
    { kode: '11', nama: 'Aceh', ibuKota: 'Banda Aceh', pulau: 'Sumatera' },
    { kode: '12', nama: 'Sumatera Utara', ibuKota: 'Medan', pulau: 'Sumatera' },
    { kode: '13', nama: 'Sumatera Barat', ibuKota: 'Padang', pulau: 'Sumatera' },
    { kode: '14', nama: 'Riau', ibuKota: 'Pekanbaru', pulau: 'Sumatera' },
    { kode: '15', nama: 'Jambi', ibuKota: 'Jambi', pulau: 'Sumatera' },
    { kode: '16', nama: 'Sumatera Selatan', ibuKota: 'Palembang', pulau: 'Sumatera' },
    { kode: '17', nama: 'Bengkulu', ibuKota: 'Bengkulu', pulau: 'Sumatera' },
    { kode: '18', nama: 'Lampung', ibuKota: 'Bandar Lampung', pulau: 'Sumatera' },
    { kode: '19', nama: 'Kepulauan Bangka Belitung', ibuKota: 'Pangkalpinang', pulau: 'Sumatera' },
    { kode: '21', nama: 'Kepulauan Riau', ibuKota: 'Tanjungpinang', pulau: 'Sumatera' },
    { kode: '31', nama: 'DKI Jakarta', ibuKota: 'Jakarta', pulau: 'Jawa' },
    { kode: '32', nama: 'Jawa Barat', ibuKota: 'Bandung', pulau: 'Jawa' },
    { kode: '33', nama: 'Jawa Tengah', ibuKota: 'Semarang', pulau: 'Jawa' },
    { kode: '34', nama: 'DI Yogyakarta', ibuKota: 'Yogyakarta', pulau: 'Jawa' },
    { kode: '35', nama: 'Jawa Timur', ibuKota: 'Surabaya', pulau: 'Jawa' },
    { kode: '36', nama: 'Banten', ibuKota: 'Serang', pulau: 'Jawa' },
    { kode: '51', nama: 'Bali', ibuKota: 'Denpasar', pulau: 'Bali & Nusa Tenggara' },
    { kode: '52', nama: 'Nusa Tenggara Barat', ibuKota: 'Mataram', pulau: 'Bali & Nusa Tenggara' },
    { kode: '53', nama: 'Nusa Tenggara Timur', ibuKota: 'Kupang', pulau: 'Bali & Nusa Tenggara' },
    { kode: '61', nama: 'Kalimantan Barat', ibuKota: 'Pontianak', pulau: 'Kalimantan' },
    { kode: '62', nama: 'Kalimantan Tengah', ibuKota: 'Palangkaraya', pulau: 'Kalimantan' },
    { kode: '63', nama: 'Kalimantan Selatan', ibuKota: 'Banjarmasin', pulau: 'Kalimantan' },
    { kode: '64', nama: 'Kalimantan Timur', ibuKota: 'Samarinda', pulau: 'Kalimantan' },
    { kode: '65', nama: 'Kalimantan Utara', ibuKota: 'Tanjung Selor', pulau: 'Kalimantan' },
    { kode: '71', nama: 'Sulawesi Utara', ibuKota: 'Manado', pulau: 'Sulawesi' },
    { kode: '72', nama: 'Sulawesi Tengah', ibuKota: 'Palu', pulau: 'Sulawesi' },
    { kode: '73', nama: 'Sulawesi Selatan', ibuKota: 'Makassar', pulau: 'Sulawesi' },
    { kode: '74', nama: 'Sulawesi Tenggara', ibuKota: 'Kendari', pulau: 'Sulawesi' },
    { kode: '75', nama: 'Gorontalo', ibuKota: 'Gorontalo', pulau: 'Sulawesi' },
    { kode: '76', nama: 'Sulawesi Barat', ibuKota: 'Mamuju', pulau: 'Sulawesi' },
    { kode: '81', nama: 'Maluku', ibuKota: 'Ambon', pulau: 'Maluku & Papua' },
    { kode: '82', nama: 'Maluku Utara', ibuKota: 'Sofifi', pulau: 'Maluku & Papua' },
    { kode: '91', nama: 'Papua Barat', ibuKota: 'Manokwari', pulau: 'Maluku & Papua' },
    { kode: '92', nama: 'Papua', ibuKota: 'Jayapura', pulau: 'Maluku & Papua' },
    { kode: '93', nama: 'Papua Selatan', ibuKota: 'Merauke', pulau: 'Maluku & Papua' },
    { kode: '94', nama: 'Papua Tengah', ibuKota: 'Nabire', pulau: 'Maluku & Papua' },
    { kode: '95', nama: 'Papua Pegunungan', ibuKota: 'Jayawijaya', pulau: 'Maluku & Papua' },
    { kode: '96', nama: 'Papua Barat Daya', ibuKota: 'Sorong', pulau: 'Maluku & Papua' },
];

export function exportProvinces(format = 'json', filterText = '') {
    const list = filterText
        ? PROVINSI_INDONESIA.filter((p) =>
            p.nama.toLowerCase().includes(filterText.toLowerCase()) ||
            p.ibuKota.toLowerCase().includes(filterText.toLowerCase()) ||
            p.pulau.toLowerCase().includes(filterText.toLowerCase()) ||
            p.kode.includes(filterText),
        )
        : PROVINSI_INDONESIA;

    if (format === 'json') {
        return JSON.stringify(list, null, 2);
    }

    if (format === 'csv') {
        const rows = ['kode,nama_provinsi,ibu_kota,pulau'];
        for (const p of list) {
            rows.push(`${p.kode},"${p.nama}","${p.ibuKota}","${p.pulau}"`);
        }
        return rows.join('\n');
    }

    if (format === 'select') {
        const options = list.map((p) => `    <option value="${p.kode}">${p.nama}</option>`).join('\n');
        return `<select name="provinsi" id="provinsi">\n    <option value="">-- Pilih Provinsi --</option>\n${options}\n</select>`;
    }

    // Default: plain text table
    const lines = [];
    lines.push('Kode | Nama Provinsi            | Ibu Kota        | Wilayah / Pulau');
    lines.push('-----+--------------------------+-----------------+-----------------------');
    for (const p of list) {
        const kode = p.kode.padEnd(4);
        const nama = p.nama.padEnd(24);
        const ibu = p.ibuKota.padEnd(15);
        lines.push(`${kode} | ${nama} | ${ibu} | ${p.pulau}`);
    }
    return lines.join('\n');
}
