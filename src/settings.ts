import { POIHandler } from "./classes/poiHandler";
import { Session } from "./classes/session";
import { BasicButton } from "./components/button";
import { POI } from "./types/poi";

class Settings {
	private session = Session.getInstance();

	private poiHandler = POIHandler.getInstance();

	constructor() {
		this.renderSettings();
		this.addCreateNewPOIListener();
		this.addNewPOINameVarListener();
		this.addNewPOIDescriptionVarListener();
		this.addDeleteNewPOINamesListener();
	}

	private async renderSettings(): Promise<void> {
		const settings = <HTMLDivElement>document.getElementById("settings");
		settings.innerHTML = "";
		const saveButton = new BasicButton(
			"success",
			"Save",
			"saveSettings"
		).render();

		const addNewPOI = document.createElement("div");
		addNewPOI.id = "addNewPOI";
		addNewPOI.classList.add("addNewPOI");

		const addNewPOIName = document.createElement("input");
		addNewPOIName.type = "text";
		addNewPOIName.id = "addNewPOIName";
		addNewPOIName.classList.add("addNewPOIName");

		const addNewPOINameLabel = document.createElement("label");
		addNewPOINameLabel.innerText = "Name";
		addNewPOINameLabel.htmlFor = "addNewPOIName";

		const addNewPOINameVarList = document.createElement("ul");
		addNewPOINameVarList.id = "addNewPOINameVarList";
		addNewPOINameVarList.classList.add("addNewPOINameVarList");

		const addNewPOINameVar = document.createElement("input");
		addNewPOINameVar.type = "text";
		addNewPOINameVar.id = "addNewPOINameVar";
		addNewPOINameVar.classList.add("addNewPOINameVar");

		const addNewPOINameVarLabel = document.createElement("label");
		addNewPOINameVarLabel.innerText = "Variable";
		addNewPOINameVarLabel.htmlFor = "addNewPOINameVar";

		const addNewPOINameVarAdd = new BasicButton(
			"primary",
			"Add",
			"addNewPOINameVarAdd"
		).render();

		const addNewPOIDescriptionList = document.createElement("ul");
		addNewPOIDescriptionList.id = "addNewPOIDescriptionList";
		addNewPOIDescriptionList.classList.add("addNewPOIDescriptionList");

		const addNewPOIDescription = document.createElement("input");
		addNewPOIDescription.type = "text";
		addNewPOIDescription.id = "addNewPOIDescription";
		addNewPOIDescription.classList.add("addNewPOIDescription");

		const addNewPOIDescriptionLabel = document.createElement("label");
		addNewPOIDescriptionLabel.innerText = "Description";
		addNewPOIDescriptionLabel.htmlFor = "addNewPOIDescription";

		const addNewPOIDescriptionAdd = new BasicButton(
			"primary",
			"Add",
			"addNewPOIDescriptionAdd"
		).render();

		const addNewPOIButton = new BasicButton(
			"primary",
			"Add",
			"addNewPOIButton"
		).render();

		addNewPOI.appendChild(addNewPOINameLabel);
		addNewPOI.appendChild(addNewPOIName);
		addNewPOI.appendChild(addNewPOINameVarLabel);
		addNewPOI.appendChild(addNewPOINameVar);
		addNewPOI.appendChild(addNewPOINameVarAdd);
		addNewPOI.appendChild(addNewPOINameVarList);
		addNewPOI.appendChild(addNewPOIDescriptionLabel);
		addNewPOI.appendChild(addNewPOIDescription);
		addNewPOI.appendChild(addNewPOIDescriptionAdd);
		addNewPOI.appendChild(addNewPOIDescriptionList);
		addNewPOI.appendChild(addNewPOIButton);

		const poiList = document.createElement("ul");
		poiList.id = "poiList";
		poiList.classList.add("poiList");

		const poiListTitle = document.createElement("h2");
		poiListTitle.innerText = "POIs";

		this.poiHandler.getPOIs().forEach((element) => {
			this.renderPOI(element).then((poi) => {
				poiList.appendChild(poi);
			});
		});

		settings.appendChild(poiListTitle);
		settings.appendChild(poiList);
		settings.appendChild(addNewPOI);

		settings.appendChild(saveButton);
	}

