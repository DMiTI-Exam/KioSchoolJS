/**
 * Кнопки смены режима манипулятора, используемые по умолчанию
 *
 * Ожидаемая высота символов 41
 */
export class DefaultRegimeButtons extends createjs.Container {
    demoBtn;
    trainBtn;
    controlBtn;

    demoButtonHelper;
    trainButtonHelper;
    controlButtonHelper;

    /**
     * Прошлая выделенная кнопка
     */
    #lastSelectedButton;

    /**
     * Необходим для сохранения объекта отображения нормального состояния
     */
    #savedUpState;

    /**
     * Необходим для сохранения объекта отображения нормального состояния
     */
    #savedOverState;

    constructor() {
        super();

        let hitArea = new createjs.Shape();
        hitArea.graphics.beginFill("#FFFFFF");
        hitArea.graphics.drawRect(0, 0, 172, 35);
        hitArea.alpha = 0.01;
        this.addChild(hitArea);

        let demoButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/demo_button.png"],
            "frames": {"regX": 0, "height": 35, "count": 3, "regY": 0, "width": 172},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.demoBtn = new createjs.Sprite(demoButtonSheet, "source");
        this.demoButtonHelper = new createjs.ButtonHelper(this.demoBtn,
            "source", "hover", "click", false, hitArea, "hit");

        let trainButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/train_button.png"],
            "frames": {"regX": 0, "height": 35, "count": 3, "regY": 0, "width": 172},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.trainBtn = new createjs.Sprite(trainButtonSheet, "source");
        this.trainButtonHelper = new createjs.ButtonHelper(this.trainBtn,
            "source", "hover", "click", false, hitArea, "hit");
        this.trainBtn.x = 172 + 50;

        let controlButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/control_button.png"],
            "frames": {"regX": 0, "height": 35, "count": 3, "regY": 0, "width": 172},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.controlBtn = new createjs.Sprite(controlButtonSheet, "source");
        this.controlButtonHelper = new createjs.ButtonHelper(this.controlBtn,
            "source", "hover", "click", false, hitArea, "hit");
        this.controlBtn.x = 344 + 100;

        this.addChild(this.demoBtn);
        this.addChild(this.trainBtn);
        this.addChild(this.controlBtn);
    }

    /**
     * Выделяет кнопку режима и снимает выделение с предыдущей
     */
    selectButton(button) {
        //восстанавливаем прошлую нажатую кнопку
        if (this.#lastSelectedButton != null) {
            this.#lastSelectedButton.target.mouseEnabled = true;

            this.#lastSelectedButton.outLabel = this.#savedUpState;
            this.#lastSelectedButton.overLabel = this.#savedOverState;

            this.#lastSelectedButton.target.gotoAndStop("source");
        }

        this.#savedUpState = button.outLabel;
        this.#savedOverState = button.overLabel;
        button.outLabel = button.downLabel;
        button.overLabel = button.downLabel;
        button.target.mouseEnabled = false;

        button.target.gotoAndStop("click");
        this.#lastSelectedButton = button;
    }
}