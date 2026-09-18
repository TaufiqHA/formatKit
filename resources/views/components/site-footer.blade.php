@php
    $year = now()->year;
@endphp

<footer class="mt-auto border-t-3 border-ink bg-paper-dim">
    <div class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 lg:px-8">
        <div class="grid gap-6 md:grid-cols-3">
            <div class="border-3 border-ink bg-white p-4 shadow-brutal-sm">
                <p class="font-mono text-xs font-bold uppercase tracking-widest">Privasi dulu</p>
                <p class="mt-2 text-sm text-ink-soft">
                    Semua tool memproses data di browser Anda. Tidak ada input yang dikirim,
                    disimpan, atau dibagikan lewat server.
                </p>
            </div>

            <div class="border-3 border-ink bg-white p-4 shadow-brutal-sm">
                <p class="font-mono text-xs font-bold uppercase tracking-widest">Navigasi</p>
                <ul class="mt-2 flex flex-col gap-1 text-sm">
                    <li><a href="{{ route('home') }}" class="font-bold hover:bg-acid">Beranda</a></li>
                    <li><a href="{{ route('home') }}#daftar-tool" class="font-bold hover:bg-acid">Semua tool</a></li>
                    <li><a href="{{ route('home') }}#roadmap" class="font-bold hover:bg-acid">Roadmap</a></li>
                </ul>
            </div>

            <div class="border-3 border-ink bg-white p-4 shadow-brutal-sm">
                <p class="font-mono text-xs font-bold uppercase tracking-widest">Dibangun dengan</p>
                <p class="mt-2 text-sm text-ink-soft">
                    Laravel, Blade, Tailwind CSS, dan JavaScript di sisi klien. Tanpa framework
                    front-end berat supaya halaman tetap ringan.
                </p>
            </div>
        </div>

        <div class="flex flex-col gap-2 border-t-2 border-ink pt-4 font-mono text-xs uppercase tracking-wide md:flex-row md:items-center md:justify-between">
            <p>&copy; {{ $year }} {{ config('app.name') }}</p>
            <p>Dibuat untuk developer Indonesia</p>
        </div>
    </div>
</footer>
