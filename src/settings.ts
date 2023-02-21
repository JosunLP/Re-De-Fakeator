import { POIHandler } from "./classes/poiHandler";
import { Session } from "./classes/session";
import { ComponentService } from "./services/component.srvs";
import { RouterService } from "./services/router.srvs";
import { MenuItem } from "./types/menuItem.type";

class Settings {
	private session = Session.getInstance();
	private poiHandler = POIHandler.getInstance();
	private router = RouterService.getInstance();

	constructor() {
		ComponentService.getInstance();

		this.routes();
		this.router.navigateTo("/");
	}

	private async renderSettings(): Promise<void> {
		const settings = <HTMLDivElement>document.getElementById("settings");
		settings.innerHTML = "";

		const menu = document.createElement("menu-custom");
		const menuItems: MenuItem[] = [
			{
				name: "List View",
				link: "/",
			},
			{
				name: "Add POI",
				link: "/add-poi",
			},
		];
		menu.id = "menu";

		menu.setAttribute("menuItems", JSON.stringify(menuItems));

		settings.appendChild(menu);
	}

	private routes(): void {
		this.router.addRoute({
			path: "/",
			returnFunction: () => {
				this.renderSettings();
				const poiList = document.createElement("poi-list");
				poiList.id = "poiList";
				<HTMLDivElement>(
					document.getElementById("settings")!.appendChild(poiList)
				);
			},
		});
		this.router.addRoute({
			path: "/add-poi",
			returnFunction: () => {
				this.renderSettings();
				const poiForm = document.createElement("poi-form");
				poiForm.id = "poiForm";
				<HTMLDivElement>(
					document.getElementById("settings")!.appendChild(poiForm)
				);
			},
		});
	}
}

new Settings();
