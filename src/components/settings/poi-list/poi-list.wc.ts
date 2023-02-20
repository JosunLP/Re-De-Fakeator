export class PoiList extends HTMLElement {
	private template = fetch("./templates/poi-list.cmpt.html").then(
		(response) => response.text()
	);

	public shadowRoot: ShadowRoot = this.attachShadow({ mode: "open" });

	constructor() {
		super();
		this.template.then((template) => {
			const t = new DOMParser().parseFromString(template, "text/html");
			this.shadowRoot.appendChild(t.documentElement);
		});
	}
}
