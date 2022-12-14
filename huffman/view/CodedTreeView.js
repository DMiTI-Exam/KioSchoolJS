import { TreeView } from "./TreeView.js";
import { ColorUtil } from "../../kioschool/util/ColorUtil.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { BuildCodeStep } from "../steps/BuildCodeStep.js";

export class CodedTreeView extends TreeView {
    #tfCode;

    constructor() {
        super();
    }

    draw(workspace) {
        super.draw(workspace);

        TextField.removeInputsByName("codedTreeView");

        let splitter = new createjs.Shape();
        splitter.setBounds(0, 0, 0, 0);
        workspace.addChild(splitter);
        splitter.graphics.setStrokeStyle(3);
        splitter.graphics.beginStroke(ColorUtil.DARK_GRAY);
        splitter.graphics.moveTo(20, 465);
        splitter.graphics.lineTo(560, 465);

        let textFieldsContainer = new createjs.Container();
        let tfWord = new TextField(textFieldsContainer, "codedTreeView");
        let tfCode = new TextField(textFieldsContainer, "codedTreeView");

        tfWord.setText(HuffmanController.instanceGetter().firstWordGetter());
        tfWord.setX(20);
        tfWord.setY(490);
        tfWord.setType("dynamic");
        tfWord.setSelectable(false);

        tfCode.setText(HuffmanController.instanceGetter().firstWordCodeGetter());
        tfCode.setX(110);
        tfCode.setY(490);

        let textFormat = new TextFormat("Arial", 13, "#000000", true);
        tfWord.setTextFormat(textFormat);
        tfCode.setTextFormat(textFormat);
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof BuildCodeStep) {
            tfCode.setBorder(true);
        }
        tfCode.setHeight(15);
        tfCode.setWidth(100);

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof BuildCodeStep &&
            ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
            tfCode.setType("input");
            this.#tfCode = tfCode;

            let self = this;
            this.#tfCode.addEventListener("input", function () {
                self.#updatecode(self);
            });
        } else {
            tfCode.setType("dynamic");
            tfCode.setSelectable(false);
        }

        textFieldsContainer.x = 15;
        textFieldsContainer.y = 55;
        workspace.addChild(textFieldsContainer);
    }

    #updatecode(self) {
        ManipulatorManager.instanceGetter().currentStepGetter().userCodeSetter(self.#tfCode.getText());
    }
}