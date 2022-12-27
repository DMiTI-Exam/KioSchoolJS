import { CodedTreeView } from "./CodedTreeView.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { TextFormat } from "../../additionalComponents/TextFormat.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { HuffmanController } from "../controller/HuffmanController.js";
import { EncodeStep } from "../steps/EncodeStep.js";

export class EncodedTreeView extends CodedTreeView {
    #tfSymbol;

    constructor() {
        super();
    }

    draw(workspace) {
        super.draw(workspace);

        TextField.removeInputsByName("encodedTreeView");
        TextField.showByName("itemView");

        HuffmanController.instanceGetter().buildItems();

        let textFieldContainer = new createjs.Container();
        let tfWord = new TextField(textFieldContainer, "encodedTreeView");
        tfWord.setText(HuffmanController.instanceGetter().encodedWordGetter());

        // decoded word

        let xOffset = -15;
        let yOffset = -7;

        tfWord.setY(490 + yOffset);
        tfWord.setX(250 + xOffset + 20 * HuffmanController.instanceGetter().itemsGetter().length + 20);
        tfWord.setType("dynamic");
        tfWord.setSelectable(false);

        //xOffset = 0;
        //yOffset = 0;

        this.#tfSymbol = new TextField(textFieldContainer, "encodedTreeView");
        this.#tfSymbol.setY(490 + yOffset);
        this.#tfSymbol.setX(250 + xOffset + 20 * HuffmanController.instanceGetter().itemsGetter().length + 24 +
            tfWord.getText().length * 8);
        this.#tfSymbol.setType("dynamic");
        this.#tfSymbol.setSelectable(false);

        let textFormat = new TextFormat("Arial", 13, "#000000", true, null, null, null, null, 18);
        tfWord.setTextFormat(textFormat);
        this.#tfSymbol.setBorder(true);

        let hOffset = 15;

        tfWord.setHeight(15 + hOffset);
        tfWord.setWidth(80);

        hOffset = 5;

        this.#tfSymbol.setTextFormat(textFormat);
        this.#tfSymbol.setWidth(20);
        this.#tfSymbol.setHeight(15 + hOffset);

        HuffmanController.instanceGetter().buildItems();

        for (let i = 0; i < HuffmanController.instanceGetter().itemsGetter().length; i++) {
            HuffmanController.instanceGetter().itemsGetter()[i].viewGetter().y = 490;
            HuffmanController.instanceGetter().itemsGetter()[i].viewGetter().x = 250 + 20 * i;
            workspace.addChild(HuffmanController.instanceGetter().itemsGetter()[i].viewGetter());
            HuffmanController.instanceGetter().itemsGetter()[i].viewGetter().update();
        }

        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof EncodeStep &&
            ManipulatorManager.instanceGetter().regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
            this.#tfSymbol.setType("input");
            this.#tfSymbol.setSelectable(true);

            let self = this;
            this.#tfSymbol.addEventListener("input", function () {
                self.#updatecode(self);
            });
        }

        textFieldContainer.x = 15;
        textFieldContainer.y = 55;
        workspace.addChild(textFieldContainer);
    }

    #updatecode(self) {
        ManipulatorManager.instanceGetter().currentStepGetter().userSymbolSetter(self.#tfSymbol.getText());
    }
}