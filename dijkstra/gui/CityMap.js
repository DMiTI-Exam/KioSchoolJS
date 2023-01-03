import { DijkstraGraph } from "../model/DijkstraGraph.js";
import { DijkstraEdge } from "../model/DijkstraEdge.js";
import { DijkstraVertex } from "../model/DijkstraVertex.js";
import { DijkstraVertexView } from "../view/DijkstraVertexView.js";
import { ManipulatorManager } from "../../kioschool/controller/ManipulatorManager.js";
import { DijkstraGraphView } from "../view/DijkstraGraphView.js";
import { DijkstraEdgeView } from "../view/DijkstraEdgeView.js";
import { DijkstraVertexTableView } from "../view/DijkstraVertexTableView.js";

/**
 * Карта города
 */
export class CityMap extends createjs.Container {
    constructor() {
        super();

        let map = new createjs.Bitmap("dijkstra/_resource/map.png");
        this.addChild(map);

        // edge pattern
        let fill1_mc = new createjs.Bitmap("dijkstra/_resource/fill1_mc.png");
        fill1_mc.name = "fill1_mc";
        let fill2_mc = new createjs.Bitmap("dijkstra/_resource/fill2_mc.png");
        fill2_mc.name = "fill2_mc";
        let edgeBackground = new createjs.Bitmap("dijkstra/_resource/edge_background.png");
        edgeBackground.regX = 21;
        edgeBackground.regY = 31.5;
        edgeBackground.y = 47.5;
        let edgeContainer = new createjs.Container();
        edgeContainer.addChild(edgeBackground);
        edgeContainer.addChild(fill1_mc);
        edgeContainer.addChild(fill2_mc);

        // edges
        let edge1 = _.cloneDeep(edgeContainer);
        edge1.x = 37.5;
        edge1.y = 353.3;
        edge1.rotation = -57;
        edge1.scaleY = 1.57;
        this.addChild(edge1);

        let edge2 = _.cloneDeep(edgeContainer);
        edge2.x = 36.5;
        edge2.y = 252.5;
        this.addChild(edge2);

        let edge3 = _.cloneDeep(edgeContainer);
        edge3.x = 36.5;
        edge3.y = 157.5;
        this.addChild(edge3);

        let edge4 = _.cloneDeep(edgeContainer);
        edge4.x = 36.5;
        edge4.y = 50.5;
        this.addChild(edge4);

        let edge5 = _.cloneDeep(edgeContainer);
        edge5.x = 49.5;
        edge5.y = 41.5;
        edge5.rotation = -90;
        this.addChild(edge5);

        let edge6 = _.cloneDeep(edgeContainer);
        edge6.x = 49.5;
        edge6.y = 153.5;
        edge6.rotation = -90;
        this.addChild(edge6);

        let edge7 = _.cloneDeep(edgeContainer);
        edge7.x = 49.5;
        edge7.y = 250.5;
        edge7.rotation = -90;
        this.addChild(edge7);

        let edge8 = _.cloneDeep(edgeContainer);
        edge8.x = 49.5;
        edge8.y = 348.5;
        edge8.rotation = -90;
        this.addChild(edge8);

        let edge9 = _.cloneDeep(edgeContainer);
        edge9.x = 156;
        edge9.y = 431;
        edge9.rotation = -97;
        edge9.scaleY = 3.17;
        this.addChild(edge9);

        let edge10 = _.cloneDeep(edgeContainer);
        edge10.x = 44;
        edge10.y = 49;
        edge10.rotation = -45;
        edge10.scaleY = 1.414;
        this.addChild(edge10);

        let edge11 = _.cloneDeep(edgeContainer);
        edge11.x = 38.15;
        edge11.y = 156;
        edge11.rotation = -69;
        edge11.scaleY = 2.9;
        this.addChild(edge11);

        let edge12 = _.cloneDeep(edgeContainer);
        edge12.x = 38.15;
        edge12.y = 160.48;
        edge12.rotation = -54;
        edge12.scaleY = 1.66;
        this.addChild(edge12);

        let edge13 = _.cloneDeep(edgeContainer);
        edge13.x = 46;
        edge13.y = 353;
        edge13.rotation = -131;
        edge13.scaleY = 1.68;
        this.addChild(edge13);

        let edge14 = _.cloneDeep(edgeContainer);
        edge14.x = 165.15;
        edge14.y = 434.35;
        edge14.rotation = 178;
        this.addChild(edge14);

        let edge15 = _.cloneDeep(edgeContainer);
        edge15.x = 154.3;
        edge15.y = 428.41;
        edge15.rotation = -64;
        edge15.scaleY = 1.62;
        this.addChild(edge15);

        let edge16 = _.cloneDeep(edgeContainer);
        edge16.x = 280.38;
        edge16.y = 498.53;
        edge16.rotation = -121;
        edge16.scaleY = 2.27;
        this.addChild(edge16);

        let edge17 = _.cloneDeep(edgeContainer);
        edge17.x = 160.4;
        edge17.y = 348.5;
        edge17.rotation = -90;
        edge17.scaleY = 1.36;
        this.addChild(edge17);

        let edge18 = _.cloneDeep(edgeContainer);
        edge18.x = 293.5;
        edge18.y = 347.5;
        edge18.rotation = 180;
        this.addChild(edge18);

        let edge19 = _.cloneDeep(edgeContainer);
        edge19.x = 278.8;
        edge19.y = 348.4;
        edge19.rotation = -78;
        edge19.scaleY = 1.925;
        this.addChild(edge19);

        let edge20 = _.cloneDeep(edgeContainer);
        edge20.x = 155.45;
        edge20.y = 250.5;
        edge20.rotation = -90;
        edge20.scaleY = 1.38;
        this.addChild(edge20);

        let edge21 = _.cloneDeep(edgeContainer);
        edge21.x = 289.5;
        edge21.y = 250.5;
        edge21.rotation = -90;
        edge21.scaleY = 1.8;
        this.addChild(edge21);

        let edge22 = _.cloneDeep(edgeContainer);
        edge22.x = 161.53;
        edge22.y = 351.8;
        edge22.rotation = -128;
        edge22.scaleY = 1.78;
        this.addChild(edge22);

        let edge23 = _.cloneDeep(edgeContainer);
        edge23.x = 281.39;
        edge23.y = 248.865;
        edge23.rotation = -52;
        edge23.scaleY = 2.39;
        this.addChild(edge23);

        let edge24 = _.cloneDeep(edgeContainer);
        edge24.x = 291.65;
        edge24.y = 256.7;
        edge24.rotation = -138;
        edge24.scaleY = 1.54;
        this.addChild(edge24);

        let edge25 = _.cloneDeep(edgeContainer);
        edge25.x = 153.5;
        edge25.y = 145.5;
        edge25.rotation = 180;
        this.addChild(edge25);

        let edge26 = _.cloneDeep(edgeContainer);
        edge26.x = 149.775;
        edge26.y = 153.5;
        edge26.rotation = -90;
        edge26.scaleY = 1.31;
        this.addChild(edge26);

        let edge27 = _.cloneDeep(edgeContainer);
        edge27.x = 152.14;
        edge27.y = 156;
        edge27.rotation = -128;
        edge27.scaleY = 1.924;
        this.addChild(edge27);

        let edge28 = _.cloneDeep(edgeContainer);
        edge28.x = 150.75;
        edge28.y = 41.5;
        edge28.rotation = -90;
        edge28.scaleY = 1.5;
        this.addChild(edge28);

        let edge29 = _.cloneDeep(edgeContainer);
        edge29.x = 287.49;
        edge29.y = 41.5;
        edge29.rotation = -90;
        edge29.scaleY = 1.716;
        this.addChild(edge29);

        let edge30 = _.cloneDeep(edgeContainer);
        edge30.x = 286.18;
        edge30.y = 44.57;
        edge30.rotation = -42;
        edge30.scaleY = 1.58;
        this.addChild(edge30);

        let edge31 = _.cloneDeep(edgeContainer);
        edge31.x = 459.5;
        edge31.y = 253.7;
        edge31.rotation = 180;
        edge31.scaleY = 2.247;
        this.addChild(edge31);

        let edge32 = _.cloneDeep(edgeContainer);
        edge32.x = 464.13;
        edge32.y = 249;
        edge32.scaleY = 1.376;
        edge32.rotation = 143;
        this.addChild(edge32);

        let edge33 = _.cloneDeep(edgeContainer);
        edge33.x = 290.5;
        edge33.y = 153.5;
        edge33.rotation = -90;
        this.addChild(edge33);

        let edge34 = _.cloneDeep(edgeContainer);
        edge34.x = 293.5;
        edge34.y = 247.5;
        edge34.rotation = 180;
        this.addChild(edge34);

        let edge35 = _.cloneDeep(edgeContainer);
        edge35.x = 293.5;
        edge35.y = 153.24;
        edge35.rotation = 180;
        edge35.scaleY = 1.184;
        this.addChild(edge35);

        let edge36 = _.cloneDeep(edgeContainer);
        edge36.x = 36.5;
        edge36.y = 351.75;
        edge36.scaleY = 1.5;
        this.addChild(edge36);

        let edge37 = _.cloneDeep(edgeContainer);
        edge37.x = 40;
        edge37.y = 493.5;
        edge37.scaleY = 2.568;
        edge37.rotation = -90;
        this.addChild(edge37);

        let edge38 = _.cloneDeep(edgeContainer);
        edge38.x = 283.75;
        edge38.y = 493.5;
        edge38.scaleY = 1.9;
        edge38.rotation = -90;
        this.addChild(edge38);

        let edge39 = _.cloneDeep(edgeContainer);
        edge39.x = 459.5;
        edge39.y = 485.5;
        edge39.rotation = 180;
        this.addChild(edge39);

        let edge40 = _.cloneDeep(edgeContainer);
        edge40.x = 459.5;
        edge40.y = 391.2;
        edge40.rotation = 180;
        edge40.scaleY = 1.52;
        this.addChild(edge40);

        let edge41 = _.cloneDeep(edgeContainer);
        edge41.x = 385.66;
        edge41.y = 155.38;
        edge41.rotation = -147;
        edge41.scaleY = 1.5;
        this.addChild(edge41);

        // circle pattern
        let vFill1_mc = new createjs.Bitmap("dijkstra/_resource/VFill1_mc.png");
        vFill1_mc.name = "VFill1_mc";
        vFill1_mc.regX = 19;
        vFill1_mc.regY = 19;
        let vFill2_mc = new createjs.Bitmap("dijkstra/_resource/VFill2_mc.png");
        vFill2_mc.name = "VFill2_mc";
        vFill2_mc.regX = 19;
        vFill2_mc.regY = 19;
        let vFill3_mc = new createjs.Bitmap("dijkstra/_resource/VFill3_mc.png");
        vFill3_mc.name = "VFill3_mc";
        vFill3_mc.regX = 23;
        vFill3_mc.regY = 23;
        let circleContainer = new createjs.Container();
        circleContainer.addChild(vFill1_mc);
        circleContainer.addChild(vFill2_mc);
        circleContainer.addChild(vFill3_mc);

        // library pattern
        let libraryIcon = new createjs.Bitmap("dijkstra/_resource/VContent_library.png");
        libraryIcon.regX = 11;
        libraryIcon.regY = 8.5;
        libraryIcon.name = "VContent_mc";
        let libraryContainer = _.cloneDeep(circleContainer);
        libraryContainer.addChild(libraryIcon);

        // canteen pattern
        let canteenIcon = new createjs.Bitmap("dijkstra/_resource/VContent_canteen.png");
        canteenIcon.regX = 14;
        canteenIcon.regY = 9.5;
        canteenIcon.name = "VContent_mc";
        let canteenContainer = _.cloneDeep(circleContainer);
        canteenContainer.addChild(canteenIcon);

        // refuel pattern
        let refuelIcon = new createjs.Bitmap("dijkstra/_resource/VContent_refuel.png");
        refuelIcon.regX = 7.5;
        refuelIcon.regY = 12.5;
        refuelIcon.name = "VContent_mc";
        let refuelContainer = _.cloneDeep(circleContainer);
        refuelContainer.addChild(refuelIcon);

        // church pattern
        let churchIcon = new createjs.Bitmap("dijkstra/_resource/VContent_church.png");
        churchIcon.regX = 10.5;
        churchIcon.regY = 14;
        churchIcon.name = "VContent_mc";
        let churchContainer = _.cloneDeep(circleContainer);
        churchContainer.addChild(churchIcon);

        // theater pattern
        let theaterIcon = new createjs.Bitmap("dijkstra/_resource/VContent_theater.png");
        theaterIcon.regX = 12.5;
        theaterIcon.regY = 10.5;
        theaterIcon.name = "VContent_mc";
        let theaterContainer = _.cloneDeep(circleContainer);
        theaterContainer.addChild(theaterIcon);

        // hospital pattern
        let hospitalIcon = new createjs.Bitmap("dijkstra/_resource/VContent_hospital.png");
        hospitalIcon.regX = 10.5;
        hospitalIcon.regY = 10.5;
        hospitalIcon.name = "VContent_mc";
        let hospitalContainer = _.cloneDeep(circleContainer);
        hospitalContainer.addChild(hospitalIcon);

        // refuels pattern
        let refuel1 = _.cloneDeep(refuelContainer);
        refuel1.x = 41;
        refuel1.y = 38;
        this.addChild(refuel1);

        let refuel2 = _.cloneDeep(refuelContainer);
        refuel2.x = 289;
        refuel2.y = 150;
        this.addChild(refuel2);

        let refuel3 = _.cloneDeep(refuelContainer);
        refuel3.x = 41;
        refuel3.y = 490;
        this.addChild(refuel3);

        // library pattern
        let library1 = _.cloneDeep(libraryContainer);
        library1.x = 386;
        library1.y = 148;
        this.addChild(library1);

        let library2 = _.cloneDeep(libraryContainer);
        library2.x = 160;
        library2.y = 249;
        this.addChild(library2);

        let library3 = _.cloneDeep(libraryContainer);
        library3.x = 289;
        library3.y = 490;
        this.addChild(library3);

        // canteen pattern
        let canteen1 = _.cloneDeep(canteenContainer);
        canteen1.x = 456;
        canteen1.y = 44;
        this.addChild(canteen1);

        let canteen2 = _.cloneDeep(canteenContainer);
        canteen2.x = 150;
        canteen2.y = 150;
        this.addChild(canteen2);

        let canteen3 = _.cloneDeep(canteenContainer);
        canteen3.x = 41;
        canteen3.y = 349;
        this.addChild(canteen3);

        let canteen4 = _.cloneDeep(canteenContainer);
        canteen4.x = 289;
        canteen4.y = 344;
        this.addChild(canteen4);

        let canteen5 = _.cloneDeep(canteenContainer);
        canteen5.x = 457;
        canteen5.y = 490;
        this.addChild(canteen5);

        // hospital pattern
        let hospital1 = _.cloneDeep(hospitalContainer);
        hospital1.x = 150;
        hospital1.y = 38;
        this.addChild(hospital1);

        let hospital2 = _.cloneDeep(hospitalContainer);
        hospital2.x = 160;
        hospital2.y = 350;
        this.addChild(hospital2);

        let hospital3 = _.cloneDeep(hospitalContainer);
        hospital3.x = 457;
        hospital3.y = 385;
        this.addChild(hospital3);

        // theater pattern
        let theater1 = _.cloneDeep(theaterContainer);
        theater1.x = 290;
        theater1.y = 38;
        this.addChild(theater1);

        let theater2 = _.cloneDeep(theaterContainer);
        theater2.x = 41;
        theater2.y = 248;
        this.addChild(theater2);

        let theater3 = _.cloneDeep(theaterContainer);
        theater3.x = 456;
        theater3.y = 245;
        this.addChild(theater3);

        // church pattern
        let church1 = _.cloneDeep(churchContainer);
        church1.x = 41;
        church1.y = 154;
        this.addChild(church1);

        let church2 = _.cloneDeep(churchContainer);
        church2.x = 289;
        church2.y = 251;
        this.addChild(church2);

        let church3 = _.cloneDeep(churchContainer);
        church3.x = 160;
        church3.y = 426;
        this.addChild(church3);
    }

