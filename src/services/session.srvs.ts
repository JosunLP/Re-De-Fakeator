import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";
import { DatabaseService } from "./database.srvs";

export class SessionService {
	private static instance: SessionService;

	public config: RunntimeConfig;

	public readonly sessionId: string = crypto.randomUUID();

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

		FileHandler.readFileAsync(Helper.configPath).then(
			(data) => {
				this.config = JSON.parse(data);
				SessionService.save();
			}
		);
	}

	static getInstance(): SessionService {
		if (!SessionService.instance && !SessionService.load()) {
			SessionService.instance = new SessionService();
		}
		if (!SessionService.instance && SessionService.load()) {
			SessionService.instance = <SessionService>SessionService.load();
		}
		SessionService.save();
		return SessionService.instance;
	}

	public static save(): void {
		DatabaseService.getInstance().set(
			Helper.configPath,
			JSON.stringify(SessionService.instance)
		);
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

	public static reloadSession(): void {
		const session = DatabaseService.getInstance().get(Helper.configPath);
		if (session) {
			SessionService.instance = JSON.parse(session);
		}
	}

	public static resetSession(): void {
		DatabaseService.getInstance().delete(Helper.configPath);
		SessionService.instance = new SessionService();
		SessionService.save();
		location.reload();
	}
}
