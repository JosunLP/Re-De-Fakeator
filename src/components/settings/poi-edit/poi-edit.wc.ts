import { PoiService } from "../../../services/poi.srvs";
import { POI } from "./../../../types/poi.type";
import { IWebComponent } from "../../../interfaces/wc.interface";
import { RouterService } from "../../../services/router.srvs";
import { Helper } from "../../../classes/helper";

export class PoiEdit extends HTMLElement implements IWebComponent {
	poiHandler = PoiService.getInstance();
	router = RouterService.getInstance();
	template = document.createElement("div");
	link = document.createElement("link");

	private poi: POI | null = null;

	shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback(): void {
		this.render(JSON.parse(this.getAttribute("value")!) as POI);
		this.renderStyle();
		this.shadowRoot
			.querySelector(".poi-edit__name-edit-input")!
			.addEventListener("input", (e) => {
				this.poi!.name = (e.target as HTMLInputElement).value;
			});
		Helper.sleep(10).then(() => {
			this.fillNameVariantsEditList();
			this.fillDescriptionVariantsEditList();
		});
	}

	renderStyle(): void {
		this.link.setAttribute("rel", "stylesheet");
		this.link.setAttribute("href", "./css/app.css");
		this.shadowRoot.appendChild(this.link);
	}

	render(value: POI): void {
		this.poi = value;
		this.template.className = "poi-edit";
		const header = document.createElement("div");
		const headerTitle = document.createElement("h2");
		const body = document.createElement("div");
		const form = document.createElement("div");

		header.className = "poi-edit__header";
		headerTitle.className = "poi-edit__title";
		headerTitle.innerText = "Edit Person of Interest";

		body.className = "poi-edit__body";
		form.className = "poi-edit__form";

		const nameEdit = document.createElement("div");
		const nameEditLabel = document.createElement("label");
		const nameEditInput = document.createElement("input");

		nameEdit.className = "poi-edit__name-edit";
		nameEditLabel.className = "poi-edit__name-edit-label";
		nameEditLabel.innerText = "Name";
		nameEditInput.className = "poi-edit__name-edit-input";
		nameEditInput.type = "text";
		nameEditInput.classList.add("form-control");
		nameEditInput.value = value.name;

		nameEdit.appendChild(nameEditLabel);
		nameEdit.appendChild(nameEditInput);
		form.appendChild(nameEdit);

		const nameVariantsEdit = document.createElement("div");
		const nameVariantsEditLabel = document.createElement("label");
		const nameVariantsEditList = document.createElement("ul");

		nameVariantsEdit.className = "poi-edit__name-variants-edit";
		nameVariantsEditLabel.className = "poi-edit__name-variants-edit-label";
		nameVariantsEditLabel.innerText = "Name Variants";
		nameVariantsEditList.className = "poi-edit__name-variants-edit-list";

		nameVariantsEdit.appendChild(nameVariantsEditLabel);
		nameVariantsEdit.appendChild(nameVariantsEditList);
		form.appendChild(nameVariantsEdit);

		const nameVariantsNew = document.createElement("div");
		const nameVariantsNewLabel = document.createElement("label");
		const nameVariantsNewInput = document.createElement("input");
		const nameVariantsNewButton = document.createElement("button");

		nameVariantsNew.className = "poi-edit__name-variants-new";
		nameVariantsNewLabel.className = "poi-edit__name-variants-new-label";
		nameVariantsNewLabel.innerText = "Add Name Variant";
		nameVariantsNewInput.className = "poi-edit__name-variants-new-input";
		nameVariantsNewInput.type = "text";
		nameVariantsNewInput.classList.add("form-control");
		nameVariantsNewButton.className = "poi-edit__name-variants-new-button";
		nameVariantsNewButton.classList.add("btn");
		nameVariantsNewButton.classList.add("btn-outline-success");
		nameVariantsNewButton.innerText = "Add";

		nameVariantsNewButton.addEventListener("click", () => {
			const name = nameVariantsNewInput.value;
			if (name) {
				this.poi!.nameVariations.push(name);
				this.fillNameVariantsEditList();
				nameVariantsNewInput.value = "";
			}
		});

		nameVariantsNew.appendChild(nameVariantsNewLabel);
		nameVariantsNew.appendChild(nameVariantsNewInput);
		nameVariantsNew.appendChild(nameVariantsNewButton);
		form.appendChild(nameVariantsNew);

		const descriptionVariantsEdit = document.createElement("div");
		const descriptionVariantsEditLabel = document.createElement("label");
		const descriptionVariantsEditList = document.createElement("ul");

		descriptionVariantsEdit.className =
			"poi-edit__description-variants-edit";
		descriptionVariantsEditLabel.className =
			"poi-edit__description-variants-edit-label";
		descriptionVariantsEditLabel.innerText = "Description Variants";
		descriptionVariantsEditList.className =
			"poi-edit__description-variants-edit-list";

		descriptionVariantsEdit.appendChild(descriptionVariantsEditLabel);
		descriptionVariantsEdit.appendChild(descriptionVariantsEditList);
		form.appendChild(descriptionVariantsEdit);

		const descriptionVariantsNew = document.createElement("div");
		const descriptionVariantsNewLabel = document.createElement("label");
		const descriptionVariantsNewInput = document.createElement("input");
		const descriptionVariantsNewButton = document.createElement("button");

		descriptionVariantsNew.className = "poi-edit__description-variants-new";
		descriptionVariantsNewLabel.className =
			"poi-edit__description-variants-new-label";
		descriptionVariantsNewLabel.innerText = "Add Description Variant";
		descriptionVariantsNewInput.className =
			"poi-edit__description-variants-new-input";
		descriptionVariantsNewInput.type = "text";
		descriptionVariantsNewInput.classList.add("form-control");
		descriptionVariantsNewButton.className =
			"poi-edit__description-variants-new-button";
		descriptionVariantsNewButton.innerText = "Add";
		descriptionVariantsNewButton.classList.add("btn");
		descriptionVariantsNewButton.classList.add("btn-outline-success");

		descriptionVariantsNewButton.addEventListener("click", () => {
			const description = descriptionVariantsNewInput.value;
			if (description) {
				this.poi!.descriptionVariations.push(description);
				this.fillDescriptionVariantsEditList();
				descriptionVariantsNewInput.value = "";
			}
		});

		descriptionVariantsNew.appendChild(descriptionVariantsNewLabel);
		descriptionVariantsNew.appendChild(descriptionVariantsNewInput);
		descriptionVariantsNew.appendChild(descriptionVariantsNewButton);
		form.appendChild(descriptionVariantsNew);

		const poiEditFooter = document.createElement("div");

		poiEditFooter.className = "poi-edit__footer";

		const deletePoibutton = document.createElement("button");
		deletePoibutton.className = "poi-edit__delete-button";
		deletePoibutton.classList.add("btn");
		deletePoibutton.classList.add("btn-outline-danger");
		deletePoibutton.innerText = "Delete";

		deletePoibutton.addEventListener("click", () => {
			this.poiHandler.removePOI(value.id);
			this.router.navigate("/");
		});

		const savePoibutton = document.createElement("button");
		savePoibutton.className = "poi-edit__save-button";
		savePoibutton.classList.add("btn");
		savePoibutton.classList.add("btn-outline-success");
		savePoibutton.innerText = "Save";

		savePoibutton.addEventListener("click", () => {
			this.poi!.name = nameEditInput.value;
			this.poiHandler.updatePOI(this.poi!);
			this.router.navigate("/");
		});

		poiEditFooter.appendChild(deletePoibutton);
		poiEditFooter.appendChild(savePoibutton);
		form.appendChild(poiEditFooter);

		header.appendChild(headerTitle);
		body.appendChild(form);
		this.template.appendChild(header);
		this.template.appendChild(body);
	}

	fillNameVariantsEditList() {
		const nameVariantsEditList = this.shadowRoot.querySelector(
			".poi-edit__name-variants-edit-list"
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
			".poi-edit__description-variants-edit-list"
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
