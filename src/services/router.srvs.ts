import { Route } from "../types/route.type";

/**
 * Router service
 */
export class RouterService {
	/**
	 * Instance  of router service
	 */
	private static instance: RouterService;

	/**
	 * Active route of router service
	 */
	private activeRoute: Route = { path: "/", returnFunction: () => {} };

	/**
	 * Routes  of router service
	 */
	private routes: Route[] = [];

	/**
	 * Creates an instance of router service.
	 */
	private constructor() {
		this.init();
	}

	/**
	 * Gets instance
	 * @returns instance
	 */
	public static getInstance(): RouterService {
		if (!RouterService.instance) {
			RouterService.instance = new RouterService();
		}
		return RouterService.instance;
	}

	/**
	 * Inits router service
	 */
	private init(): void {
		window.addEventListener("hashchange", () => {
			this.activeRoute.returnFunction();
		});
	}

	/**
	 * Adds route
	 * @param route
	 */
	public addRoute(route: Route): void {
		this.routes.push(route);
	}

	/**
	 * Gets active route
	 * @returns active route
	 */
	public getActiveRoute(): Route {
		return this.activeRoute;
	}

	/**
	 * Gets routes
	 * @returns routes
	 */
	public getRoutes(): Route[] {
		return this.routes;
	}

	/**
	 * Navigates router service
	 * @param path
	 * @param [value]
	 */
	public navigate(path: string, value?: any): void {
		this.activeRoute =
			this.routes.find((route) => route.path === path) ||
			this.activeRoute;
		this.activeRoute.returnFunction(value);
	}
}
