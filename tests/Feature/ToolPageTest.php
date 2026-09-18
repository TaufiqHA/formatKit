<?php

use App\Support\ToolCatalog;
use Illuminate\Support\Facades\Vite;

it('renders every ready tool with the shared workspace template', function () {
    $catalog = app(ToolCatalog::class);

    expect($catalog->readyCount())->toBeGreaterThan(1);

    foreach ($catalog->ready() as $slug => $tool) {
        $this->get('/'.$slug)
            ->assertOk()
            ->assertSee($tool['name'])
            ->assertSee($tool['description'])
            ->assertSee('data-tool-root', false)
            ->assertSee('data-tool-output', false)
            ->assertSee('data-tool-status', false)
            ->assertSee('Cara pakai');
    }
});

it('renders an editable input panel for tools that need one', function () {
    $this->get('/json-formatter')
        ->assertOk()
        ->assertSee('data-tool-input', false)
        ->assertSee('data-tool-actions', false)
        ->assertSee('Indentasi');
});

it('hides the input panel for output-only tools', function () {
    $this->get('/uuid-generator')
        ->assertOk()
        ->assertDontSee('data-tool-input', false)
        ->assertSee('data-tool-output', false)
        ->assertSee('Jumlah');
});

it('loads only the script of the tool being viewed', function () {
    $jsonAsset = Vite::asset('resources/js/tools/json-formatter.js');
    $uuidAsset = Vite::asset('resources/js/tools/uuid-generator.js');

    $this->get('/json-formatter')
        ->assertOk()
        ->assertSee($jsonAsset, false)
        ->assertDontSee($uuidAsset, false);

    $this->get('/uuid-generator')
        ->assertOk()
        ->assertSee($uuidAsset, false)
        ->assertDontSee($jsonAsset, false);

    $this->get('/')
        ->assertOk()
        ->assertDontSee($jsonAsset, false);
});

it('outputs a canonical link and meta description', function () {
    $this->get('/json-formatter')
        ->assertOk()
        ->assertSee('<link rel="canonical" href="'.url('/json-formatter').'">', false)
        ->assertSee('name="description"', false);
});

it('returns 404 for unknown tool slugs', function () {
    $this->get('/tool-yang-tidak-pernah-ada')->assertNotFound();
});

it('returns 404 for tools that are still planned', function () {
    $plannedSlug = collect(app(ToolCatalog::class)->all())
        ->reject(fn (array $tool): bool => app(ToolCatalog::class)->isReady($tool))
        ->keys()
        ->first();

    $this->get('/'.$plannedSlug)->assertNotFound();
});
