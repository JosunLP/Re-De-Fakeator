import { POIHandler } from "./classes/poiHandler";
import { Session } from "./classes/session";
import { BasicButton } from "./components/button";
import { ComponentService } from "./services/component.srvs";
import { POI } from "./types/poi";

class Settings {
	private session = Session.getInstance();

	private poiHandler = POIHandler.getInstance();

	constructor() {
		ComponentService.getInstance();

		this.renderSettings();
	}

	private async renderSettings(): Promise<void> {
		const settings = <HTMLDivElement>document.getElementById("settings");
		settings.innerHTML = "";

		const poiList = document.createElement("poi-list");
		poiList.id = "poiList";

		const addNewPOI = document.createElement("poi-add-new");
		addNewPOI.id = "addNewPOI";

		settings.appendChild(poiList);
		settings.appendChild(addNewPOI);
	}
}

new Settings();
