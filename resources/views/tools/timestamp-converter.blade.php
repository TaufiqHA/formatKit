<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Timestamp Epoch atau String Tanggal"
                      input-hint="angka detik (10 digit), milidetik (13 digit), atau tanggal ISO / teks"
                      output-label="Hasil Konversi Waktu"
                      placeholder="1758320000 atau 2026-09-20 07:00:00">
        <x-slot:actions>
            <x-ui.button data-action="convert" variant="primary">Konversi</x-ui.button>
            <x-ui.button data-action="now" variant="accent">Waktu Sekarang</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>
    </x-tools.workspace>
</x-tools.shell>
