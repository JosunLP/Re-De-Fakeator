import { RunntimeConfig } from "../types/runntimeConfig";
import { FileHandler } from "./fileHandler";

export class Session {
	private static instance: Session;

	public config: RunntimeConfig = { POIs: [] };

	private constructor() {
		FileHandler.readFileAsync("config.json").then((data) => {
			this.config = JSON.parse(data);
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
		localStorage.setItem("session", JSON.stringify(this.instance));
	}

	public static load(): Session | null {
		const session = localStorage.getItem("session");
		if (session) {
			const obj = <Session>JSON.parse(session);
			const result = new Session();
			result.config = obj.config;
			return result;
		}
		return null;
	}

	public static reloadSession() {
		const session = localStorage.getItem("session");
		if (session) {
			const obj = <Session>JSON.parse(session);
			const result = new Session();
			result.config = obj.config;
			Session.instance = result;
		}
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
