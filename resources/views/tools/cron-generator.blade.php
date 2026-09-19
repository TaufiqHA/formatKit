<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Ekspresi Cron (5 Bagian: Menit Jam Tanggal Bulan Hari-Minggu)"
                      input-hint="contoh: */15 * * * * atau 0 9 * * 1-5"
                      output-label="Penjelasan Jadwal & 5 Waktu Eksekusi Berikutnya"
                      placeholder="*/15 * * * *">
        <x-slot:actions>
            <x-ui.button data-action="explain" variant="primary">Periksa Cron</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Pilihan Preset</span>
                <select data-option="preset" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="">-- Pilih Pola Populer --</option>
                    <option value="* * * * *">Setiap menit (* * * * *)</option>
                    <option value="*/5 * * * *">Setiap 5 menit (*/5 * * * *)</option>
                    <option value="*/15 * * * *">Setiap 15 menit (*/15 * * * *)</option>
                    <option value="0 * * * *">Setiap jam pada menit ke-0 (0 * * * *)</option>
                    <option value="0 0 * * *">Setiap hari pukul 00:00 (0 0 * * *)</option>
                    <option value="0 8 * * *">Setiap hari pukul 08:00 (0 8 * * *)</option>
                    <option value="0 9 * * 1-5">Senin–Jumat pukul 09:00 (0 9 * * 1-5)</option>
                    <option value="0 10 * * 6,0">Sabtu & Minggu pukul 10:00 (0 10 * * 6,0)</option>
                    <option value="0 0 * * 0">Setiap Minggu tengah malam (0 0 * * 0)</option>
                    <option value="0 0 1 * *">Tanggal 1 tiap bulan pukul 00:00 (0 0 1 * *)</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
