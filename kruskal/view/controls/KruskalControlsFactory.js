import { DefaultControlsFactory } from "../../../kioschool/view/controlsImpl/DefaultControlsFactory.js";
import { KruskalCommentPanel } from "./KruskalCommentPannel.js";

export class KruskalControlsFactory extends DefaultControlsFactory {
    constructor(hero=null, cloudX=0, cloudY=0, navigationHeight=80, helpWidth=250, evilHero=null){
         super(hero, cloudX, cloudY, navigationHeight, helpWidth, evilHero);
    }

    /**
     * Создает панель комментариев
     *
     */
    createCommentPanel(width=0, height=0) {
        this._commentPanel = new KruskalCommentPanel(this._hero, this._cloudShiftX, this._cloudShiftY, this._evilHero);
        return this._commentPanel;
    }
}