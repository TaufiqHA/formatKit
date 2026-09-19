<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Teks / String"
                      input-hint="tempel string teks yang ingin di-escape atau di-unescape"
                      output-label="Hasil"
                      placeholder="Halo &quot;dunia&quot;... baris baru...">
        <x-slot:actions>
            <x-ui.button data-action="escape" variant="primary">Escape</x-ui.button>
            <x-ui.button data-action="unescape" variant="info">Unescape</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Target / Bahasa</span>
                <select data-option="mode" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="json">JSON / JavaScript</option>
                    <option value="sql">SQL (Kutip Tunggal)</option>
                    <option value="html">HTML (&lt;, &gt;, &amp;, &quot;)</option>
                    <option value="java">Java / C#</option>
                    <option value="regex">Regular Expression</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
