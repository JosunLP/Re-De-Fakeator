import { RunntimeConfig } from "../types/runntimeConfig";
import { FileHandler } from "./fileHandler";
import { Session } from "./session";

export class ConfigLoader {
	private defaultConfig: RunntimeConfig | null = null;

	private static instance: ConfigLoader;

	private constructor() {
		FileHandler.readFileAsync("config.json").then((data) => {
			this.defaultConfig = JSON.parse(data);
		});

		const cacheConfig = this.getCacheConfig();

		if (cacheConfig) {
			this.defaultConfig = cacheConfig;
		}
	}

	public static getInstance() {
		if (!ConfigLoader.instance) {
			ConfigLoader.instance = new ConfigLoader();
		}
		return ConfigLoader.instance;
	}

	private getCacheConfig(): RunntimeConfig | null {
		return Session.getInstance().config;
	}

	public resetToDefault() {
		Session.getInstance().config = this.defaultConfig;
		Session.save();
	}

	public setConfig(config: RunntimeConfig) {
		Session.getInstance().config = config;
		Session.save();
	}

	public getConfig(): RunntimeConfig | null {
		return Session.getInstance().config;
	}
}
