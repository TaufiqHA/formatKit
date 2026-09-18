/*
 | Skrip global: dipakai di semua halaman. Sengaja kecil — halaman tool
 | memuat skripnya sendiri lewat Vite (lihat resources/js/tools/*).
 */

/** Toggle daftar tool di layar sempit. */
function initNavToggle() {
    const toggle = document.querySelector('[data-nav-toggle]');
    const panel = document.querySelector('[data-nav-panel]');

    if (!toggle || !panel) {
        return;
    }

    toggle.addEventListener('click', () => {
        const isOpen = panel.dataset.open === 'true';

        panel.dataset.open = String(!isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));
    });
}

/** Filter kartu tool di halaman depan berdasarkan nama, kategori, dan kata kunci. */
function initToolFilter() {
    const field = document.querySelector('[data-tool-filter]');
    const cards = [...document.querySelectorAll('[data-tool-card]')];
    const empty = document.querySelector('[data-tool-filter-empty]');

    if (!field || cards.length === 0) {
        return;
    }

    field.addEventListener('input', () => {
        const query = field.value.trim().toLowerCase();
        let visible = 0;

        cards.forEach((card) => {
            const haystack = `${card.dataset.toolCard} ${card.dataset.toolKeywords ?? ''}`.toLowerCase();
            const matches = query === '' || haystack.includes(query);

            card.hidden = !matches;
            visible += matches ? 1 : 0;
        });

        if (empty) {
            empty.hidden = visible !== 0;
        }
    });

    field.form?.addEventListener('submit', (event) => event.preventDefault());
}

initNavToggle();
initToolFilter();
