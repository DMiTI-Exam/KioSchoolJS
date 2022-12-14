import { IStepViewContainer } from "../additionalInterfaces/IStepViewContainer.js";
import { ColorUtil } from "../../kioschool/util/ColorUtil.js";
import { HuffmanController } from "../controller/HuffmanController.js";

export class TreeView extends IStepViewContainer {
    constructor() {
        super();
    }

    draw(workspace) {
        let sp = new createjs.Shape();
        sp.setBounds(0, 0, 0, 0);
        workspace.addChild(sp);
        sp.graphics.lineTo(600, 600);
        sp.graphics.setStrokeStyle(2);
        sp.graphics.beginStroke(ColorUtil.GREEN);

        let startX = 50;
        let startY = 20;

        let diffX = 90;
        let diffY = 90;

        let leavesCounter = 0;

        for (let i = 0; i < HuffmanController.instanceGetter().huffmanTreeGetter().nodesGetter().length; i++) {
            let node = HuffmanController.instanceGetter().huffmanTreeGetter().nodesGetter()[i];
            if (node.levelGetter() === 0) {
                node.xSetter(startX + leavesCounter * diffX);
                node.ySetter(startY);
                leavesCounter++;
            } else {
                node.xSetter(Math.min(node.firstChildGetter().xGetter(), node.secondChildGetter().xGetter()) + 10);
                node.ySetter(startY + node.levelGetter() * diffY);
            }

            node.viewGetter().update();
            workspace.addChild(node.viewGetter());
            if (node.firstChildGetter() != null) {
                sp.graphics.moveTo(node.xGetter() + 25, node.yGetter());
                sp.graphics.lineTo(node.firstChildGetter().xGetter() + 25, node.firstChildGetter().yGetter() + 60);
            }

            if (node.secondChildGetter() != null) {
                sp.graphics.moveTo(node.xGetter() + 25, node.yGetter());
                sp.graphics.lineTo(node.secondChildGetter().xGetter() + 25, node.secondChildGetter().yGetter() + 60);
            }
        }
    }
}