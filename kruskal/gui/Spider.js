import { Main } from "../../Main.js";

export class Spider extends createjs.Container {
    constructor() {
        super();

        let spiderSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [Main.loader.getResult("48")],
            "frames": {"regX": 0, "height": 358, "count": 414, "regY": 0, "width": 407},
            "animations": {
                "source": [0, 413]
            }
        });

        let spider = new createjs.Sprite(spiderSheet, "source");

        this.addChild(spider);
        this.setBounds(0, 0, 350, 310);
    }
}