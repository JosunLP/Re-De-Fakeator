import { PoiService } from "../../../services/poi.srvs";
import { WebComponent } from "../../../interfaces/wc.interface";
import { RouterService } from "../../../services/router.srvs";
import { POI } from "../../../types/poi.type";

export class PoiNew extends HTMLElement implements WebComponent {
	template = document.createElement("div");
	link = document.createElement("link");
	poiHandler = PoiService.getInstance();
	router = RouterService.getInstance();
	poi: POI;

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
		this.poi = this.poiHandler.createPOI();
	}

	connectedCallback(): void {
		this.render();
		this.renderStyle();

		this.shadowRoot
			.querySelector(".poi-new__input")!
			.addEventListener("input", (e) => {
				this.poi!.name = (e.target as HTMLInputElement).value;
			});
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
		input1.classList.add("form-control");
		row1.appendChild(label1);
		row1.appendChild(input1);

		const row2 = document.createElement("div");
		const label2 = document.createElement("label");
		const list = document.createElement("ul");

		label2.innerText = "Name Variants";
		label2.classList.add("poi-new__label");
		list.classList.add("poi-new__list");
		list.classList.add("poi-new__list--name");
		row2.appendChild(label2);
		row2.appendChild(list);

		const row3 = document.createElement("div");
		const label3 = document.createElement("label");
		const list2 = document.createElement("ul");

		label3.innerText = "Description variants";
		label3.classList.add("poi-new__label");
		list2.classList.add("poi-new__list");
		list2.classList.add("poi-new__list--description");
		row3.appendChild(label3);
		row3.appendChild(list2);

		const row4 = document.createElement("div");
		const label4 = document.createElement("label");
		const input4 = document.createElement("input");
		const buttonAdd = document.createElement("button");

		buttonAdd.addEventListener("click", () => {
			this.poi!.nameVariations.push(input4.value);
			input4.value = "";
			this.fillNameVariantsEditList();
		});

		label4.innerText = "Add Name Variant";
		label4.classList.add("poi-new__label");
		input4.type = "text";
		input4.placeholder = "Name";
		input4.classList.add("poi-new__input");
		input4.classList.add("form-control");
		buttonAdd.innerText = "Add";
		buttonAdd.classList.add("poi-new__button");
		buttonAdd.classList.add("poi-new__button--add");
		buttonAdd.classList.add("btn");
		buttonAdd.classList.add("btn-outline-primary");
		row4.appendChild(label4);
		row4.appendChild(input4);
		row4.appendChild(buttonAdd);

		const row5 = document.createElement("div");
		const label5 = document.createElement("label");
		const input5 = document.createElement("input");
		const buttonAdd2 = document.createElement("button");

		buttonAdd2.addEventListener("click", () => {
			this.poi!.descriptionVariations.push(input5.value);
			input5.value = "";
			this.fillDescriptionVariantsEditList();
		});

		label5.innerText = "Add Description Variant";
		label5.classList.add("poi-new__label");
		input5.type = "text";
		input5.placeholder = "Description";
		input5.classList.add("poi-new__input");
		input5.classList.add("form-control");
		buttonAdd2.innerText = "Add";
		buttonAdd2.classList.add("poi-new__button");
		buttonAdd2.classList.add("poi-new__button--add");
		buttonAdd2.classList.add("btn");
		buttonAdd2.classList.add("btn-outline-primary");
		row5.appendChild(label5);
		row5.appendChild(input5);
		row5.appendChild(buttonAdd2);

		body.className = "poi-new__body";
		body.classList.add("poi-new__form");
		row1.className = "poi-new__row";
		row2.className = "poi-new__row";
		row3.className = "poi-new__row";
		row4.className = "poi-new__row";
		row5.className = "poi-new__row";

		body.appendChild(row1);
		body.appendChild(row2);
		body.appendChild(row4);
		body.appendChild(row3);
		body.appendChild(row5);
		this.template.appendChild(body);

		const footer = document.createElement("div");
		const buttonSave = document.createElement("button");
		const buttonCancel = document.createElement("button");

		buttonSave.addEventListener("click", () => {
			this.poiHandler.addPOI(this.poi!);
			this.dispatchEvent(
				new CustomEvent("save", {
					detail: this.poi,
				})
			);
			this.router.navigate("/");
		});

		buttonCancel.addEventListener("click", () => {
			this.poi = this.poiHandler.createPOI();
			this.dispatchEvent(
				new CustomEvent("cancel", {
					detail: this.poi,
				})
			);
			this.router.navigate("/");
		});

		buttonSave.innerText = "Save";
		buttonSave.classList.add("poi-new__button");
		buttonSave.classList.add("poi-new__button--save");
		buttonSave.classList.add("btn");
		buttonSave.classList.add("btn-outline-success");
		buttonCancel.innerText = "Cancel";
		buttonCancel.classList.add("poi-new__button");
		buttonCancel.classList.add("poi-new__button--cancel");
		buttonCancel.classList.add("btn");
		buttonCancel.classList.add("btn-outline-danger");
		footer.appendChild(buttonSave);
		footer.appendChild(buttonCancel);
		footer.className = "poi-new__footer";
		this.template.appendChild(footer);
	}

	fillNameVariantsEditList() {
		const nameVariantsEditList = this.shadowRoot.querySelector(
			".poi-new__list--name"
		);
		nameVariantsEditList!.innerHTML = "";
		this.poi?.nameVariations.forEach((nameVariant) => {
			const nameVariantsEditListItem =
				document.createElement("poi-edit-entry");
			nameVariantsEditListItem.setAttribute("value", nameVariant);
			nameVariantsEditListItem.addEventListener("delete", () => {
				nameVariantsEditListItem.remove();
				this.poi?.nameVariations.splice(
					this.poi.nameVariations.indexOf(nameVariant),
					1
				);
			});
			nameVariantsEditList!.appendChild(nameVariantsEditListItem);
		});
	}

	fillDescriptionVariantsEditList() {
		const descriptionVariantsEditList = this.shadowRoot.querySelector(
			".poi-new__list--description"
		);
		descriptionVariantsEditList!.innerHTML = "";
		this.poi?.descriptionVariations.forEach((descriptionVariant) => {
			const descriptionVariantsEditListItem =
				document.createElement("poi-edit-entry");
			descriptionVariantsEditListItem.setAttribute(
				"value",
				descriptionVariant
			);
			descriptionVariantsEditListItem.addEventListener("delete", () => {
				descriptionVariantsEditListItem.remove();
				this.poi?.descriptionVariations.splice(
					this.poi.descriptionVariations.indexOf(descriptionVariant),
					1
				);
			});
			descriptionVariantsEditList!.appendChild(
				descriptionVariantsEditListItem
			);
		});
	}
}
