import { POIHandler } from "./../../../classes/poiHandler";
import { POI } from "../../../types/poi.type";
import { Helper } from "../../../classes/helper";

export class PoiList extends HTMLElement {
	private template = document.createElement("div");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.render();
		this.shadowRoot.appendChild(this.template);
		this.run();
	}

	private async run(): Promise<void> {
		while (true) {
			await this.fillList();
			await Helper.sleep(300);
		}
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

	private async fillList(): Promise<void> {
		const list = this.shadowRoot.querySelector(".poi-list__list");
		if (list) {
			list.innerHTML = "";
			const poiList = this.getPoiList();
			poiList.forEach((poi) => {
				const listItem = document.createElement("li");
				listItem.classList.add("poi-list__item");
				listItem.innerText = poi.name;
				list.appendChild(listItem);
			});
		}
	}

	private getPoiList(): POI[] {
		return POIHandler.getInstance().getPOIs();
	}

	connectedCallback(): void {
		this.fillList();
	}
}
