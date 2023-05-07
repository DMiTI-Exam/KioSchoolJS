import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { KruskalController } from "./controller/KruskalController.js";
import { Spider } from "./gui/Spider.js";
import { Globals } from "./utils/Global.js";
import { EvilSpider } from "./gui/EvilSpider.js";
import { KruskalControlsFactory } from "./view/controls/KruskalControlsFactory.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { Main as CommonMain } from "../Main.js";

/**
 * Точка входа, инициализация главного контроллера
 */
export class Main {
    constructor() {
        let manifest = [
            {src: "apply.png", id: "41"},
            {src: "comment.png", id: "42"},
            {src: "errorComment.png", id: "43"},
            {src: "evil_spider.png", id: "44"},
            {src: "not_apply.png", id: "45"},
            {src: "page1.png", id: "46"},
            {src: "page2.png", id: "47"},
            {src: "spider.png", id: "48"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "kruskal/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        createjs.Touch.enable(CommonMain.stage);
        CommonMain.stage.mouseMoveOutside = true;

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());

        let managerHelper = KruskalController.instanceGetter();

        let mspider = new Spider();
        mspider.x = Globals.SPIDY_X + 15 - 175;
        mspider.y = Globals.SPIDY_Y - 155;
        mspider.scaleX = 0.78;
        mspider.scaleY = 0.78;

        let evilspider = new EvilSpider();
        evilspider.x = Globals.SPIDY_X + 15 - 175;
        evilspider.y = Globals.SPIDY_Y - 155;
        evilspider.scaleX = 0.78;
        evilspider.scaleY = 0.78;

        let dcf = new KruskalControlsFactory(mspider, -45, 300, 85, 250, evilspider);

        ManipulatorManager.instanceGetter().init(CommonMain.stage, 910, 620, managerHelper, dcf);
    }
}