import { router } from './router.js';

// Función para cargar el HTML de la carpeta /views
async function loadView(name) {
    try {
        const res = await fetch(`views/${name}.html`);
        if (!res.ok) throw new Error("No se pudo cargar la vista");
        const html = await res.text();

        const container = document.getElementById('app-container');
        container.innerHTML = html;

        // Al cambiar de vista, subimos al inicio de la página [cite: 836]
        window.scrollTo(0, 0);

        // Si la vista es proyectos, inicializamos su lógica específica
        if (name === 'proyectos') {
            initProyectosLogic();
        }

    } catch (error) {
        console.error("Error cargando vista:", error);
        document.getElementById('app-container').innerHTML = "<h1>404</h1><p>Página no encontrada.</p>";
    }
}

// Lógica para manejar pestañas, scroll y carruseles en la vista de proyectos
function initProyectosLogic() {
    const botones = document.querySelectorAll("#categoriaTabs .nav-link");
    const componentes = document.querySelectorAll(".proyecto");
    const tabsContainer = document.getElementById('categoriaTabs');
    const scrollAmount = 150;

    botones.forEach((btn) => {
        btn.onclick = () => {
            // Cambiar estado de botones
            botones.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const categoria = btn.dataset.categoria;
            
            // Mostrar/Ocultar componentes [cite: 3988-3990]
            componentes.forEach((comp) => {
                const isTarget = comp.tagName.toLowerCase() === `proyecto-${categoria}`;
                comp.style.display = isTarget ? "block" : "none";

                // REINICIALIZAR CARRUSELES: Importante para que funcionen tras el cambio de pestaña
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

    // Eventos de scroll para las pestañas [cite: 3993-3994]
    const btnLeft = document.getElementById('scrollLeft');
    const btnRight = document.getElementById('scrollRight');

    if (btnLeft && btnRight) {
        btnLeft.onclick = () => tabsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        btnRight.onclick = () => tabsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// Registro de Rutas [cite: 843-846]
router.on('/', () => loadView('index'));
router.on('experiencia', () => loadView('experiencia'));
router.on('formacion', () => loadView('formacion'));
router.on('proyectos', () => loadView('proyectos'));

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