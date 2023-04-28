import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { MatchingController } from "../controller/MatchingController.js";
import { HexogenAndChainView } from "./HexogenAndChainView.js";
import { SelectRhombStep } from "./SelectRhombStep.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";

export class FormGraphStep extends AbstractStep {
    #graph = MatchingController.instanceGetter().graphGetter();

    getView() {
        return new HexogenAndChainView();
    }

    next() {
        return new SelectRhombStep();
    }

    oracle() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].partMarkedSetter(this.#graph.vertexesGetter()[i].dotMarkedGetter());
        }

        let oddCount = 0;
        let evenCount = 0;

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (!this.#graph.vertexesGetter()[i].dotMarkedGetter()) {
                continue;
            }

            this.#graph.vertexesGetter()[i].lastFirstPartSetter(this.#graph.vertexesGetter()[i].firstPartGetter());
            this.#graph.vertexesGetter()[i].chainXSetter(
                this.#graph.vertexesGetter()[i].firstPartGetter() ? 70 : 260);
            this.#graph.vertexesGetter()[i].chainYSetter(
                this.#graph.vertexesGetter()[i].firstPartGetter() ? oddCount * 30 : evenCount * 30);
            if (this.#graph.vertexesGetter()[i].firstPartGetter()) {
                oddCount++;
            } else {
                evenCount++;
            }
        }

        this.#graph.buildSourcesAndTargets();
        this.#graph.rebuildViews();
    }

    antiOracle() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].partMarkedSetter(false);
        }

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].chainXSetter(this.#graph.vertexesGetter()[i].xGetter());
            this.#graph.vertexesGetter()[i].chainYSetter(this.#graph.vertexesGetter()[i].yGetter());
        }

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (!this.#graph.vertexesGetter()[i].dotMarkedGetter()) {
                continue;
            }

            this.#graph.vertexesGetter()[i].firstPartSetter(this.#graph.vertexesGetter()[i].lastFirstPartGetter());
        }

        this.#graph.sourcesSetter([]);
        this.#graph.targetsSetter([]);

        this.#graph.rebuildViews();
    }

    checkInput(textConsumer = null) {
        let err = null;

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].componentSetter(-1);
        }

        let arr = [];
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (this.#graph.vertexesGetter()[i].dotMarkedGetter()) {
                arr.push(this.#graph.vertexesGetter()[i]);
                break;
            }
        }

        let componentCount = 0;

        while (arr.length > 0) {
            let vertex = arr.shift();
            if (vertex.componentGetter() === -1) {
                vertex.componentSetter(componentCount);
                componentCount++;
                if (vertex.viewsGetter()[1].x < 170) {
                    vertex.firstPartSetter(true);
                } else {
                    vertex.firstPartSetter(false);
                }
            }

            for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
                if (this.#graph.vertexesGetter()[i].dotMarkedGetter() &&
                    this.#graph.vertexesGetter()[i].componentGetter() === -1) {
                    for (let j = 0; j < this.#graph.edgesGetter().length; j++) {
                        if (this.#graph.edgesGetter()[j].approvedGetter()) {
                            if (this.#graph.edgesGetter()[j].sourceGetter() === vertex &&
                                this.#graph.edgesGetter()[j].targetGetter() === this.#graph.vertexesGetter()[i]) {
                                this.#graph.vertexesGetter()[i].componentSetter(vertex.componentGetter());
                                this.#graph.vertexesGetter()[i].firstPartSetter(!vertex.firstPartGetter());
                                arr.push(this.#graph.vertexesGetter()[i]);
                            } else if (this.#graph.edgesGetter()[j].targetGetter() === vertex &&
                                this.#graph.edgesGetter()[j].sourceGetter() === this.#graph.vertexesGetter()[i]) {
                                this.#graph.vertexesGetter()[i].componentSetter(vertex.componentGetter());
                                this.#graph.vertexesGetter()[i].firstPartSetter(!vertex.firstPartGetter());
                                arr.push(this.#graph.vertexesGetter()[i]);
                            }
                        }
                    }
                }
            }

            if (arr.length === 0) {
                for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
                    if (this.#graph.vertexesGetter()[i].dotMarkedGetter() &&
                        this.#graph.vertexesGetter()[i].componentGetter() === -1) {
                        arr.push(this.#graph.vertexesGetter()[i]);
                        break;
                    }
                }
            }
        }

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (this.#graph.vertexesGetter()[i].dotMarkedGetter()) {
                if (this.#graph.vertexesGetter()[i].firstPartGetter() &&
                    this.#graph.vertexesGetter()[i].viewsGetter()[1].x > 170) {
                    err = "Неверное разделение на доли";
                }

                if (!this.#graph.vertexesGetter()[i].firstPartGetter() &&
                    this.#graph.vertexesGetter()[i].viewsGetter()[1].x < 170) {
                    err = "Неверное разделение на доли";
                }
            }
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("matching_form_graph_error", textConsumer, err);
            return err;
        }

        // выравниваем конфигурацию

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].partMarkedSetter(this.#graph.vertexesGetter()[i].dotMarkedGetter());
        }

        let firstPartVertexes = [];
        let secondPartVertexes = [];

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            if (!this.#graph.vertexesGetter()[i].dotMarkedGetter()) {
                continue;
            }

            if (this.#graph.vertexesGetter()[i].viewsGetter()[1].x < 170) {
                firstPartVertexes.push(this.#graph.vertexesGetter()[i]);
                this.#graph.vertexesGetter()[i].lastFirstPartSetter(this.#graph.vertexesGetter()[i].firstPartGetter());
                this.#graph.vertexesGetter()[i].firstPartSetter(true);
            } else {
                secondPartVertexes.push(this.#graph.vertexesGetter()[i]);
                this.#graph.vertexesGetter()[i].lastFirstPartSetter(this.#graph.vertexesGetter()[i].firstPartGetter());
                this.#graph.vertexesGetter()[i].firstPartSetter(false);
            }
        }

        firstPartVertexes.sort(function (a, b) {
            return a.viewsGetter()[1].y - b.viewsGetter()[1].y;
        });

        secondPartVertexes.sort(function (a, b) {
            return a.viewsGetter()[1].y - b.viewsGetter()[1].y;
        });

        for (let i = 0; i < firstPartVertexes.length; i++) {
            firstPartVertexes[i].chainXSetter(70);
            firstPartVertexes[i].chainYSetter(i * (24 / firstPartVertexes.length) * 15);
        }

        for (let i = 0; i < secondPartVertexes.length; i++) {
            secondPartVertexes[i].chainXSetter(260);
            secondPartVertexes[i].chainYSetter(i * (24 / firstPartVertexes.length) * 15);
        }

        this.#graph.buildSourcesAndTargets();

        this.#graph.rebuildViews();

        this.update();

        if (err != null) {
            CommentManager.instanceGetter().getHelp("matching_form_graph_error", textConsumer, err);
        }

        return err;
    }

    restore() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].partMarkedSetter(false);
        }

        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].chainXSetter(this.#graph.vertexesGetter()[i].xGetter());
            this.#graph.vertexesGetter()[i].chainYSetter(this.#graph.vertexesGetter()[i].yGetter());
        }

        this.update();
    }

    update() {
        this.#graph.viewGetter().update();
        this.#graph.chainViewGetter().update();
        this.#graph.rebuildViews();
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("matching_form_graph", textConsumer,
            "Разделите граф на доли");
    }

    codeGetter() {
        return "matching_form_graph";
    }
}