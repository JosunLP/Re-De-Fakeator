import { Session } from "../types/session.type";

/**
 * Database service
 */
export class DatabaseService {
	/**
	 * Instance  of database service
	 */
	private static instance: DatabaseService;

	/**
	 * Creates an instance of database service.
	 */
	private constructor() {}

	/**
	 * Gets instance
	 * @returns instance
	 */
	public static getInstance(): DatabaseService {
		if (!DatabaseService.instance) {
			DatabaseService.instance = new DatabaseService();
		}
		return DatabaseService.instance;
	}

	/**
	 * Sets database service
	 * @param key
	 * @param value
	 * @returns set
	 */
	public async set(key: string, value: Session): Promise<void> {

		chrome.storage.local.get(key, async (result) => {
			if (result) {
				console.warn(`DatabaseService.set: ${key} already exists`);
				await chrome.storage.local.remove(key);
				await chrome.storage.local.set({ key: value }).then(() => {
					console.log(`DatabaseService.set: ${key} =`, value);
				});
			} else {
				await chrome.storage.local.set({ key: value }).then(() => {
					console.log(`DatabaseService.set: ${key} =`, value);
				});
			}
		});
	}

	/**
	 * Gets database service
	 * @param key
	 * @returns get
	 */
	public async get(key: string): Promise<Session | null> {
		const result = await chrome.storage.local.get(key) as unknown as Session;
		if (result) {
			console.log(`DatabaseService.get: ${key} =`, result);
			return result;
		} else {
			console.warn(`DatabaseService.get: ${key} not found`);
			return null;
		}
	}

	/**
	 * Updates database service
	 * @param key
	 * @param value
	 * @returns update
	 */
	public async update(key: string, value: Session): Promise<void> {
		chrome.storage.local.get(key, async (result) => {
			if (result) {
				await chrome.storage.local.remove(key);
				await chrome.storage.local.set({ key: value }).then(() => {
					console.log(`DatabaseService.update: ${key} =`, value);
				});
			} else {
				console.warn(`DatabaseService.update: ${key} not found`);
			}
		});
	}

	/**
	 * Deletes database service
	 * @param key
	 * @returns delete
	 */
	public async delete(key: string): Promise<void> {
		chrome.storage.local.get(key, async (result) => {
			if (result) {
				await chrome.storage.local.remove(key);
				console.log(`DatabaseService.delete: ${key} deleted`);
			} else {
				console.warn(`DatabaseService.delete: ${key} not found`);
			}
		});
	}
}
