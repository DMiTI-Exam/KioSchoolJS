import { IControlsFactory } from "../controls/IControlsFactory.js";
import { BorderedBackground } from "./BorderedBackground.js";
import { DefaultRegimePanel } from "./regime/DefaultRegimePanel.js";
import { DefaultNavigationPanel } from "./navigation/DefaultNavigationPanel.js";
import { DefaultCommentPanel } from "./comment/DefaultCommentPanel.js";
import { HelpButton } from "../../gui/HelpButton.js";
import { HelpButtonBack } from "../../gui/HelpButtonBack.js";
import { DefaultHelpNavigationPanel } from "./navigation/DefaultHelpNavigationPanel.js";

export class DefaultControlsFactory extends IControlsFactory {
    _navigationHeight;
    _helpWidth;
    _cloudShiftX;
    _cloudShiftY;
    _hero;
    _evilHero;
    #workspaceWidth = 0;
    #workspaceHeight = 0;
    #regimePanel;
    #navigationPanel;
    _commentPanel;
    #workspace;
    #navHelp;
    #helpActive;
    #helpButton;
    #backHelpButton;
    #helpWorkspace;

    constructor(hero = null, cloudX = 0, cloudY = 0,
                navigationHeight = 80, helpWidth = 250, evilHero = null) {
        super();

        if (hero == null) {
            hero = new createjs.Container();
        }

        this._hero = hero;
        this._evilHero = evilHero;
        this._cloudShiftX = cloudX;
        this._cloudShiftY = cloudY;
        this._navigationHeight = navigationHeight;
        this._helpWidth = helpWidth;
    }

    /**
     * Создает панель смены режимов <br/>
     * Предполагается, что данный компонент позволяет переключать режимы платформы
     * при помощи свойства regime в ManipulatorManager
     */
    createRegimePanel(width = 0, height = 0) {
        this.#regimePanel = new DefaultRegimePanel(width - BorderedBackground.BORDER_WIDTH*2 -
            DefaultRegimePanel.BORDER_SPACE*2, DefaultRegimePanel.fullHeightGetter());
        return this.#regimePanel;
    }

    /**
     * Создает панель навигации - переходов между шагами.
     *
     */
    createNavigationPanel(width = 0, height = 0) {
        this.#navigationPanel = new DefaultNavigationPanel(width - BorderedBackground.BORDER_WIDTH*2 -
            DefaultRegimePanel.BORDER_SPACE*2, this._navigationHeight, this._helpWidth);
        return this.#navigationPanel;
    }

    /**
     * Создает панель комментариев
     *
     */
    createCommentPanel(width = 0, height = 0) {
        this._commentPanel = new DefaultCommentPanel(this._hero, this._cloudShiftX, this._cloudShiftY, this._evilHero);
        return this._commentPanel;
    }

    /**
     * Создает область визуализации алгоритма
     *
     */
    createWorkspace(width = 0, height = 0) {
        this.#workspace = new createjs.Container();
        return this.#workspace;
    }

    /**
     * Располагает компоненты на сцене
     */
    placeComponents(stage, width, height, regimePanel, navigationPanel, commentPanel, workspace) {
        let bg = new BorderedBackground(width, height);
        stage.addChild(bg);

        let borderSpace = BorderedBackground.BORDER_WIDTH + DefaultRegimePanel.BORDER_SPACE;
        let regimeSpace = borderSpace + DefaultRegimePanel.fullHeightGetter();

        bg.addChild(this.#regimePanel);
        this.#regimePanel.x = borderSpace;
        this.#regimePanel.y = borderSpace;

        this.#helpButton = new HelpButton();
        this.#regimePanel.addChild(this.#helpButton);
        this.#helpButton.x = width - 3*borderSpace - this.#helpButton.getBounds().width;
        this.#helpButton.y = 4 + this.#helpButton.getBounds().height/2;
        this.#helpButton.helpRoundButtonHelper.target.addEventListener("click", this.switchHelp);

        this.#backHelpButton = new HelpButtonBack();
        this.#regimePanel.addChild(this.#backHelpButton);
        this.#backHelpButton.x = 2*borderSpace + this.#helpButton.getBounds().width/2;
        this.#backHelpButton.y = 8 + this.#backHelpButton.getBounds().height/2;
        this.#backHelpButton.helpRoundButtonBackHelper.target.addEventListener("click", this.switchHelp);

        bg.addChild(this._commentPanel);
        this._commentPanel.x = width - borderSpace - this._helpWidth;
        this._commentPanel.y = regimeSpace;

        bg.addChild(workspace);
        workspace.x = borderSpace;
        workspace.y = regimeSpace;

        bg.addChild(this.#navigationPanel);
        this.#navigationPanel.x = borderSpace;
        this.#navigationPanel.y = height - borderSpace - this._navigationHeight;

        this.#helpWorkspace = new createjs.Container();
        bg.addChild(this.#helpWorkspace);
        this.#helpWorkspace.x = borderSpace;
        this.#helpWorkspace.y = regimeSpace;

        this.#navHelp = new DefaultHelpNavigationPanel(width - BorderedBackground.BORDER_WIDTH*2 -
            DefaultRegimePanel.BORDER_SPACE*2, this._navigationHeight, this.#helpWorkspace);
        bg.addChild(this.#navHelp);
        this.#navHelp.x = borderSpace;
        this.#navHelp.y = height - borderSpace - this._navigationHeight;

        bg.addChild(this.#navigationPanel);
        this.#navigationPanel.x = borderSpace;
        this.#navigationPanel.y = height - borderSpace - this._navigationHeight;

        this.#workspaceWidth = width - borderSpace*2 - this._helpWidth;
        this.#workspaceHeight = height - borderSpace - regimeSpace - this._navigationHeight;

        this.switchHelp(null);
        this.switchHelp(null);
    }

    switchHelp(event) {
        if (this.#helpActive) {
            this.#helpButton.visible = true;
            this.#backHelpButton.visible = false;
            this.#regimePanel.hideHelp();
            this._commentPanel.visible = true;
            this.#workspace.visible = true;
            this.#navigationPanel.visible = true;
            this.#navHelp.visible = false;
            this.#helpWorkspace.visible = false;
        } else {
            this.#helpButton.visible = false;
            this.#backHelpButton.visible = true;
            this.#regimePanel.showHelp();
            this._commentPanel.visible = false;
            this.#workspace.visible = false;
            this.#navigationPanel.visible = false;
            this.#navHelp.visible = true;
            this.#helpWorkspace.visible = true;
        }

        this.#helpActive = !this.#helpActive;
    }

    /**
     * Получает доступную ширину рабочей области
     */
    getWorkspaceWidth() {
        return this.#workspaceWidth;
    }

    /**
     * Получает доступную высоту рабочей области
     */
    getWorkspaceHeight() {
        return this.#workspaceHeight;
    }

    hideHelp() {
        this.#helpButton.visible = false;
    }

    showHelp() {
        this.#helpButton.visible = true;
    }
}