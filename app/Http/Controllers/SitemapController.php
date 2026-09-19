<?php

namespace App\Http\Controllers;

use App\Support\ToolCatalog;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Hasilkan sitemap XML standar (Sitemaps Protocol 0.9) secara dinamis
     * dari daftar tool yang siap pakai.
     */
    public function index(ToolCatalog $catalog): Response
    {
        $urls = [];

        // Halaman Utama
        $urls[] = [
            'loc' => url('/'),
            'lastmod' => now()->startOfDay()->toIso8601String(),
            'changefreq' => 'daily',
            'priority' => '1.0',
        ];

        // Setiap Tool yang Siap Pakai
        foreach ($catalog->ready() as $slug => $tool) {
            $urls[] = [
                'loc' => route('tools.'.$slug),
                'lastmod' => now()->startOfDay()->toIso8601String(),
                'changefreq' => 'weekly',
                'priority' => '0.8',
            ];
        }

        $xml = '<?xml version="1.0" encoding="UTF-8"?>'."\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'."\n";

        foreach ($urls as $item) {
            $xml .= "  <url>\n";
            $xml .= '    <loc>'.htmlspecialchars($item['loc'], ENT_XML1, 'UTF-8')."</loc>\n";
            $xml .= '    <lastmod>'.$item['lastmod']."</lastmod>\n";
            $xml .= '    <changefreq>'.$item['changefreq']."</changefreq>\n";
            $xml .= '    <priority>'.$item['priority']."</priority>\n";
            $xml .= "  </url>\n";
        }

        $xml .= '</urlset>';

        return response($xml, 200, [
            'Content-Type' => 'application/xml; charset=UTF-8',
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
