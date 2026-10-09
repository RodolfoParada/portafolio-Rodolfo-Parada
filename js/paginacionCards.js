const CATEGORY_LABELS = {
  clones: 'Clones',
  crud: 'CRUD',
  ecommerce: 'E-Commerce',
  dashboard: 'Dashboards',
  ia: 'Inteligencia artificial',
  backend: 'Backend / API',
  frontend: 'Frontend',
  logica: 'Lógica',
  juegos: 'Juegos',
  fullstack: 'Full Stack',
  empresarial: 'Sistemas empresariales',
  seguridad: 'Seguridad',
  ux: 'Portafolio UX',
  mini: 'Mini proyectos',
  wordpress: 'WordPress'
};

class PaginacionCards extends HTMLElement {
  constructor() {
    super();
    this.currentPage = 0;
    this.itemsPerPage = 2;
    this._dataList = [];
    this.storageKey = `paginacion-${this.tagName.toLowerCase()}`;
  }

  set dataList(data) {
    this._dataList = data;
    const lastPage = Math.max(0, Math.ceil(this._dataList.length / this.itemsPerPage) - 1);
    this.currentPage = Math.min(this.currentPage, lastPage);
    this.render();
  }

  get dataList() {
    return this._dataList;
  }

  connectedCallback() {
    const category = this.closest('.proyecto')?.tagName.toLowerCase().replace('proyecto-', '') || this.tagName.toLowerCase();
    this.storageKey = `paginacion-${category}`;
    const savedPage = Number.parseInt(localStorage.getItem(this.storageKey) || '0', 10);
    this.currentPage = Number.isNaN(savedPage) || savedPage < 0 ? 0 : savedPage;

    this.addEventListener('click', (event) => {
      const button = event.target.closest('button');
      if (!button || !this.contains(button)) return;

      if (button.matches('.btn-prev')) {
        this.goToPage(this.currentPage - 1);
      } else if (button.matches('.btn-next')) {
        this.goToPage(this.currentPage + 1);
      } else if (button.matches('[data-page]')) {
        this.goToPage(Number.parseInt(button.dataset.page, 10));
      } else if (button.matches('.project-carousel-prev, .project-carousel-next')) {
        const carousel = button.closest('.project-preview')?.querySelector('.carousel');
        if (!carousel) return;

        const instance = bootstrap.Carousel.getOrCreateInstance(carousel);
        if (button.matches('.project-carousel-prev')) instance.prev();
        else instance.next();
      }
    });

    this.render();
  }

  render() {
    if (!this._dataList || this._dataList.length === 0) {
      this.innerHTML = `<p>No hay proyectos para mostrar.</p>`;
      return;
    }

    const start = this.currentPage * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, this._dataList.length);
    const category = this.closest('.proyecto')?.tagName.toLowerCase().replace('proyecto-', '') || '';
    const categoryLabel = CATEGORY_LABELS[category] || 'Proyecto';
    const pageItems = this._dataList.slice(start, end);
    const pageCount = Math.ceil(this._dataList.length / this.itemsPerPage);

    this.innerHTML = `
      <div class="project-showcase-list">
        ${pageItems.map((project, index) => this.renderProject(project, start + index, category, categoryLabel)).join('')}
      </div>
      <nav class="project-pagination" aria-label="Paginación de proyectos">
        <button class="project-pagination-arrow btn-prev" type="button" aria-label="Página anterior" ${this.currentPage === 0 ? 'disabled' : ''}>
          <span aria-hidden="true">‹</span>
        </button>
        <div class="project-pagination-pages">
          ${Array.from({ length: pageCount }, (_, page) => `
            <button class="project-page-number ${page === this.currentPage ? 'active' : ''}" type="button" data-page="${page}" aria-label="Página ${page + 1}" ${page === this.currentPage ? 'aria-current="page"' : ''}>
              ${page + 1}
            </button>
          `).join('')}
        </div>
        <button class="project-pagination-arrow btn-next" type="button" aria-label="Página siguiente" ${this.currentPage >= pageCount - 1 ? 'disabled' : ''}>
          <span aria-hidden="true">›</span>
        </button>
      </nav>
      <div class="project-pagination-summary">
        <span>${start + 1}–${end} de ${this._dataList.length} proyectos</span>
        <span>Diseño y desarrollo por Rodolfo Parada</span>
      </div>
    `;