	private async renderPOI(poi: POI): Promise<HTMLDivElement> {
		const poiElement = document.createElement("div");
		poiElement.id = poi.id;
		poiElement.classList.add("poi");

		const poinNameWrapper = document.createElement("div");
		poinNameWrapper.classList.add("poiNameWrapper");

		const poiName = document.createElement("input");
		poiName.type = "text";
		poiName.value = poi.name;
		poiName.id = poi.id + "_name";
		poiName.classList.add("poiName");

		const poiLabel = document.createElement("label");
		poiLabel.innerText = "Name";
		poiLabel.htmlFor = poi.id + "_name";

		poinNameWrapper.appendChild(poiLabel);
		poinNameWrapper.appendChild(poiName);

		const nameVarList = document.createElement("ul");
		nameVarList.id = poi.id + "_nameVarList";
		nameVarList.classList.add("poiNameVarList");

		poi.nameVariations.forEach((element) => {
			const nameVar = document.createElement("li");
			const nameVarInput = document.createElement("input");
			nameVarInput.type = "text";
			nameVarInput.value = element;
			nameVarInput.id = poi.id + "_nameVar_" + element;
			nameVarInput.classList.add("poiNameVar");
			nameVar.appendChild(nameVarInput);
			nameVarList.appendChild(nameVar);
		});

		const poiDesctiontionVarList = document.createElement("ul");
		poiDesctiontionVarList.id = poi.id + "_descriptionVarList";
		poiDesctiontionVarList.classList.add("poiDescriptionVarList");

		poi.descriptionVariations.forEach((element) => {
			const descriptionVar = document.createElement("li");
			const descriptionVarInput = document.createElement("input");
			descriptionVarInput.type = "text";
			descriptionVarInput.value = element;
			descriptionVarInput.id = poi.id + "_descriptionVar_" + element;
			descriptionVarInput.classList.add("poiDescriptionVar");
			descriptionVar.appendChild(descriptionVarInput);
			poiDesctiontionVarList.appendChild(descriptionVar);
		});

		poiElement.appendChild(poinNameWrapper);
		poiElement.appendChild(nameVarList);
		poiElement.appendChild(poiDesctiontionVarList);

		return poiElement;
	}

	private async renderListEntry(listEntry: string): Promise<HTMLLIElement> {
		const listEntryElement = document.createElement("li");
		listEntryElement.innerText = listEntry;

		const listEntryDelete = new BasicButton(
			"danger",
			"Delete",
			"listEntryDelete"
		).render();

		listEntryElement.appendChild(listEntryDelete);
		return listEntryElement;
	}

	private getPOINameVariations(): string[] {
		const nameVariations: string[] = [];
		const nameVariationsList = document.getElementById(
			"addNewPOINameVarList"
		) as HTMLUListElement;
		nameVariationsList.childNodes.forEach((element) => {
			nameVariations.push((<HTMLInputElement>element).value);
		});
		return nameVariations;
	}

	private getPOIDescriptionVariations(): string[] {
		const descriptionVariations: string[] = [];
		const descriptionVariationsList = document.getElementById(
			"addNewPOIDescriptionList"
		) as HTMLUListElement;
		descriptionVariationsList.childNodes.forEach((element) => {
			descriptionVariations.push((<HTMLInputElement>element).value);
		});
		return descriptionVariations;
	}

	private async addCreateNewPOIListener(): Promise<void> {
		const newPOI: POI = {
			id: crypto.randomUUID(),
			name: "",
			nameVariations: [],
			descriptionVariations: [],
		};

		newPOI.name = (<HTMLInputElement>(
			document.getElementById("addNewPOIName")
		)).value;

		newPOI.nameVariations = this.getPOINameVariations();

		newPOI.descriptionVariations = this.getPOIDescriptionVariations();

		document
			.getElementById("addNewPOIButton")!
			.addEventListener("click", () => {
				this.poiHandler.addPOI(newPOI);
				this.renderSettings();
			});
	}

	private async addNewPOINameVarListener(): Promise<void> {
		const addNewPOINameVar = document.getElementById(
			"addNewPOINameVar"
		) as HTMLInputElement;
		const addNewPOINameVarList = document.getElementById(
			"addNewPOINameVarList"
		) as HTMLUListElement;

		document
			.getElementById("addNewPOINameVarAdd")!
			.addEventListener("click", () => {
				this.renderListEntry(addNewPOINameVar.value).then((element) => {
					addNewPOINameVarList.appendChild(element);
				});
			});
	}

	private async addDeleteNewPOINamesListener(): Promise<void> {
		const addNewPOINameVarList = document.getElementById(
			"addNewPOINameVarList"
		) as HTMLUListElement;

		addNewPOINameVarList.childNodes.forEach((element) => {
			element.childNodes[1].addEventListener("click", () => {
				element.remove();
			});
		});
	}

	private async addNewPOIDescriptionVarListener(): Promise<void> {
		const addNewPOIDescriptionVar = document.getElementById(
			"addNewPOIDescription"
		) as HTMLInputElement;
		const addNewPOIDescriptionVarList = document.getElementById(
			"addNewPOIDescriptionList"
		) as HTMLUListElement;

		document
			.getElementById("addNewPOIDescriptionAdd")!
			.addEventListener("click", () => {
				this.renderListEntry(addNewPOIDescriptionVar.value).then(
					(element) => {
						addNewPOIDescriptionVarList.appendChild(element);
					}
				);
			});
	}
}

new Settings();
