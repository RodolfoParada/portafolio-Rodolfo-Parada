# Especificación funcional y visual del portafolio

Este documento describe el comportamiento y las reglas que ya existen en el
proyecto. La implementación se reparte entre `index.html`, las vistas de
`views/`, hojas de estilo de `css/` y componentes/datos de `js/`. Si una
descripción de categoría contradice una ficha, la ficha de proyecto es la
fuente de sus datos; si este documento contradice el código, revisar el código
antes de cambiar el comportamiento.

## 1. Estructura y navegación general

- Es una SPA: `index.html` mantiene la navegación y el pie, y el router carga
  una vista dentro de `#app-container`. Las rutas son `/` y `#/` (Sobre mí),
  `#/experiencia`, `#/formacion` y `#/proyectos`.
- Al cargar una vista se desplaza la página al inicio. Los enlaces de navegación
  no deben provocar una recarga completa.
- La barra superior y el pie están presentes en todas las vistas. La barra es
  fija arriba y mide 130 px en escritorio y 88 px bajo 992 px; el contenido
  reserva 74 px de compensación en escritorio y 32 px bajo 992 px para
  conservar la separación con la barra. El pie claro es fijo abajo y mide al
  menos 140 px en escritorio, 124 px entre 521 y 720 px, y 150 px en pantallas
  de hasta 520 px. El área de contenido reserva espacio inferior para que el
  pie fijo no tape el final de la vista.
- En Proyectos, la barra de categorías queda debajo de la navegación fija. El
  margen superior de 50 px de `.proyectos` debe permanecer dentro de la vista y
  no colapsar fuera de `#app-container`; junto al margen Bootstrap `mt-4` de la
  sección da un espacio visible de 18 px entre navbar y pestañas.
- Bootstrap 5.3.1 aporta la cuadrícula, componentes y controles de carrusel.
- El cambio de tema se comparte entre vistas y conserva `modo-oscuro` en
  `localStorage`.
- Paleta base: azul claro `#95AEE9`, azul oscuro `#394476`, blanco azulado
  `#F0F6FD`; el modo oscuro usa negro/grises y texto claro.
- Tipografía global: `Arial, sans-serif` (declarada en los estilos de las
  vistas), con el tamaño base de Bootstrap de 16 px. El título del perfil usa
  una escala de portada y el retrato de Sobre mí mide 262 × 262 px con esquinas
  redondeadas. Los textos de perfil mantienen una lectura amplia y los
  encabezados usan una jerarquía visual propia de cada vista.
- El documento (html/body) es el área de scroll vertical; las vistas no deben
  crear scroll vertical anidado en `main` ni fijar `height: 100%` sobre el body.
  El contenedor principal conserva una altura mínima de viewport y espacio
  inferior para el pie. Evitar desbordamiento horizontal del documento;
  las pestañas de proyectos sí permiten desplazamiento horizontal dentro de su
  propia banda. La barra de scroll del documento se oculta en Firefox, Edge y
  navegadores WebKit sin deshabilitar el desplazamiento.

## 2. Componentes compartidos y componentes únicos

### Compartidos/reutilizables

