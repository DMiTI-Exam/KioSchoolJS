export class MathUtil {
    static #p;
    static #n;
    static #init;
    static #hull;

    constructor() {
    }

    static randRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static calcSideUsingCosinus(a, b, alpha) {
        return Math.sqrt(a*a + b*b - 2*a*b*Math.cos(alpha));
    }

    static toRadians(angle) {
        return Math.PI * angle/180;
    }

    static toDegrees(angle) {
        return 180 * angle/Math.PI;
    }

    static intersect(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
        let v1 = (bx2 - bx1) * (ay1 - by1) - (by2 - by1) * (ax1 - bx1);
        let v2 = (bx2 - bx1) * (ay2 - by1) - (by2 - by1) * (ax2 - bx1);
        let v3 = (ax2 - ax1) * (by1 - ay1) - (ay2 - ay1) * (bx1 - ax1);
        let v4 = (ax2 - ax1) * (by2 - ay1) - (ay2 - ay1) * (bx2 - ax1);
        return (v1 * v2 < 0) && (v3 * v4 < 0) &&
            Math.abs(v1) > 100 &&
            Math.abs(v2) > 100 &&
            Math.abs(v3) > 100 &&
            Math.abs(v4) > 100;
    }

    static space(p1, p2, p) {
        let a = p1.getPy() - p2.getPy();
        let b = p2.getPx() - p1.getPx();
        let c = p1.getPx() * p2.getPy() - p2.getPx() * p1.getPy();
        let dist = Math.abs(a * p.getPx() + b * p.getPy() + c) / (Math.sqrt(a*a + b*b));
        return dist;
    }

    static computeHull(pp) {
        this.#hull = [];
        this.#p = pp;
        this.#n = this.#p.length;
        let i = this.#indexOfLowestPoint();
        this.#init = i;
        this.#hull.push(i);
        do {
            i = this.#indexOfRightmostPointFrom(this.#p[i]);
            this.#hull.push(i);
        } while (i !== this.#init);

        return this.#hull;
    }

    static #indexOfLowestPoint() {
        let min = 0;
        for (let i = 1; i < this.#n; i++) {
            let p1 = this.#p[i];
            let p2 = this.#p[min];
            if (p1.getPy() > p2.getPy() || p1.getPy() === p2.getPy() && p1.getPx() < p2.getPx()) {
                min = i;
            }
        }

        return min;
    }

    static #indexOfRightmostPointFrom(q) {
        let i = -1;
        for (let j = 0; j < this.#n; j++) {
            if ((this.#hull.indexOf(j) !== -1 && this.#hull.length === 1) ||
                this.#hull.length > 1 && this.#hull.indexOf(j) === this.#init) {
                continue;
            }

            if (i === -1) {
                i = j;
            }

            let p1 = this.#p[i];
            let p2 = this.#p[j];
            if (this.#isMinimum(p1, p2, q)) {
                i = j;
            }
        }

        return i;
    }

    static #isMinimum(p1, p2, q) {
        let b1 = p2.getPx() - q.getPx();
        let b2 = p2.getPy() - q.getPy();
        let a1 = p1.getPx() - q.getPx();
        let a2 = p1.getPy() - q.getPy();
        return a1*b2 - a2*b1 < 0;
    }

    static triangulate(pp) {
        //двумерный массив точек - массив треугольников
        let polygon = this.computeHull(pp);
        polygon.pop();
        this.#hull = [];
        this.#p = pp;
        let inner = [];
        for (let i = 0; i < this.#n; i++) {
            if (polygon.indexOf(i) === -1) {
                inner.push(i);
            }
        }

        this.#triangle(polygon, inner);
        return this.#hull;
    }

    static #triangle(polygon, inner) {
        console.log("-------triangle-------");

        let str = "polygon: ";
        let g = 0;
        for (; g < polygon.length; g++) {
            str += polygon[g] + "; ";
        }
        console.log(str);

        str = "inner: ";
        g = 0;
        for (; g < inner.length; g++) {
            str += inner[g] + "; ";
        }
        console.log(str);

        if (polygon.length === 3 && inner.length === 0) {
            console.log("add polygon");
            this.#hull.push(polygon);
            return;
        }

        let polygon1 = [];
        let inner1 = [];
        let polygon2 = [];
        let inner2 = [];
        let polygon3 = [];
        let inner3 = [];

        if (polygon.length === 3) {
            let center = Math.floor(Math.random() * inner.length);
            polygon1.push(polygon[0]);
            polygon1.push(polygon[1]);
            polygon1.push(inner[center]);
            polygon2.push(polygon[1]);
            polygon2.push(polygon[2]);
            polygon2.push(inner[center]);
            polygon3.push(polygon[2]);
            polygon3.push(polygon[0]);
            polygon3.push(inner[center]);
            str = "polygon3: ";
            g = 0;
            for (; g < polygon3.length; g++) {
                str += polygon3[g] + "; ";
            }
            console.log(str);

            str = "inner3: ";
            g = 0;
            for (; g < inner3.length; g++) {
                str += inner3[g] + "; ";
            }
            console.log(str);

            for (let m = 0; m < inner.length; m++) {
                if (m === center) {
                    continue;
                }

                if (this.#contains(polygon1, inner[m])) {
                    inner1.push(inner[m]);
                } else if (this.#contains(polygon2, inner[m])) {
                    inner2.push(inner[m]);
                } else if (this.#contains(polygon3, inner[m])) {
                    inner3.push(inner[m]);
                }
            }

            this.#triangle(polygon3, inner3);
        } else {
            let start = Math.floor(Math.random() * polygon.length);
            let end;

            do {
                end = Math.floor(Math.random() * polygon.length);
            } while (start === end || Math.abs(start - end) === 1 ||
                (start === 0 && end === polygon.length - 1) ||
                (end === 0 && start === polygon.length - 1));

            let min = Math.min(start, end);
            let max = Math.max(start, end);

            for (let i = min; i <= max; i++) {
                polygon1.push(polygon[i]);
            }

            for (let j = 0; j <= min; j++) {
                polygon2.push(polygon[j]);
            }

            for (let k = max; k < polygon.length; k++) {
                polygon2.push(polygon[k]);
            }

            for (let l = 0; l < inner.length; l++) {
                if (this.#contains(polygon1, inner[l])) {
                    inner1.push(inner[l]);
                } else {
                    inner2.push(inner[l]);
                }
            }
        }

        str = "polygon1: ";
        g = 0;
        for (; g < polygon1.length; g++) {
            str += polygon1[g] + "; ";
        }
        console.log(str);

        str = "inner1: ";
        g = 0;
        for (; g < inner1.length; g++) {
            str += inner1[g] + "; ";
        }
        console.log(str);

        str = "polygon2: ";
        g = 0;
        for (; g < polygon2.length; g++) {
            str += polygon2[g] + "; ";
        }
        console.log(str);

        str = "inner2: ";
        g = 0;
        for (; g < inner2.length; g++) {
            str += inner2[g] + "; ";
        }
        console.log(str);

        this.#triangle(polygon1, inner1);
        this.#triangle(polygon2, inner2);
    }

    static #contains(polygon, point) {
        let isInside = false;
        let nPoints = polygon.length;

        let j = 0;
        for (let i = 0; i < nPoints; i++) {
            j++;
            if (j === nPoints) {
                j = 0;
            }

            let p1 = this.#p[polygon[i]];
            let p2 = this.#p[polygon[j]];
            let p = this.#p[point];

            if (p1.getPx() < p.getPx() && p2.getPx() >= p.getPx() || p2.getPx() < p.getPx() &&
                p1.getPx() >= p.getPx()) {
                if (p1.getPy() + (p.getPx() - p1.getPx()) / (p2.getPx() - p1.getPx()) *
                    (p2.getPy() - p1.getPy()) < p.getPy()) {
                    isInside = !isInside;
                }
            }
        }

        return isInside;
    }
}