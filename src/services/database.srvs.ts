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
	public set(key: string, value: string): void {

		chrome.storage.local.get(key, (result) => {
			console.warn(`DatabaseService.set: ${key} already exists`);
			chrome.storage.local.remove(key);
			chrome.storage.local.set({ key: value }).then(() => {
				console.log(`DatabaseService.set: ${key} =`, JSON.parse(value));
			}
			);
		});
	}

	/**
	 * Gets database service
	 * @param key
	 * @returns get
	 */
	public get(key: string): string | null {
		const result = chrome.storage.local.get(key) as unknown as string;
		if (result) {
			console.log(`DatabaseService.get: ${key} =`, JSON.parse(result));
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
	public update(key: string, value: string): void {
		chrome.storage.local.get(key, (result) => {
			if (result) {
				chrome.storage.local.remove(key);
				chrome.storage.local.set({ key: value }).then(() => {
					console.log(`DatabaseService.update: ${key} =`, JSON.parse(value));
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
	public delete(key: string): void{
		chrome.storage.local.get(key, (result) => {
			if (result) {
				chrome.storage.local.remove(key);
				console.log(`DatabaseService.delete: ${key} deleted`);
			} else {
				console.warn(`DatabaseService.delete: ${key} not found`);
			}
		});
	}
}
