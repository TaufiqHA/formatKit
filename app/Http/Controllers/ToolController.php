<?php

namespace App\Http\Controllers;

use App\Support\ToolCatalog;
use Illuminate\View\View;

class ToolController extends Controller
{
    /**
     * Slug dikirim sebagai default route (lihat routes/web.php) supaya URL tool
     * tetap bersih tanpa parameter dinamis.
     */
    public function show(string $slug, ToolCatalog $catalog): View
    {
        $tool = $catalog->find($slug);

        abort_if($tool === null || ! $catalog->isReady($tool), 404);

        return view($tool['view'], [
            'tool' => $tool + ['slug' => $slug],
            'catalog' => $catalog,
        ]);
    }
}
