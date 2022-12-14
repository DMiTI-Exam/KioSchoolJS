import { IManipulatorHelper } from "../../kioschool/controller/IManipulatorHelper.js";
import { HuffmanTree } from "../model/HuffmanTree.js";
import { SymbolsGenerator } from "./SymbolsGenerator.js";
import { Node } from "../model/Node.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { GlueStep } from "../steps/GlueStep.js";
import { Item } from "../model/Item.js";
import { CalcWeightStep } from "../steps/CalcWeightStep.js";
import { CalcCodeStep } from "../steps/CalcCodeStep.js";
import { TextField } from "../../additionalComponents/TextField.js";
import { NodeView } from "../view/NodeView.js";

/**
 * Контроллер манипулятора
 */
export class HuffmanController extends IManipulatorHelper {
    static ID = "huffman";

    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    #huffmanTree = new HuffmanTree();
    #firstWord;
    #firstWordCode = "";
    #secondWord;
    #leftCode;
    #encodedWord = "";
    #items = [];

    static instanceGetter() {
        if (HuffmanController.#instance == null) {
            HuffmanController.#canConstruct = true;
            HuffmanController.#instance = new HuffmanController();
            HuffmanController.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        super();

        if (!HuffmanController.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    idGetter() {
        return HuffmanController.ID;
    }

    huffmanTreeGetter() {
        return this.#huffmanTree;
    }

    init() {
        TextField.removeInputsByName("codedTreeView");
        TextField.removeInputsByName("encodedTreeView");
        TextField.removeInputsByName("itemView");
        for (let i = 0; i < NodeView.nodeNames.length; i++) {
            TextField.removeInputsByName(NodeView.nodeNames[i]);
        }

        this.#huffmanTree = new HuffmanTree();
        let words = SymbolsGenerator.generateWords();
        this.#firstWord = words["first"];
        this.#secondWord = words["second"];
        let letters = words["letters"];
        for (let i = 0; i < letters.length; i++) {
            this.#huffmanTree.addNode(new Node(letters[i], HuffmanController
                .#getAmountInWord(letters[i], this.#firstWord) +
                HuffmanController.#getAmountInWord(letters[i], this.#secondWord)));
        }

        this.#huffmanTree.generateProbability();

        this.#firstWordCode = "";
        this.#encodedWord = "";
        this.#items = [];
    }

    static #getAmountInWord(letter, word) {
        let counter = 0;
        for (let i = 0; i < word.length; i++) {
            if (letter === word.charAt(i)) {
                counter++;
            }
        }

        return counter;
    }

    regimeChanged(regime) {
        if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof GlueStep) {
            for (let node of this.huffmanTreeGetter().nodesGetter()) {
                node.viewGetter().disableFields();
            }
        } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalcWeightStep) {
            for (let node of this.huffmanTreeGetter().nodesGetter()) {
                node.viewGetter().enableWeightField();
            }
        } else if (ManipulatorManager.instanceGetter().currentStepGetter() instanceof CalcCodeStep) {
            for (let node of this.huffmanTreeGetter().nodesGetter()) {
                node.viewGetter().enableCodeField();
            }
        }
    }

    firstStepGetter() {
        return new GlueStep();
    }

    greetingGetter() {
        return "Закодируйте строку";
    }

    redrawInFinalGetter() {
        return false;
    }

    redraw(workspace) {
    }

    leftCodeSetter(leftCode) {
        this.#leftCode = leftCode;
    }

    leftCodeGetter() {
        return this.#leftCode;
    }

    rightCodeGetter() {
        return this.#leftCode === "0" ? "1" : "0";
    }

    firstWordCodeGetter() {
        return this.#firstWordCode;
    }

    firstWordCodeSetter(value) {
        this.#firstWordCode = value;
    }

    firstWordGetter() {
        return this.#firstWord;
    }

    secondWordGetter() {
        return this.#secondWord;
    }

    encodedWordGetter() {
        return this.#encodedWord;
    }

    encodedWordSetter(value) {
        this.#encodedWord = value;
    }

    isAllItemDeleted() {
        for (let item of this.#items) {
            if (!item.deletedGetter()) {
                return false;
            }
        }

        return true;
    }

    buildItems() {
        if (this.#items.length === 0) {
            for (let i = 0; i < this.secondWordGetter().length; i++) {
                let code = this.huffmanTreeGetter().getCode(this.secondWordGetter().charAt(i));
                for (let j = 0; j < code.length; j++) {
                    this.#items.push(new Item(code.charAt(j)));
                }
            }
        }
    }

    itemsGetter() {
        return this.#items;
    }

    getDeletedAndNotFixed() {
        let vec = [];
        for (let item of this.#items) {
            if (!item.fixedGetter() && item.deletedGetter()) {
                vec.push(item);
            }
        }

        return vec;
    }

    equal(firstArray, secondArray) {
        if (firstArray.length !== secondArray.length) {
            return false;
        }

        let equal = true;
        for (let item of firstArray) {
            if (secondArray.indexOf(item) === -1) {
                equal = false;
            }
        }

        return equal;
    }

    needKeyboard() {
        return true;
    }
}