| Componente | Responsabilidad y reglas |
| --- | --- |
| `<mi-navegacion>` | Web component con Shadow DOM; barra fija clara con marca e icono de código a la izquierda, enlaces de las cuatro pestañas centrados, selector de tema y botón «Hablemos» enlazado a LinkedIn a la derecha. El botón tiene contorno azul y fondo claro al pasar el cursor, con sombra sutil. La ruta actual resalta su enlace como una pastilla azul clara y expone `aria-current="page"`; el estado se sincroniza también con cambios de hash y navegación del navegador. En pantallas menores de 992 px cambia a menú colapsable y conserva visible el control de tema; «Hablemos» queda en el menú desplegado. Cierra el menú móvil al navegar. |
| `<mi-footer>` | Web component con Shadow DOM; pie claro con retrato circular, nombre y descripción breve a la izquierda; enlaces circulares a GitHub y LinkedIn y copyright actualizado al año actual a la derecha. En móvil reorganiza los bloques en columna y mantiene ambos enlaces accesibles. Es fijo en vistas cortas y fluye después del contenido de Sobre mí y Proyectos. El modo oscuro cambia el fondo, el borde y los textos. |
| `<mi-modo-oscuro>` | Botón de tema 🌙/☀️, tooltip Bootstrap y persistencia en `localStorage`. Afecta al documento y adapta navegación, pie, acordeones, botones y pestañas. |
| `<mi-acordeon data="…">` | Acordeón reutilizable en Experiencia y Formación. Recibe un JSON en el atributo `data`, presenta opciones a la izquierda y el contenido de la opción seleccionada a la derecha; primera opción activa inicialmente. Admite `contenido` HTML o `tabla`. |
| Chips y pestañas de Sobre mí | Ocho chips nativos muestran un panel informativo contextual; las pestañas accesibles filtran las tarjetas de tecnologías, herramientas y habilidades blandas. |
| `<mi-popover>` | Componente emergente Bootstrap disponible para contenido HTML; ya no se usa en las vistas principales. |
| `<paginacion-cards>` | Presentación paginada reutilizada por las categorías de Proyectos: dos fichas por página con diseño de portafolio, campos de contenido, etiquetas de tecnologías, enlaces condicionales, vista previa y carrusel Bootstrap. Recibe su colección mediante `dataList` y conserva el estado de página/captura por categoría y ficha. |
| Router | Módulo SPA compartido; escucha el hash, resuelve las cuatro rutas y recurre a Inicio si la ruta no existe. |

### Únicos de una vista o de una categoría

- La ficha de perfil con retrato circular y tarjeta de presentación es exclusiva
  de Sobre mí.
- Los datos de cada acordeón de Experiencia y Formación son propios de esas
  pestañas; el contenedor de acordeón no lo es.
- La banda de 15 pestañas, sus flechas de desplazamiento y los 15 elementos
  `<proyecto-…>` sólo pertenecen a Proyectos.
- Cada elemento de proyecto aporta su propia colección de fichas, un subtítulo
  de categoría o un estado vacío. No se deben considerar las 15 categorías
  como componentes reutilizables entre sí en cuanto a contenido.
- Los logos, imágenes y textos de cada proyecto/formación/experiencia son
  contenido único, aunque se dibujen con los componentes compartidos.

## 3. Pestaña «Sobre mí»

### Distribución y contenido

- La portada contiene el eyebrow «SOBRE MÍ», el nombre «Rodolfo Parada.» y el
  resumen «Desarrollador Full Stack Jr. · Java y JavaScript».
- El bloque de perfil usa una cuadrícula con retrato rectangular de
  `assets/images/rodolfo3.png` (262 × 262 px en escritorio, `object-fit: cover`,
  esquinas redondeadas) a la izquierda y el texto a la derecha. En móvil las
  columnas se apilan. El texto conserva la formación en administración, UX,
  desarrollo Full Stack, Scrum y aprendizaje continuo.
- Ocho chips («Más sobre mí», «Mi Lema», «Mi Objetivo», «Que Busco»,
  «Curiosidades», «Resolutivo», «Me defino» y «Estoy preparado») abren un panel
  contextual al seleccionarlos y se cierran al volver a pulsar el chip activo.
- «Habilidades y herramientas» ofrece pestañas para lenguajes y frameworks,
  herramientas y habilidades blandas. Las tarjetas de tecnología muestran
  iconos; las de habilidades blandas presentan sus nombres. Las pestañas
  admiten selección con flechas, Home y End del teclado.

## 4. Pestaña «Experiencia»

- Presenta encabezado y lista cronológica con las experiencias más recientes
  primero; las fechas van a la izquierda y empresa, cargo y detalle a la
  derecha. En móvil las columnas se apilan.
- Se conserva todo el texto que aparece después de cada cargo: proyectos,
  funciones, tecnologías, herramientas y logros, incluidos sus datos y
  porcentajes.
