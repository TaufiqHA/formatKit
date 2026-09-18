<?php

use App\Support\ToolCatalog;

function catalog(): ToolCatalog
{
    return new ToolCatalog(
        categories: [
            'Format & Validasi' => ['accent' => 'wave', 'blurb' => 'Format data.'],
            'Teks & Utilitas' => ['accent' => 'acid', 'blurb' => 'Teks.'],
        ],
        tools: [
            'json-formatter' => ['name' => 'JSON', 'category' => 'Format & Validasi', 'status' => 'ready'],
            'xml-formatter' => ['name' => 'XML', 'category' => 'Format & Validasi', 'status' => 'planned'],
            'word-counter' => ['name' => 'Word', 'category' => 'Teks & Utilitas'],
        ],
    );
}

it('only returns ready tools from ready()', function () {
    expect(array_keys(catalog()->ready()))->toBe(['json-formatter'])
        ->and(catalog()->readyCount())->toBe(1)
        ->and(catalog()->totalCount())->toBe(3)
        ->and(catalog()->plannedCount())->toBe(2);
});

it('treats a tool without status as planned', function () {
    expect(catalog()->isReady(catalog()->find('word-counter')))->toBeFalse();
});

it('groups tools in category order and skips empty categories', function () {
    $grouped = catalog()->grouped();

    expect(array_keys($grouped))->toBe(['Format & Validasi', 'Teks & Utilitas'])
        ->and(array_keys($grouped['Format & Validasi']))->toBe(['json-formatter', 'xml-formatter'])
        ->and($grouped['Teks & Utilitas']['word-counter']['slug'])->toBe('word-counter');
});

it('returns null for an unknown slug', function () {
    expect(catalog()->find('tidak-ada'))->toBeNull();
});

it('falls back to a default accent for an unknown category', function () {
    expect(catalog()->accentFor('Format & Validasi'))->toBe('wave')
        ->and(catalog()->accentFor('Kategori Baru'))->toBe('sun');
});
