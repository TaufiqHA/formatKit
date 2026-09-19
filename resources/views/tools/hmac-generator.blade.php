<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Pesan / Payload Teks"
                      input-hint="teks atau request body yang akan ditandatangani"
                      output-label="Tanda Tangan HMAC (Signature)"
                      placeholder="GET /api/v1/orders?timestamp=1758320000...">
        <x-slot:actions>
            <x-ui.button data-action="generate" variant="primary">Hitung HMAC</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin signature</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .txt</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex flex-wrap items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Kunci Rahasia (Secret)</span>
                <input type="text" data-option="secret" placeholder="masukkan secret key..." class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold w-48 sm:w-64">
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Algoritma</span>
                <select data-option="algorithm" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="SHA-256">HMAC-SHA256</option>
                    <option value="SHA-512">HMAC-SHA512</option>
                    <option value="SHA-384">HMAC-SHA384</option>
                    <option value="SHA-1">HMAC-SHA1</option>
                </select>
            </label>

            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Format</span>
                <select data-option="format" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="hex">Hex (Lowercase)</option>
                    <option value="base64">Base64</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
