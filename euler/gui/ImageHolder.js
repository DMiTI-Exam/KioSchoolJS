export class ImageHolder {
    nStep = new createjs.Bitmap("euler/_resource/n_steps_1.png");
    nStep1 = new createjs.Bitmap("euler/_resource/n_steps_2.png");
    nStep2 = new createjs.Bitmap("euler/_resource/n_steps_3.png");

    constructor() {

    }

    getNStep() {
        return this.nStep;
    }

    getNStep1() {
        return this.nStep1;
    }

    getNStep2() {
        return this.nStep2;
    }
}