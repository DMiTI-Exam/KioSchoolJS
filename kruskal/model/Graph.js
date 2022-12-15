import { Utils } from "../utils/Utils.js"
import { Globals } from "../utils/Global.js";
import { Vertex } from "./Vertex.js";
import { Edge } from "./Edge.js";

export class Graph {
    #edges/*Edge*/ = [];
    #vertices/*Vertex*/ = [];

    /**
     * Creates graph and generates all its vertices and edges
     */
    constructor() {
        //select rays for points on the inner circle
        let innerPointsRays = Utils.randomSubset(
            Utils.range(0, Globals.RAYS_COUNT),
            Utils.rnd(
                Math.floor(Globals.RAYS_COUNT / 3),
                Math.ceil(Globals.RAYS_COUNT / 2)
            )
        ).sort();
        
        //select rays for the most inner segments
        let innerSegmentsRays = Utils.randomSubset(
            innerPointsRays,
            Utils.rnd(Math.floor(innerPointsRays.length / 2), innerPointsRays.length - 1)
        ).sort();
        
        //select rays for the most outer points (segments)
        let outerPointsRays = Utils.randomSubset(
            Utils.range(0, Globals.RAYS_COUNT),
            Utils.rnd(
                Math.floor(Globals.RAYS_COUNT / 3),
                Math.ceil(Globals.RAYS_COUNT / 2)
            )
        ).sort();
        
        //TODO: add additional assertions
        //1) number of edges is in specified range(s)
        //2) the center is inside inner circle
        
        //create point arrays
        let center = new Vertex(0, 0);
        let innerCircle = [];
        let middleCircle = [];
        let outerCircle = [];
        
        //select lengths for segments
        for (let i = 0; i < Globals.RAYS_COUNT; i++) {
            //divide ray into 3 segments
            let r3 = Globals.RAY_LENGTH[i]
            let r1 = Utils.rnd(Globals.MIN_INNER_SEGMENT_SIZE, Globals.MAX_INNER_SEGMENT_SIZE);
            let r2 = Utils.rnd(Globals.MIN_OUTER_SEGMENT_START, r3 - Globals.MIN_OUTER_SEGMENT_SIZE);
            
            //create middle point
            let v2 = new Vertex(i, r2);
            middleCircle.push(v2);
            
            if (innerPointsRays.indexOf(i) !== -1) {
                //create inner point
                let v1 = new Vertex(i, r1);
                innerCircle.push(v1);
                //add inner segment if needed
                if (innerSegmentsRays.indexOf(i) !== -1) {
                    this.#edges.push(new Edge(center, v1));
                }
                //add middle segment
                this.#edges.push(new Edge(v1, v2));
            }
            
            //add outer segment if needed
            if (outerPointsRays.indexOf(i) !== -1) {
                //create outer point
                let v3 = new Vertex(i, r3);
                outerCircle.push(v3);
                //add outer segment
                this.#edges.push(new Edge(v2, v3));
            }
        }
        
        //fill this.#vertices array with all vertices
        this.#vertices.push(center);
        for (let ver of innerCircle) {
            this.#vertices.push(ver);
        }

        for (let ver of middleCircle) {
            this.#vertices.push(ver);
        }

        for (let ver of outerCircle) {
            this.#vertices.push(ver);
        }
        
        //assign color to each vertex
        /*
        for (i = 0; i < this.#vertices.length; i++) this.#vertices[i].color = i; 
        */
        
        //add inner circle edges
        for (let i = 0; i < innerCircle.length; i++) {
            let j = i === 0 ? innerCircle.length - 1 : i - 1;
            this.#edges.push(new Edge(innerCircle[j], innerCircle[i]));
        }
        
        //add middle circle edges
        //todo: remove copypaste
        for (let i = 0; i < middleCircle.length; i++) {
            let j = i === 0 ? middleCircle.length - 1 : i - 1;
            this.#edges.push(new Edge(middleCircle[j], middleCircle[i]));
        }

        this.#edges = this.#edges.sort((a, b) => a.lengthGetter() - b.lengthGetter());
    }

    edgesGetter() {
        return this.#edges;
    }

    verticesGetter() {
        return this.#vertices;
    }

    isLastEdgeExistsGetter() {
        let isExist = false;
        for (let e of this.#edges) {
            if (e.lastGetter() === Edge.LAST_TRUE) {
                isExist = true;
                break;
            }
        }
        return isExist;
    }

    lastEdgeGetter() {
        let res;
        let isExist = false;

        for (let e of this.#edges) {
            if (e.lastGetter() === Edge.LAST_TRUE) {
                res = e;
                isExist = true;
                break;
            }
        }
        return res;
    }
}