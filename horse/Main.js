import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { HorseController } from "./controller/HorseController.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { Horse } from "./gui/Horse.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Page3 } from "./gui/Page3.js";

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

        {src: "horse/_resource/board_horse.png", id: "12"},
        {src: "horse/_resource/page1.png", id: "13"},
        {src: "horse/_resource/page2.png", id: "14"},
        {src: "horse/_resource/page3.png", id: "15"},
        {src: "horse/_resource/s_horse.png", id: "16"}
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
    HelpManager.instanceGetter().registerPage(new Page3());

    let mhorse = new Horse();
    mhorse.x = 25;
    mhorse.y = 160;
    ManipulatorManager.instanceGetter().init(Main.stage, 850, 650, HorseController.instanceGetter(),
        new DefaultControlsFactory(mhorse, 0, 40, 85));

    createjs.Ticker.on("tick", (_) => {
        Main.stage.update();
    });
}

/**
 * Точка входа, инициализация главного контроллера
 */
export class Main extends createjs.Container {
    static loader;
    static stage;

    constructor() {
        super();

        let canvas = document.getElementById("testCanvas");
        let stage = new createjs.Stage(canvas);

        HelpManager.instanceGetter().registerPage(new Page1());
        HelpManager.instanceGetter().registerPage(new Page2());
        HelpManager.instanceGetter().registerPage(new Page3());

        let mhorse = new Horse();
        mhorse.x = 25;
        mhorse.y = 160;
        ManipulatorManager.instanceGetter().init(stage, 850, 650, HorseController.instanceGetter(),
            new DefaultControlsFactory(mhorse, 0, 40, 85));
    }
}