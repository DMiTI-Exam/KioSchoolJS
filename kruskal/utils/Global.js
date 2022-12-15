import { KruskalController } from "../controller/KruskalController.js";

export class Globals {
    static SCALE_COEF = 10;
    static HORIZONTAL_MAIN_RADIUS = 20; //радиус в ширину
    static VERTICAL_MAIN_RADIUS = 20; //радиус в высоту
    static QUARTER_PARTITION = 3; // на сколько частей делить четверть
    
    //public static const RAY_LENGTH:Array = [20, 23, 29, 25, 29, 23, 20, 23, 29, 25, 29, 23];
    static RAY_LENGTH = Globals.#getRayArray(Globals.HORIZONTAL_MAIN_RADIUS,
                                             Globals.VERTICAL_MAIN_RADIUS,
                                             Globals.QUARTER_PARTITION);
    static RAYS_COUNT = Globals.RAY_LENGTH.length;
    static MIN_INNER_SEGMENT_SIZE = 5;
    static MAX_INNER_SEGMENT_SIZE = 9;
    static MIN_OUTER_SEGMENT_START = Globals.MAX_INNER_SEGMENT_SIZE + 2;
    static MIN_OUTER_SEGMENT_SIZE = 2;
    static GRAPH_VIEW_X = 10;
    static GRAPH_VIEW_Y = 20;
    static GRAPH_CENTER_X = 410;
    static GRAPH_CENTER_Y = 230;
    static RIGHT_EDGES_X = 100;
    static RIGHT_EDGES_Y_MIN = 10;
    static RIGHT_EDGES_Y_MAX = 2 * Globals.GRAPH_CENTER_Y - Globals.RIGHT_EDGES_Y_MIN + 50;
    static SPIDY_X = 90;
    static SPIDY_Y = 200;
    static SELECT_CONTROLS_X = 540;
    static SELECT_CONTROLS_Y = 460;
    
    // base color for color variation for vertices
    static LIGHT_COLOR = "#AF0000";
    static MAX_VERTICES = 37;
    
    // colors
    static COLOR_SPIDERWEB = "#EEEEEE";
    
    static COLOR_SEL_UNKNOWN = "#888888";
    static COLOR_SEL_FALSE = "#EEEEEE";
    static COLOR_LAST_TRUE = "#4AACF2";
    static COLOR_HL_TRUE = "#FF9054";
    
    static DEFAULT_FONT = "Verdana";
    
    // thikness for lines
    static LINE_WIDTH_NOTACTIVE = 1;
    static LINE_WIDTH_ACTIVE = Globals.LINE_WIDTH_NOTACTIVE + 2 * Math.ceil(Globals.LINE_WIDTH_NOTACTIVE / 2);
    static LINE_WIDTH_LAST = Math.ceil(Globals.LINE_WIDTH_ACTIVE * 1.5);
    static LINE_WIDTH_HL_TRUE = Globals.LINE_WIDTH_ACTIVE + 2*2;
    
    //radius for vertex
    static POINT_RADIUS = Globals.LINE_WIDTH_ACTIVE * 2;
    
    static VERTICES_COLORS_ARRAY = ["#cfad31","#d18496","#6cb540","#d9c0a6",
                                    "#ff6ab7","#fdae25","#f68370","#1ec029",
                                    "#aec918","#fb8d8d","#be6d29","#47c0ff",
                                    "#8454ff","#d45573","#d944f4","#5579ff",
                                    "#3dc2b7","#84cf20","#fc625b","#ff9054",
                                    "#ae6178","#15a0af","#ff8af0","#b0af45",
                                    "#d0ce3e","#5db171","#f4c900","#e4a27a",
                                    "#de9c02","#544cff","#83cbf9"];

    static getRightEdgeY(ind) {
        let gapHeight = Globals.getRigthEdgesGap();
        return ind * gapHeight + Globals.RIGHT_EDGES_Y_MIN;
        //return (KruskalController.instance.direction) ? ind * gapHeight + Globals.RIGHT_EDGES_Y_MIN : Globals.RIGHT_EDGES_Y_MAX - Globals.RIGHT_EDGES_Y_MIN - ind * gapHeight;
    }

    static getRigthEdgesGap() {
        let edgesCount = KruskalController.instanceGetter().graphGetter().edgesGetter().length;
        let gapHeight = (Globals.RIGHT_EDGES_Y_MAX - Globals.RIGHT_EDGES_Y_MIN) / (edgesCount - 1);
        return gapHeight;
    }

    static #getFirstQuarterRadiuses(hor, ver, part) {
        let result = new Array(part - 1);
        let quarter_fi = (Math.PI / 2) / part;
        for (let i = 1; i < Math.ceil(part / 2); i++ ) {
            result[i - 1] = Math.round(hor / Math.cos(quarter_fi * i));
            result[part - 1 - i] = Math.round(ver / Math.cos(quarter_fi * i));
        }
        
        if (part % 2 === 0) {
            result[part / 2 - 1] = Math.round(Math.sqrt(Math.pow(hor, 2) + Math.pow(ver, 2)));
        }
            
        return result;
    }

    static #getRayArray(hor, ver, part) {
        let result = [];
        let firstQuarter = Globals.#getFirstQuarterRadiuses(hor, ver, part);
        result.push(hor);
        result = result.concat(firstQuarter);
        result.push(ver);
        result = result.concat(firstQuarter.reverse());
        result = result.concat(result);
        
        return result;
    }
}