- Fichas actuales:
  1. **Desarrollador Web Full Stack (Freelance)** — mayo de 2024 a la actualidad,
     remoto desde Chile; especialización en Next.js, NestJS, WordPress y UX.
     Enfoque en productos digitales escalables, accesibles y centrados en UX.
     Detalla JavaScript, Node.js, Next.js (SSR/SSG), NestJS, WordPress Custom
     (temas, plugins y landing pages) y UX. Aptitudes: JavaScript, Node.js,
     Next.js, NestJS, Desarrollo Full Stack, WordPress Custom, Diseño UX y
     Arquitectura de Software.
  2. **Práctica Profesional, EstándarISO** — marzo a mayo de 2026; contrato de
     prácticas, remoto desde Chile. Desarrollo Full Stack para reparadores.app
     con Next.js/React y NestJS, integración de chat en tiempo real, Resend y
     Transbank Webpay, optimización del matching y rendimiento, despliegues en
     Railway, CI/E2E con Playwright y adopción de herramientas de IA.
  3. **ActiveIt.** — septiembre de 2022 a julio de 2024; Consultor remoto
     desde Chile. Dos
     proyectos: «Inicio de actividades» (Vue.js, Spring Boot, Scrum, GitHub,
     Postman y VS Code; cumplimiento de objetivos de sprint) y «Control de
     Software Claro-VTR» (GitLab, GitKraken y SourceTree; custodia y
     trazabilidad de versiones).
  4. **Blockey Limitada.** — enero a mayo de 2022; Diseño de Estrategia
     Comercial, remoto desde Chile. Plan comercial, clientes potenciales e
     investigación/análisis de mercado; entregas a CORFO dentro del plazo.
  5. **Castillo Gráfico / Castillo Limitada.** — junio de 2016 a enero de 2022;
     Gerente General. Plan comercial y propuesta de valor; logros indicados:
     aumento de ventas de 32 % y frecuencia de compra de 90 % en 2018, y
     crecimiento adicional de 25 % en 2019.

## 5. Pestaña «Formación»

- Presenta un encabezado y una lista cronológica de nueve entradas, de la más
  reciente a la más antigua, en lugar del acordeón usado por Experiencia.
- El visor de certificados e insignias se abre desde el botón de cada
  credencial disponible en los archivos locales. El diálogo muestra la imagen
  ajustada al viewport y se cierra con el botón «X», la tecla Escape o al
  pulsar el fondo.
- Orden y contenido vigente:
  1. Técnico de Nivel Superior Analista Programador Computacional, IPCHILE
     (2024–2026), titulado en 2026.
  2. Diplomado UX para el Desarrollo de Productos Digitales, Duoc UC
     (2024–2025), completado.
  3. Bootcamp Full-Stack JavaScript, Talento Digital / Edutecno (febrero–
     agosto de 2023), completado; diploma de participación.
  4. Diplomado Marketing Digital y Gestión Estratégica, AIEP (agosto–
     noviembre de 2022), completado.
  5. Bootcamp Full-Stack Java, Talento Digital / AIEP (enero–junio de 2022),
     completado; diploma e insignia Java.
  6. Bootcamp de aplicaciones móviles Android, Talento Digital / Duoc
     (noviembre de 2020–mayo de 2021), completado; diploma e insignia Android.
  7. Diplomado en Dirección Comercial y Ventas, Universidad San Sebastián
     (mayo–noviembre de 2020), completado.
  8. Ingeniería en Administración, mención Marketing y Gestión Comercial,
     Universidad Mayor (2013–2017), titulado.
  9. Técnico de Nivel Superior en Administración en Recursos Humanos, Escuela
     de Comercio de Santiago (febrero de 2010–junio de 2012), titulado.

## 6. Pestaña «Proyectos»

### Navegación de categorías

- Orden y correspondencia entre etiqueta, valor `data-categoria`, custom
  element, script de datos y cantidad declarada:

| Orden | Pestaña / `data-categoria` | Custom element / fuente | Fichas | Con datos concretos |
| ---: | --- | --- | ---: | ---: |
| 1 | Clones / `clones` | `<proyecto-clones>` / `proyectoClones.js` | 9 | 1 |
| 2 | CRUD / `crud` | `<proyecto-crud>` / `proyectoCrud.js` | 9 | 2 |
| 3 | Backend/API / `backend` | `<proyecto-backend>` / `proyectoBackend.js` | 9 | 0 |
| 4 | Frontend / `frontend` | `<proyecto-frontend>` / `proyectoFrontend.js` | 9 | 3 |
| 5 | Full Stack / `fullstack` | `<proyecto-fullstack>` / `proyectoFullStack.js` | 9 | 0 |
| 6 | Lógica / `logica` | `<proyecto-logica>` / `proyectoLogica.js` | 9 | 0 |
| 7 | Mini Proyectos / `mini` | `<proyecto-mini>` / `proyectoMini.js` | 10 | 5 |
| 8 | Juegos / `juegos` | `<proyecto-juegos>` / `proyectoJuegos.js` | 9 | 1 |
| 9 | Portafolio UX / `ux` | `<proyecto-ux>` / `proyectoUX.js` | 9 | 1 |
| 10 | E-Commerce / `ecommerce` | `<proyecto-ecommerce>` / `proyectoEcommerce.js` | 9 | 1 |
| 11 | Sistemas Empresariales / `empresarial` | `<proyecto-empresarial>` / `proyectoEmpresariales.js` | 9 | 0 |
| 12 | Seguridad / `seguridad` | `<proyecto-seguridad>` / `proyectoSeguridad.js` | 9 | 0 |
| 13 | Dashboards / `dashboard` | `<proyecto-dashboard>` / `proyectoDashboars.js` | 9 | 0 |
| 14 | IA / `ia` | `<proyecto-ia>` / `proyectoIa.js` | 9 | 0 |
| 15 | WordPress / `wordpress` | `<proyecto-wordpress>` / estado vacío | 0 | 0 |

- Clones se selecciona inicialmente. Sólo se muestra el custom element cuyo
  nombre coincide con `proyecto-${data-categoria}`; los demás se ocultan.
- La banda se mantiene en una línea, oculta la barra de scroll y usa flechas
  izquierda/derecha para desplazarla 150 px con animación suave. El estilo
  activo es azul oscuro con texto blanco; en modo oscuro cambia a gris oscuro.
- La categoría elegida se conserva como `proyectos-categoria` en
  `localStorage`. Al cambiar de categoría, el código reinicia los carruseles de
  la categoría visible al índice 0 tras 50 ms.
- El encabezado de cada categoría aclara su propósito (clones de sitios;
  CRUD; APIs backend; consumo de APIs e interfaz frontend; aplicaciones full
  stack; experimentos de lógica; juegos; UX/investigación; e-commerce;
  sistemas empresariales; seguridad; dashboards; IA). El encabezado no
  sustituye la descripción de las fichas y varios encabezados son aspiracionales
  frente a las fichas de ejemplo descritas más abajo.

### Reglas de fichas, paginación e imágenes

- Cada ficha presenta título, descripción, tecnologías (`lenguaje`), texto
  auxiliar opcional y, si hay valores, enlaces Video, Código, Ver Proyecto y
  Ver Behance. Los enlaces abren una pestaña nueva. La columna textual y la
  columna de imagen ocupan cada una la mitad desde `md`; en tamaños menores se
  apilan.
- Cada ficha tiene su carrusel Bootstrap con las imágenes del array `imagenes`;
  la primera empieza activa. Se muestran controles anterior/siguiente y se
  declara `data-bs-ride="carousel"`. Si falta `vista`, se omite «Ver Proyecto»;
  no todas las fichas incluyen todos los tipos de enlace.
- Se presentan tres fichas por página y controles «Anterior»/«Siguiente»;
  los extremos quedan deshabilitados. Sin datos, se muestra «No hay proyectos
  para mostrar». Los botones usan el azul oscuro y cambian de estilo con el
  tema.
- El array de cada categoría, la plantilla compartida de tarjeta y las
  instancias de carrusel constituyen la fuente de verdad. No contar como
  proyectos completos las fichas con título «Ejemplo», URLs `tuusuario` /
  `tu-video-twitter.com` o la imagen `assets/Mantenimiento/Mantenimiento.png`.

### Comportamientos y limitaciones observadas del carrusel

Estas son reglas del código actual que deben tenerse en cuenta al mantener o
ampliar la pestaña:

1. El paginador compartido muestra dos proyectos por página y guarda el índice
   actual con una clave propia de la categoría. Al cambiar de página, persiste
   el nuevo índice y lo limita al rango disponible para esa categoría.
2. Los IDs de los carruseles combinan categoría e índice de ficha; las claves
   de `localStorage` también son únicas por ficha, aunque las categorías
   permanezcan montadas en el DOM mientras están ocultas.
