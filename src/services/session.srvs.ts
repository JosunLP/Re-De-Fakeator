import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";
import { DatabaseService } from "./database.srvs";

export class SessionService {
	private static instance: SessionService;
	private static db = DatabaseService.getInstance();

	private config: RunntimeConfig;

	public sessionId: string = crypto.randomUUID();

	private constructor() {
		this.config = {
			POIs: [
				{
					id: "1",
					name: "Test",
					nameVariations: [],
					descriptionVariations: [],
				},
			],
		};

		FileHandler.readFileAsync(Helper.configPath)
			.then((data) => {
				this.config = JSON.parse(data);
			})
			.catch((err) => {
				console.error(err);
			})
			.then(() => {
				SessionService.instance = this;
				SessionService.save();
			});
	}

	static getInstance(): SessionService {
		if (!SessionService.instance && !SessionService.load()) {
			SessionService.instance = new SessionService();
		}
		if (!SessionService.instance && SessionService.load()) {
			SessionService.instance = <SessionService>SessionService.load();
		}

		Helper.sleepSync(300);
		return SessionService.instance;
	}

	public static async save(): Promise<void> {
		return await this.db.set(Helper.configPath, JSON.stringify(SessionService.instance));
	}

	public static load(): SessionService | null {
		SessionService.reloadSession();
		Helper.sleep(300);

		if (SessionService.instance) {
			return SessionService.instance;
		} else {
			return null;
		}
	}

	public static async reloadSession(): Promise<void> {
		const session = await this.db.get(Helper.configPath);
		if (session) {
			const result = new SessionService();
			result.config = (<SessionService>JSON.parse(session)).config;
			result.sessionId = (<SessionService>JSON.parse(session)).sessionId;
			SessionService.instance = result;
		}
	}

	public static async resetSession(): Promise<void> {
		await this.db.delete(Helper.configPath);
		SessionService.instance = new SessionService();
		SessionService.save();
		location.reload();
	}

	public static setConfig(config: RunntimeConfig): void {
		SessionService.instance.config = config;
		SessionService.save();
	}

	public static getConfig(): RunntimeConfig {
		return SessionService.instance.config;
	}

	public static getPois(): RunntimeConfig["POIs"] {
		return SessionService.instance.config.POIs;
	}

	public static setPois(pois: RunntimeConfig["POIs"]): void {
		SessionService.instance.config.POIs = pois;
		SessionService.save();
	}
}
