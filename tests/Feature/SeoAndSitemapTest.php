<?php

use App\Support\ToolCatalog;

it('serves a valid xml sitemap containing all ready tools', function () {
    $catalog = app(ToolCatalog::class);
    $ready = $catalog->ready();

    $response = $this->get('/sitemap.xml');

    $response->assertOk();
    expect($response->headers->get('content-type'))->toContain('xml');

    $content = $response->getContent();
    expect($content)->toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
        ->toContain('<loc>'.url('/').'</loc>')
        ->toContain('<priority>1.0</priority>');

    foreach ($ready as $slug => $tool) {
        expect($content)->toContain('<loc>'.url('/'.$slug).'</loc>');
    }

    // Ensure planned tools are not leaked into the sitemap
    $plannedSlug = collect($catalog->all())
        ->reject(fn (array $tool): bool => $catalog->isReady($tool))
        ->keys()
        ->first();

    if ($plannedSlug) {
        expect($content)->not->toContain('<loc>'.url('/'.$plannedSlug).'</loc>');
    }
});

it('renders enriched seo metadata and schema.org graph on tool pages', function () {
    $catalog = app(ToolCatalog::class);

    foreach ($catalog->ready() as $slug => $tool) {
        $response = $this->get('/'.$slug);

        $response->assertOk()
            ->assertSee('<meta name="keywords"', false)
            ->assertSee($tool['keywords'], false)
            ->assertSee('<link rel="sitemap"', false)
            ->assertSee('fonts.bunny.net', false)
            ->assertSee('application/ld+json', false)
            ->assertSee('"@type":"SoftwareApplication"', false)
            ->assertSee('"@type":"BreadcrumbList"', false)
            ->assertSee('"@type":"FAQPage"', false);

        if (isset($tool['guide'])) {
            $response->assertSee($tool['guide']['title'])
                ->assertSee('Panduan & Penjelasan Teknis', false);
        }
    }
});

it('contains sitemap directive in robots.txt', function () {
    $robotsPath = public_path('robots.txt');
    expect(file_exists($robotsPath))->toBeTrue();

    $content = file_get_contents($robotsPath);
    expect($content)->toContain('Sitemap: /sitemap.xml')
        ->toContain('User-agent: *');
});
