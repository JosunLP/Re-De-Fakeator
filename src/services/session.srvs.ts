import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";
import { DatabaseService } from "./database.srvs";
import { Sleep } from "../enums/sleep.enums";

/**
 * Session service
 */
export class SessionService {
	/**
	 * Instance  of session service
	 */
	private static instance: SessionService;
	/**
	 * Db  of session service
	 */
	private static db = DatabaseService.getInstance();

	/**
	 * Config  of session service
	 */
	public config: RunntimeConfig;

	/**
	 * Session id of session service
	 */
	public sessionId: string = crypto.randomUUID();

	/**
	 * Creates an instance of session service.
	 */
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
			});
	}

	/**
	 * Gets instance
	 * @returns instance
	 */
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

	/**
	 * Saves session service
	 * @param instance
	 * @returns save
	 */
	public static async save(instance: SessionService): Promise<void> {
		const session = await SessionService.db.get(Helper.configPath);
		if (session) {
			await SessionService.db.update(Helper.configPath, JSON.stringify(instance));
		} else {
			await SessionService.db.set(Helper.configPath, JSON.stringify(instance));
		}
		return;
	}

	/**
	 * Loads session service
	 * @returns load
	 */
	public static load(): SessionService | null {
		SessionService.reloadSession();
		Helper.sleepSync(Sleep.SHORT);

		if (SessionService.instance) {
			return SessionService.instance;
		} else {
			return null;
		}
	}

	/**
	 * Reloads session
	 * @returns session
	 */
	public static async reloadSession(): Promise<void> {
		const session = await SessionService.db.get(Helper.configPath);
		if (session) {
			const result = new SessionService();
			result.config = (<SessionService>JSON.parse(session)).config;
			result.sessionId = (<SessionService>JSON.parse(session)).sessionId;
			SessionService.instance = result;
		}
	}

	/**
	 * Resets session
	 * @returns session
	 */
	public static async resetSession(): Promise<void> {
		await SessionService.db.delete(Helper.configPath);
		SessionService.instance = new SessionService();
		SessionService.save(SessionService.instance);
		location.reload();
	}
}
