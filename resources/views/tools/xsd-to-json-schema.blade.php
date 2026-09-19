<x-tools.shell :tool="$tool" :catalog="$catalog">
    <x-tools.workspace input-label="Skema XSD"
                      input-hint="dokumen XML Schema"
                      output-label="Hasil JSON Schema"
                      placeholder="<xs:schema xmlns:xs=&quot;http://www.w3.org/2001/XMLSchema&quot;>&#10;    <xs:element name=&quot;Produk&quot;>&#10;        <xs:complexType>&#10;            <xs:sequence>&#10;                <xs:element name=&quot;id&quot; type=&quot;xs:integer&quot;/>&#10;                <xs:element name=&quot;nama&quot; type=&quot;xs:string&quot;/>&#10;            </xs:sequence>&#10;        </xs:complexType>&#10;    </xs:element>&#10;</xs:schema>">
        <x-slot:actions>
            <x-ui.button data-action="convert" variant="primary">XSD → JSON Schema</x-ui.button>

            <span class="mx-1 hidden h-8 w-px bg-ink sm:block" aria-hidden="true"></span>

            <x-ui.button data-action="sample" variant="quiet">Contoh</x-ui.button>
            <x-ui.button data-action="clear" variant="quiet">Bersihkan</x-ui.button>
            <x-ui.button data-action="copy" variant="quiet">Salin hasil</x-ui.button>
            <x-ui.button data-action="download" variant="quiet">Unduh .json</x-ui.button>
        </x-slot:actions>

        <x-slot:options>
            <label class="flex items-center gap-2">
                <span class="font-mono text-xs font-bold uppercase tracking-widest">Indentasi</span>
                <select data-option="indent" class="border-3 border-ink bg-white px-2 py-1.5 text-sm font-bold">
                    <option value="2">2 spasi</option>
                    <option value="4">4 spasi</option>
                    <option value="tab">Tab</option>
                </select>
            </label>
        </x-slot:options>
    </x-tools.workspace>
</x-tools.shell>
