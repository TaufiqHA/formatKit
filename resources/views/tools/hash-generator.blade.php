<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Teks"
                      input-hint="atau pilih berkas di kanan"
                      output-label="Hash"
                      placeholder="FormatKit">
        <x-slot:actions>
            <x-ui.button data-action="compute" variant="primary">Hitung hash</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <fieldset class="flex flex-wrap items-center gap-3">
                <legend class="sr-only">Algoritma hash</legend>

                @foreach (['MD5' => 'md5', 'SHA-1' => 'sha1', 'SHA-256' => 'sha256', 'SHA-384' => 'sha384', 'SHA-512' => 'sha512'] as $label => $key)
                    <label class="flex items-center gap-1.5 text-sm font-bold">
                        <input type="checkbox"
                               data-option="{{ $key }}"
                               @checked(in_array($key, ['md5', 'sha256'], true))
                               class="size-5 border-3 border-ink accent-ink">
                        {{ $label }}
                    </label>
                @endforeach
            </fieldset>

            <label class="flex cursor-pointer items-center gap-2 border-3 border-ink bg-white px-3 py-2 text-sm font-bold uppercase tracking-wide shadow-brutal-sm transition-[transform,box-shadow] duration-100 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal">
                Pilih berkas
                <input type="file" data-file-input class="sr-only">
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
