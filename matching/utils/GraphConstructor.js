import { MatchingGraph } from "../model/MatchingGraph.js";
import { MatchingGraphView } from "../views/MatchingGraphView.js";
import { MatchingGraphChainView } from "../views/MatchingGraphChainView.js";
import { MathUtil } from "../../kioschool/util/MathUtil.js";
import { MatchingEdge } from "../model/MatchingEdge.js";
import { MatchingVertex } from "../model/MatchingVertex.js";
import { MatchingVertexView } from "../views/MatchingVertexView.js";
import { MatchingVertexChainView } from "../views/MatchingVertexChainView.js";

export class GraphConstructor {
    static SIDE_LENGTH = 80;

    static BIG = false;

    static INIT_X = 170;

    static INIT_Y = 170;

    static #graph;

    static generateGraph() {
        this.#graph = new MatchingGraph();
        let graphView = new MatchingGraphView(this.#graph);
        let chainView = new MatchingGraphChainView(this.#graph);
        this.#graph.viewSetter(graphView);
        this.#graph.chainViewSetter(chainView);

        let b = this.SIDE_LENGTH / Math.sqrt(3);
        let c = MathUtil.calcSideUsingCosinus(this.SIDE_LENGTH, b, MathUtil.toRadians(150));

        this.#makeVertexes(30, 60, 0, -b, this.INIT_X, this.INIT_Y);
        this.#makeVertexes(30, 60, 0, b - this.SIDE_LENGTH * Math.sqrt(3),
            this.INIT_X, this.INIT_Y);
        this.#makeVertexes(MathUtil.toDegrees(Math.asin(b * Math.sin(MathUtil.toRadians(150)) / c)),
            60, 0, -c, this.INIT_X, this.INIT_Y);
        this.#makeVertexes(-MathUtil.toDegrees(Math.asin(b * Math.sin(MathUtil.toRadians(150)) / c))
            + 60, 60, 0, -c, this.INIT_X, this.INIT_Y);

        this.#generateInnerEdges();
        this.#generateEdges(0, 6, 6);
        this.#generateEdges(6, 12, 6);
        this.#generateEdges(6, 12, 12);
        this.#generateEdges(13, 18, 5);
        this.#graph.edgesGetter().push(new MatchingEdge(this.#graph.vertexesGetter()[12],
            this.#graph.vertexesGetter()[23]));

        this.#colorVertexes();
        let amount = Math.random() * 8;
        while (amount < 3) {
            amount = Math.random() * 8;
        }

        this.#removeEdges(amount);

        this.#graph.buildSourcesAndTargets();

        graphView.update();

        return this.#graph;
    }

    static #removeEdges(amount) {
        do {
            for (let i = 0; i < this.#graph.edgesGetter().length; i++) {
                this.#graph.edgesGetter()[i].deletedSetter(false);
            }

            for (let i = 0; i < amount; i++) {
                let index = Math.floor(Math.random() * this.#graph.edgesGetter().length);
                this.#graph.edgesGetter()[index].deletedSetter(true);
            }
        } while (this.#hasSingleComponent());
    }

    static #hasSingleComponent() {
        OUTER: for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            let vertex = this.#graph.vertexesGetter()[i];
            for (let j = 0; j < this.#graph.edgesGetter().length; j++) {
                if (this.#graph.edgesGetter()[j].deletedGetter() === false &&
                    (this.#graph.edgesGetter()[j].sourceGetter() === vertex ||
                    this.#graph.edgesGetter()[j].targetGetter() === vertex)) {
                    continue OUTER;
                }
            }

            return true;
        }

        return false;
    }

    static #colorVertexes() {
        for (let i = 0; i < this.#graph.vertexesGetter().length; i++) {
            let vertex = this.#graph.vertexesGetter()[i];
            if (!this.#graph.hasSecondPartNeighbour(vertex)) {
                vertex.firstPartSetter(false);
            }
        }
    }

    static #generateInnerEdges() {
        for (let i = 0; i < 6; i++) {
            this.#graph.edgesGetter().push(new MatchingEdge(this.#graph.vertexesGetter()[i],
                this.#graph.vertexesGetter()[i === 5 ? 0 : i + 1]));
        }
    }

    static #generateEdges(start, end, shift) {
        for (let i = start; i < end; i++) {
            this.#graph.edgesGetter().push(new MatchingEdge(this.#graph.vertexesGetter()[i],
                this.#graph.vertexesGetter()[i + shift]));
        }
    }

    static #makeVertexes(alpha1, alpha2, x, y, initY, initX) {
        for (let i = 0; i < 6; i++) {
            let alpha = alpha1 + i * alpha2;
            let beta = MathUtil.toRadians(alpha);
            this.#makeVertex(initX + x * Math.cos(beta) - y * Math.sin(beta),
                initY + x * Math.sin(beta) + y * Math.cos(beta));
        }
    }

    static #makeVertex(x, y) {
        let vertex = new MatchingVertex(x, y);
        let vertexView = new MatchingVertexView(vertex);
        let vertexChainView = new MatchingVertexChainView(vertex);
        vertex.addView(vertexView);
        vertex.addView(vertexChainView);
        this.#graph.vertexesGetter().push(vertex);
        this.#graph.viewGetter().addChild(vertexView);
        vertexView.init();
        this.#graph.chainViewGetter().addChild(vertexChainView);
        vertexView.update();
    }
}