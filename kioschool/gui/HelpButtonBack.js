export class HelpButtonBack extends createjs.Container {
    helpRoundButtonBackHelper;

    constructor() {
        super();

        let helpRoundButtonBackSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/help_round_button_back.png"],
            "frames": {"regX": 0, "height": 36, "count": 3, "regY": 0, "width": 54},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        let helpRoundButtonBack = new createjs.Sprite(helpRoundButtonBackSheet, "source");
        this.helpRoundButtonBackHelper = new createjs.ButtonHelper(helpRoundButtonBack,
            "source", "hover", "click", false, null, "hit");

        this.addChild(helpRoundButtonBack);
    }
}