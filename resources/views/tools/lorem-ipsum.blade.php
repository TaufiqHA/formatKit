<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace output-only
                      output-label="Hasil Teks Lorem Ipsum"
                      output-note="Teks siap disalin untuk tata letak desain atau pengujian prototipe web."
                      :rows="14">
        <x-slot:actions>
            <x-ui.button data-action="generate" variant="primary">Buat Teks</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Tipe</span>
                <select data-option="type" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="paragraphs">Paragraf</option>
                    <option value="sentences">Kalimat</option>
                    <option value="words">Kata</option>
                </select>
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Jumlah</span>
                <input type="number"
                       data-option="count"
                       value="3"
                       min="1"
                       max="100"
                       class="w-20 border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="startWithLorem" checked class="size-5 border-3 border-ink accent-ink">
                Mulai dengan "Lorem ipsum..."
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
