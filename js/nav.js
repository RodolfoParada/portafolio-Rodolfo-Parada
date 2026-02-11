class Navegacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="./css/nav.css"/>
      <link rel="stylesheet" href="./css/dark-mode.css"/>
   
      <nav class="navbar navbar-expand-lg navbar-light fixed-top color px-3">
        <div class="container-fluid">
          <a class="titulo-rodolfo fw-bold fs-5 text-white" href="/" data-link>Rodolfo Parada González</a>
        
          <button class="navbar-toggler" id="btn-toggle" type="button">
            <span class="navbar-toggler-icon"></span>
          </button>
          
          <div class="collapse navbar-collapse" id="menu">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link text-white" href="#/" data-link>Sobre mí</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/experiencia" data-link>Experiencia</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/formacion" data-link>Formación</a>
              </li>
              <li class="nav-item">
                <a class="nav-link text-white" href="#/proyectos" data-link>Proyectos</a>
              </li>
            </ul>
            
            <div class="d-flex align-items-center gap-2 ms-lg-auto mt-2 mt-lg-0">
              <mi-modo-oscuro></mi-modo-oscuro>
              <img src="assets/images/rodolfo3.png" alt="Perfil" class="rounded-circle img-perfil"
              style="width: 40px; height: 40px; object-fit: cover;">
            </div>
          </div>
        </div>
      </nav>
    `;

    const toggleBtn = this.shadowRoot.getElementById("btn-toggle");
    const menu = this.shadowRoot.getElementById("menu");
    
    // Toggle del menú hamburguesa
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("show");
    });

    // --- LÓGICA SPA PARA SHADOW DOM ---
    this.shadowRoot.querySelectorAll('[data-link]').forEach(link => {
      link.addEventListener('click', async (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        
        // Importamos dinámicamente el router para navegar sin recargar
        const { router } = await import('./router.js');
        router.navigate(href);
        
        // Cerrar el menú automáticamente al hacer clic (UX para móviles)
        if (menu.classList.contains('show')) {
          menu.classList.remove('show');
        }
      });
    });

    console.log("Componente <mi-navegacion> cargado y vinculado al Router");
  }
}

customElements.define("mi-navegacion", Navegacion);