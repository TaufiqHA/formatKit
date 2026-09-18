@props(['accent' => 'sun'])

@php
    $accents = [
        'acid' => 'bg-acid',
        'sun' => 'bg-sun',
        'punch' => 'bg-punch',
        'wave' => 'bg-wave',
        'mint' => 'bg-mint',
        'paper-dim' => 'bg-paper-dim',
    ];

    $tone = $accents[$accent] ?? $accents['sun'];
@endphp

<span {{ $attributes->merge(['class' => 'inline-flex items-center border-2 border-ink '.$tone.' px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-wide']) }}>
    {{ $slot }}
</span>
