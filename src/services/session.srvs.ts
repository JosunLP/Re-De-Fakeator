import { Helper } from "../classes/helper";
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "../classes/fileHandler";

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

		FileHandler.readFileAsync("config.json").then((data) => {
			this.config = JSON.parse(data);
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
		SessionService.save();
		return SessionService.instance;
	}

	public static save(): void {
		chrome.storage.local.set({ session: JSON.stringify(this.instance) });
	}

	public static load(): SessionService | null {
		SessionService.reloadSession();
		Helper.sleep(300);

		if (this.instance) {
			return this.instance;
		} else {
			return null;
		}
	}

	public static async reloadSession(): Promise<void> {
		const session = await chrome.storage.local.get("session");
		const result = new SessionService();
		if (session && session.session) {
			const obj = <SessionService>JSON.parse(session.session);
			result.config = obj.config;
			this.instance = result;
		}
	}

	public static resetSession(): void {
		chrome.storage.local.remove("session");
		this.instance = new SessionService();
		SessionService.save();
		location.reload();
	}
}
