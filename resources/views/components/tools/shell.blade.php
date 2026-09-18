@props(['tool', 'catalog'])

@php
    $related = collect($catalog->grouped()[$tool['category']] ?? [])->except($tool['slug']);
    $accent = $catalog->accentFor($tool['category']);
    $howTo = $tool['how_to'] ?? [];
    $faq = $tool['faq'] ?? [];
@endphp

<x-layout :title="$tool['name']"
          :description="$tool['description']"
          :tool="$tool"
          :schema="[
              '@context' => 'https://schema.org',
              '@type' => 'SoftwareApplication',
              'name' => $tool['name'],
              'applicationCategory' => 'DeveloperApplication',
              'operatingSystem' => 'Web',
              'description' => $tool['description'],
              'url' => route('tools.'.$tool['slug']),
              'offers' => [
                  '@type' => 'Offer',
                  'price' => '0',
                  'priceCurrency' => 'IDR',
              ],
          ]">
    <nav aria-label="Breadcrumb" class="font-mono text-xs font-bold uppercase tracking-widest">
        <a href="{{ route('home') }}" class="hover:bg-acid">Beranda</a>
        <span aria-hidden="true">/</span>
        <span>{{ $tool['short_name'] }}</span>
    </nav>

    <header class="mt-3 flex flex-wrap items-center gap-3">
        <x-ui.badge :accent="$accent">{{ $tool['category'] }}</x-ui.badge>
        <span class="inline-flex items-center gap-2 border-2 border-ink bg-mint px-2 py-0.5 font-mono text-[11px] font-bold uppercase">
            Diproses di browser
        </span>
    </header>

    <h1 class="mt-4 text-3xl font-bold leading-tight tracking-tight lg:text-4xl">{{ $tool['name'] }}</h1>
    <p class="mt-2 max-w-2xl text-ink-soft">{{ $tool['tagline'] }} Tidak ada data yang dikirim ke server.</p>

    {{ $slot }}

    <div class="mt-8 grid gap-6 lg:grid-cols-3">
        @if ($howTo !== [])
            <section class="border-3 border-ink bg-white p-5 shadow-brutal">
                <h2 class="text-lg font-bold">Cara pakai</h2>
                <ol class="mt-3 flex list-inside list-decimal flex-col gap-2 text-sm text-ink-soft">
                    @foreach ($howTo as $step)
                        <li>{!! $step !!}</li>
                    @endforeach
                </ol>
            </section>
        @endif

        <section class="border-3 border-ink bg-white p-5 shadow-brutal">
            <h2 class="text-lg font-bold">Catatan privasi</h2>
            <p class="mt-3 text-sm text-ink-soft">
                {{ $tool['privacy_note'] ?? 'Tool ini tidak menyimpan input Anda. Tidak ada tombol simpan, tidak ada riwayat, dan tidak ada link berbagi — pola yang membuat tool populer lain membocorkan data penggunanya.' }}
            </p>
            <p class="mt-3 text-sm text-ink-soft">
                Tekan <kbd class="border-2 border-ink bg-paper-dim px-1 font-mono text-xs">F12</kbd>, buka tab Network,
                lalu jalankan tool ini untuk membuktikannya sendiri.
            </p>
        </section>

        @if ($related->isNotEmpty())
            <section class="border-3 border-ink bg-white p-5 shadow-brutal">
                <h2 class="text-lg font-bold">Tool terkait</h2>
                <ul class="mt-3 flex flex-col gap-3 text-sm">
                    @foreach ($related as $slug => $item)
                        <li>
                            <p class="font-bold">
                                @if ($catalog->isReady($item))
                                    <a href="{{ route('tools.'.$slug) }}" class="hover:bg-acid">{{ $item['name'] }}</a>
                                @else
                                    {{ $item['name'] }}
                                    <span class="ml-1 border-2 border-ink bg-paper-dim px-1 font-mono text-[10px] font-bold uppercase">Segera</span>
                                @endif
                            </p>
                            <p class="text-ink-soft">{{ $item['tagline'] }}</p>
                        </li>
                    @endforeach
                </ul>
            </section>
        @endif
    </div>

    @if ($faq !== [])
        <section class="mt-8 border-3 border-ink bg-paper-dim p-5">
            <h2 class="text-lg font-bold">Pertanyaan umum</h2>
            <dl class="mt-3 flex flex-col gap-4 text-sm">
                @foreach ($faq as $item)
                    <div>
                        <dt class="font-bold">{{ $item['q'] }}</dt>
                        <dd class="text-ink-soft">{{ $item['a'] }}</dd>
                    </div>
                @endforeach
            </dl>
        </section>
    @endif

    @push('scripts')
        @vite($tool['script'])
    @endpush
</x-layout>
