import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { PrimController } from "./controller/PrimController.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Adjuster } from "./gui/Adjuster.js";
import { Main as CommonMain } from "../Main.js";

export class Main extends createjs.Container {
    constructor() {
        super();

        let manifest = [
            {src: "adjuster.png", id: "56"},
            {src: "map.png", id: "57"},
            {src: "page1.png", id: "58"},
            {src: "page2.png", id: "59"},
            {src: "VFill1_mc.png", id: "60"},
            {src: "VFill2_mc.png", id: "61"},
            {src: "VFill3_mc.png", id: "62"},
            {src: "way.png", id: "63"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "prim/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());
        let mhorse = new Adjuster();
        mhorse.x = 80;
        mhorse.y = 130;

        ManipulatorManager.instanceGetter().init(
            CommonMain.stage,
            1000,
            650,
            PrimController.instanceGetter(),
            new DefaultControlsFactory(mhorse, 30, 10)
        );
    }
}

