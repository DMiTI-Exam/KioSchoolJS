import { DijkstraController } from "./controller/DijkstraController.js";
import { Car } from "./gui/Car.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";

window.onload = function () {
    init();
}

function init() {
    let manifest = [
        {src: "kioschool/_resource/comment.png", id: "1"},
        {src: "kioschool/_resource/control_button.png", id: "2"},
        {src: "kioschool/_resource/demo_button.png", id: "3"},
        {src: "kioschool/_resource/error_comment.png", id: "4"},
        {src: "kioschool/_resource/help_round_button.png", id: "5"},
        {src: "kioschool/_resource/help_round_button_back.png", id: "6"},
        {src: "kioschool/_resource/next_navigation_button.png", id: "7"},
        {src: "kioschool/_resource/prev_navigation_button.png", id: "8"},
        {src: "kioschool/_resource/reset_check_button.png", id: "9"},
        {src: "kioschool/_resource/send_check_button.png", id: "10"},
        {src: "kioschool/_resource/train_button.png", id: "11"},

        {src: "dijkstra/_resource/edge_background.png", id: "12"},
        {src: "dijkstra/_resource/fill1_mc.png", id: "13"},
        {src: "dijkstra/_resource/fill2_mc.png", id: "14"},
        {src: "dijkstra/_resource/map.png", id: "15"},
        {src: "dijkstra/_resource/VContent_canteen.png", id: "16"},
        {src: "dijkstra/_resource/VContent_church.png", id: "17"},
        {src: "dijkstra/_resource/VContent_hospital.png", id: "18"},
        {src: "dijkstra/_resource/VContent_library.png", id: "19"},
        {src: "dijkstra/_resource/VContent_refuel.png", id: "20"},
        {src: "dijkstra/_resource/VContent_theater.png", id: "21"},
        {src: "dijkstra/_resource/VFill1_mc.png", id: "22"},
        {src: "dijkstra/_resource/VFill2_mc.png", id: "23"},
        {src: "dijkstra/_resource/VFill3_mc.png", id: "24"},
        {src: "dijkstra/_resource/car.png", id: "25"},
        {src: "dijkstra/_resource/page1.png", id: "26"},
        {src: "dijkstra/_resource/page2.png", id: "27"}
    ];

    Main.loader = new createjs.LoadQueue(false);
    Main.loader.addEventListener("complete", handleComplete);
    Main.loader.loadManifest(manifest, true, "");
}

function handleComplete() {
    let canvas = document.getElementById("testCanvas");
    Main.stage = new createjs.Stage(canvas);

    Main.stage.enableMouseOver(30);

    HelpManager.instanceGetter().registerPage(new Page1());
    HelpManager.instanceGetter().registerPage(new Page2());

    let mhorse = new Car();
    mhorse.x = 10;
    mhorse.y = 230;
    ManipulatorManager.instanceGetter().init(Main.stage, 850, 750, DijkstraController.instanceGetter(),
        new DefaultControlsFactory(mhorse, 50, 80, 80, 300));

    createjs.Ticker.on("tick", (_) => {
        Main.stage.update();
    });
}

/**
* Точка входа, регшистрация шагов и т.д.

*/
export class Main extends createjs.Container {
    static loader;
    static stage;

    constructor() {
        super();

        let canvas = document.getElementById("testCanvas");
        let stage = new createjs.Stage(canvas);
        this.width = 850;
        this.height = 750;
        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());

        let mhorse = new Car()
        mhorse.x = 25;
        mhorse.y = 160;
        ManipulatorManager.instanceGetter().init(Main.stage, 850, 650, DijkstraController.instanceGetter(),
            new DefaultControlsFactory(mhorse, 0, 40, 85));
    }
}