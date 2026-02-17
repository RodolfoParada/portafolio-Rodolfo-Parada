class proyectoUX extends HTMLElement {
   connectedCallback() {
    const proyectos = [
      {
        titulo: "Proyecto UX wenupillan.cl",
        descripcion: "Se analizó el sitio web wenupillan.cl del punto de vista UX y Se desarrolló una página web donde se mejora la accesibilidad y está centrada en el usuario; se mejoró la arquitectura de la información, se simula un carrito de compra. En resumen se mejoró manteniendo la misma identidad.",
        lenguaje: "",
        texto:" Se desarrollaron componentes reutilizables y además puedes ver más detalle en los siguientes bótones'.",
        video: "https://www.youtube.com/watch?v=vGxjEMsdiZ8",
        codigo: "https://github.com/RodolfoParada/version-mejorada-wenupillan",
        vista: "https://rodolfoparada.github.io/version-mejorada-wenupillan/", 
        behance: "https://www.behance.net/gallery/232868237/Proyecto-Wenupillan",
        imagenes: [
         "assets/proyectoUx/wenupillan/Portada-Ux.jpeg",
         "assets/proyectoUx/wenupillan/página2.jpg",
         "assets/proyectoUx/wenupillan/página4.jpg",
         "assets/proyectoUx/wenupillan/página3.jpg",
         "assets/proyectoUx/wenupillan/página5.jpg",   
         "assets/proyectoUx/wenupillan/wenupillan-home.png",
         "assets/proyectoUx/wenupillan/wenupillan-quienesSomos.png",
         "assets/proyectoUx/wenupillan/wenupillan-restaurant.png",
         "assets/proyectoUx/wenupillan/wenupillan-tienda.png",
         "assets/proyectoUx/wenupillan/wenupillan-contacto.png",
         "assets/proyectoUx/wenupillan/wenupillan-machi.png",
         "assets/proyectoUx/wenupillan/wenupillan-toki.png",
         "assets/proyectoUx/wenupillan/wenupillan-weichafe.png",
         "assets/proyectoUx/wenupillan/wenupillan-lonko.png",
          
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 2",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 3",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
        {
        titulo: "Clon Ejemplo Proyecto UX 4",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 5",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 6",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
       {
        titulo: "Clon Ejemplo Proyecto UX 7",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 8",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "Clon Ejemplo Proyecto UX 9",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"texto para elementos usados en el proyecto",
        video: "https://tu-video-twitter.com",
        behance: "https://github.com/tuusuario/clon-twitter",
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
      <section class="mb-5">
        <h5 class="fw-bold">Portafolio UX : Análisis e Investigación y Desarrollo Web.</h5>
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
                 ${p.behance ? `<a href="${p.behance}" target="_blank" class="btn btn-primary btn-sm">Ver Behance</a>` : ''}
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div id="carousel-${p.titulo.replace(/\s+/g, '')}" class="carousel slide" data-bs-ride="carousel">
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
  }
}

customElements.define('proyecto-ux', proyectoUX);
