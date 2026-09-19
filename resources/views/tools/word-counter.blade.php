<x-tools.shell :tool="$tool" :catalog="$catalog">
    <div class="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Kata</span>
            <p data-stat="words" class="mt-1 font-mono text-2xl font-bold">0</p>
        </div>
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Karakter</span>
            <p data-stat="charsWithSpaces" class="mt-1 font-mono text-2xl font-bold">0</p>
            <span data-stat="charsNoSpaces" class="font-mono text-[11px] text-ink-soft">0 tanpa spasi</span>
        </div>
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Kalimat</span>
            <p data-stat="sentences" class="mt-1 font-mono text-2xl font-bold">0</p>
        </div>
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Paragraf</span>
            <p data-stat="paragraphs" class="mt-1 font-mono text-2xl font-bold">0</p>
        </div>
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Waktu Baca</span>
            <p data-stat="readingMinutes" class="mt-1 font-mono text-2xl font-bold">0 mnt</p>
            <span class="font-mono text-[11px] text-ink-soft">~200 kata/mnt</span>
        </div>
        <div class="border-3 border-ink bg-white p-3 shadow-brutal-sm">
            <span class="font-mono text-xs font-bold uppercase text-ink-soft">Waktu Bicara</span>
            <p data-stat="speakingMinutes" class="mt-1 font-mono text-2xl font-bold">0 mnt</p>
            <span class="font-mono text-[11px] text-ink-soft">~130 kata/mnt</span>
        </div>
    </div>

    <x-tools.workspace input-label="Teks Asli"
                      input-hint="ketik atau tempel teks di sini"
                      output-label="Teks Hasil Transformasi"
                      placeholder="FormatKit adalah rangkaian tools web online yang cepat, gratis, dan menjaga privasi pengguna...">
        <x-slot:actions>
            <x-ui.button data-action="upper" variant="primary">UPPERCASE</x-ui.button>
            <x-ui.button data-action="lower" variant="default">lowercase</x-ui.button>
            <x-ui.button data-action="title" variant="accent">Title Case</x-ui.button>
            <x-ui.button data-action="sentence" variant="info">Sentence case</x-ui.button>
            <x-ui.button data-action="camel" variant="default">camelCase</x-ui.button>
            <x-ui.button data-action="kebab" variant="default">kebab-case</x-ui.button>
            <x-ui.button data-action="snake" variant="default">snake_case</x-ui.button>
            <x-ui.button data-action="clean" variant="quiet">Bersihkan Spasi</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>
    </x-tools.workspace>
</x-tools.shell>
