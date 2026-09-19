<x-tools.shell :tool="$tool" :catalog="$catalog">
    <div class="mt-6 border-3 border-ink bg-white p-4 shadow-brutal">
        <div class="flex flex-wrap items-center justify-between gap-3">
            <label for="regex-pattern" class="font-mono text-xs font-bold uppercase tracking-widest">
                Pola Regular Expression
            </label>
            <div class="flex items-center gap-2">
                <span class="font-mono text-xs text-ink-soft">Pola Populer:</span>
                <select id="regex-preset" class="border-2 border-ink bg-paper px-2 py-1 text-xs font-bold">
                    <option value="">-- Pilih Pola Siap Pakai --</option>
                    <option value="email">Alamat Email</option>
                    <option value="url">URL Web</option>
                    <option value="phone_id">Nomor HP Indonesia</option>
                    <option value="ipv4">Alamat IPv4</option>
                    <option value="date_iso">Tanggal YYYY-MM-DD</option>
                    <option value="uuid">UUID / GUID</option>
                    <option value="hex_color">Warna Hex CSS</option>
                </select>
            </div>
        </div>

        <div class="mt-2 flex items-center border-3 border-ink bg-paper focus-within:bg-white">
            <span class="px-3 font-mono text-lg font-bold text-ink-soft">/</span>
            <input type="text"
                   id="regex-pattern"
                   data-option="pattern"
                   placeholder="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                   spellcheck="false"
                   autocomplete="off"
                   class="w-full bg-transparent py-2.5 font-mono text-sm font-bold outline-none">
            <span class="px-3 font-mono text-lg font-bold text-ink-soft">/</span>
        </div>

        <div class="mt-3 flex flex-wrap items-center gap-4 text-xs font-bold">
            <span class="font-mono uppercase text-ink-soft">Flags:</span>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" data-flag="g" checked class="size-4 border-2 border-ink accent-ink">
                <span class="font-mono">g</span> (global)
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" data-flag="i" class="size-4 border-2 border-ink accent-ink">
                <span class="font-mono">i</span> (ignore case)
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" data-flag="m" class="size-4 border-2 border-ink accent-ink">
                <span class="font-mono">m</span> (multiline)
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" data-flag="s" class="size-4 border-2 border-ink accent-ink">
                <span class="font-mono">s</span> (dotAll)
            </label>
            <label class="inline-flex items-center gap-1.5 cursor-pointer">
                <input type="checkbox" data-flag="u" class="size-4 border-2 border-ink accent-ink">
                <span class="font-mono">u</span> (unicode)
            </label>
        </div>
    </div>

    <x-tools.workspace input-label="Teks Sampel Uji"
                      input-hint="tempel teks yang ingin dicocokkan"
                      output-label="Hasil / Teks Kecocokan"
                      placeholder="Hubungi tim kami di halo@formatkit.com atau bantuan@domain.co.id.">
        <x-slot:actions>
            <x-ui.button data-action="test" variant="primary">Uji Regex</x-ui.button>
            <x-ui.button data-action="replace" variant="accent">Ganti Teks</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <div class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Teks Pengganti</span>
                <input type="text"
                       data-option="replacement"
                       placeholder="[SENSOR]"
                       class="border-3 border-ink bg-white px-2 py-1 text-xs font-bold">
            </div>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
