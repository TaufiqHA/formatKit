<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Input (JSON atau YAML)"
                      input-hint="tempel teks JSON atau dokumen YAML di sini"
                      output-label="Hasil Konversi"
                      placeholder='{"nama": "FormatKit", "fitur": ["cepat", "privat"]}'>
        <x-slot:actions>
            <x-ui.button data-action="toYaml" variant="primary">JSON → YAML</x-ui.button>
            <x-ui.button data-action="toJson" variant="info">YAML → JSON</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="swap" variant="quiet">Tukar</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh</x-ui.button>
        </x-slot:actions>
    </x-tools.workspace>
</x-tools.shell>
