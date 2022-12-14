import { View } from "../../kioschool/basic/view/View.js";

/**
 * Представление ребра для алгоритма Дейкстра
 */
export class DijkstraEdgeView extends View {
    #edge;
    #tf;

    /**
     * Мувик для простого фона - не включенного в дерево
     */
    normalbg_mc;

    /**
     * Мувик для выделенного фона - включенного в дерево
     */
    #selectedbg_mc;

    constructor(clip) {
        super();
        this.normalbg_mc = clip.getChildByName("fill1_mc");
        this.#selectedbg_mc = clip.getChildByName("fill2_mc");

        //добаляем контент ребра - домики и т.д.
        let x = clip.x;
        let y = clip.y;

        this.addChild(clip);

        //добавляем дорожки
        this.addChild(this.normalbg_mc);
        this.addChild(this.#selectedbg_mc);

        this.normalbg_mc.x = x;
        this.normalbg_mc.y = y;
        this.normalbg_mc.scaleX = clip.scaleX;
        this.normalbg_mc.scaleY = clip.scaleY;
        this.normalbg_mc.rotation = clip.rotation;

        this.#selectedbg_mc.x = x;
        this.#selectedbg_mc.y = y;
        this.#selectedbg_mc.scaleX = clip.scaleX;
        this.#selectedbg_mc.scaleY = clip.scaleY;
        this.#selectedbg_mc.rotation = clip.rotation;

        this.#tf = new createjs.Text("", "bold 12px Arial", "#000000");
        this.#tf.setBounds(0, 0, 25, 20);
        this.#placeTextInTheMiddle(this.#tf);
    }

    tfGetter() {
        return this.#tf;
    }

    edgeGetter() {
        return this.#edge;
    }

    edgeSetter(value) {
        this.#edge = value;
    }

    /**
     * Располагает текст в центре
     * @param	tf
     */
    #placeTextInTheMiddle(tf) {
        let secondPoint = this.#getSecondPoint();
        tf.x = this.x + (this.normalbg_mc.x + secondPoint.x) / 2;
        tf.y = this.y + (this.normalbg_mc.y + secondPoint.y) / 2;
    }

    /**
     * Возвращает второй конец ребра
     * @return
     */
    #getSecondPoint() {
        let container = new createjs.Container();
        container.addChild(_.clone(this.normalbg_mc));

        if(this.normalbg_mc.rotation >= 0 && this.normalbg_mc.rotation < 90) {
           return new createjs.Point(this.normalbg_mc.x - container.getBounds().width,
               this.normalbg_mc.y + container.getBounds().height);
        } else if (this.normalbg_mc.rotation >= 90 && this.normalbg_mc.rotation <= 180) {
             return new createjs.Point(this.normalbg_mc.x - container.getBounds().width,
                 this.normalbg_mc.y - container.getBounds().height);
        } else if (this.normalbg_mc.rotation >= -90 && this.normalbg_mc.rotation <= 0) {
              return new createjs.Point(this.normalbg_mc.x + container.getBounds().width,
                  this.normalbg_mc.y + container.getBounds().height);
        } else if (this.normalbg_mc.rotation >= -180 && this.normalbg_mc.rotation < -90) {
            return new createjs.Point(this.normalbg_mc.x + container.getBounds().width,
                this.normalbg_mc.y - container.getBounds().height);
        }

        return null;
    }

    update() {
        if (this.edgeGetter().inTreeGetter()) {
            this.#selectedbg_mc.visible = true;
        } else {
            this.#selectedbg_mc.visible = false;
        }

        this.#tf.text = this.edgeGetter().weightGetter() + "";
        this.#tf.font = "12px Arial";
    }
}