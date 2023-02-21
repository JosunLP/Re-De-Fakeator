export interface WebComponent extends HTMLElement {
	template: HTMLElement;
	shadowRoot: ShadowRoot;

	connectedCallback(): void;

	run(): void;

	reset(): void;

	render(value?: string | undefined | any): void;
}
