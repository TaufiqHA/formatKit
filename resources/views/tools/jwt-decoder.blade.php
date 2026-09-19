<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Token JWT (JSON Web Token)"
                      input-hint="tempel token JWT mentah (header.payload.signature)"
                      output-label="Hasil Decode (Header, Payload & Status Waktu)"
                      placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...">
        <x-slot:actions>
            <x-ui.button data-action="decode" variant="primary">Decode JWT</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .json</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <div class="flex items-center gap-2 text-xs font-bold text-ink">
                <span class="inline-block size-2 rounded-full bg-emerald-500"></span>
                <span>100% aman: Token didekode secara lokal di browser, tidak pernah dikirim ke server.</span>
            </div>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
