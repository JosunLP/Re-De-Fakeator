import { WebComponent } from "../../../interfaces/wc.interface";

export class PoiNew extends HTMLElement implements WebComponent {
	template = document.createElement("div");
	link = document.createElement("link");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback(): void {
		this.render();
		this.renderStyle();
	}

	renderStyle(): void {
		this.link.setAttribute("rel", "stylesheet");
		this.link.setAttribute("href", "./css/app.css");
		this.shadowRoot.appendChild(this.link);
	}


	render(): void {
		this.template.className = "poi-new";
		const header = document.createElement("div");
		const headerTitle = document.createElement("h2");

		header.className = "poi-new__header";
		headerTitle.className = "poi-new__title";
		headerTitle.innerText = "New Person of Interest";
		header.appendChild(headerTitle);
		this.template.appendChild(header);

		const body = document.createElement("div");
		const row1 = document.createElement("div");
		const label1 = document.createElement("label");
		const input1 = document.createElement("input");

		label1.innerText = "Name";
		label1.classList.add("poi-new__label");
		input1.type = "text";
		input1.placeholder = "Name";
		input1.classList.add("poi-new__input");
		row1.appendChild(label1);
		row1.appendChild(input1);

		const row2 = document.createElement("div");
		const label2 = document.createElement("label");
		const list = document.createElement("ul");

		label2.innerText = "Name Variants";
		label2.classList.add("poi-new__label");
		list.classList.add("poi-new__list");
		row2.appendChild(label2);
		row2.appendChild(list);

		const row3 = document.createElement("div");
		const label3 = document.createElement("label");
		const list2 = document.createElement("ul");

		label3.innerText = "Description variants";
		label3.classList.add("poi-new__label");
		list2.classList.add("poi-new__list");
		row3.appendChild(label3);
		row3.appendChild(list2);

		const row4 = document.createElement("div");
		const label4 = document.createElement("label");
		const input4 = document.createElement("input");
		const buttonAdd = document.createElement("button");

		label4.innerText = "Add new name variation";
		label4.classList.add("poi-new__label");
		input4.type = "text";
		input4.placeholder = "Name";
		input4.classList.add("poi-new__input");
		buttonAdd.innerText = "Add";
		buttonAdd.classList.add("poi-new__button");
		buttonAdd.classList.add("poi-new__button--add");
		buttonAdd.classList.add("btn-primary");
		row4.appendChild(label4);
		row4.appendChild(input4);
		row4.appendChild(buttonAdd);

		const row5 = document.createElement("div");
		const label5 = document.createElement("label");
		const input5 = document.createElement("input");
		const buttonAdd2 = document.createElement("button");

		label5.innerText = "Add new name variation";
		label5.classList.add("poi-new__label");
		input5.type = "text";
		input5.placeholder = "Name";
		input5.classList.add("poi-new__input");
		buttonAdd2.innerText = "Add";
		buttonAdd2.classList.add("poi-new__button");
		buttonAdd2.classList.add("poi-new__button--add");
		buttonAdd2.classList.add("btn-primary");
		row5.appendChild(label4);
		row5.appendChild(input4);
		row5.appendChild(buttonAdd);

		body.className = "poi-new__body";
		row1.className = "poi-new__row";
		row2.className = "poi-new__row";
		row3.className = "poi-new__row";
		row4.className = "poi-new__row";
		row5.className = "poi-new__row";

		body.appendChild(row1);
		body.appendChild(row2);
		body.appendChild(row3);
		body.appendChild(row4);
		body.appendChild(row5);
		this.template.appendChild(body);

		const footer = document.createElement("div");
		const buttonSave = document.createElement("button");
		const buttonCancel = document.createElement("button");

		buttonSave.innerText = "Save";
		buttonSave.classList.add("poi-new__button");
		buttonSave.classList.add("poi-new__button--save");
		buttonSave.classList.add("btn-success");
		buttonCancel.innerText = "Cancel";
		buttonCancel.classList.add("poi-new__button");
		buttonCancel.classList.add("poi-new__button--cancel");
		buttonCancel.classList.add("btn-danger");
		footer.appendChild(buttonSave);
		footer.appendChild(buttonCancel);
		footer.className = "poi-new__footer";
		this.template.appendChild(footer);
	}
}
