import { Man } from "./gui/Man.js";
import { Page1 } from "./gui/Page1.js";
import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { HuffmanController } from "./controller/HuffmanController.js";
import { DefaultControlsFactory } from "../kioschool/view/controlsImpl/DefaultControlsFactory.js";

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

        {src: "huffman/_resources/page1.png", id: "12"},
        {src: "huffman/_resources/telegraph.png", id: "13"}
    ];

    Main.loader = new createjs.LoadQueue(false);
    Main.loader.addEventListener("complete", handleComplete);
    Main.loader.loadManifest(manifest, true, "");
}

function handleComplete() {
    let canvas = document.getElementById("testCanvas");
    Main.stage = new createjs.Stage(canvas);

    Main.stage.enableMouseOver(30);

    let man = new Man();
    man.scaleX = 0.6;
    man.scaleY = 0.6;
    man.y = 120;
    man.x = -30;

    HelpManager.instanceGetter().registerPage(new Page1());

    ManipulatorManager.instanceGetter().init(Main.stage, 900, 650, HuffmanController.instanceGetter(),
        new DefaultControlsFactory(man, 20, 10, 85));

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
    }
}