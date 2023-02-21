export interface WebComponent extends HTMLElement {
	template: HTMLElement;
	shadowRoot: ShadowRoot;

	run(): void;

	reset(): void;

	render(value?: string | undefined | any): void;
}
