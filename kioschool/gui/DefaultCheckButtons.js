/**
 * Представление панели навигации, предоставляемое по умолчанию
 */
export class DefaultCheckButtons extends createjs.Container {
    /**
     * Кнопка генерации - транскодинг
     */
    reset_btn;

    /**
     * Кнопка отправки ответа - транскодинг
     */
    send_btn;

    resetButtonHelper;
    sendButtonHelper;

    /**
     * Конструктор, настраивает менеджер компоновки
     */
    constructor() {
        super();

        let sendButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/send_check_button.png"],
            "frames": {"regX": 0, "height": 33, "count": 3, "regY": 0, "width": 142},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.send_btn = new createjs.Sprite(sendButtonSheet, "source");
        this.sendButtonHelper = new createjs.ButtonHelper(this.send_btn, "source", "hover", "click", false, null, "hit");

        let resetButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/reset_check_button.png"],
            "frames": {"regX": 0, "height": 33, "count": 3, "regY": 0, "width": 126},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.reset_btn = new createjs.Sprite(resetButtonSheet, "source");
        this.resetButtonHelper = new createjs.ButtonHelper(this.reset_btn, "source", "hover", "click", false, null, "hit");
        this.reset_btn.x = 142;

        this.addChild(this.send_btn);
        this.addChild(this.reset_btn);
    }
}