export class PoiList extends HTMLElement {
	private template = document.createElement("div");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.render();
		this.shadowRoot.appendChild(this.template);
	}

	private render(): void {
		this.template.classList.add("poi-list");
		const listHeader = document.createElement("div");
		const listHeaderTitle = document.createElement("h2");
		listHeader.classList.add("poi-list__header");
		listHeaderTitle.classList.add("poi-list__title");
		listHeaderTitle.innerText = "Persons of Interest";
		listHeader.appendChild(listHeaderTitle);
		this.template.appendChild(listHeader);

		const list = document.createElement("ul");
		list.classList.add("poi-list__list");
		this.template.appendChild(list);
	}
}
