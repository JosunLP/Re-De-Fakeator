import { Helper } from './helper';
import { RunntimeConfig } from "../types/runntimeConfig.type";
import { FileHandler } from "./fileHandler";

export class Session {
	private static instance: Session;

	public config: RunntimeConfig;

	private constructor() {
		this.config = { POIs: [{
			id: "1",
			name: "Test",
			nameVariations: [],
			descriptionVariations: [],
		}] };

		FileHandler.readFileAsync("config.json").then((data) => {
			this.config = JSON.parse(data);
			Session.save();
		});
	}

	static getInstance() {
		if (!Session.instance && !Session.load()) {
			Session.instance = new Session();
		}
		if (!Session.instance && Session.load()) {
			Session.instance = <Session>Session.load();
		}
		Session.save();
		return Session.instance;
	}

	public static save() {
		chrome.storage.local.set({ session: JSON.stringify(this.instance) });
	}

	public static load(): Session | null {
		const session = chrome.storage.local.get("session");
		let result = new Session();
		session.then((data) => {
			if (data) {
				const obj = <Session>JSON.parse(data.session);
				result.config = obj.config;
				Session.instance = result;
			}
		}).catch((err) => {
			console.error(err);
		});
		Helper.sleep(100);
		return Session.instance;
	}

	public static reloadSession() {
		const session = chrome.storage.local.get("session");
		session.then((data) => {
			if (data) {
				const obj = <Session>JSON.parse(data.session);
				const result = new Session();
				result.config = obj.config;
				Session.instance = result;
			}
		});
	}

	public static resetSession() {
		localStorage.removeItem("session");
		sessionStorage.removeItem("session");
		this.instance = new Session();
		Session.save();
		location.reload();
	}

	public readonly sessionId: string = crypto.randomUUID();
}
