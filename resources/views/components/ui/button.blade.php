@props(['variant' => 'default', 'href' => null])

@php
    $variants = [
        'default' => 'bg-white',
        'primary' => 'bg-acid',
        'accent' => 'bg-sun',
        'info' => 'bg-wave',
        'danger' => 'bg-punch',
        'quiet' => 'bg-paper-dim',
    ];

    $classes = implode(' ', [
        'inline-flex items-center justify-center gap-2 border-3 border-ink px-4 py-2 text-sm font-bold uppercase tracking-wide',
        'shadow-brutal-sm transition-[transform,box-shadow] duration-100',
        'hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-brutal',
        'active:translate-x-0 active:translate-y-0 active:shadow-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        $variants[$variant] ?? $variants['default'],
    ]);
@endphp

@if ($href)
    <a href="{{ $href }}" {{ $attributes->merge(['class' => $classes]) }}>{{ $slot }}</a>
@else
    <button type="button" {{ $attributes->merge(['class' => $classes]) }}>{{ $slot }}</button>
@endif
