import { WebComponent } from "../../../interfaces/wc.interface";

export class PoiNewEntry extends HTMLDataListElement implements WebComponent {
	template = document.createElement("li");
	link = document.createElement("link");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback(): void {
		this.render(
			this.getAttribute("value") ? this.getAttribute("value")! : "Name"
		);
		this.renderStyle();
	}

	renderStyle(): void {
		this.link.setAttribute("rel", "stylesheet");
		this.link.setAttribute("href", "./css/app.css");
		this.shadowRoot.appendChild(this.link);
	}


	render(value: string): void {
		this.template.className = "poi-new__entry";
		const input = document.createElement("input");
		const buttonRemove = document.createElement("button");

		input.type = "text";
		input.placeholder = value;
		input.classList.add("poi-new__input");
		buttonRemove.innerText = "Remove";
		buttonRemove.classList.add("poi-new__button");
		buttonRemove.classList.add("poi-new__button--remove");
		buttonRemove.classList.add("btn-danger");

		this.template.appendChild(input);
		this.template.appendChild(buttonRemove);
	}
}
