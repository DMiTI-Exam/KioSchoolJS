import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { HorseController } from "./controller/HorseController.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Horse } from "./gui/Horse.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Page3 } from "./gui/Page3.js";
import { Main as CommonMain } from "../Main.js";

/**
 * Точка входа, инициализация главного контроллера
 */
export class Main {
    constructor() {
        let manifest = [
            {src: "board_horse.png", id: "34"},
            {src: "page1.png", id: "35"},
            {src: "page2.png", id: "36"},
            {src: "page3.png", id: "37"},
            {src: "s_horse.png", id: "38"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "horse/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());
        HelpManager.instanceGetter().registerPage(new Page3());

        let mhorse = new Horse();
        mhorse.x = 25;
        mhorse.y = 160;
        ManipulatorManager.instanceGetter().init(CommonMain.stage, 850, 650, HorseController.instanceGetter(),
            new DefaultControlsFactory(mhorse, 0, 40, 85));
    }
}