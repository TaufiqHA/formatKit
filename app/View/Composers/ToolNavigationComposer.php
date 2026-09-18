<?php

namespace App\View\Composers;

use App\Support\ToolCatalog;
use Illuminate\View\View;

/**
 * Membagikan katalog tool ke layout sehingga sidebar selalu terisi
 * tanpa setiap halaman harus mengirimkannya sendiri.
 */
class ToolNavigationComposer
{
    public function __construct(private readonly ToolCatalog $catalog) {}

    public function compose(View $view): void
    {
        $view->with('catalog', $this->catalog);
    }
}
