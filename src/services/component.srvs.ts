import { PoiList } from "../components/settings/poi-list/poi-list.cmpt";

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
	}
}
