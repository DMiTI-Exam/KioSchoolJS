import { Main } from "../../Main.js";

/**
 * Представление панели навигации, предоставляемое по умолчанию
 */
export class DefaultNavigationButtons extends createjs.Container {
    /**
     * Кнопка перехода на следующий шаг - транскодинг
     */
    next_btn;

    /**
     * Кнопка перехода на предыдущий шаг - транскодинг
     */
    prev_btn;

    nextButtonHelper;
    prevButtonHelper;

    /**
     * Конструктор, настраивает менеджер компоновки
     */
    constructor() {
        super();

        let prevButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [Main.loader.getResult("8")],
            "frames": {"regX": 0, "height": 49, "count": 3, "regY": 0, "width": 49},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.prev_btn = new createjs.Sprite(prevButtonSheet, "source");
        this.prevButtonHelper = new createjs.ButtonHelper(this.prev_btn, "source", "hover", "click", false, null, "hit");

        let nextButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": [Main.loader.getResult("7")],
            "frames": {"regX": 0, "height": 49, "count": 3, "regY": 0, "width": 49},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.next_btn = new createjs.Sprite(nextButtonSheet, "source");
        this.nextButtonHelper = new createjs.ButtonHelper(this.next_btn, "source", "hover", "click", false, null, "hit");
        this.next_btn.x = 65;

        this.addChild(this.prev_btn);
        this.addChild(this.next_btn);
    }
}