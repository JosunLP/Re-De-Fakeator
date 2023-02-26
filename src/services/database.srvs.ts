import { Helper } from "../classes/helper";

export class DatabaseService {
	private static instance: DatabaseService;

	private constructor() {}

	public static getInstance(): DatabaseService {
		if (!DatabaseService.instance) {
			DatabaseService.instance = new DatabaseService();
		}
		return DatabaseService.instance;
	}

	public async set(key: string, value: string): Promise<void> {
		return chrome.storage.local
			.set({ [key]: value })
			.catch((err) => {
				console.error(err);
			})
			.then(() => {
				console.log(`DatabaseService.set: ${key} =`, JSON.parse(value));
			});
	}

	public async get(key: string): Promise<string | undefined> {
		return await chrome.storage.local.get([key]).then((result) => {
			const rslt = result[key];
			console.log(`DatabaseService.get: ${key} =`, JSON.parse(rslt));
			return rslt;
		});
	}

	public update(key: string, value: string): void {
		chrome.storage.local.remove([key]);
		chrome.storage.local.set({ [key]: value });
		console.log(`DatabaseService.update: ${key} =`, JSON.parse(value));
	}

	public async delete(key: string): Promise<void> {
		return chrome.storage.local
			.remove([key])
			.catch((err) => {
				console.error(err);
			})
			.then(() => {
				console.log(`DatabaseService.delete: ${key}`);
				return;
			});
	}
}