3. Al seleccionar una categoría, la lógica de Proyectos reinicia sus
   carruseles al primer slide.
4. Las fuentes de categoría asignan `cardRenderer` (CRUD tiene una variante
   propia), pero `<paginacion-cards>` presenta todas las fichas con una
   plantilla compartida y consume los campos de sus datos directamente.
5. Se renderizan las fichas de todas las categorías, incluso las ocultas; la
   selección de categoría determina cuál se muestra.

### Inventario de proyectos con contenido concreto

Las siguientes 14 fichas contienen contenido identificable, capturas propias y
al menos referencias a demostración/código; se debe conservar su relación con
su categoría:

| Categoría | Ficha y contenido | Capturas y enlaces |
| --- | --- | --- |
| Clones | **Clon Ministerio de Minería**. Réplica de la interfaz del Ministerio de Minería de Chile, basada en el primer semestre de 2025. HTML, CSS y JavaScript. | 9 capturas en `assets/clones/ministerioMineria/`; video de YouTube, repositorio `RodolfoParada/clones-paginas-web` y demo GitHub Pages. |
| CRUD | **SISTEMA CRUD POKEAPI CON VUE**. CRUD en memoria que consulta PokéAPI con Vue.js. | 3 capturas `assets/proyectoCRUD/crudPokemon/`; video, repositorio `RodolfoParada/CRUD-Pokeapi-Vue` y demo GitHub Pages. |
| CRUD | **SISTEMA DE ORDENES CRUD CON LOCALSTORAGE**. Aplicación HTML/CSS/JS de órdenes de compra con LocalStorage. | 1 captura `assets/proyectoCRUD/productoCrud/crud-producto.png`; video, repositorio `RodolfoParada/producto-js` y demo GitHub Pages. |
| Frontend | **pokeapi-v1-javascript**. Consulta/listado, filtros, detalle, paginación, modo oscuro, estado local, lazy loading y worker Pokémon. HTML, CSS y JS. | 6 capturas `assets/frontend/pokemon/`; video, repositorio `RodolfoParada/pokeapi-v1` y demo GitHub Pages. |
| Frontend | **Digimon-v1-javascript-JQUERY**. Consumo y filtrado de Digimon API. HTML, CSS, JavaScript, jQuery y Bootstrap. | 6 capturas `assets/frontend/digimon/`; video, repositorio `RodolfoParada/DigimonJS-JQUERY` y demo GitHub Pages. |
| Frontend | **CONSUMO API RICK AND MORTY**. Listado de personajes con Vue.js y Bootstrap. | 3 capturas `assets/frontend/rickAndMorty/`; video, repositorio `RodolfoParada/RickandMortyVue` y demo GitHub Pages. |
| Mini Proyectos | **Cálculo de propinas**. Práctica de DOM, CSS, JavaScript, Jest y Cypress; JavaScript Vanilla. | `assets/miniProyecto/calcular-propina.png`; video, repositorio `RodolfoParada/Calculadora-de-Propinas` y demo GitHub Pages. |
| Mini Proyectos | **CalculadoraJS**. Calculadora básica HTML/CSS/JavaScript. | `assets/miniProyecto/calculadora.png`; video, repositorio `RodolfoParada/calculadoraJS` y demo GitHub Pages. |
| Mini Proyectos | **Mundo Peliculas**. Simulación de interfaz de aplicación de películas. HTML/CSS/JavaScript. | 4 capturas en `assets/miniProyecto/mundoPelicula/`; video, repositorio `RodolfoParada/mundoPeliculas` y demo GitHub Pages. |
| Mini Proyectos | **Proyecto: Calculo de Presupuesto**. HTML/CSS/JavaScript/jQuery. | `assets/miniProyecto/presupuesto.png`; video, repositorio `RodolfoParada/PresupuestoAppJS` y demo GitHub Pages. |
| Mini Proyectos | **lA Carta**. Simulación de carta de menú. HTML/CSS/JavaScript/jQuery. | `assets/miniProyecto/carta.png`; video, repositorio `RodolfoParada/carta` y demo GitHub Pages. |
| Juegos | **Adivina al Pokemon**. Juego de adivinanza de Pokémon en Vue.js y CSS. | 3 capturas `assets/proyectoJuegos/juegoPokemon/`; video, repositorio `RodolfoParada/Pokemon_Game` y demo GitHub Pages. |
| Portafolio UX | **Proyecto UX wenupillan.cl**. Análisis UX y desarrollo de una versión mejorada del sitio: accesibilidad, arquitectura de información, foco en usuario y simulación de carrito, manteniendo identidad. | 14 capturas en `assets/proyectoUx/wenupillan/`; video, repositorio `RodolfoParada/version-mejorada-wenupillan`, demo GitHub Pages y caso Behance. El campo `lenguaje` está vacío. |
| E-Commerce | **Proyecto Poleras-Store**. Simulación de e-commerce con HTML, CSS, JavaScript y Bootstrap. | 6 capturas `assets/ecommerce/polera-store/`; video, repositorio `RodolfoParada/Polera-Store` y demo GitHub Pages. |

