export class EvilSpider extends createjs.Container {
    constructor() {
        super();

        let evilSpiderSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kruskal/_resource/evil_spider.png"],
            "frames": {"regX": 0, "height": 358, "count": 415, "regY": 0, "width": 407},
            "animations": {
                "source": [0, 414]
            }
        });

        let evilSpider = new createjs.Sprite(evilSpiderSheet, "source");

        this.addChild(evilSpider);
        this.setBounds(0, 0, 350, 310);
    }
}