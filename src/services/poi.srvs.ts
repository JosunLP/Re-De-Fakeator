import { POI } from "../types/poi.type";
import { SessionService } from "./session.srvs";

/**
 * Poi service
 */
export class PoiService {
	/**
	 * Instance  of poi service
	 */
	private static instance: PoiService;

	/**
	 * Session  of poi service
	 */
	private session = SessionService.getInstance();

	/**
	 * Creates an instance of poi service.
	 */
	private constructor() {}

	/**
	 * Gets instance
	 * @returns
	 */
	public static getInstance() {
		if (!PoiService.instance) {
			PoiService.instance = new PoiService();
		}
		return PoiService.instance;
	}

	/**
	 * Gets pois
	 * @returns pois
	 */
	public getPOIs(): POI[] {
		SessionService.reloadSession();
		const config = this.session.config;
		if (config) {
			return config.POIs;
		}
		return [];
	}

	/**
	 * Gets poiby id
	 * @param id
	 * @returns poiby id
	 */
	public getPOIById(id: string): POI | null {
		const POIs = this.getPOIs();
		for (let i = 0; i < POIs.length; i++) {
			if (POIs[i].id === id) {
				return POIs[i];
			}
		}
		return null;
	}

	/**
	 * Sets pois
	 * @param POIs
	 */
	public setPOIs(POIs: POI[]) {
		SessionService.reloadSession();
		this.session = <SessionService>SessionService.getInstance();
		const config = this.session.config;
		if (config) {
			this.session.config.POIs = POIs;
		}
		SessionService.save(this.session);
		SessionService.reloadSession();
		this.session = <SessionService>SessionService.getInstance();
	}

	/**
	 * Adds poi
	 * @param POI
	 */
	public addPOI(POI: POI) {
		SessionService.reloadSession();
		this.session = <SessionService>SessionService.getInstance();
		if (this.session.config) {
			console.log(this.session);
			this.session.config.POIs.push(POI);
		}
		SessionService.save(this.session);
		SessionService.reloadSession();
	}

	/**
	 * Removes poi
	 * @param id
	 */
	public removePOI(id: string) {
		SessionService.reloadSession();
		this.session = <SessionService>SessionService.getInstance();
		const config = this.session.config;
		if (config) {
			const POIs = this.session.config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === id) {
					POIs.splice(i, 1);
					break;
				}
			}
			this.setPOIs(POIs);
		}
		SessionService.save(this.session);
		SessionService.reloadSession();
	}

	/**
	 * Updates poi
	 * @param POI
	 */
	public updatePOI(POI: POI) {
		SessionService.reloadSession();
		this.session = <SessionService>SessionService.getInstance();
		const config = this.session.config;
		if (config) {
			const POIs = this.session.config.POIs;
			for (let i = 0; i < POIs.length; i++) {
				if (POIs[i].id === POI.id) {
					POIs[i] = POI;
					break;
				}
			}
			this.setPOIs(POIs);
		}
		SessionService.save(this.session);
		SessionService.reloadSession();
	}

	/**
	 * Creates poi
	 * @returns poi
	 */
	public createPOI(): POI {
		return {
			id: crypto.randomUUID(),
			name: "",
			nameVariations: [],
			descriptionVariations: [],
		};
	}

	/**
	 * Removes description variation
	 * @param value
	 * @param descriptionVariant
	 */
	public removeDescriptionVariation(value: POI, descriptionVariant: string) {
		const POIs = this.getPOIs();
		const POI = this.getPOIById(value.id);
		if (POI) {
			POI.descriptionVariations = POI.descriptionVariations.filter(
				(description) => description !== descriptionVariant
			);
			this.setPOIs(POIs);
		}
	}

	/**
	 * Removes name variation
	 * @param value
	 * @param nameVariant
	 */
	public removeNameVariation(value: POI, nameVariant: string) {
		const POIs = this.getPOIs();
		const POI = this.getPOIById(value.id);
		if (POI) {
			POI.nameVariations = POI.nameVariations.filter(
				(name) => name !== nameVariant
			);
			this.setPOIs(POIs);
		}
	}
}
