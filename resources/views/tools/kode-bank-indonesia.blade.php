<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Pencarian Bank"
                      input-hint="nama atau kode transfer"
                      output-label="Daftar Kode Transfer Bank"
                      placeholder="contoh: BCA, BRI, Mandiri, SeaBank, BJB">
        <x-slot:actions>
            <x-ui.button data-action="search" variant="primary">Cari Bank</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Format</span>
                <select data-option="format" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="table">Tabel Teks</option>
                    <option value="json">Format JSON</option>
                    <option value="csv">Format CSV</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
