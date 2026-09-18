@props(['tool', 'slug', 'accent' => 'sun', 'ready' => false])

<article data-tool-card="{{ $tool['name'] }} {{ $tool['short_name'] }}"
         data-tool-keywords="{{ $tool['keywords'] ?? '' }}"
         class="flex flex-col gap-3 border-3 border-ink bg-white p-5 shadow-brutal transition-transform hover:-translate-y-1">
    <div class="flex flex-wrap items-center gap-2">
        <x-ui.badge :accent="$accent">{{ $tool['category'] }}</x-ui.badge>

        @unless ($ready)
            <x-ui.badge accent="paper-dim">Segera</x-ui.badge>
        @endunless
    </div>

    <h3 class="text-xl font-bold leading-tight">
        @if ($ready)
            <a href="{{ route('tools.'.$slug) }}" class="hover:bg-acid hover:shadow-brutal-sm">{{ $tool['name'] }}</a>
        @else
            {{ $tool['name'] }}
        @endif
    </h3>

    <p class="grow text-sm text-ink-soft">{{ $tool['tagline'] }}</p>

    @if ($ready)
        <x-ui.button :href="route('tools.'.$slug)" variant="primary" class="self-start">
            Buka tool
            <span aria-hidden="true">→</span>
        </x-ui.button>
    @else
        <span class="self-start border-2 border-dashed border-ink px-3 py-1.5 font-mono text-xs uppercase">Dalam antrean</span>
    @endif
</article>
