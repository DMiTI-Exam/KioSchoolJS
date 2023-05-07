import { Man } from "./gui/Man.js";
import { Page1 } from "./gui/Page1.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HuffmanController } from "./controller/HuffmanController.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Main as CommonMain } from "../Main.js";

/**
 * Точка входа, инициализация главного контроллера
 */
export class Main {
    constructor() {
        let manifest = [
            {src: "page1.png", id: "39"},
            {src: "telegraph.png", id: "40"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "huffman/_resources/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        let man = new Man();
        man.scaleX = 0.6;
        man.scaleY = 0.6;
        man.y = 120;
        man.x = -30;

        HelpManager.instanceGetter().registerPage(new Page1());

        ManipulatorManager.instanceGetter().init(CommonMain.stage, 900, 650, HuffmanController.instanceGetter(),
            new DefaultControlsFactory(man, 20, 10, 85));
    }
}