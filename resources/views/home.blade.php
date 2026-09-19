<x-layout :schema="[
    '@context' => 'https://schema.org',
    '@type' => 'WebSite',
    'name' => config('app.name'),
    'url' => route('home'),
    'description' => 'Kumpulan tool developer yang cepat, ringan, dan memproses data di browser.',
]">
    <section class="border-3 border-ink bg-white p-6 shadow-brutal-lg lg:p-10">
        <x-ui.badge accent="sun">100% Gratis &amp; Berjalan di Browser</x-ui.badge>

        <h1 class="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight lg:text-6xl">
            Tool developer yang rapi,
            <span class="bg-acid px-1">cepat</span>,
            dan ringan.
        </h1>

        <p class="mt-5 max-w-2xl text-lg text-ink-soft">
            Sebagian besar tool online memproses data Anda di server mereka — bahkan menyimpannya
            dalam link yang bisa dibuka siapa saja. Di sini semuanya berjalan di browser Anda:
            tidak ada yang dikirim, tidak ada yang disimpan.
        </p>

        <div class="mt-7 flex flex-wrap gap-3">
            <x-ui.button :href="route('tools.json-formatter')" variant="primary">
                Coba JSON Formatter
                <span aria-hidden="true">→</span>
            </x-ui.button>
            <x-ui.button href="#daftar-tool" variant="default">Lihat semua tool</x-ui.button>
        </div>

        <dl class="mt-8 grid gap-4 sm:grid-cols-3">
            @foreach ([
                ['label' => 'Tool siap dipakai', 'value' => $catalog->readyCount()],
                ['label' => 'Segera hadir', 'value' => $catalog->plannedCount()],
                ['label' => 'Diproses di browser', 'value' => '100%'],
            ] as $stat)
                <div class="border-3 border-ink bg-paper p-4 shadow-brutal-sm">
                    <dt class="font-mono text-xs font-bold uppercase tracking-widest">{{ $stat['label'] }}</dt>
                    <dd class="mt-1 text-3xl font-bold">{{ $stat['value'] }}</dd>
                </div>
            @endforeach
        </dl>
    </section>

    <section id="daftar-tool" class="mt-10 scroll-mt-24">
        <div class="flex flex-col gap-4 border-3 border-ink bg-white p-5 shadow-brutal md:flex-row md:items-end md:justify-between">
            <div>
                <h2 class="text-2xl font-bold">Semua tool</h2>
                <p class="mt-1 text-sm text-ink-soft">
                    Tool dengan label <strong>Segera</strong> sedang dipersiapkan dan akan hadir pada pembaruan mendatang.
                </p>
            </div>

            <div class="w-full md:w-72">
                <label for="tool-filter" class="font-mono text-xs font-bold uppercase tracking-widest">Cari tool</label>
                <input id="tool-filter"
                       type="search"
                       data-tool-filter
                       placeholder="json, hash, csv…"
                       class="mt-2 w-full border-3 border-ink bg-paper px-3 py-2 placeholder:text-ink-soft/70 focus:bg-white">
            </div>
        </div>

        <p data-tool-filter-empty hidden class="mt-4 border-3 border-dashed border-ink bg-paper-dim p-4 text-sm font-bold">
            Tidak ada tool yang cocok dengan kata kunci itu.
        </p>

        @foreach ($catalog->grouped() as $category => $tools)
            <div class="mt-8">
                <div class="flex flex-wrap items-center gap-3">
                    <x-ui.badge :accent="$catalog->accentFor($category)">{{ $category }}</x-ui.badge>
                    <p class="text-sm text-ink-soft">{{ $catalog->categories()[$category]['blurb'] ?? '' }}</p>
                </div>

                <div class="mt-4 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    @foreach ($tools as $slug => $tool)
                        <x-ui.tool-card :tool="$tool"
                                        :slug="$slug"
                                        :accent="$catalog->accentFor($category)"
                                        :ready="$catalog->isReady($tool)" />
                    @endforeach
                </div>
            </div>
        @endforeach
    </section>

    <section id="roadmap" class="mt-12 scroll-mt-24 border-3 border-ink bg-paper-dim p-6 shadow-brutal">
        <h2 class="text-2xl font-bold">Roadmap</h2>
        <p class="mt-1 text-sm text-ink-soft">
            Daftar utilitas dan fitur tambahan yang sedang disiapkan untuk pembaruan berikutnya.
        </p>

        <div class="mt-5 grid gap-5 md:grid-cols-2">
            @foreach ($catalog->grouped() as $category => $tools)
                @php
                    $planned = collect($tools)->reject(fn (array $tool): bool => $catalog->isReady($tool));
                @endphp

                @if ($planned->isNotEmpty())
                    <div class="border-3 border-ink bg-white p-4">
                        <x-ui.badge :accent="$catalog->accentFor($category)">{{ $category }}</x-ui.badge>
                        <ul class="mt-3 flex flex-col gap-2 text-sm">
                            @foreach ($planned as $tool)
                                <li class="flex items-center gap-2">
                                    <span aria-hidden="true" class="font-mono text-ink-soft">▢</span>
                                    {{ $tool['short_name'] }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                @endif
            @endforeach
        </div>
    </section>
</x-layout>
