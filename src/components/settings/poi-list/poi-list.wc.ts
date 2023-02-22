import { POIHandler } from "./../../../classes/poiHandler";
import { POI } from "../../../types/poi.type";
import { WebComponent } from "../../../interfaces/wc.interface";
import { RouterService } from "../../../services/router.srvs";
import { Helper } from "../../../classes/helper";

export class PoiList extends HTMLElement implements WebComponent {
	router = RouterService.getInstance();
	template = document.createElement("div");
	link = document.createElement("link");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback(): void {
		this.run();
	}

	run() {
		this.reset();
		this.render();
		this.renderStyle();
		Helper.sleep(100).then(() => {
			this.fillList();
		});
	}

	reset(): void {
		this.template.innerHTML = "";
		this.template.className = "";
	}

	renderStyle(): void {
		this.link.setAttribute("rel", "stylesheet");
		this.link.setAttribute("href", "./css/app.css");
		this.shadowRoot.appendChild(this.link);
	}

	render(): void {
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

	private fillList(): void {
		const list = this.shadowRoot.querySelector(".poi-list__list");
		if (list) {
			list.innerHTML = "";
			const poiList = this.getPoiList();
			poiList.forEach((poi) => {
				const listItem = document.createElement("li");
				listItem.classList.add("poi-list__item");
				listItem.innerText = poi.name;
				listItem.addEventListener("click", () => {
					this.router.navigateTo("/edit-poi", poi);
				});
				list.appendChild(listItem);
			});
		}
	}

	private getPoiList(): POI[] {
		return POIHandler.getInstance().getPOIs();
	}
}
