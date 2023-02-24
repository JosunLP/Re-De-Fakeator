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

	public set(key: string, value: string): void {
		chrome.storage.local.set({ [key]: value });
		console.log(`DatabaseService.set: ${key} =`);
		console.log(JSON.parse(value));
	}

	public get(key: string): string | undefined {
		let rslt = "";
		chrome.storage.local.get(key).then((data) => {
			rslt = data[key];
			console.log(`DatabaseService.get: ${key} =`);
			console.log(JSON.parse(rslt));
		});

		Helper.sleepSync(500);
		return rslt;
	}

	public update(key: string, value: string): void {
		chrome.storage.local.remove([key]);
		chrome.storage.local.set({ [key]: value });
		console.log(`DatabaseService.update: ${key} =`);
		console.log(JSON.parse(value));
	}

	public delete(key: string): void {
		chrome.storage.local.remove([key]);
		console.log(`DatabaseService.delete: `);
		console.log(JSON.parse(key));
	}
}
