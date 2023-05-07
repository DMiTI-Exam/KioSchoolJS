import { DijkstraController } from "./controller/DijkstraController.js";
import { Car } from "./gui/Car.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Main as CommonMain } from "../Main.js";

/**
* Точка входа, регшистрация шагов и т.д.
*/
export class Main {
    constructor() {
        let manifest = [
            {src: "car.png", id: "12"},
            {src: "edge_background.png", id: "13"},
            {src: "fill1_mc.png", id: "14"},
            {src: "fill2_mc.png", id: "15"},
            {src: "map.png", id: "16"},
            {src: "page1.png", id: "17"},
            {src: "page2.png", id: "18"},
            {src: "VContent_canteen.png", id: "19"},
            {src: "VContent_church.png", id: "20"},
            {src: "VContent_hospital.png", id: "21"},
            {src: "VContent_library.png", id: "22"},
            {src: "VContent_refuel.png", id: "23"},
            {src: "VContent_theater.png", id: "24"},
            {src: "VFill1_mc.png", id: "25"},
            {src: "VFill2_mc.png", id: "26"},
            {src: "VFill3_mc.png", id: "27"}
        ];

        CommonMain.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        CommonMain.loader.loadManifest(manifest, true, "dijkstra/_resource/");
    }

    static startModule() {
        CommonMain.loader.removeAllEventListeners();

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());

        let mhorse = new Car();
        mhorse.x = 10;
        mhorse.y = 230;
        ManipulatorManager.instanceGetter().init(CommonMain.stage, 850, 750, DijkstraController.instanceGetter(),
            new DefaultControlsFactory(mhorse, 50, 80, 80, 300));
    }
}