    /**
     * Инициализация - заполняем граф вершинами и ребрами, устанавливаем связи
     * Удаляем с карты символы вершин и ребер, создаем на их основе вершины и ребра графа и уже их помещаем на карту
     */
    createGraphAndRebuildMap() {
        let graph = new DijkstraGraph();
        let graphV = new DijkstraGraphView();
        let graphView = new createjs.Container();
        graph.viewSetter(graphV);

        let clip;

        for (let k = this.numChildren - 1; k >= 0; k--) {
            if (!(this.getChildAt(k) instanceof createjs.Container)) {
                graphView.addChild(this.getChildAt(k));
                continue;
            }

            clip = this.getChildAt(k);
            if (clip.getChildByName("fill1_mc") == null) {
                if (clip.getChildByName("VContent_mc") == null) {
                    graphView.addChild(clip);
                }
            }
        }

        //сначала заполняем граф ребрами - они должны быть снизу
        for (let i = this.numChildren - 1; i >= 0; i--) {
            if (!(this.getChildAt(i) instanceof createjs.Container)) {
                continue;
            }

            clip = this.getChildAt(i);
            if (clip.getChildByName("fill1_mc") != null) {//мувик - ребро, т.к. содержит fill1_mc - белая полоска
                let edge = new DijkstraEdge();
                let edgeView = new DijkstraEdgeView(clip);
                edge.viewSetter(edgeView);
                edgeView.edgeSetter(edge);
                graph.edgesGetter().push(edge);
                edgeView.update();
            }
        }

        //заполняем граф вершинами
        for (let j = this.numChildren - 1; j >= 0 ; j--) {
            if (!(this.getChildAt(j) instanceof createjs.Container)) {
                continue;
            }

            clip = this.getChildAt(j);
            let content = clip.getChildByName("VContent_mc");
            if (content != null) { //мувик - вершина, т.к. содержит DijkstraVertexViewVContent_mc - значок вершины - книга, церковь и т.д.
                let vertex = new DijkstraVertex();
                let vertexView = new DijkstraVertexView(clip, graphView);
                vertex.addView(vertexView);
                vertexView.vertexSetter(vertex);
                graph.vertexesGetter().push(vertex);
                graphView.addChild(vertexView);

                let vertexViewTable = new DijkstraVertexTableView();
                vertex.addView(vertexViewTable);
                vertexViewTable.vertexSetter(vertex);

                vertex.updateViews();
            }
        }

        //устанавливаем связи
        this.#initRelation(graph);
        this.#initSpaces(graph);
        this.#initNames(graph);
        this.#tryRemoveEdges(graph,5);

        console.log(graph.edgesGetter().length);
        for (let l = 0; l < graph.edgesGetter().length; l++) {
            let ed = graph.edgesGetter()[l];
            graphView.addChildAt(ed.getView(), 1);
            graphView.addChild(ed.getView().tfGetter())
        }

        graphV.addChild(graphView);

        let width = ManipulatorManager.instanceGetter().perspectiveGetter().getWorkspaceWidth();
        let height = ManipulatorManager.instanceGetter().perspectiveGetter().getWorkspaceHeight();

        graphView.x = 20;
        graphView.y = 10;

        let temp = new createjs.Shape();
        temp.graphics.beginFill("#FFFFFF");
        temp.graphics.drawCircle(0,0,1);
        temp.graphics.endFill();
        graphV.addChild(temp);
        temp.x = 850;
        temp.y = 610;

        return graph;
    }

