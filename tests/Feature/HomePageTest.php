<?php

use App\Support\ToolCatalog;

it('renders the homepage with the tool catalogue', function () {
    $catalog = app(ToolCatalog::class);

    $this->get('/')
        ->assertOk()
        ->assertSee(config('app.name'))
        ->assertSee($catalog->readyCount().'/'.$catalog->totalCount().' siap')
        ->assertSee('JSON Formatter & Validator')
        ->assertSee('Semua tool');
});

it('shows planned tools as not available yet', function () {
    $planned = collect(app(ToolCatalog::class)->all())->firstWhere('status', 'planned');

    expect($planned)->not->toBeNull();

    $this->get('/')
        ->assertOk()
        ->assertSee($planned['name'])
        ->assertSee('Segera');
});

it('registers a route for every ready tool', function () {
    $catalog = app(ToolCatalog::class);

    foreach ($catalog->ready() as $slug => $tool) {
        expect(route('tools.'.$slug))->toEndWith('/'.$slug)
            ->and($tool['view'] ?? null)->not->toBeNull();
    }
});

it('does not expose planned tools at their slug', function () {
    $plannedSlug = collect(app(ToolCatalog::class)->all())
        ->reject(fn (array $tool): bool => app(ToolCatalog::class)->isReady($tool))
        ->keys()
        ->first();

    $this->get('/'.$plannedSlug)->assertNotFound();
});
