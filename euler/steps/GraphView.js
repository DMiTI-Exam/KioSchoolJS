import { IStepView } from "../../kioschool/view/IStepView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { EulerController } from "../controller/EulerController.js";

export class GraphView extends IStepView {
    static prevVertex;

    x1;
    y1;
    xdiff;
    ydiff;
    scale = 3.5;
    xx1;
    yy1;
    #minimize = true;

    constructor(b = true) {
        super();

        this.#minimize = b;
    }

    draw(workspace) {
        let container = new createjs.Container();
        let shape = new createjs.Shape();
        workspace.addChild(shape);
        shape.graphics.beginFill("#8ED2FF");
        shape.graphics.drawRect(0, 0, 630, 600);
        shape.graphics.endFill();
        container.addChild(shape);

        container.addChild(EulerController.instanceGetter().graphGetter().viewGetter());

        if (this.#minimize) {
            this.addMask(container);
        }

        workspace.addChild(container);

        if (this.#minimize) {
            this.#navigate();
        } else {
            EulerController.instanceGetter().graphGetter().viewGetter().scaleX = 1;
            EulerController.instanceGetter().graphGetter().viewGetter().scaleY = 1;
            EulerController.instanceGetter().graphGetter().viewGetter().x = 20;
            EulerController.instanceGetter().graphGetter().viewGetter().y = 20;
        }
    }

    #navigate() {
        let v = EulerController.instanceGetter().currentVertexGetter();
        if (GraphView.prevVertex == null) {
            GraphView.prevVertex = v;
        }

        EulerController.instanceGetter().graphGetter().viewGetter().scaleX = this.scale;
        EulerController.instanceGetter().graphGetter().viewGetter().scaleY = this.scale;

        let xs1 = GraphView.prevVertex.viewsGetter()[0].x;
        let ys1 = GraphView.prevVertex.viewsGetter()[0].y;

        this.x1 = v.viewsGetter()[0].x;
        this.y1 = v.viewsGetter()[0].y;

        this.xdiff = (this.x1 - xs1)/30;
        this.ydiff = (this.y1 - ys1)/30;

        GraphView.prevVertex = v;

        if (this.xdiff === 0 && this.ydiff === 0) {
            let shiftX = 320 - this.x1 * this.scale;
            let shiftY = 270 - this.y1 * this.scale;
            EulerController.instanceGetter().graphGetter().viewGetter().x = shiftX;
            EulerController.instanceGetter().graphGetter().viewGetter().y = shiftY;
            return;
        }

        this.xx1 = xs1;
        this.yy1 = ys1;

        ManipulatorManager.instanceGetter().lock();

        let counter = 30;
        let self = this;
        const intervalId = setInterval(() => {
            self.xx1 = self.xx1 + self.xdiff;
            self.yy1 = self.yy1 + self.ydiff;
            let shiftX = 320 - self.xx1 * self.scale;
            let shiftY = 270 - self.yy1 * self.scale;
            EulerController.instanceGetter().graphGetter().viewGetter().x = shiftX;
            EulerController.instanceGetter().graphGetter().viewGetter().y = shiftY;

            counter -= 1;
            if (counter === 0) {
                ManipulatorManager.instanceGetter().unlock();
                clearInterval(intervalId);
            }
        }, 20);
    }

    addMask(sp) {
        let mask = new createjs.Shape();
        mask.graphics.drawEllipse(10, 10, 600, 450);
        sp.addChild(mask);
        sp.mask = mask;
    }
}