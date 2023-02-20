import { ComponentService } from "./services/component.srvs";

class Background {

    constructor() {
		ComponentService.getInstance();
        this.main();
    }

    async main(): Promise<void> {

    }
}

new Background();
