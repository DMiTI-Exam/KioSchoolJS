import { AbstractStep } from "../../kioschool/model/AbstractStep.js";
import { MatchingController } from "../controller/MatchingController.js";
import { HexogenAndChainView } from "./HexogenAndChainView.js";
import { FinalStep } from "./FinalStep.js";
import { CommentManager } from "../../kioschool/controller/CommentManager.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";

export class SelectRhombStep extends AbstractStep {
    #graph = MatchingController.instanceGetter().graphGetter();
    #source = [];
    #target = [];
    #edges = [];
    #lastedges = [];
    #lastsource = [];
    #lasttarget = [];

    getView() {
        return new HexogenAndChainView();
    }

    next() {
        if (MatchingController.instanceGetter().graphGetter().getFirstSource() != null &&
            MatchingController.instanceGetter().graphGetter().getFinalPath() != null) {
            return new SelectRhombStep();
        } else {
            return new FinalStep();
        }
    }

    oracle() {
        this.#saveLastSelected();

        this.#edges = [];
        this.#source = [];
        this.#target = [];
        let path = MatchingController.instanceGetter().graphGetter().getFinalPath();
        this.#source.push(path.sourceGetter());
        this.#target.push(path.targetGetter());

        this.#source[0].lastSourceTargetSelectedSetter(true);
        this.#target[0].lastSourceTargetSelectedSetter(true);

        for (let i = 0; i < path.edgesGetter().length; i++) {
            path.edgesGetter()[i].switchedSetter(!path.edgesGetter()[i].switchedGetter());
            this.#edges.push(path.edgesGetter()[i]);
            path.edgesGetter()[i].lastSelectedSetter(true);
        }

        this.#graph.rebuildViews();
    }

    antiOracle() {
        for (let i = 0; i < this.#source.length; i++) {
            this.#source[i].lastSourceTargetSelectedSetter(false);
        }

        for (let i = 0; i < this.#target.length; i++) {
            this.#target[i].lastSourceTargetSelectedSetter(false);
        }

        for (let i = 0; i < this.#edges.length; i++) {
            this.#edges[i].switchedSetter(!this.#edges[i].switchedGetter());
            this.#edges[i].lastSelectedSetter(false);
        }

        for (let i = 0; i < this.#lastedges.length; i++) {
            this.#lastedges[i].lastSelectedSetter(true);
        }

        for (let i = 0; i < this.#lastsource.length; i++) {
            this.#lastsource[i].lastSourceTargetSelectedSetter(true);
            this.#graph.sourcesGetter().splice(0, 0, this.#lastsource[i]);
        }

        for (let i = 0; i < this.#lasttarget.length; i++) {
            this.#lasttarget[i].lastSourceTargetSelectedSetter(true);
            this.#graph.targetsGetter().splice(0, 0, this.#lasttarget[i]);
        }

        this.#graph.rebuildViews();
    }

    checkInput(textConsumer = null) {
        let err = null;
        let hasCorrect = false;

        let vector = this.#graph.getAllFinalPath();
        for (let i = 0; i < vector.length; i++) {
            if (vector[i].concur(this.#graph)) {
                hasCorrect = true;
                break;
            }
        }

        if (!hasCorrect) {
            err = "Неверный путь";
        }

        if (ManipulatorManager.instanceGetter().regimeGetter() === ManipulatorManager.REGIME_TRAINING &&
            err != null) {
            CommentManager.instanceGetter().getHelp("matching_make_path_error", textConsumer, err);
            return err;
        }

        this.#saveLastSelected();

        this.#edges = [];
        this.#source = [];
        this.#target = [];

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].selectedGetter()) {
                this.#edges.push(this.#graph.edgesGetter()[i]);
                this.#graph.edgesGetter()[i].lastSelectedSetter(true);
                this.#graph.edgesGetter()[i].selectedSetter(false);
            }
        }

        for (let i = 0; i < this.#graph.sourcesGetter().length; i++) {
            if (this.#graph.sourcesGetter()[i].sourceTargetSelectedGetter()) {
                this.#source.push(this.#graph.sourcesGetter()[i]);
                this.#graph.sourcesGetter()[i].lastSourceTargetSelectedSetter(true);
                this.#graph.sourcesGetter()[i].sourceTargetSelectedSetter(false);
            }
        }

        for (let i = 0; i < this.#graph.targetsGetter().length; i++) {
            if (this.#graph.targetsGetter()[i].sourceTargetSelectedGetter()) {
                this.#target.push(this.#graph.targetsGetter()[i]);
                this.#graph.targetsGetter()[i].lastSourceTargetSelectedSetter(true);
                this.#graph.targetsGetter()[i].sourceTargetSelectedSetter(false);
            }
        }

        this.#graph.rebuildViews();
        this.update();

        if (err != null) {
            CommentManager.instanceGetter().getHelp("matching_make_path_error", textConsumer, err);
        }

        return err;
    }

    #saveLastSelected() {
        this.#lastedges = [];
        this.#lastsource = [];
        this.#lasttarget = [];

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].lastSelectedGetter()) {
                this.#graph.edgesGetter()[i].lastSelectedSetter(false);
                this.#lastedges.push(this.#graph.edgesGetter()[i]);
            }
        }

        for (let i = this.#graph.sourcesGetter().length-1; i >= 0; i--) {
            if (this.#graph.sourcesGetter()[i].lastSourceTargetSelectedGetter()) {
                this.#lastsource.push(this.#graph.sourcesGetter()[i]);
                this.#graph.sourcesGetter()[i].lastSourceTargetSelectedSetter(false);
                this.#graph.sourcesGetter().splice(i, 1);
            }
        }

        for (let i = this.#graph.targetsGetter().length-1; i >= 0; i--) {
            if (this.#graph.targetsGetter()[i].lastSourceTargetSelectedGetter()) {
                this.#lasttarget.push(this.#graph.targetsGetter()[i]);
                this.#graph.targetsGetter()[i].lastSourceTargetSelectedSetter(false);
                this.#graph.targetsGetter().splice(i, 1);
            }
        }
    }

    restore() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            this.#graph.vertexesGetter()[i].sourceTargetSelectedSetter(false);
        }

        for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
            if (this.#graph.edgesGetter()[i].selectedGetter()) {
                this.#graph.edgesGetter()[i].selectedSetter(false);
                this.#graph.edgesGetter()[i].switchedSetter(!this.#graph.edgesGetter()[i].switchedGetter());
            }
        }

        this.#graph.rebuildViews();
        this.update();
    }

    update() {
        MatchingController.instanceGetter().graphGetter().viewGetter().update();
        MatchingController.instanceGetter().graphGetter().chainViewGetter().update();
        this.#graph.rebuildViews();
    }

    setComment(textConsumer) {
        CommentManager.instanceGetter().getStepHelp("matching_select_rhomb", textConsumer,
            "Постройте улучшающую цепочку");
    }

    codeGetter() {
        return "matching_select_rhomb";
    }
}