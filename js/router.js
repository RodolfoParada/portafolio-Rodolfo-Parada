class Router {
    constructor() {
        this.routes = {};
        window.addEventListener('popstate', () => this.route());
    }

    on(path, handler) {
        // Normalizamos la ruta: si es "/" se queda así, si no, quitamos la "/" inicial
        const cleanPath = path === '/' ? '/' : path.replace(/^\//, '');
        this.routes[cleanPath] = handler;
    }

    navigate(path) {
        if (window.location.pathname === path) return;
        window.history.pushState(null, null, path);
        this.route();
    }

    route() {
        let p = window.location.pathname;
        // Limpieza de ruta para buscarla en el objeto de rutas
        p = p === '/' ? '/' : p.replace(/^\//, '');
        
        const handler = this.routes[p];
        if (handler) {
            handler();
        } else {
            console.warn("Ruta no encontrada, reintentando con inicio:", p);
            this.routes['/']?.();
        }
    }
}

export const router = new Router();