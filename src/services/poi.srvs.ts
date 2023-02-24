import { POI } from "../types/poi.type";
import { SessionService } from "./session.srvs";

export class PoiService {
	private static instance: PoiService;

	private constructor() {}

	private session = SessionService.getInstance();

	public static getInstance() {
		if (!PoiService.instance) {
			PoiService.instance = new PoiService();
		}
		return PoiService.instance;
	}

	public getPOIs(): POI[] {
		return this.session.config.POIs;
	}

	public getPOIById(id: string): POI | null {
		const POIs = this.getPOIs();
		for (let i = 0; i < POIs.length; i++) {
			if (POIs[i].id === id) {
				return POIs[i];
			}
		}
		return null;
	}

	public setPOIs(POIs: POI[]) {
		const config = this.session.config;
		if (config) {
			this.session.config.POIs = POIs;
		}
		SessionService.save();
		SessionService.reloadSession();
	}

	public addPOI(POI: POI) {
		const config = this.session.config;
		if (config) {
			this.session.config.POIs.push(POI);
		}
		SessionService.save();
		SessionService.reloadSession();
	}

	public removePOI(id: string) {
		const config = this.session.config;
		if (config) {
			const POIs = this.session.config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === id) {
					POIs.splice(i, 1);
					break;
				}
			}
			this.session.config.POIs = POIs;
		}
		SessionService.save();
		SessionService.reloadSession();
	}

	public updatePOI(POI: POI) {
		const config = this.session.config;
		if (config) {
			const POIs = config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === POI.id) {
					POIs[i] = POI;
					break;
				}
			}
			this.session.config.POIs = POIs;
		}
		SessionService.save();
		SessionService.reloadSession();
	}

	public createPOI(): POI {
		return {
			id: crypto.randomUUID(),
			name: "",
			nameVariations: [],
			descriptionVariations: [],
		};
	}

	removeDescriptionVariation(value: POI, descriptionVariant: string) {
		const POIs = this.getPOIs();
		const POI = this.getPOIById(value.id);
		if (POI) {
			POI.descriptionVariations = POI.descriptionVariations.filter(
				(description) => description !== descriptionVariant
			);
			this.setPOIs(POIs);
		}
		SessionService.save();
		SessionService.reloadSession();
	}

	removeNameVariation(value: POI, nameVariant: string) {
		const POIs = this.getPOIs();
		const POI = this.getPOIById(value.id);
		if (POI) {
			POI.nameVariations = POI.nameVariations.filter(
				(name) => name !== nameVariant
			);
			this.setPOIs(POIs);
		}
		SessionService.save();
		SessionService.reloadSession();
	}
}
