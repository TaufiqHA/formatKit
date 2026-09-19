/**
 * Direktori dan Referensi Kode Transfer Bank di Indonesia.
 */

export const DATA_KODE_BANK = [
    // Bank BUMN & Syariah Utama
    { kode: '002', nama: 'Bank BRI (Bank Rakyat Indonesia)', kategori: 'BUMN' },
    { kode: '008', nama: 'Bank Mandiri', kategori: 'BUMN' },
    { kode: '009', nama: 'Bank BNI (Bank Negara Indonesia)', kategori: 'BUMN' },
    { kode: '200', nama: 'Bank BTN (Bank Tabungan Negara)', kategori: 'BUMN' },
    { kode: '451', nama: 'Bank Syariah Indonesia (BSI)', kategori: 'BUMN Syariah' },

    // Bank Swasta Nasional Utama
    { kode: '014', nama: 'Bank BCA (Bank Central Asia)', kategori: 'Swasta' },
    { kode: '022', nama: 'CIMB Niaga / CIMB Niaga Syariah', kategori: 'Swasta' },
    { kode: '013', nama: 'Bank Permata / Permata Syariah', kategori: 'Swasta' },
    { kode: '011', nama: 'Bank Danamon', kategori: 'Swasta' },
    { kode: '016', nama: 'Maybank Indonesia', kategori: 'Swasta' },
    { kode: '019', nama: 'Bank Panin', kategori: 'Swasta' },
    { kode: '028', nama: 'OCBC NISP', kategori: 'Swasta' },
    { kode: '426', nama: 'Bank Mega / Mega Syariah', kategori: 'Swasta' },
    { kode: '153', nama: 'Bank Sinarmas', kategori: 'Swasta' },
    { kode: '441', nama: 'KB Bukopin / Bukopin Syariah', kategori: 'Swasta' },
    { kode: '536', nama: 'BCA Syariah', kategori: 'Swasta' },
    { kode: '147', nama: 'Bank Muamalat Indonesia', kategori: 'Swasta Syariah' },
    { kode: '037', nama: 'Bank Artha Graha Internasional', kategori: 'Swasta' },
    { kode: '046', nama: 'DBS Bank Indonesia', kategori: 'Swasta' },
    { kode: '031', nama: 'Citibank Indonesia', kategori: 'Swasta' },
    { kode: '042', nama: 'Bank of Tokyo Mitsubishi UFJ', kategori: 'Swasta' },

    // Bank Digital & Fintech
    { kode: '542', nama: 'Bank Jago', kategori: 'Bank Digital' },
    { kode: '535', nama: 'SeaBank Indonesia', kategori: 'Bank Digital' },
    { kode: '213', nama: 'Jenius / Bank BTPN', kategori: 'Bank Digital' },
    { kode: '561', nama: 'Allo Bank Indonesia', kategori: 'Bank Digital' },
    { kode: '501', nama: 'Blu by BCA Digital', kategori: 'Bank Digital' },
    { kode: '490', nama: 'Bank Neo Commerce (BNC)', kategori: 'Bank Digital' },
    { kode: '484', nama: 'Line Bank / KEB Hana Bank', kategori: 'Bank Digital' },
    { kode: '494', nama: 'Bank Raya Indonesia', kategori: 'Bank Digital' },
    { kode: '562', nama: 'Superbank (Fama)', kategori: 'Bank Digital' },
    { kode: '503', nama: 'Bank Nationalnobu (Nobu Bank)', kategori: 'Bank Digital' },

    // Bank Pembangunan Daerah (BPD)
    { kode: '110', nama: 'Bank BJB (Jawa Barat & Banten)', kategori: 'BPD' },
    { kode: '111', nama: 'Bank DKI Jakarta', kategori: 'BPD' },
    { kode: '112', nama: 'Bank BPD DIY (Yogyakarta)', kategori: 'BPD' },
    { kode: '113', nama: 'Bank Jateng (Jawa Tengah)', kategori: 'BPD' },
    { kode: '114', nama: 'Bank Jatim (Jawa Timur)', kategori: 'BPD' },
    { kode: '115', nama: 'Bank Jambi', kategori: 'BPD' },
    { kode: '116', nama: 'Bank BPD Aceh', kategori: 'BPD' },
    { kode: '117', nama: 'Bank Sumut (Sumatera Utara)', kategori: 'BPD' },
    { kode: '118', nama: 'Bank Nagari (Sumatera Barat)', kategori: 'BPD' },
    { kode: '119', nama: 'Bank Riau Kepri', kategori: 'BPD' },
    { kode: '120', nama: 'Bank Sumsel Babel', kategori: 'BPD' },
    { kode: '121', nama: 'Bank Lampung', kategori: 'BPD' },
    { kode: '122', nama: 'Bank Kalsel (Kalimantan Selatan)', kategori: 'BPD' },
    { kode: '123', nama: 'Bank Kalbar (Kalimantan Barat)', kategori: 'BPD' },
    { kode: '124', nama: 'Bank Kaltimtara (Kaltim & Kaltara)', kategori: 'BPD' },
    { kode: '125', nama: 'Bank Kalteng (Kalimantan Tengah)', kategori: 'BPD' },
    { kode: '126', nama: 'Bank Sulselbar (Sulawesi Selatan & Barat)', kategori: 'BPD' },
    { kode: '127', nama: 'Bank SulutGo (Sulawesi Utara & Gorontalo)', kategori: 'BPD' },
    { kode: '128', nama: 'Bank NTB Syariah', kategori: 'BPD' },
    { kode: '129', nama: 'Bank BPD Bali', kategori: 'BPD' },
    { kode: '130', nama: 'Bank NTT (Nusa Tenggara Timur)', kategori: 'BPD' },
    { kode: '131', nama: 'Bank Maluku Malut', kategori: 'BPD' },
    { kode: '132', nama: 'Bank Papua', kategori: 'BPD' },
    { kode: '133', nama: 'Bank Bengkulu', kategori: 'BPD' },
    { kode: '134', nama: 'Bank Sulteng (Sulawesi Tengah)', kategori: 'BPD' },
    { kode: '135', nama: 'Bank Sultra (Sulawesi Tenggara)', kategori: 'BPD' },
];

export function searchKodeBank(query = '', format = 'table') {
    const q = (query || '').trim().toLowerCase();
    const list = q
        ? DATA_KODE_BANK.filter((item) =>
            item.kode.includes(q) ||
            item.nama.toLowerCase().includes(q) ||
            item.kategori.toLowerCase().includes(q),
        )
        : DATA_KODE_BANK;

    if (format === 'json') {
        return JSON.stringify(list, null, 2);
    }

    if (format === 'csv') {
        const rows = ['kode_bank,nama_bank,kategori'];
        for (const item of list) {
            rows.push(`${item.kode},"${item.nama}","${item.kategori}"`);
        }
        return rows.join('\n');
    }

    // Default: formatted table
    const lines = [];
    lines.push(`Ditemukan ${list.length} data kode bank:`);
    lines.push('');
    lines.push('Kode | Nama Bank                                       | Kategori');
    lines.push('-----+-------------------------------------------------+-----------------');
    for (const item of list) {
        const kode = item.kode.padEnd(4);
        const nama = item.nama.padEnd(47);
        lines.push(`${kode} | ${nama} | ${item.kategori}`);
    }
    return lines.join('\n');
}
