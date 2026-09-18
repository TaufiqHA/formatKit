<?php

namespace App\Providers;

use App\Support\ToolCatalog;
use App\View\Composers\ToolNavigationComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(
            ToolCatalog::class,
            fn (): ToolCatalog => ToolCatalog::fromConfig(),
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        View::composer('components.layout', ToolNavigationComposer::class);
    }
}