### Fichas de ejemplo pendientes de contenido real

Las 113 fichas restantes son plantillas/datos de ejemplo. La regla al completar
la cartera es reemplazar título, descripción, tecnologías, enlaces e imágenes
con datos verificables del proyecto; no presentar enlaces ficticios como
trabajos publicados.

| Categoría | Títulos declarados sin proyecto concreto | Cantidad |
| --- | --- | ---: |
| Clones | `Clon Ejemplo Clones 2`–`Clon Ejemplo Clones 9` | 8 |
| CRUD | `PROYECTO CRUD 3`–`PROYECTO CRUD 9` | 7 |
| Backend/API | `Clon Ejemplo Netflix 1`, `Clon Ejemplo Spotify 2`, `Clon Ejemplo Twitter 3`, `Clon Ejemplo Netflix 4`, `Clon Ejemplo Spotify 5`, `Clon Ejemplo Twitter 6`, `Clon Ejemplo Netflix 7`, `Clon Ejemplo Spotify 8`, `Clon Ejemplo Twitter 9` | 9 |
| Frontend | `Clon Ejemplo  Frontend 4`–`Clon Ejemplo  Frontend 9` (dos espacios entre «Ejemplo» y «Frontend») | 6 |
| Full Stack | `Clon Ejemplo Full Stack 1`–`Clon Ejemplo Full Stack 9` | 9 |
| Lógica | `Clon Ejemplo Lógica 1`–`Clon Ejemplo Lógica 9` | 9 |
| Mini Proyectos | `Clon Ejemplo  Frontend 5`–`Clon Ejemplo  Frontend 9` (dos espacios entre «Ejemplo» y «Frontend») | 5 |
| Juegos | `Proyecto Juegos 2`–`Proyecto Juegos 9` | 8 |
| Portafolio UX | `Clon Ejemplo Proyecto UX 2`–`Clon Ejemplo Proyecto UX 9` | 8 |
| E-Commerce | `Proyecto  Ecommerce 2`, `Proyecto Ecommerce 3`–`Proyecto Ecommerce 5`, `Proyecto  Ecommerce 6`–`Proyecto  Ecommerce 9` (los dos espacios forman parte de los títulos indicados) | 8 |
| Sistemas Empresariales | `Clon Ejemplo Sistema Empresarial 1`–`Clon Ejemplo Sistema Empresarial 9` | 9 |
| Seguridad | `Clon Ejemplo Seguridad 1`–`Clon Ejemplo Seguridad 9` | 9 |
| Dashboards | `Clon Ejemplo Dashboard 1`–`Clon Ejemplo Dashboard 9` | 9 |
| IA | `Clon Ejemplo Proyecto IA 1`–`Clon Ejemplo Proyecto IA 9` | 9 |

En general, estas fichas repiten descripciones de Netflix/Spotify/Twitter, la
tecnología genérica `HTML, CSS, JS`, tres veces la imagen de mantenimiento y
enlaces de ejemplo como `https://tu-video-twitter.com` y
`https://github.com/tuusuario/clon-twitter`. Algunos valores son `" "` o
`""`: el render debe tratarlos como datos distintos, porque un espacio es
truthy y actualmente muestra un botón aunque su destino no sea una demo real.
Los textos de fichas y encabezados no deben inferirse como capacidades técnicas
reales cuando sólo aparezcan en estas plantillas.