    /**
     * Устанавливает связи между вершинами и ребрами на основании их расположения.
     * Расположение задается в swf карты города
     */
    #initRelation(graph) {
        for (let i = 0; i < graph.edgesGetter().length; i++) {
            let edge = graph.edgesGetter()[i];
            let si = 0;
            let ti = 0;
            for (let j = 0; j < graph.vertexesGetter().length; j++) {
                let vertex = graph.vertexesGetter()[j];
                let vertexView = vertex.viewsGetter()[0];
                if (vertexView.hitTest(vertexView.globalToLocal(edge.getView().normalbg_mc.x, 0).x,
                    vertexView.globalToLocal(0, edge.getView().normalbg_mc.y).y)) {
                    edge.sourceSetter(vertex);
                    si++;
                } else if (this.#isTarget(vertex.viewsGetter()[0], edge.getView())) {
                    edge.targetSetter(vertex);
                    ti++;
                }
            }

            if (ti !== 1 || si !== 1) {
                console.log("popa");
            }
        }
    }

    /**
     * Проверка вершины на инцидентность ребру в качестве приемника (проверяются координаты второго конца:)
     */
    #isTarget(vertex, edge) {
        let container = new createjs.Container();
        container.addChild(_.clone(edge.normalbg_mc));

        if (edge.normalbg_mc.rotation >= 0 && edge.normalbg_mc.rotation < 90) {
            return vertex.hitTest(vertex.globalToLocal(edge.normalbg_mc.x - container.getBounds().width, 0).x,
                vertex.globalToLocal(0, edge.normalbg_mc.y + container.getBounds().height).y);
        } else if (edge.normalbg_mc.rotation >= 90 && edge.normalbg_mc.rotation <= 180) {
            return vertex.hitTest(vertex.globalToLocal(edge.normalbg_mc.x - container.getBounds().width, 0).x,
                vertex.globalToLocal(0, edge.normalbg_mc.y - container.getBounds().height).y);
        } else if (edge.normalbg_mc.rotation >= -90 && edge.normalbg_mc.rotation <= 0) {
            return vertex.hitTest(vertex.globalToLocal(edge.normalbg_mc.x + container.getBounds().width, 0).x,
                vertex.globalToLocal(0, edge.normalbg_mc.y + container.getBounds().height).y);
        } else if (edge.normalbg_mc.rotation >= -180 && edge.normalbg_mc.rotation < -90) {
            return vertex.hitTest(vertex.globalToLocal(edge.normalbg_mc.x + container.getBounds().width, 0).x,
                vertex.globalToLocal(0, edge.normalbg_mc.y - container.getBounds().height).y);
        }

        return false;
    }

    #removeIfPossible(graph, edge) {
        graph.removeEdge(edge);
        if (!graph.isPath(edge.sourceGetter(), edge.targetGetter())) {
            graph.edgesGetter().push(edge);
        }
    }

    #tryRemoveEdges(graph, num) {
        for (let i = 0; i < num; i++) {
            let e = graph.edgesGetter()[Math.floor(Math.random() * graph.edgesGetter().length)];
            this.#removeIfPossible(graph, e);
        }
    }

    #initSpaces(graph) {
        for (let i = 0; i < graph.edgesGetter().length; i++) {
            let edge = graph.edgesGetter()[i];
            edge.weightSetter(Math.floor(Math.random() * 100));
        }
    }

    #initNames(graph) {
        let arr = [];
        for (let i = 0; i < graph.vertexesGetter().length; i++) {
            let vertex = graph.vertexesGetter()[i];
            let temp = 0;
            do {
                temp = Math.floor(Math.random() * 26);
            } while(this.#containsi(arr, temp));

            arr.push(temp);
            vertex.nameSetter(String.fromCharCode(65+temp));
        }
    }

    #containsi(arr, temp) {
        for (let i of arr) {
            if (i === temp) {
                return true;
            }
        }

        return false;
    }
}