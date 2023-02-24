export class Helper {
	public static readonly configPath = "config.json";

	public static async sleep(ms: number): Promise<void> {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	public static sleepSync(ms: number): void {
		const start = new Date().getTime();
		let end = start;
		while (end < start + ms) {
			end = new Date().getTime();
		}
	}
}
