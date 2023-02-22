import { POI } from "./../../../types/poi.type";
import { WebComponent } from "../../../interfaces/wc.interface";

export class PoiEditEntry extends HTMLElement implements WebComponent {
	template = document.createElement("li");
	link = document.createElement("link");

	shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback(): void {
		this.render(
			this.getAttribute("value")
				? this.getAttribute("value")! as string
				: "Name"
		);
		this.renderStyle();
	}

	renderStyle(): void {
		this.link.setAttribute("rel", "stylesheet");
		this.link.setAttribute("href", "./css/app.css");
		this.shadowRoot.appendChild(this.link);
	}


	render(value: string): void {
		this.template.className = "poi-edit-entry";
		const span = document.createElement("span");
		const button = document.createElement("button");

		span.className = "poi-edit-entry__name";
		span.innerText = value;

		button.classList.add("poi-edit-entry__delete-button");
		button.classList.add("btn");
		button.classList.add("btn-outline-danger");
		button.innerText = "Delete";

		button.addEventListener("click", () => {
			this.dispatchEvent(new CustomEvent("delete"));
		});

		this.template.appendChild(span);
		this.template.appendChild(button);
	}
}
