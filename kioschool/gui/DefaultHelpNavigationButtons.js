/**
 * Представление панели навигации, предоставляемое по умолчанию
 */
export class DefaultHelpNavigationButtons extends createjs.Container {
    /**
     * Кнопка перехода на следующий шаг - транскодинг
     */
    next_btn;

    /**
     * Кнопка перехода на предыдущий шаг - транскодинг
     */
    prev_btn;

    help_txt;

    nextButtonHelper;
    prevButtonHelper;

    /**
     * Конструктор, настраивает менеджер компоновки
     */
    constructor() {
        super();

        let prevButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/prev_navigation_button.png"],
            "frames": {"regX": 0, "height": 49, "count": 3, "regY": 0, "width": 49},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.prev_btn = new createjs.Sprite(prevButtonSheet, "source");
        this.prevButtonHelper = new createjs.ButtonHelper(this.prev_btn, "source", "hover", "click", false, null, "hit");

        this.help_txt = new createjs.Text("1/9", "bold 14px Verdana", "#666666");
        this.help_txt.x = 49 + 10;
        this.help_txt.y = 20;

        let nextButtonSheet = new createjs.SpriteSheet({
            framerate: 30,
            "images": ["kioschool/_resource/next_navigation_button.png"],
            "frames": {"regX": 0, "height": 49, "count": 3, "regY": 0, "width": 49},
            "animations": {
                "source": [0],
                "hover": [1],
                "click": [2]
            }
        });

        this.next_btn = new createjs.Sprite(nextButtonSheet, "source");
        this.nextButtonHelper = new createjs.ButtonHelper(this.next_btn, "source", "hover", "click", false, null, "hit");
        this.next_btn.x = 49 + this.help_txt.getMeasuredWidth() + 20;

        this.addChild(this.prev_btn);
        this.addChild(this.help_txt);
        this.addChild(this.next_btn);
    }
}