export interface IWebComponent extends HTMLElement {
	template: HTMLElement;
	shadowRoot: ShadowRoot;
	link: HTMLLinkElement;

	connectedCallback(): void;

	run?(): void;

	reset?(): void;

	render(value?: string | undefined | any): void;

	renderStyle(): void;
}
