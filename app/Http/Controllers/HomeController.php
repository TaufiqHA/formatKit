<?php

namespace App\Http\Controllers;

use App\Support\ToolCatalog;
use Illuminate\View\View;

class HomeController extends Controller
{
    public function index(ToolCatalog $catalog): View
    {
        return view('home', [
            'catalog' => $catalog,
        ]);
    }
}
