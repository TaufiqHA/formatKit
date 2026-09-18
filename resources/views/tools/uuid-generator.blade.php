<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace output-only
                      output-label="Daftar UUID"
                      output-note="Setiap baris satu UUID. Klik Salin hasil untuk memakai semuanya sekaligus."
                      :rows="14">
        <x-slot:actions>
            <x-ui.button data-action="generate" variant="primary">Buat UUID</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Versi</span>
                <select data-option="version" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="v4">v4 (acak)</option>
                    <option value="v7">v7 (urut waktu)</option>
                </select>
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Jumlah</span>
                <input type="number"
                       data-option="count"
                       value="5"
                       min="1"
                       max="1000"
                       class="w-20 border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="uppercase" class="size-5 border-3 border-ink accent-ink">
                Huruf besar
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="noHyphens" class="size-5 border-3 border-ink accent-ink">
                Tanpa tanda hubung
            </label>

            <label class="flex items-center gap-2 text-sm font-bold">
                <input type="checkbox" data-option="braces" class="size-5 border-3 border-ink accent-ink">
                Kurung kurawal
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
