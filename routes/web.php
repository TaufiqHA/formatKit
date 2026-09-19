<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\SitemapController;
use App\Http\Controllers\ToolController;
use App\Support\ToolCatalog;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

/*
 | Satu URL statis per tool, didaftarkan langsung dari katalog supaya setiap
 | tool punya halaman yang bisa diindeks dan tidak ada parameter dinamis.
 | Tool berstatus "planned" tidak punya route — tautannya tidak bisa diklik.
 */
foreach (ToolCatalog::fromConfig()->ready() as $slug => $tool) {
    Route::get("/{$slug}", [ToolController::class, 'show'])
        ->defaults('slug', $slug)
        ->name("tools.{$slug}");
}
