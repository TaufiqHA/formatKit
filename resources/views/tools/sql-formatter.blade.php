<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Query SQL"
                      input-hint="tempel kueri SQL di sini"
                      output-label="Hasil SQL"
                      placeholder="SELECT u.id, u.name, p.title FROM users u INNER JOIN posts p ON u.id = p.user_id WHERE u.active = 1 ORDER BY u.created_at DESC;">
        <x-slot:actions>
            <x-ui.button data-action="format" variant="primary">Format</x-ui.button>
            <x-ui.button data-action="minify" variant="default">Minify</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .sql</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Indentasi</span>
                <select data-option="indent" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="2">2 spasi</option>
                    <option value="4">4 spasi</option>
                    <option value="tab">Tab</option>
                </select>
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Kata Kunci</span>
                <select data-option="casing" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="upper">HURUF BESAR</option>
                    <option value="lower">huruf kecil</option>
                    <option value="preserve">Aslinya</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
