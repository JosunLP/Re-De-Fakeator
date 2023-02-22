import { POI } from "../types/poi.type";
import { Session } from "./session";

export class POIHandler {
	private static instance: POIHandler;

	private constructor() {}

	private session = Session.getInstance();

	public static getInstance() {
		if (!POIHandler.instance) {
			POIHandler.instance = new POIHandler();
		}
		return POIHandler.instance;
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
		Session.save();
	}

	public addPOI(POI: POI) {
		const config = this.session.config;
		if (config) {
			this.session.config.POIs.push(POI);
		}
		Session.save();
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
		Session.save();
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
		Session.save();
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
		Session.save();
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
		Session.save();
	}
}
