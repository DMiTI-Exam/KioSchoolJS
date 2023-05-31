import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { Page1 } from "./gui/Page1.js";
import { Man } from "./gui/Man.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { EulerController } from "./controller/EulerController.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Main as CommonMain } from "../Main.js";

/**
* Точка входа, регшистрация шагов и т.д.
*/
export class Main {
    constructor() {
        let manifest = [
            {src: "island.png", id: "28"},
            {src: "man.png", id: "29"},
            {src: "n_steps_1.png", id: "30"},
            {src: "n_steps_2.png", id: "31"},
            {src: "n_steps_3.png", id: "32"},
            {src: "page1.png", id: "33"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "euler/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        HelpManager.instanceGetter().registerPage(new Page1());

        let man = new Man();
        man.scaleX = 0.7;
        man.scaleY = 0.7;
        man.y = 100;
        man.x = 10;

        ManipulatorManager.instanceGetter().init(CommonMain.stage, 900, 600, EulerController.instanceGetter(),
            new DefaultControlsFactory(man, 10, 10));
    }
}