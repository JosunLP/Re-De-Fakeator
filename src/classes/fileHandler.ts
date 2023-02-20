export class FileHandler {

	public static async readFileAsync(filePath: string): Promise<string> {
		const file = await fetch(filePath).then(response => response.blob());
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result as string);
			};
			reader.onerror = reject;
			reader.readAsText(file);
		});
	}
}
