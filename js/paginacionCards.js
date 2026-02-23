class PaginacionCards extends HTMLElement {
  constructor() {
    super();
    this.currentPage = 0;
    this.itemsPerPage = 3;
    this._dataList = [];
    this.storageKey = `paginacion-${this.tagName.toLowerCase()}`;
  }

  set dataList(data) {
    this._dataList = data;
    this.currentPage = 0;
    this.render();
  }

  get dataList() {
    return this._dataList;
  }

  connectedCallback() {
     const savedPage = localStorage.getItem(this.storageKey);
  if (savedPage) {
    this.currentPage = parseInt(savedPage);
  }
    this.render();
    this.addEventListener('click', (e) => {
      if (e.target.matches('.btn-prev')) {
        this.prevPage();
      } else if (e.target.matches('.btn-next')) {
        this.nextPage();
      }
    });
  }

  render() {
    if (!this._dataList || this._dataList.length === 0) {
      this.innerHTML = `<p>No hay proyectos para mostrar.</p>`;
      return;
    }

    const start = this.currentPage * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    const pageItems = this._dataList.slice(start, end);

    this.innerHTML = `
      <div class="cards-container">
        ${pageItems.map((p, index) => `
          <div class="card mb-4 p-3 proyecto-card"  style="background-color: #95AEE9;">
            <div class="row g-2">
              <div class="col-md-6">
                <div class="card-body" ">
                  <h5 class="card-title fw-bold">${p.titulo}</h5>
                  <p class="card-text">${p.descripcion}</p>
                  <p class="card-text">${p.lenguaje}</p>
                  <p class="card-text">${p.texto}</p>
                  <div class="d-flex gap-2">
                    ${p.video ? `<a href="${p.video}" target="_blank" class="btn btn-dark btn-primary btn-sm">Video</a>` : ''}
                    ${p.codigo ? `<a href="${p.codigo}" target="_blank" class="btn btn-primary btn-sm">Código</a>` : ''}
                    ${p.vista ? `<a href="${p.vista}" target="_blank" class="btn btn-primary btn-sm">Ver Proyecto</a>` : ''}
                    ${p.behance ? `<a href="${p.behance}" target="_blank" class="btn btn-primary btn-sm">Ver Behance</a>` : ''}
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div id="carousel-${start + index}" class="carousel slide" data-bs-ride="carousel">
                  <div class="carousel-inner">
                    ${p.imagenes.map((img, i) => `
                      <div class="carousel-item ${i === 0 ? 'active' : ''}">
                        <img src="${img}" class="d-block w-100" alt="Imagen ${i + 1} de ${p.titulo}">
                      </div>
                    `).join('')}
                  </div>
                  <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${start + index}" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                  </button>
                  <button class="carousel-control-next" type="button" data-bs-target="#carousel-${start + index}" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pagination-buttons-container mt-5">
      <div class="d-flex flex-row justify-content-center justify-content-sm-end gap-2 w-100 mb-4">
        <button class="btn btn-primary btn-prev" ${this.currentPage === 0 ? 'disabled' : ''}>Anterior</button>
        <button class="btn btn-primary btn-next" ${end >= this._dataList.length ? 'disabled' : ''}>Siguiente</button>
      </div>
    `;

    // Inicializar carouseles recién creados
    const carousels = this.querySelectorAll('.carousel');
    carousels.forEach(carouselEl => {
      // eslint-disable-next-line no-undef
     const carouselId = carouselEl.id;
const savedSlide = localStorage.getItem(`carousel-${carouselId}`);

const carouselInstance = new bootstrap.Carousel(carouselEl);

if (savedSlide) {
    carouselInstance.to(parseInt(savedSlide));
}

// Guardar cuando cambia slide
carouselEl.addEventListener('slid.bs.carousel', (e) => {
    localStorage.setItem(`carousel-${carouselId}`, e.to);
});
    });
  }

  nextPage() {
    localStorage.setItem(this.storageKey, this.currentPage);
    if ((this.currentPage + 1) * this.itemsPerPage < this._dataList.length) {
      this.currentPage++;
      this.render();
    }
  }

  prevPage() {
    localStorage.setItem(this.storageKey, this.currentPage);
    if (this.currentPage > 0) {
      this.currentPage--;
      this.render();
    }
  }
}

customElements.define('paginacion-cards', PaginacionCards);


