import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";
import { DatabaseService } from "./database.srvs";

/**
 * Session service
 */
export class SessionService {
	/**
	 * Instance  of session service
	 */
	private static _instance: SessionService;
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
	public sessionId: string;

	/**
	 * Creates an instance of session service.
	 */
	private constructor(
	) {
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

		this.sessionId = crypto.randomUUID();

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
		SessionService.reloadSession();
		if (!SessionService._instance) {
			SessionService._instance = new SessionService();
		}

		return SessionService._instance;
	}

	/**
	 * Sets instance
	 * @param instance
	 */
	static setInstance(instance: SessionService): void {
		SessionService._instance = instance;
	}

	/**
	 * Saves session service
	 * @param instance
	 * @returns save
	 */
	public static async save(instance: SessionService): Promise<void> {
		const session = await SessionService.db.get(Helper.configPath);
		if (session !== null) {
			await SessionService.db.update(Helper.configPath, { config: instance.config, sessionId: instance.sessionId });
		} else {
			await SessionService.db.set(Helper.configPath, { config: instance.config, sessionId: instance.sessionId });
		}
		return;
	}

	/**
	 * Reloads session
	 * @returns session
	 */
	public static async reloadSession(): Promise<void> {
		const session = await SessionService.db.get(Helper.configPath);
		if (session !== null) {
			const result = new SessionService();
			result.config = session.config;
			result.sessionId = session.sessionId;
			SessionService.setInstance(result);
		}
	}

	/**
	 * Resets session
	 * @returns session
	 */
	public static async resetSession(): Promise<void> {
		await SessionService.db.delete(Helper.configPath);
		SessionService.setInstance(new SessionService());
		await SessionService.save(SessionService._instance);
		location.reload();
	}
}