    this.querySelectorAll('.carousel').forEach((carousel) => {
      const instance = bootstrap.Carousel.getOrCreateInstance(carousel, {
        interval: false,
        ride: false
      });
      const savedSlide = Number.parseInt(localStorage.getItem(`carousel-${carousel.id}`) || '0', 10);
      if (!Number.isNaN(savedSlide) && savedSlide >= 0) instance.to(savedSlide);

      carousel.addEventListener('slid.bs.carousel', () => {
        const slides = Array.from(carousel.querySelectorAll('.carousel-item'));
        const currentSlide = slides.findIndex((slide) => slide.classList.contains('active')) + 1;
        localStorage.setItem(`carousel-${carousel.id}`, String(currentSlide - 1));
        const counter = carousel.closest('.project-preview')?.querySelector('.project-preview-count');
        if (counter) counter.textContent = `${String(currentSlide).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
      });
    });
  }

  renderProject(project, projectIndex, category, categoryLabel) {
    const images = Array.isArray(project.imagenes) ? project.imagenes : [];
    const technologies = Array.isArray(project.lenguaje)
      ? project.lenguaje
      : typeof project.lenguaje === 'string'
        ? project.lenguaje.split(',').map((technology) => technology.trim()).filter(Boolean)
        : [];
    const carouselId = `carousel-${category || 'projects'}-${projectIndex}`;
    const categoryText = category === 'clones' && projectIndex === 0 ? 'Proyecto destacado' : categoryLabel;
    const projectNote = typeof project.texto === 'string' ? project.texto.trim() : '';
    const videoLink = typeof project.video === 'string' ? project.video.trim() : '';
    const codeLink = typeof project.codigo === 'string' ? project.codigo.trim() : '';
    const projectLink = typeof project.vista === 'string' ? project.vista.trim() : '';
    const behanceLink = typeof project.behance === 'string' ? project.behance.trim() : '';
    const isFeatured = category === 'clones' && projectIndex === 0;
    const technologyLabels = technologies.map((technology) => technology.toUpperCase() === 'JS' ? 'JavaScript' : technology);

    return `
      <article class="project-showcase-card proyecto-card ${isFeatured ? 'is-featured' : ''}">
        <div class="project-showcase-details">
          <p class="project-category-label">${categoryText}</p>
          <h3>${project.titulo}</h3>
          <p class="project-description">${project.descripcion}</p>
          ${projectNote ? `<p class="project-note">${projectNote}</p>` : ''}
          ${technologies.length ? `
            <ul class="project-technologies" aria-label="Tecnologías">
              ${technologyLabels.map((technology) => `<li>${technology}</li>`).join('')}
            </ul>
          ` : ''}
          <div class="project-actions">
            ${videoLink ? `
              <a class="project-action project-action-primary" href="${videoLink}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 5 11 7-11 7V5Z"/></svg>
                Ver video
              </a>
            ` : ''}
            ${codeLink ? `
              <a class="project-action project-action-secondary" href="${codeLink}" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 8-4 4 4 4M16 8l4 4-4 4m-2-7-4 10"/></svg>
                Código fuente
              </a>
            ` : ''}
            ${behanceLink ? `
              <a class="project-action project-action-secondary" href="${behanceLink}" target="_blank" rel="noopener noreferrer">
                Ver Behance
              </a>
            ` : ''}
            ${projectLink ? `
              <a class="project-action project-action-link" href="${projectLink}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${project.titulo}">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>
              </a>
            ` : ''}
          </div>
        </div>
        <div class="project-preview">
          <div class="project-browser">
            <div class="project-browser-bar">
              <span class="project-browser-dots" aria-hidden="true"><i></i><i></i><i></i></span>
              <span>rodolfoparada.github.io</span>
              ${projectLink ? `
                <a href="${projectLink}" target="_blank" rel="noopener noreferrer" aria-label="Abrir vista de ${project.titulo}">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h6v6m-1-5-9 9M18 13v6H4V5h6"/></svg>
                </a>
              ` : '<span aria-hidden="true"></span>'}
            </div>
            <div id="${carouselId}" class="carousel slide project-image-carousel">
              <div class="carousel-inner">
                ${images.length ? images.map((image, imageIndex) => `
                  <div class="carousel-item ${imageIndex === 0 ? 'active' : ''}">
                    <img src="${image}" alt="${project.titulo}: captura ${imageIndex + 1}" loading="lazy">
                  </div>
                `).join('') : `
                  <div class="project-preview-empty">Vista previa no disponible</div>
                `}
              </div>
            </div>
          </div>
          <div class="project-preview-controls">
            <span class="project-preview-count">${String(images.length ? 1 : 0).padStart(2, '0')} / ${String(images.length).padStart(2, '0')}</span>
            <div class="project-preview-buttons">
              <button class="project-carousel-prev" type="button" aria-label="Captura anterior" ${images.length < 2 ? 'disabled' : ''}><span aria-hidden="true">‹</span></button>
              <button class="project-carousel-next" type="button" aria-label="Captura siguiente" ${images.length < 2 ? 'disabled' : ''}><span aria-hidden="true">›</span></button>
            </div>
          </div>
        </div>
      </article>
    `;
  }

  goToPage(page) {
    const pageCount = Math.ceil(this._dataList.length / this.itemsPerPage);
    if (page < 0 || page >= pageCount || page === this.currentPage) return;

    this.currentPage = page;
    localStorage.setItem(this.storageKey, String(this.currentPage));
    this.render();
  }
}

customElements.define('paginacion-cards', PaginacionCards);
