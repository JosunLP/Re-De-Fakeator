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
	public set(key: string, value: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const result = localStorage.getItem(key);

			if (result) {
				return reject(`DatabaseService.set: ${key} already exists`);
			} else {
				localStorage.setItem(key, value);
				console.log(`DatabaseService.set: ${key} =`, JSON.parse(value));
				return resolve();
			}
		});
	}

	/**
	 * Gets database service
	 * @param key
	 * @returns get
	 */
	public get(key: string): Promise<string | undefined> {
		const result = localStorage.getItem(key);

		if (result) {
			console.log(`DatabaseService.get: ${key} =`, JSON.parse(result));
			return Promise.resolve(result);
		}

		return Promise.resolve(undefined);
	}

	/**
	 * Updates database service
	 * @param key
	 * @param value
	 * @returns update
	 */
	public update(key: string, value: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const result = localStorage.getItem(key);

			if (result) {
				localStorage.removeItem(key);
				console.log(
					`DatabaseService.update: ${key} =`,
					JSON.parse(value)
				);

				return resolve(this.set(key, value));
			} else {
				return reject(`DatabaseService.update: ${key} not found`);
			}
		});
	}

	/**
	 * Deletes database service
	 * @param key
	 * @returns delete
	 */
	public delete(key: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const result = localStorage.getItem(key);

			if (result) {
				localStorage.removeItem(key);
				console.log(
					`DatabaseService.delete: ${key} =`,
					JSON.parse(result)
				);
				return resolve();
			} else {
				return reject(`DatabaseService.delete: ${key} not found`);
			}
		});
	}
}
