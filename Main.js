import { Main as DijkstraMain } from "./dijkstra/Main.js";
import { Main as EulerMain } from "./euler/Main.js";
import { Main as HorseMain } from "./horse/Main.js";
import { Main as HuffmanMain } from "./huffman/Main.js";
import { Main as KruskalMain } from "./kruskal/Main.js";
import { Main as MatchingMain } from "./matching/Main.js";
// TODO: import { Main as PrimMain } from "./prim/Main.js";

window.onload = function () {
    new Main();
}

export class Main {
    static loader;
    static stage;

    constructor() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js');
        }

        let manifest = [
            {src: "comment.png", id: "1"},
            {src: "control_button.png", id: "2"},
            {src: "demo_button.png", id: "3"},
            {src: "error_comment.png", id: "4"},
            {src: "help_round_button.png", id: "5"},
            {src: "help_round_button_back.png", id: "6"},
            {src: "next_navigation_button.png", id: "7"},
            {src: "prev_navigation_button.png", id: "8"},
            {src: "reset_check_button.png", id: "9"},
            {src: "send_check_button.png", id: "10"},
            {src: "train_button.png", id: "11"}
        ];

        Main.loader = new createjs.LoadQueue(false);
        Main.loader.addEventListener("complete", function() {
            Main.startModule();
        });
        Main.loader.loadManifest(manifest, true, "kioschool/_resource/");
    }

    static startModule() {
        Main.loader.removeAllEventListeners();

        let canvas = document.getElementById("testCanvas");
        Main.stage = new createjs.Stage(canvas);
        Main.stage.enableMouseOver(30);

        let moduleName = document.getElementById("$module_name$").value;
        if (moduleName === 'dijkstra') {
            // TODO: remove after all modules done, images [12 - 27]
            new DijkstraMain();
        } else if (moduleName === 'euler') {
            // TODO: remove after all modules done, images [28 - 33]
            new EulerMain();
        } else if (moduleName === 'horse') {
            // TODO: remove after all modules done, images [34 - 38]
            new HorseMain();
        } else if (moduleName === 'huffman') {
            // TODO: remove after all modules done, images [39 - 40]
            new HuffmanMain();
        } else if (moduleName === 'kruskal') {
            // TODO: remove after all modules done, images [41 - 48]
            new KruskalMain();
        } else if (moduleName === 'matching') {
            // TODO: remove after all modules done, images [49 - 55]
            new MatchingMain();
        } else if (moduleName === 'prim') {
            // TODO: remove after all modules done, images [ - ]
            // TODO: new PrimMain();
        }

        createjs.Ticker.on("tick", (_) => {
            Main.stage.update();
        });
    }
}