import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { KruskalController } from "./controller/KruskalController.js";
import { Spider } from "./gui/Spider.js";
import { Globals } from "./utils/Global.js";
import { EvilSpider } from "./gui/EvilSpider.js";
import { KruskalControlsFactory } from "./view/controls/KruskalControlsFactory.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";

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

        {src: "kruskal/_resource/apply.png", id: "12"},
        {src: "kruskal/_resource/comment.png", id: "13"},
        {src: "kruskal/_resource/errorComment.png", id: "14"},
        {src: "kruskal/_resource/evil_spider.png", id: "15"},
        {src: "kruskal/_resource/not_apply.png", id: "16"},
        {src: "kruskal/_resource/page1.png", id: "17"},
        {src: "kruskal/_resource/page2.png", id: "18"},
        {src: "kruskal/_resource/spider.png", id: "19"}
    ];

    Main.loader = new createjs.LoadQueue(false);
    Main.loader.addEventListener("complete", handleComplete);
    Main.loader.loadManifest(manifest, true, "");
}

function handleComplete() {
    let canvas = document.getElementById("testCanvas");
    Main.stage = new createjs.Stage(canvas);

    createjs.Touch.enable(Main.stage);
    Main.stage.enableMouseOver(30);
    Main.stage.mouseMoveOutside = true;

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

    ManipulatorManager.instanceGetter().init(Main.stage, 910, 620, managerHelper, dcf);

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

    /*constructor() {
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
    }*/
}