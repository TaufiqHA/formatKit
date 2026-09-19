<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="CSV atau JSON"
                      input-hint="tempel data CSV atau JSON di sini"
                      output-label="Hasil Konversi"
                      placeholder="nama,pekerjaan,kota
Budi,Developer,Jakarta
Ani,Desainer,Bandung">
        <x-slot:actions>
            <x-ui.button data-action="csv-to-json" variant="primary">CSV → JSON</x-ui.button>
            <x-ui.button data-action="json-to-csv" variant="accent">JSON → CSV</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample-csv" variant="quiet">Contoh CSV</x-ui.button>
            <x-ui.button data-action="sample-json" variant="quiet">Contoh JSON</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh berkas</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Pemisah</span>
                <select data-option="delimiter" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="auto">Otomatis</option>
                    <option value=",">Koma (,)</option>
                    <option value=";">Titik Koma (;)</option>
                    <option value="&#9;">Tab</option>
                    <option value="|">Pipe (|)</option>
                </select>
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="hasHeader" checked class="size-5 border-3 border-ink accent-ink">
                Baris 1 Header
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="parseValues" checked class="size-5 border-3 border-ink accent-ink">
                Auto Tipe Data
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
