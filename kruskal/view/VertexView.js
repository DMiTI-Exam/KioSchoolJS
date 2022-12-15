import { Vertex } from "../model/Vertex.js";
import { Globals } from "../utils/Global.js";
import { Utils } from "../utils/Utils.js";

export class VertexView extends createjs.Container {
    #x;
    #y;
    #v;
    #mainShape;

    constructor(v, p = null)
    {
        super();

        this.#mainShape = new createjs.Shape();
        this.addChild(this.#mainShape);

        if (p) {
            this.#x = p.x;
            this.#y = p.y;
        } else {
            this.#x = v.xGetter();
            this.#y = v.yGetter();
        }

        this.#v = v;

        let self = this;
        v.addEventListener(Vertex.COLOR_CHANGED, function () {
            self.#repaintEventHandler(self);
        });

        this.#paint();
    }

    #repaintEventHandler(self) {
        self.#paint();
    }

    #paint() {
        //0x{00..79}{00..79}{00..79}
        //there are not greater than 40 vertices
        let color = Utils.getColorByInd(this.#v.colorGetter());

        this.#mainShape.graphics.clear();
        this.#mainShape.graphics.beginFill(color);
        this.#mainShape.graphics.drawCircle(this.#x, this.#y, Globals.POINT_RADIUS);
        this.#mainShape.graphics.endFill();
    }

    posXSetter(value) {
        this.#x = value;
        this.#paint();
    }

    posYSetter(value) {
        this.#y = value;
        this.#paint();
    }
}