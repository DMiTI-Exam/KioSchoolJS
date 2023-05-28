import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { PrimController } from "./controller/PrimController.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Adjuster } from "./gui/Adjuster.js";

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

        {src: "prim/_resource/map.png", id: "12"},
        {src: "prim/_resource/page1.png", id: "13"},
        {src: "prim/_resource/page2.png", id: "14"},
        {src: "prim/_resource/VFill1_mc.png", id: "15"},
        {src: "prim/_resource/VFill2_mc.png", id: "16"},
        {src: "prim/_resource/VFill3_mc.png", id: "17"},
        {src: "prim/_resource/way.png", id: "18"}
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
    let mhorse = new Adjuster();
    mhorse.x = 80;
    mhorse.y = 130;

// Инициализация менеджера манипуляторов
    ManipulatorManager.instanceGetter().init(
        Main.stage,
        1000,
        650,
        PrimController.instanceGetter(),
        new DefaultControlsFactory(mhorse, 30, 10)
    );

    createjs.Ticker.on("tick", (_) => {
        Main.stage.update();
    });
}

export class Main extends createjs.Container {
    static loader;
    static stage;

}

