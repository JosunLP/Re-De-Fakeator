import { POIHandler } from "./classes/poiHandler";
import { Session } from "./classes/session";
import { ComponentService } from "./services/component.srvs";
import { RouterService } from "./services/router.srvs";
import { MenuItem } from "./types/menuItem.type";
import { POI } from "./types/poi.type";

class Settings {
	private session = Session.getInstance();
	private poiHandler = POIHandler.getInstance();
	private router = RouterService.getInstance();

	constructor() {
		ComponentService.getInstance();

		this.renderMenu();
		this.routes();
		this.router.navigateTo("/");
	}

	private clearSettings(): void {
		const settings = <HTMLDivElement>document.getElementById("settings");
		settings.innerHTML = "";
	}

	private renderMenu(): void {
		const app = <HTMLDivElement>document.getElementById("app");
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

		app.insertBefore(menu, document.getElementById("settings")!);
	}

	private routes(): void {
		this.router.addRoute({
			path: "/",
			returnFunction: () => {
				this.clearSettings();
				const poiList = document.createElement("poi-list");
				poiList.id = "poiList";
				<HTMLDivElement>(
					document.getElementById("settings")!.appendChild(poiList)
				);
			},
		});
		this.router.addRoute({
			path: "/edit-poi",
			returnFunction: (value: POI) => {
				this.clearSettings();
				const poiEdit = document.createElement("poi-edit");
				poiEdit.setAttribute("value", JSON.stringify(value));
				poiEdit.id = "poiForm";
				<HTMLDivElement>(
					document.getElementById("settings")!.appendChild(poiEdit)
				);
			},
		});
	}
}

new Settings();
