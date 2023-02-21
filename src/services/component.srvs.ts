import { PoiList } from "../components/settings/poi-list/poi-list.wc";
import { PoiNewEntry } from "../components/settings/poi-new-entry/poi-new-entry.wc";
import { PoiNew } from "../components/settings/poi-new/poi-new.wc";
import { MenuComponent } from "../components/shared/menu.wc";


export class ComponentService {

	private static instance: ComponentService;

	private constructor() {
		this.registerComponents();
	}

	public static getInstance(): ComponentService {
		if (!ComponentService.instance) {
			ComponentService.instance = new ComponentService();
		}
		return ComponentService.instance;
	}

	private registerComponents(): void {
		customElements.define("poi-list", PoiList);
		customElements.define("poi-new", PoiNew);
		customElements.define("poi-new-entry", PoiNewEntry);
		customElements.define("menu-custom", MenuComponent);
	}
}
