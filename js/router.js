class Router {
    constructor() {
        this.routes = {};
        // Escucha cambios de hash para permitir navegación con flechas del navegador
        window.addEventListener('hashchange', () => this.route());
    }

    on(path, handler) {
        // Guardamos la ruta exacta incluyendo el # (ej: "#/proyectos") [cite: 3682]
        this.routes[path] = handler;
    }

    navigate(path) {
        if (window.location.hash === path) return;
        // Al cambiar el hash, se dispara automáticamente el evento 'hashchange'
        window.location.hash = path;
    }

    route() {
        // Obtenemos el hash actual. Si está vacío, usamos '/' [cite: 3692]
        let p = window.location.hash || '/';
        
        // Si entras a la URL base sin hash, forzamos la ruta '/'
        if (p === '') p = '/';

        const handler = this.routes[p];
        if (handler) {
            handler();
        } else {
            console.warn("Ruta no encontrada, cargando inicio:", p);
            // Intentamos cargar la raíz si la ruta falla
            this.routes['/']?.();
        }
    }
}

export const router = new Router();