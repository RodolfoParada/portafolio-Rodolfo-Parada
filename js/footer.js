class Footer extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    const year = new Date().getFullYear();

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="css/footer.css?v=20261008d">
      <link rel="stylesheet" href="css/dark-mode.css?v=20261008b">
      <footer class="footer" aria-label="Información de contacto">
        <div class="footer__identity">
          <img class="footer__portrait" src="assets/images/rodolfo3.png" alt="Rodolfo Parada González">
          <div class="footer__bio">
            <strong class="footer__name">Rodolfo Parada González</strong>
            <span class="footer__tagline">Desarrollo, diseño y visión de negocio.</span>
          </div>
        </div>
        <div class="footer__details">
          <nav class="footer__social" aria-label="Redes sociales">
            <a class="footer__social-link" href="https://github.com/RodolfoParada"
              target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.2-1.5 6.2-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6s-1.2-.4-3.8 1.4a13 13 0 0 0-6.9 0C5.5 1.1 4.3 1.5 4.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.7V22"/>
              </svg>
            </a>
            <a class="footer__social-link" href="https://www.linkedin.com/in/rodolfoparada/"
              target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9v11M4 4v.1M9 20v-6.2a4 4 0 0 1 8 0V20m-8-7v7m8-7v7"/>
                <circle cx="4" cy="4" r="1"/>
              </svg>
            </a>
          </nav>
          <span class="footer__copyright">© ${year} Rodolfo Parada</span>
        </div>
      </footer>
    `;
  }
}

customElements.define("mi-footer", Footer);
