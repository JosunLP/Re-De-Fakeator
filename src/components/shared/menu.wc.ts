import { Helper } from "../../classes/helper";
import { RouterService } from "../../services/router.srvs";
import { MenuItem } from "../../types/menuItem.type";

export class MenuComponent extends HTMLElement {

	private template = document.createElement("div");
	private router = RouterService.getInstance();

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.render();
		this.shadowRoot.appendChild(this.template);
		this.run();
	}
	private async run() {
		while (true) {
			await this.renderListItems();
			await Helper.sleep(300);
		}
	}
	private async render() {
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
		this.template.appendChild(list);
	}

	private async renderListItems() {
		const list = this.shadowRoot.querySelector(".menu__list");
		if (list) {
			list.innerHTML = "";
			const menuItems = this.getMenuItems();
			menuItems.forEach((menuItem: MenuItem) => {
				const listItem = document.createElement("button");
				listItem.addEventListener("click", () => {
					this.router.navigateTo(menuItem.link);
				});
				listItem.classList.add("menu__item");
				listItem.classList.add("menu__item--link");
				listItem.classList.add("btn");
				listItem.innerText = menuItem.name;
				list.appendChild(listItem);
			});
		}
	}
	private getMenuItems(): MenuItem[] {
		return JSON.parse(this.getAttribute("menuItems") || "[]");
	}
}
