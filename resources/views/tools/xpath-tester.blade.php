<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Dokumen XML"
                      input-hint="tempel markup XML yang ingin diuji dengan ekspresi XPath"
                      output-label="Hasil Pencocokan Node XPath"
                      placeholder="<root><buku kategori=&quot;web&quot;><judul>Laravel</judul></buku></root>">
        <x-slot:actions>
            <x-ui.button data-action="evaluate" variant="primary">Uji XPath</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Ekspresi XPath</span>
                <input type="text" data-option="xpath" placeholder="//buku/judul" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold w-64 sm:w-80">
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
