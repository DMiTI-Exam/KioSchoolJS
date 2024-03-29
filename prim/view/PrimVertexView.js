import { IPointContainer } from "../additionalInterfaces/IPointContainer.js";

/**
 * Представление вершины для алгоритма Прима
 */
export class PrimVertexView extends IPointContainer {
    #vertex;
    normal;
    #inTree;

    constructor(mc) {
        super();

        this.#inTree = mc.getChildByName("VFill2_mc");
        this.normal = mc.getChildByName("VFill1_mc");

        this.x = mc.x;
        this.y = mc.y;
        this.addChild(this.normal);
        this.addChild(this.#inTree);

        this.#inTree.visible = false;
    }

    pxGetter() {
        return this.x;
    }

    pyGetter() {
        return this.y;
    }

    vertexGetter() {
        return this.#vertex;
    }

    vertexSetter(value) {
        this.#vertex = value;
    }

    update() {
        if (this.vertexGetter().inTreeGetter()) {
            this.#inTree.visible = true;
        } else  {
            this.#inTree.visible = false;
        }
    }
}