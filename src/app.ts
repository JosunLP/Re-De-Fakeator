import { PoiService } from './services/poi.srvs';
import { SessionService } from "./services/session.srvs"
import { ComponentService } from "./services/component.srvs"

class App {

    private static contentEntry: string = "content"

	sessionService = SessionService.getInstance()
	componentService = ComponentService.getInstance()
	poiService = PoiService.getInstance()

    constructor() {
        this.drawData()
        this.main()
    }

    async main(): Promise<void> {
        console.log("Hello World")
    }

    async drawData(): Promise<void> {
        const contentRoot = <HTMLDivElement>document.getElementById(App.contentEntry)
        const body = document.createElement("div")
        const title = document.createElement("h1")
        const text = document.createElement("p")
        title.innerText = "Hello World"
        body.appendChild(title)
        body.appendChild(text)
        contentRoot.appendChild(body)
    }
}

new App();
