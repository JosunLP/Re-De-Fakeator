import { POI } from "../types/poi";
import { ConfigLoader } from "./configLoader";

export class POIHandler {
	private static instance: POIHandler;

	private constructor() {}

	public static getInstance() {
		if (!POIHandler.instance) {
			POIHandler.instance = new POIHandler();
		}
		return POIHandler.instance;
	}

	private config = ConfigLoader.getInstance().getConfig();

	public getPOI(): POI[] {
		return this.config?.POIs || [];
	}

	public getPOIById(id: string): POI | null {
		const POIs = this.getPOI();
		for (let i = 0; i < POIs.length; i++) {
			if (POIs[i].id === id) {
				return POIs[i];
			}
		}
		return null;
	}

	public setPOI(POIs: POI[]) {
		const config = ConfigLoader.getInstance().getConfig();
		if (config) {
			config.POIs = POIs;
			ConfigLoader.getInstance().setConfig(config);
		}
	}

	public addPOI(POI: POI) {
		const config = ConfigLoader.getInstance().getConfig();
		if (config) {
			config.POIs.push(POI);
			ConfigLoader.getInstance().setConfig(config);
		}
	}

	public removePOI(id: string) {
		const config = ConfigLoader.getInstance().getConfig();
		if (config) {
			const POIs = config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === id) {
					POIs.splice(i, 1);
					break;
				}
			}
			ConfigLoader.getInstance().setConfig(config);
		}
	}

	public updatePOI(POI: POI) {
		const config = ConfigLoader.getInstance().getConfig();
		if (config) {
			const POIs = config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === POI.id) {
					POIs[i] = POI;
					break;
				}
			}
			ConfigLoader.getInstance().setConfig(config);
		}
	}
}
