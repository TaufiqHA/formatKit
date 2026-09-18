@props(['catalog', 'current' => null])

<aside id="daftar-tool"
       data-nav-panel
       data-open="false"
       class="hidden w-full shrink-0 data-[open=true]:block lg:block lg:w-72">
    <div class="border-3 border-ink bg-white p-4 shadow-brutal lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto">
        <div class="flex items-center justify-between gap-2 border-b-3 border-ink pb-2">
            <h2 class="font-mono text-xs font-bold uppercase tracking-widest">Daftar tool</h2>
            <span class="border-2 border-ink bg-paper-dim px-2 py-0.5 font-mono text-[11px] font-bold">
                {{ $catalog->readyCount() }}/{{ $catalog->totalCount() }} siap
            </span>
        </div>

        <nav aria-label="Daftar tool" class="flex flex-col gap-5 pt-4">
            @foreach ($catalog->grouped() as $category => $tools)
                <div>
                    <x-ui.badge :accent="$catalog->accentFor($category)" class="mb-2">{{ $category }}</x-ui.badge>

                    <ul class="flex flex-col gap-1">
                        @foreach ($tools as $slug => $tool)
                            <li>
                                @if ($catalog->isReady($tool))
                                    <a href="{{ route('tools.'.$slug) }}"
                                       @class([
                                           'flex items-center justify-between gap-2 border-2 px-2 py-1.5 text-sm font-bold transition-colors',
                                           'border-ink bg-acid shadow-brutal-sm' => $current === $slug,
                                           'border-transparent hover:border-ink hover:bg-paper-dim' => $current !== $slug,
                                       ])>
                                        {{ $tool['short_name'] }}
                                        <span aria-hidden="true">→</span>
                                    </a>
                                @else
                                    <span class="flex items-center justify-between gap-2 px-2 py-1.5 text-sm text-ink-soft">
                                        {{ $tool['short_name'] }}
                                        <span class="border-2 border-ink bg-paper-dim px-1 font-mono text-[10px] font-bold uppercase">Segera</span>
                                    </span>
                                @endif
                            </li>
                        @endforeach
                    </ul>
                </div>
            @endforeach
        </nav>
    </div>
</aside>
