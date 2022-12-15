import { Globals } from "./Global.js";

export class Utils {
    constructor() {}

    static rnd(min, max) {
        return Utils.random(max - min + 1) + min;
    }

    static random(n) {
        return Math.floor(Math.random() * n);
    }

    static range(a, b) {
        let r = [];
        for (let i = a; i <= b; i++)
            r.push(i);
        return r;
    }

    static randomSubset(s, n) {
        let a = s.slice();
        //random permutation
        for (let i = 0; i < a.length; i++) {
            let j = Utils.rnd(0, i);
            //exchange a[i] and a[j]
            let t = a[i];
            a[i] = a[j];
            a[j] = t;
        }
        return a.slice(0, n);
    }

    static randomizeArrayOfInt(s) {
        let res = s.slice();
        
        for (let i = 1; i < res.length; i++) {
            let j = Utils.rnd(0, i);
            let t = res[i];
            res[i] = res[j];
            res[j] = t;
        }
        return res;
    }

    static getColorByInd(ind) {
        //color for the element with unknown select state
        if (ind === -1) {
            return Globals.COLOR_SEL_UNKNOWN;
        }

        //color for the decorative element (not used in manipulator)
        if (ind === -2) {
            return Globals.COLOR_SPIDERWEB;
        }
            
        //TODO maybe refactor this code to make colors automatically
        /*var tempColor:int = ind * Globals.LIGHT_COLOR * Globals.LIGHT_COLOR * Globals.LIGHT_COLOR / Globals.MAX_VERTICES;
        
        var r:int = tempColor % Globals.LIGHT_COLOR;
        var g:int = Math.floor(tempColor / Globals.LIGHT_COLOR) % Globals.LIGHT_COLOR;
        var b:int = Math.floor(Math.floor(tempColor / Globals.LIGHT_COLOR) / Globals.LIGHT_COLOR);
    
        return 0x10000 * r + 0x100 * g + b;*/
        
        return Globals.VERTICES_COLORS_ARRAY[ind];
        
    }
}