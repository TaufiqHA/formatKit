@props([
    'title' => null,
    'description' => null,
    'canonical' => null,
    'schema' => null,
    'tool' => null,
])

@php
    $siteName = config('app.name');
    $siteTagline = 'Kumpulan tool developer yang cepat, ringan, dan memproses data di browser.';
    $pageTitle = $title ? $title.' — '.$siteName : $siteName.' — '.$siteTagline;
    $pageDescription = $description ?? $siteTagline;
    $canonicalUrl = $canonical ?? url()->current();
@endphp

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $pageTitle }}</title>
    <meta name="description" content="{{ $pageDescription }}">
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <meta name="robots" content="index, follow">

    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription }}">
    <meta property="og:url" content="{{ $canonicalUrl }}">
    <meta name="twitter:card" content="summary">

    @vite(['resources/css/app.css', 'resources/js/app.js'])

    @if ($schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endif

    @stack('head')
</head>
<body class="min-h-screen bg-paper text-ink antialiased">
    <div class="flex min-h-screen flex-col">
        <x-site-header />

        <div class="mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-4 py-6 lg:flex-row lg:px-8 lg:py-10">
            <x-tool-sidebar :catalog="$catalog" :current="$tool['slug'] ?? null" />

            <main class="min-w-0 grow">
                {{ $slot }}
            </main>
        </div>

        <x-site-footer />
    </div>

    @stack('scripts')
</body>
</html>
