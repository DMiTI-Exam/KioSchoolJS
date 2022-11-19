import { Node } from "./Node.js";
import { TextField } from "../../additionalComponents/TextField.js";

export class HuffmanTree {
    #nodes = [];

    constructor() {
    }

    addNode(node) {
        this.#nodes.push(node);
    }

    nodesGetter() {
        return this.#nodes;
    }

    leavesGetter() {
        let leaves = [];
        for (let i = 0; i < this.#nodes.length; i++) {
            if (this.#nodes[i].levelGetter() === 0) {
                leaves.push(this.#nodes[i]);
            }
        }

        return leaves;
    }

    generateProbability() {
        let sum = this.#getSumProbability();
        let coefficient = Math.floor(100 / (sum + 1));
        let leaves = this.leavesGetter();
        for (let i = 0; i < leaves.length; i++) {
            leaves[i].probabilitySetter(leaves[i].probabilityGetter() * coefficient);
        }

        while (this.#getSumProbability() < 100) {
            let node = leaves[Math.floor(Math.random() * leaves.length)];
            node.probabilitySetter(node.probabilityGetter() + 1);
        }
    }

    #getSumProbability() {
        let sum = 0;
        let leaves = this.leavesGetter();
        for (let i = 0; i < leaves.length; i++) {
            sum += leaves[i].probabilityGetter();
        }

        return sum;
    }

    glue(node1, node2) {
        let first = node1.xGetter() > node2.xGetter() ? node2 : node1;
        let second = node1.xGetter() > node2.xGetter() ? node1 : node2;
        let parentNode = new Node(first.symbolsGetter() + second.symbolsGetter(), 0, this.#maxLevelGetter() + 1);
        node1.parentSetter(parentNode);
        node2.parentSetter(parentNode);
        parentNode.firstChildSetter(first);
        parentNode.secondChildSetter(second);
        this.addNode(parentNode);
        return parentNode;
    }

    #maxLevelGetter() {
        let maxLevel = 0;
        for (let i = 0; i < this.#nodes.length; i++) {
            maxLevel = Math.max(maxLevel, this.#nodes[i].levelGetter());
        }

        return maxLevel;
    }

    isFinishGlue() {
        let amountWithoutParent = 0;
        for (let i = 0; i < this.#nodes.length; i++) {
            if (this.#nodes[i].parentGetter() == null) {
                amountWithoutParent++;
                if (amountWithoutParent > 2) {
                    return false;
                }
            }
        }

        return amountWithoutParent === 2;
    }

    isAllCoded() {
        for (let i = 0; i < this.#nodes.length; i++) {
            if (this.#nodes[i].codeGetter() === "") {
                return false;
            }
        }

        return true;
    }

    getCode(s) {
        for (let node of this.nodesGetter()) {
            if (node.symbolsGetter() === s) {
                return node.codeGetter();
            }
        }

        return null;
    }

    getSymbol(buffer) {
        for (let node of this.nodesGetter()) {
            if (node.levelGetter() !== 0) {
                continue;
            }

            if (node.codeGetter() === buffer) {
                return node.symbolsGetter();
            }
        }

        return null;
    }

    remove(node) {
        for (let i = 0; i < this.nodesGetter().length; i++) {
            if (this.nodesGetter()[i] === node) {
                TextField.removeInputsByName(this.nodesGetter()[i].viewGetter().getTextFieldName());
                this.nodesGetter().splice(i, 1);
                return;
            }
        }
    }

    getSelectedNodes() {
        let selectedNodes = [];
        for (let node of this.nodesGetter()) {
            if (node.selectedGetter()) {
                selectedNodes.push(node);
            }
        }

        return selectedNodes;
    }
}