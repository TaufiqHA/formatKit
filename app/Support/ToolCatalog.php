<?php

namespace App\Support;

/**
 * Akses terbaca atas katalog tool di config/tools.php.
 *
 * Dipakai oleh route, controller, dan komponen navigasi supaya daftar tool
 * hanya didefinisikan satu kali.
 */
class ToolCatalog
{
    /**
     * @param  array<string, array{accent: string, blurb: string}>  $categories
     * @param  array<string, array<string, mixed>>  $tools
     */
    public function __construct(
        private readonly array $categories,
        private readonly array $tools,
    ) {}

    public static function fromConfig(): self
    {
        return new self(
            config('tools.categories', []),
            config('tools.tools', []),
        );
    }

    /**
     * @return array<string, array<string, mixed>> keyed by slug
     */
    public function all(): array
    {
        return $this->tools;
    }

    /**
     * Tool yang halamannya sudah ada dan route-nya boleh didaftarkan.
     *
     * @return array<string, array<string, mixed>>
     */
    public function ready(): array
    {
        return array_filter($this->tools, fn (array $tool): bool => $this->isReady($tool));
    }

    /**
     * @return array<string, mixed>|null
     */
    public function find(string $slug): ?array
    {
        return $this->tools[$slug] ?? null;
    }

    /**
     * @param  array<string, mixed>  $tool
     */
    public function isReady(array $tool): bool
    {
        return ($tool['status'] ?? 'planned') === 'ready';
    }

    /**
     * Tool dikelompokkan mengikuti urutan kategori di config.
     *
     * @return array<string, array<string, array<string, mixed>>>
     */
    public function grouped(): array
    {
        $grouped = array_fill_keys(array_keys($this->categories), []);

        foreach ($this->tools as $slug => $tool) {
            $grouped[$tool['category']][$slug] = $tool + ['slug' => $slug];
        }

        return array_filter($grouped);
    }

    /**
     * @return array<string, array{accent: string, blurb: string}>
     */
    public function categories(): array
    {
        return $this->categories;
    }

    public function accentFor(string $category): string
    {
        return $this->categories[$category]['accent'] ?? 'sun';
    }

    public function readyCount(): int
    {
        return count($this->ready());
    }

    public function totalCount(): int
    {
        return count($this->tools);
    }

    public function plannedCount(): int
    {
        return $this->totalCount() - $this->readyCount();
    }
}
