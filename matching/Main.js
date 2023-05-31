import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Page3 } from "./gui/Page3.js";
import { Man } from "./gui/Man.js";
import { AngryMan } from "./gui/AngryMan.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { MatchingController } from "./controller/MatchingController.js";
import { MatchingControlsFactory } from "./views/controls/MatchingControlsFactory.js";
import { Main as CommonMain } from "../Main.js";

/**
* Точка входа, регшистрация шагов и т.д.
*/
export class Main {
    constructor() {
        let manifest = [
            {src: "comment.png", id: "49"},
            {src: "error_comment.png", id: "50"},
            {src: "man.png", id: "51"},
            {src: "man_angry.png", id: "52"},
            {src: "page1.png", id: "53"},
            {src: "page2.png", id: "54"},
            {src: "page3.png", id: "55"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "matching/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());
        HelpManager.instanceGetter().registerPage(new Page3());

        let man = new Man();
        man.scaleX = 0.55;
        man.scaleY = 0.55;
        man.y = 120;
        man.x = 10;

        let angryMan = new AngryMan();
        angryMan.scaleX = 0.55;
        angryMan.scaleY = 0.55;
        angryMan.y = 120;
        angryMan.x = 10;

        ManipulatorManager.instanceGetter().init(CommonMain.stage, 900, 600, MatchingController.instanceGetter(),
            new MatchingControlsFactory(man, 0, 10, 80, 250, angryMan));
    }
}