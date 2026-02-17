class proyectoEcommerce extends HTMLElement {
  connectedCallback() {
    const proyectos = [
      {
        titulo: "Clon Ejemplo Ecommerce 1",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 2",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 3",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
        {
        titulo: "Clon Ejemplo Ecommerce 4",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 5",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 6",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
       {
        titulo: "Clon Ejemplo Ecommerce 7",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 8",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Ecommerce 9",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      }
    ];

    this.innerHTML = `
      <link rel="stylesheet" href="css/proyectos.css"/>
      <link rel="stylesheet" href="css/dark-mode.css"/>
      <link rel="stylesheet" href="css/ecommerce.css"/>
      <section class="mb-5">
        <h5 class="fw-bold">Proyectos E-Commerce : Sitios de ventas de productos o servicios con carrito, pagos, etc.</h5>
        <paginacion-cards></paginacion-cards>
      </section>
    `;


    const paginador = this.querySelector('paginacion-cards');
    if (paginador) {
      paginador.cardRenderer = (p) => `
      <link rel="stylesheet" href="css/proyectos.css"/>
      <link rel="stylesheet" href="css/dark-mode.css"/>
        
        <div class="card mb-4 p-3 proyecto-card" style="background-color: #95AEE9;">
          <div class="row g-2">
            <div class="col-md-6">
              <div class="card-body">
                <h5 class="card-title fw-bold">${p.titulo}</h5>
                <p class="card-text">${p.descripcion}</p>
                <p class="card-text">${p.lenguaje}</p>
                <p class="card-text">${p.texto}</p>
                <div class="d-flex gap-2">
                  ${p.video ? `<a href="${p.video}" target="_blank" class="btn btn-dark btn-primary btn-sm">Video</a>` : ''}
                  ${p.codigo ? `<a href="${p.codigo}" target="_blank" class="btn btn-primary btn-sm">Código</a>` : ''}
                  ${p.vista ? `<a href="${p.vista}" target="_blank" class="btn btn-primary btn-sm">Ver Proyecto</a>` : ''}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div id="carousel-ecommerce${p.titulo.replace(/\s+/g, '')}" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                  ${p.imagenes.map((img, i) => `
                    <div class="carousel-item ${i === 0 ? 'active' : ''}">
                      <img src="${img}" class="d-block w-100" alt="Imagen ${i + 1} de ${p.titulo}">
                    </div>
                  `).join('')}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${p.titulo.replace(/\s+/g, '')}" data-bs-slide="prev">
                  <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carousel-${p.titulo.replace(/\s+/g, '')}" data-bs-slide="next">
                  <span class="carousel-control-next-icon" aria-hidden="true"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
      paginador.dataList = proyectos;
    }
     // después de renderizar las cards:
     const root = this; // o pc.shadowRoot si renderizas dentro de <paginacion-cards> con Shadow DOM
     root.querySelectorAll('.proyecto-card').forEach(card => {
     const el = card.querySelector('.carousel');
     const inst = bootstrap.Carousel.getOrCreateInstance(el);
     card.querySelector('.carousel-control-next')?.addEventListener('click', e => { e.preventDefault(); inst.next(); });
     card.querySelector('.carousel-control-prev')?.addEventListener('click', e => { e.preventDefault(); inst.prev(); });
    });

const botonesContainer = card.querySelector('.d-flex.gap-2');
p.botones.forEach(b => {
  const btn = document.createElement('a');
  btn.href = b.url;
  btn.target = '_blank';
  btn.className = `btn ${b.clase} btn-sm`;
  btn.textContent = b.texto;
  botonesContainer.appendChild(btn);
});


  }
}



customElements.define('proyecto-ecommerce', proyectoEcommerce);

