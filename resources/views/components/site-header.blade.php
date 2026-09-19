@php
    $links = [
        ['label' => 'Semua tool', 'href' => route('home').'#daftar-tool'],
        ['label' => 'Roadmap', 'href' => route('home').'#roadmap'],
    ];
@endphp

<header class="sticky top-0 z-30 border-b-3 border-ink bg-paper">
    <div class="mx-auto flex w-full max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
        <a href="{{ route('home') }}"
           class="flex items-center gap-2 border-3 border-ink bg-acid px-3 py-1.5 shadow-brutal-sm transition-transform hover:-translate-y-0.5">
            <span class="font-mono text-base font-bold leading-none">{ }</span>
            <span class="text-lg font-bold leading-none tracking-tight">{{ config('app.name') }}</span>
        </a>

        <nav aria-label="Navigasi utama" class="ml-auto hidden items-center gap-2 md:flex">
            @foreach ($links as $link)
                <a href="{{ $link['href'] }}"
                   class="border-2 border-transparent px-3 py-1.5 text-sm font-bold uppercase tracking-wide transition-colors hover:border-ink hover:bg-sun">
                    {{ $link['label'] }}
                </a>
            @endforeach
        </nav>

        <button type="button"
                data-nav-toggle
                aria-controls="daftar-tool"
                aria-expanded="false"
                class="ml-auto inline-flex items-center gap-2 border-3 border-ink bg-white px-3 py-1.5 text-sm font-bold uppercase shadow-brutal-sm md:ml-0 lg:hidden">
            Tool
        </button>
    </div>
</header>
