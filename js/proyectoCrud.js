class proyectoCrud extends HTMLElement {
  connectedCallback() {
    const proyectos = [
      {
        titulo: "SISTEMA CRUD POKEAPI CON VUE",
        descripcion: "CRUD en memoria, se consula la pokeapi con VUE.JS y se depliegua en desarrollo en github pages",
        lenguaje: "VUE.JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://www.youtube.com/watch?v=q-cCV8ZjjlM",
        codigo: "https://github.com/RodolfoParada/CRUD-Pokeapi-Vue",
        vista: "https://rodolfoparada.github.io/CRUD-Pokeapi-Vue/#/", 
        imagenes: [
         "assets/proyectoCRUD/crudPokemon/p-1.png",
         "assets/proyectoCRUD/crudPokemon/p-2.png",
          "assets/proyectoCRUD/crudPokemon/p-3.png",
        ]
      },
         {
        titulo: "SISTEMA DE ORDENES CRUD CON LOCALSTORAGE",
        descripcion: "Aplicación CRUD en memoria utilizando LocalStorage para gestionar órdenes de compra. despliegue en desarrollo github pages",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://www.youtube.com/watch?v=dR0wppDscAc",
        codigo: "https://github.com/RodolfoParada/producto-js",
        vista: "https://rodolfoparada.github.io/producto-js/", 
        imagenes: [
         "assets/proyectoCRUD/productoCrud/crud-producto.png",
     
        ]
      },
      {
        titulo: "PROYECTO CRUD 3",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
        {
        titulo: "PROYECTO CRUD 4",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "PROYECTO CRUD 5",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "PROYECTO CRUD 6",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
       {
        titulo: "PROYECTO CRUD 7",
        descripcion: "Aplicación que simula la interfaz de Netflix con HTML, CSS y JS.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
         "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "PROYECTO CRUD 8",
        descripcion: "Interfaz similar a Spotify construida con React.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
        imagenes: [
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        "assets/Mantenimiento/Mantenimiento.png",
        ]
      },
      {
        titulo: "PROYECTO CRUD 9",
        descripcion: "Simulación de la red social usando Vue.js.",
        lenguaje: "HTML, CSS, JS",
        texto:"Puedes revisar más información en los siguientes botones:",
        video: "https://tu-video-twitter.com",
        codigo: "https://github.com/tuusuario/clon-twitter",
        vista: " ", 
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
        <h5 class="fw-bold">Proyectos CRUD : Aplicaciones que permiten Crear, Leer, Actualizar y Eliminar datos.</h5>
        <paginacion-cards></paginacion-cards>
      </section>
    `;

   const paginador = this.querySelector('paginacion-cards');
    if (paginador) {
      paginador.cardRenderer = (p, index) => {
        // ✅ Generar ID único para cada carrusel
        const uid = `carousel-${index}-${Date.now()}`;

        return `
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
                  </div>
                </div>
              </div>
              <div class="col-md-6">
               <div id="${uid}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                      ${p.imagenes.map((img, i) => `
                        <div class="carousel-item ${i === 0 ? 'active' : ''}">
                          <img src="${img}" class="d-block w-100" alt="Imagen ${i + 1} de ${p.titulo}">
                        </div>
                      `).join('')}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#${uid}" data-bs-slide="prev" aria-label="Anterior">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#${uid}" data-bs-slide="next" aria-label="Siguiente">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    </button>
                  </div>
              </div>
            </div>
          </div>
        `;
      };

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

customElements.define('proyecto-crud', proyectoCrud);