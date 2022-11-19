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
        tfWord.setY(490);
        tfWord.setX(250 + 20 * HuffmanController.instanceGetter().itemsGetter().length + 20);
        tfWord.setType("dynamic");
        tfWord.setSelectable(false);

        this.#tfSymbol = new TextField(textFieldContainer, "encodedTreeView");
        this.#tfSymbol.setY(490);
        this.#tfSymbol.setX(250 + 20 * HuffmanController.instanceGetter().itemsGetter().length + 24 +
            tfWord.getText().length * 7);
        this.#tfSymbol.setType("dynamic");
        this.#tfSymbol.setSelectable(false);
        console.log(this.#tfSymbol.getX());

        let textFormat = new TextFormat("Arial", 13, "#000000", true);
        tfWord.setTextFormat(textFormat);
        this.#tfSymbol.setBorder(true);
        tfWord.setHeight(15);
        tfWord.setWidth(80);

        this.#tfSymbol.setTextFormat(textFormat);
        this.#tfSymbol.setWidth(20);
        this.#tfSymbol.setHeight(15);

        HuffmanController.instanceGetter().buildItems();

        for (let i = 0; i < HuffmanController.instanceGetter().itemsGetter().length; i++) {
            HuffmanController.instanceGetter().itemsGetter()[i].viewGetter().y = 490;
            HuffmanController.instanceGetter().itemsGetter()[i].viewGetter().x = 250+20*i;
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