import { HelpManager } from "../kioschool/controller/HelpManager.js";
import { Page1 } from "./gui/Page1.js";
import { Page2 } from "./gui/Page2.js";
import { Page3 } from "./gui/Page3.js";
import { Man } from "./gui/Man.js";
import { AngryMan } from "./gui/AngryMan.js";
import { ManipulatorManager } from "../kioschool/controller/ManipulatorManager.js";
import { MatchingController } from "./controller/MatchingController.js";
import { MatchingControlsFactory } from "./views/controls/MatchingControlsFactory.js";

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

        {src: "matching/_resource/comment.png", id: "12"},
        {src: "matching/_resource/error_comment.png", id: "13"},
        {src: "matching/_resource/man.png", id: "14"},
        {src: "matching/_resource/man_angry.png", id: "15"},
        {src: "matching/_resource/page1.png", id: "16"},
        {src: "matching/_resource/page2.png", id: "17"},
        {src: "matching/_resource/page3.png", id: "18"}
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

    ManipulatorManager.instanceGetter().init(Main.stage, 900, 600, MatchingController.instanceGetter(),
        new MatchingControlsFactory(man, 0, 10, 80, 250, angryMan));

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
        Main.stage = new createjs.Stage(canvas);

        Main.stage.enableMouseOver(30);

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

        ManipulatorManager.instanceGetter().init(Main.stage, 900, 600, MatchingController.instanceGetter(),
            new MatchingControlsFactory(man, 0, 10, 80, 250, angryMan));

        createjs.Ticker.on("tick", (_) => {
            Main.stage.update();
        });
    }
}