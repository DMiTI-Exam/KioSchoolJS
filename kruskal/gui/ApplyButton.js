import { Main } from "../../Main.js";

export class ApplyButton extends createjs.Container {
    applyButtonHelper;

    constructor() {
        super();

        let applyButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [Main.loader.getResult("41")],
            "frames": {"regX": 0, "height": 33, "count": 3, "regY": 0, "width": 33},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        let applyButton = new createjs.Sprite(applyButtonSheet, "source");
        applyButton.scaleX = 1.1;
        applyButton.scaleY = 1.1;
        this.applyButtonHelper = new createjs.ButtonHelper(applyButton,
            "source", "hover", "click", false, null, "hit");

        this.addChild(applyButton);
    }
}