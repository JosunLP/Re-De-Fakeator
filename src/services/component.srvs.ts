import { PoiEditEntry } from './../components/settings/poi-edit-entry/poi-edit-entry.wc';
import { PoiEdit } from "../components/settings/poi-edit/poi-edit.wc";
import { PoiList } from "../components/settings/poi-list/poi-list.wc";
import { PoiNew } from "../components/settings/poi-new/poi-new.wc";
import { MenuComponent } from "../components/shared/menu.wc";

/**
 * Component service
 */
export class ComponentService {

	/**
	 * Instance  of component service
	 */
	private static instance: ComponentService;

	/**
	 * Creates an instance of component service.
	 */
	private constructor() {
		this.registerComponents();
	}

	/**
	 * Gets instance
	 * @returns instance
	 */
	public static getInstance(): ComponentService {
		if (!ComponentService.instance) {
			ComponentService.instance = new ComponentService();
		}
		return ComponentService.instance;
	}

	/**
	 * Registers components
	 */
	private registerComponents(): void {
		customElements.define("poi-list", PoiList);
		customElements.define("poi-new", PoiNew);
		customElements.define("menu-custom", MenuComponent);
		customElements.define("poi-edit", PoiEdit);
		customElements.define("poi-edit-entry", PoiEditEntry);
	}
}
