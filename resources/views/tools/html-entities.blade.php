<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Teks atau markup"
                      input-hint="encode atau decode entitas"
                      output-label="Hasil"
                      placeholder="&lt;p&gt;Harga &amp;quot;kopi&amp;quot; di bawah 10rb&lt;/p&gt;">
        <x-slot:actions>
            <x-ui.button data-action="encode" variant="primary">Encode</x-ui.button>
            <x-ui.button data-action="decode" variant="info">Decode</x-ui.button>
            <x-ui.button data-action="table" variant="accent">Daftar entitas</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Bentuk entitas</span>
                <select data-option="entityStyle" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="named">Bernama (&amp;amp;)</option>
                    <option value="numeric">Numerik (&amp;#38;)</option>
                </select>
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="asciiOnly" class="size-5 border-3 border-ink accent-ink">
                ASCII saja
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
