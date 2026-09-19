@props([
    'title' => null,
    'description' => null,
    'keywords' => null,
    'canonical' => null,
    'schema' => null,
    'tool' => null,
])

@php
    $siteName = config('app.name');
    $siteTagline = 'Kumpulan tool developer yang cepat, ringan, dan memproses data di browser.';
    $pageTitle = $title ? $title.' — '.$siteName : $siteName.' — '.$siteTagline;
    $pageDescription = $description ?? $siteTagline;
    $pageKeywords = $keywords ?? ($tool['keywords'] ?? 'formatkit, developer tools, web tools, formatter, validator, converter, bahasa indonesia');
    $canonicalUrl = $canonical ?? url()->current();
@endphp

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ $pageTitle }}</title>
    <meta name="description" content="{{ $pageDescription }}">
    <meta name="keywords" content="{{ $pageKeywords }}">
    <meta name="author" content="{{ $siteName }}">
    <meta name="theme-color" content="#fdfbf7">
    <link rel="canonical" href="{{ $canonicalUrl }}">
    <meta name="robots" content="index, follow">
    <link rel="sitemap" type="application/xml" title="Sitemap" href="{{ route('sitemap') }}">

    {{-- DNS Prefetch & Preconnect untuk Font --}}
    <link rel="dns-prefetch" href="https://fonts.bunny.net">
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>

    {{-- Open Graph / Facebook --}}
    <meta property="og:type" content="website">
    <meta property="og:locale" content="id_ID">
    <meta property="og:site_name" content="{{ $siteName }}">
    <meta property="og:title" content="{{ $pageTitle }}">
    <meta property="og:description" content="{{ $pageDescription }}">
    <meta property="og:url" content="{{ $canonicalUrl }}">

    {{-- Twitter Cards --}}
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="{{ $pageTitle }}">
    <meta name="twitter:description" content="{{ $pageDescription }}">

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
