export class HelpButton extends createjs.Container {
    helpRoundButtonHelper;

    constructor() {
        super();

        let helpRoundButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/help_round_button.png"],
            "frames": {"regX": 0, "height": 34, "count": 3, "regY": 0, "width": 34},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        let helpRoundButton = new createjs.Sprite(helpRoundButtonSheet, "source");
        this.helpRoundButtonHelper = new createjs.ButtonHelper(helpRoundButton,
            "source", "hover", "click", false, null, "hit");

        this.addChild(helpRoundButton);
    }
}