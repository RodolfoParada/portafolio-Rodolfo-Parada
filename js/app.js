import { router } from './router.js';

// Función para cargar el HTML de la carpeta /views
async function loadView(name) {
    try {
        const res = await fetch(`views/${name}.html?v=20261008m`);
        if (!res.ok) throw new Error("No se pudo cargar la vista");
        const html = await res.text();

        const container = document.getElementById('app-container');
        container.innerHTML = html;
        document.body.classList.toggle('long-content-view', name === 'index' || name === 'proyectos');

        // Al cambiar de vista, subimos al inicio de la página [cite: 836]
        window.scrollTo(0, 0);

        // Si la vista es proyectos, inicializamos su lógica específica
        if (name === 'proyectos') {
            initProyectosLogic();
        }

        if (name === 'index') {
            initSobreMiLogic();
        }

        if (name === 'formacion') {
            initFormacionLogic();
        }

    } catch (error) {
        console.error("Error cargando vista:", error);
        document.getElementById('app-container').innerHTML = "<h1>404</h1><p>Página no encontrada.</p>";
    }
}

function initSobreMiLogic() {
    const page = document.querySelector('.about-page');
    if (!page) return;

    const chipList = page.querySelector('.about-chip-list');
    const popover = page.querySelector('.about-chip-popover');
    const popoverTitle = popover?.querySelector('h3');
    const popoverContent = popover?.querySelector('p');

    if (!chipList || !popover || !popoverTitle || !popoverContent) {
        throw new Error('No se pudo inicializar la sección «Un poco más de mí».');
    }

    chipList.querySelectorAll('.about-chip').forEach((chip) => {
        chip.addEventListener('click', () => {
            const isOpen = chip.classList.contains('active');
            chipList.querySelectorAll('.about-chip').forEach((item) => {
                item.classList.remove('active');
                item.setAttribute('aria-expanded', 'false');
            });

            if (isOpen) {
                popover.hidden = true;
                return;
            }

            popoverTitle.textContent = chip.dataset.title || chip.textContent.trim();
            popoverContent.textContent = chip.dataset.content || '';
            chip.classList.add('active');
            chip.setAttribute('aria-expanded', 'true');
            popover.hidden = false;
            const maxLeft = Math.max(0, chipList.clientWidth - popover.offsetWidth);
            popover.style.setProperty('--popover-left', `${Math.min(chip.offsetLeft, maxLeft)}px`);
        });
    });

    const skillsPanel = page.querySelector('#skills-panel');
    const skillTabs = page.querySelectorAll('.skills-tab');
    if (!skillsPanel || skillTabs.length === 0) {
        throw new Error('No se pudo inicializar las pestañas de habilidades.');
    }

    const selectSkillCategory = (selectedTab) => {
        const category = selectedTab.dataset.skillCategory;
        if (!category) {
            throw new Error('La pestaña de habilidades no tiene una categoría asignada.');
        }

        skillTabs.forEach((tab) => {
            const isSelected = tab === selectedTab;
            tab.classList.toggle('active', isSelected);
            tab.setAttribute('aria-selected', String(isSelected));
            tab.tabIndex = isSelected ? 0 : -1;
        });

        skillsPanel.setAttribute('aria-labelledby', selectedTab.id);
        skillsPanel.querySelectorAll('[data-skill-group]').forEach((card) => {
            card.hidden = card.dataset.skillGroup !== category;
        });
    };

    skillTabs.forEach((tab, index) => {
        tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
        tab.addEventListener('click', () => selectSkillCategory(tab));
        tab.addEventListener('keydown', (event) => {
            let nextIndex = index;
            if (event.key === 'ArrowRight') nextIndex = (index + 1) % skillTabs.length;
            else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + skillTabs.length) % skillTabs.length;
            else if (event.key === 'Home') nextIndex = 0;
            else if (event.key === 'End') nextIndex = skillTabs.length - 1;
            else return;

            event.preventDefault();
            skillTabs[nextIndex].focus();
            selectSkillCategory(skillTabs[nextIndex]);
        });
    });
}

function initFormacionLogic() {
    const page = document.querySelector('.formacion-page');
    const modal = page?.querySelector('#certificate-modal');
    const modalTitle = modal?.querySelector('#certificate-modal-title');
    const modalImage = modal?.querySelector('.certificate-modal__image');
    const closeButton = modal?.querySelector('.certificate-modal__close');

    if (!page || !modal || !modalTitle || !modalImage || !closeButton) {
        throw new Error('No se pudo inicializar el visor de certificados de Formación.');
    }

    page.querySelectorAll('.certificate-button').forEach((button) => {
        button.addEventListener('click', () => {
            const certificateSrc = button.dataset.certificateSrc;
            const certificateTitle = button.dataset.certificateTitle;
            if (!certificateSrc || !certificateTitle) {
                throw new Error('Falta la ruta o el título del certificado.');
            }

            modalTitle.textContent = certificateTitle;
            modalImage.src = certificateSrc;
            modalImage.alt = certificateTitle;
            modal.showModal();
        });
    });

    closeButton.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (event) => {
        if (event.target === modal) modal.close();
    });
    modal.addEventListener('close', () => {
        modalImage.removeAttribute('src');
        modalImage.alt = '';
        modalTitle.textContent = 'Certificado';
    });
}

// Lógica para manejar pestañas, scroll y carruseles en la vista de proyectos
function initProyectosLogic() {
    const savedCategoria = localStorage.getItem('proyectos-categoria');
    const botones = document.querySelectorAll("#categoriaTabs .nav-link");
    const componentes = document.querySelectorAll(".proyecto");
    const tabsContainer = document.getElementById('categoriaTabs');
    const scrollAmount = 150;

    botones.forEach((btn) => {
    btn.onclick = () => {

        botones.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const categoria = btn.dataset.categoria;

        // 🔥 Guardar en localStorage
        localStorage.setItem('proyectos-categoria', categoria);

        componentes.forEach((comp) => {
            const isTarget = comp.tagName.toLowerCase() === `proyecto-${categoria}`;
            comp.style.display = isTarget ? "block" : "none";

            if (isTarget) {
                setTimeout(() => {
                    const carousels = comp.querySelectorAll('.carousel');
                    carousels.forEach(el => {
                        bootstrap.Carousel.getOrCreateInstance(el).to(0);
                    });
                }, 50);
            }
        });
    };
});


// 🔥 Restaurar pestaña guardada
if (savedCategoria) {
    const btnToActivate = document.querySelector(
        `#categoriaTabs .nav-link[data-categoria="${savedCategoria}"]`
    );
    if (btnToActivate) {
        btnToActivate.click();
    }
}

    // Eventos de scroll para las pestañas [cite: 3993-3994]
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    if (btnLeft && btnRight) {
        btnLeft.onclick = () => tabsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        btnRight.onclick = () => tabsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Registro de Rutas [cite: 843-846]
router.on('/', () => loadView('index'));          // Para la carga inicial sin hash
router.on('#/', () => loadView('index'));         // Para el clic en "Sobre mí"
router.on('#/experiencia', () => loadView('experiencia'));
router.on('#/formacion', () => loadView('formacion'));
router.on('#/proyectos', () => loadView('proyectos'));

document.addEventListener('DOMContentLoaded', () => {
    // Interceptar clics en enlaces con data-link 
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a[data-link]');
        if (link) {
            e.preventDefault();
            const url = link.getAttribute('href');
            router.navigate(url);
        }
    });

    // Ejecutar la ruta inicial 
    router.route();
});