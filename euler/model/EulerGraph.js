import { Graph } from "../../kioschool/basic/model/Graph.js";

export class EulerGraph extends Graph {
    constructor() {
        super()
    }

    getIncidentEdgesList(vertex) {
        let list = [];
        for (let i = 0; i < this.edgesGetter().length; i++) {
            let edge = this.edgesGetter()[i];
            if (edge.sourceGetter().idGetter() === vertex.idGetter() ||
                edge.targetGetter().idGetter() === vertex.idGetter()) {
                list.push(edge);
            }
        }

        return list;
    }

    clearEdgeSelection(edge1) {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            let edge = this.edgesGetter()[i];
            if (edge !== edge1) {
                edge.selectedSetter(false);
            }
        }
    }

    getSelectedEdge() {
        for (let i = 0; i < this.edgesGetter().length; i++) {
            if (this.edgesGetter()[i].selectedGetter()) {
                return this.edgesGetter()[i];
            }
        }

        return null;
    }

    getVertex(edge, edge1) {
        if (edge.sourceGetter() === edge1.sourceGetter()) {
            return edge.sourceGetter();
        } else if (edge.sourceGetter() === edge1.targetGetter()) {
            return edge.sourceGetter();
        } else if (edge.targetGetter() === edge1.sourceGetter()) {
            return edge.targetGetter();
        } else if (edge.targetGetter() === edge1.targetGetter()) {
            return edge.targetGetter();
        }

        return null;
    }
}