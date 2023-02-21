import { Route } from "../types/route.type";

export class RouterService {

	private static instance: RouterService;

	private activeRoute: Route = { path: "/", returnFunction: () => { } };

	private routes: Route[] = [];

	private constructor() {
		this.init();
	}

	public static getInstance(): RouterService {
		if (!RouterService.instance) {
			RouterService.instance = new RouterService();
		}
		return RouterService.instance;
	}

	private init(): void {
		window.addEventListener("hashchange", () => {
			this.activeRoute.returnFunction();
		});
	}

	public addRoute(route: Route): void {
		this.routes.push(route);
	}

	public getActiveRoute(): Route {
		return this.activeRoute;
	}

	public getRoutes(): Route[] {
		return this.routes;
	}

	public navigateTo(path: string): void {
		this.activeRoute = this.routes.find((route) => route.path === path) || this.activeRoute;
		this.activeRoute.returnFunction();
	}
}
