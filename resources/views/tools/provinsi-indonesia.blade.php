<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace output-only
                      output-label="Daftar 38 Provinsi di Indonesia"
                      output-note="Data provinsi, ibu kota, dan wilayah pulau resmi Republik Indonesia."
                      :rows="16">
        <x-slot:actions>
            <x-ui.button data-action="refresh" variant="primary">Muat Ulang</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh Data</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Cari</span>
                <input type="text"
                       data-option="search"
                       placeholder="nama provinsi, ibu kota, pulau..."
                       class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold w-48 sm:w-64">
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Format</span>
                <select data-option="format" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="table">Tabel Teks</option>
                    <option value="json">Format JSON</option>
                    <option value="csv">Format CSV</option>
                    <option value="select">Tag HTML &lt;select&gt;</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
