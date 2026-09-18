<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Teks atau Base64"
                      input-hint="encode: teks biasa · decode: string Base64"
                      output-label="Hasil"
                      placeholder="Halo dunia…">
        <x-slot:actions>
            <x-ui.button data-action="encode" variant="primary">Encode</x-ui.button>
            <x-ui.button data-action="decode" variant="info">Decode</x-ui.button>
            <x-ui.button data-action="auto" variant="accent">Otomatis</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="urlSafe" class="size-5 border-3 border-ink accent-ink">
                Base64 URL-safe
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="allowBinary" class="size-5 border-3 border-ink accent-ink">
                Izinkan data biner
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
