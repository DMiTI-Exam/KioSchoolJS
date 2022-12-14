export class NotApplyButton extends createjs.Container {
    notApplyButtonHelper;

    constructor() {
        super();

        let notApplyButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kruskal/_resource/not_apply.png"],
            "frames": {"regX": 0, "height": 33, "count": 3, "regY": 0, "width": 33},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        let notApplyButton = new createjs.Sprite(notApplyButtonSheet, "source");
        notApplyButton.scaleX = 1.1;
        notApplyButton.scaleY = 1.1;
        this.notApplyButtonHelper = new createjs.ButtonHelper(notApplyButton,
            "source", "hover", "click", false, null, "hit");

        this.addChild(notApplyButton);
    }
}