<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="URL atau nilai parameter"
                      input-hint="encode atau decode"
                      output-label="Hasil"
                      placeholder="https://contoh.id/cari?q=kopi susu">
        <x-slot:actions>
            <x-ui.button data-action="encode" variant="primary">Encode</x-ui.button>
            <x-ui.button data-action="decode" variant="info">Decode</x-ui.button>
            <x-ui.button data-action="query" variant="accent">Baca parameter</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Mode</span>
                <select data-option="mode" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="component">Komponen (encodeURIComponent)</option>
                    <option value="uri">URL utuh (encodeURI)</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
