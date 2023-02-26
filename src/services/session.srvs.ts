import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";
import { DatabaseService } from "./database.srvs";

export class SessionService {
	private static instance: SessionService;
	private static db = DatabaseService.getInstance();

	public config: RunntimeConfig;

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
	}

	static getInstance(): SessionService {
		const session = SessionService.load();
		if (!SessionService.instance && !session) {
			SessionService.instance = new SessionService();
		}
		if (!SessionService.instance && session) {
			SessionService.instance = <SessionService>session;
		}

		return SessionService.instance;
	}

	public static async save(instance: SessionService): Promise<void> {
		return await this.db.set(Helper.configPath, JSON.stringify(instance));
	}

	public static load(): SessionService | null {
		SessionService.reloadSession();

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
		SessionService.save(SessionService.instance);
		location.reload();
	}
}
