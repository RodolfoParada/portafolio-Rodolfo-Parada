class Navegacion extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="./css/nav.css?v=20261008e"/>
      <link rel="stylesheet" href="./css/dark-mode.css?v=20261008c"/>

      <nav class="site-navbar" aria-label="Navegación principal">
        <div class="nav-inner">
          <a class="site-brand" href="/" data-link aria-label="Rodolfo Parada, inicio">
            <span class="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32">
                <path d="m11 9-7 7 7 7M21 9l7 7-7 7M19 5l-6 22"/>
              </svg>
            </span>
            <span class="brand-copy">
              <strong>Rodolfo Parada</strong>
              <small>DESARROLLADOR FULL STACK</small>
            </span>
          </a>

          <div class="nav-menu" id="menu">
            <ul class="nav-links">
              <li><a class="nav-link" href="#/" data-link>Sobre mí</a></li>
              <li><a class="nav-link" href="#/experiencia" data-link>Experiencia</a></li>
              <li><a class="nav-link" href="#/formacion" data-link>Formación</a></li>
              <li><a class="nav-link" href="#/proyectos" data-link>Proyectos</a></li>
            </ul>
            <a class="contact-link contact-link--mobile" href="https://www.linkedin.com/in/rodolfoparada/"
              target="_blank" rel="noopener noreferrer">
              Hablemos
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9"/>
              </svg>
            </a>
          </div>

          <div class="nav-actions">
            <mi-modo-oscuro></mi-modo-oscuro>
            <a class="contact-link contact-link--desktop" href="https://www.linkedin.com/in/rodolfoparada/"
              target="_blank" rel="noopener noreferrer">
              Hablemos
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9"/>
              </svg>
            </a>
            <button class="menu-toggle" id="btn-toggle" type="button"
              aria-label="Abrir menú" aria-expanded="false" aria-controls="menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </nav>
    `;

    const toggleBtn = this.shadowRoot.getElementById("btn-toggle");
    const menu = this.shadowRoot.getElementById("menu");

    this.routeChangeHandler = () => this.updateActiveLink();
    window.addEventListener("hashchange", this.routeChangeHandler);
    this.updateActiveLink();

    toggleBtn.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggleBtn.setAttribute("aria-expanded", String(isOpen));
      toggleBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
    });

    this.shadowRoot.querySelectorAll("[data-link]").forEach((link) => {
      link.addEventListener("click", async (event) => {
        event.preventDefault();
        const { router } = await import("./router.js");
        router.navigate(link.getAttribute("href"));
        menu.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
        toggleBtn.setAttribute("aria-label", "Abrir menú");
      });
    });
  }

  disconnectedCallback() {
    if (this.routeChangeHandler) {
      window.removeEventListener("hashchange", this.routeChangeHandler);
    }
  }

  updateActiveLink() {
    const links = this.shadowRoot.querySelectorAll(".nav-link");
    const currentRoute = window.location.hash || "#/";
    const hasMatchingRoute = [...links].some((link) => link.getAttribute("href") === currentRoute);
    const activeRoute = hasMatchingRoute ? currentRoute : "#/";

    links.forEach((link) => {
      const isActive = link.getAttribute("href") === activeRoute;
      link.classList.toggle("active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }
}

customElements.define("mi-navegacion", Navegacion);
