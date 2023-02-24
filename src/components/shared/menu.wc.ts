import { Helper } from "../../classes/helper";
import { RouterService } from "../../services/router.srvs";
import { MenuItem } from "../../types/menuItem.type";
import { IWebComponent } from "../../interfaces/wc.interface";

export class MenuComponent extends HTMLElement implements IWebComponent {
	template = document.createElement("div");
	router = RouterService.getInstance();
	link = document.createElement("link");

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.shadowRoot.appendChild(this.template);
	}

	connectedCallback() {
		this.run();
	}

	run() {
		this.reset();
		this.render();
		this.renderStyle();
		this.renderListItems();
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


	render() {
		this.template.classList.add("menu");
		const menuHeader = document.createElement("div");
		const menuHeaderTitle = document.createElement("h2");
		menuHeader.classList.add("menu__header");
		menuHeaderTitle.classList.add("menu__title");
		menuHeaderTitle.innerText = "Menu";
		menuHeader.appendChild(menuHeaderTitle);
		this.template.appendChild(menuHeader);

		const list = document.createElement("ul");
		list.classList.add("menu__list");
		list.classList.add("btn-group");
		list.classList.add("btn-group-toggle");
		this.template.appendChild(list);
	}

	private renderListItems() {
		const list = this.shadowRoot.querySelector(".menu__list");
		if (list) {
			list.innerHTML = "";
			const menuItems = this.getMenuItems();
			menuItems.forEach((menuItem: MenuItem) => {
				const listItem = document.createElement("button");
				listItem.addEventListener("click", () => {
					this.router.navigate(menuItem.link);
				});
				listItem.classList.add("menu__item");
				listItem.classList.add("menu__item--link");
				listItem.classList.add("btn");
				listItem.classList.add("btn-secondary");
				listItem.innerText = menuItem.name;
				list.appendChild(listItem);
			});
		}
	}

	private getMenuItems(): MenuItem[] {
		return JSON.parse(this.getAttribute("menuItems") || "[]");
	}
}
