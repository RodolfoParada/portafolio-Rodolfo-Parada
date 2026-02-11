class Router {
    constructor() {
        this.routes = {};
        // Escuchar cambios en el hash (ej. cuando el usuario usa las flechas del navegador)
        window.addEventListener('hashchange', () => this.route());
    }

    on(path, handler) {
        // Guardamos la ruta tal cual la definimos (ej. "#/proyectos")
        this.routes[path] = handler;
    }

    navigate(path) {
        // Si ya estamos en esa ruta, no hacemos nada
        if (window.location.hash === path) return;
        // Cambiar el hash dispara automáticamente el evento 'hashchange'
        window.location.hash = path;
    }

    route() {
        // Obtenemos el hash actual o "/" si está vacío
        const p = window.location.hash || '/';
        
        const handler = this.routes[p];
        if (handler) {
            handler();
        } else {
            console.warn("Ruta no encontrada, redirigiendo a inicio:", p);
            // Intentamos cargar la raíz si la ruta no existe
            const rootHandler = this.routes['/'] || this.routes['#/'];
            rootHandler?.();
        }
    }
}

export const router = new Router();