import { ErrorCollector } from "./ErrorCollector.js";
import { DefaultControlsFactory } from "../view/controlsImpl/DefaultControlsFactory.js";

/**
 * Менеджер проигрывания манипулятора
 * Управляет переходами между шагами, сменами режимов и т.д.
 * Сингельтон
 */
export class ManipulatorManager {
    static demo = false;

    /**
     * Режим демонстрации - отображение применения алгоритма к данным <br/>
     * Все действия выполняются без участия пользователя
     */
    static REGIME_DEMO = 1;

    /**
     * Режим тренировки - изменения производятся пользователем в рамках одного шага <br/>
     * При неверной операции - сообщение об ошибке и отсутствие перехода на следующий шаг
     */
    static REGIME_TRAINING = 2;

    /**
     * Режим контроля - весь алгоритм выполняется пользователем <br/>
     * В конце - отчет об ошибках
     */
    static REGIME_CONTROL = 3;

    /**
     * Сингельтон
     */
    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    /**
     * Текущий режим платформы
     */
    #currentRegime;

    /**
     * Массив пройденных шагов
     */
    #stepArray = [];

    /**
     * Панель смены режимов
     */
    #regimePanel;

    /**
     * Панель навигации
     */
    #navigationPanel;

    /**
     * Рабочая область
     */
    #workspace;

    /**
     * Панель комментариев
     */
    #commentPanel;

    /**
     * Перспектива
     */
    #perspective;

    /**
     * Вторичный контроллер - уникальный для каждого манипулятора
     */
    #secondaryController;

    #errorCollector;
    #timer;

    /**
     * Признак отправки результата
     */
    #sendResult = false;

    #scene;
    #demoReg = false;
    #anim = false;

    /**
     * Получает экземпляр
     */
    static instanceGetter() {
        if (ManipulatorManager.#instance == null) {
            ManipulatorManager.#canConstruct = true;
            ManipulatorManager.#instance = new ManipulatorManager();
            ManipulatorManager.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        if (!ManipulatorManager.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    stepArrayGetter() {
        return this.#stepArray;
    }

    secondaryControllerGetter() {
        return this.#secondaryController;
    }

    sceneGetter() {
        return this.#scene;
    }

    /**
     * Инициализация контроллера - выполняется один раз при запуске манипулятора!
     */
    init(stage, width, height, secondaryController, controlsFactory = null) {
        this.#scene = stage;

        this.#errorCollector = new ErrorCollector();
        this.#secondaryController = secondaryController;
        controlsFactory = (controlsFactory == null) ? new DefaultControlsFactory() : controlsFactory;
        this.#perspective = controlsFactory;

        this.#regimePanel = controlsFactory.createRegimePanel(width, height);
        this.#navigationPanel = controlsFactory.createNavigationPanel(width, height);
        this.#workspace = controlsFactory.createWorkspace(width, height);
        this.#commentPanel = controlsFactory.createCommentPanel(width, height);

        controlsFactory.placeComponents(stage, width, height, this.#regimePanel, this.#navigationPanel,
            this.#commentPanel, this.#workspace);

        this.initController();

        this.regimeSetter(ManipulatorManager.REGIME_DEMO);
    }

    perspectiveGetter() {
        return this.#perspective;
    }

    /**
     * Генерация условия задачи
     */
    initController() {
        if (this.regimeGetter() === ManipulatorManager.REGIME_CONTROL) {
            this.#perspective.hideHelp();
        } else {
            this.#perspective.showHelp();
        }

        this.#errorCollector.clean();
        this.#secondaryController.init();
        this.#stepArray = [];
        this.#stepArray.push(this.#secondaryController.firstStepGetter());
        this.updateStep();
        this.currentStepGetter().update();
        this.#sendResult = false;
        this.#navigationPanel.enableSubmit(true);
    }

    isStackOfStepEmpty() {
        return this.#stepArray.length <= 1;
    }

    /**
     * Получает текущий шаг
     */
    currentStepGetter() {
        if (this.#stepArray.length === 0) {
            return null;
        }

        return this.#stepArray[this.#stepArray.length-1];
    }

    previousStepGetter() {
        if (this.#stepArray.length < 2) {
            return null;
        }

        return this.#stepArray[this.#stepArray.length-2];
    }

    /**
     * Возвращает текущий режим
     */
    regimeGetter() {
        return this.#currentRegime;
    }

    /**
     * Устанавливает текущий режим
     */
    regimeSetter(newRegime) {
        if (newRegime === this.regimeGetter()) {
            return;
        }

        let last = this.#currentRegime;
        this.#currentRegime = newRegime;
        this.#regimePanel.regimeChanged(this.regimeGetter());
        this.#navigationPanel.regimeChanged(this.regimeGetter());
        if (newRegime === ManipulatorManager.REGIME_CONTROL || last === ManipulatorManager.REGIME_CONTROL) {
            this.initController(); //Инициализация нового условия (перезапуск контроллера)
            this.currentStepGetter().update();
        } else {
            this.currentStepGetter().restore();
        }

        this.#secondaryController.regimeChanged(this.regimeGetter());
        this.updateStep();
        if (newRegime !== ManipulatorManager.REGIME_DEMO) {
            this.#enableAnyAction(this.#workspace, true);
        }
    }

    updateStep() {
        let view = this.currentStepGetter().getView();

        this.#clearWorkspace();
        view.draw(this.#workspace);

        //хитрый hack, размер области определяет первый потомок
        this.#workspace.getBounds().width = this.#workspace.getChildAt(0).getBounds().width +
            this.#workspace.getChildAt(0).x;
        this.#workspace.getBounds().height = this.#workspace.getChildAt(0).getBounds().height +
            this.#workspace.getChildAt(0).y;

        this.#navigationPanel.stepChanged(this.#stepArray.length <= 1, this.currentStepGetter());

        this.currentStepGetter().setComment(this.#commentPanel.commentGetter());

        if (this.regimeGetter() === ManipulatorManager.REGIME_DEMO) {
            this.#enableAnyAction(this.#workspace, false);
        }
    }

    /**
     * Блокирует реакцию на действия пользователя
     */
    #enableAnyAction(container, enabled) {
        for (let i = 0; i < container.numChildren; i++) {
            let displayObject = container.getChildAt(i);
            displayObject.mouseEnabled = enabled;

            if (displayObject instanceof createjs.ButtonHelper) {
                displayObject.enabled = enabled;
            }

            if (displayObject instanceof createjs.Container) {
                this.#enableAnyAction(displayObject, enabled);
            }
        }
    }

    /**
     * Очистка области рисования
     */
    #clearWorkspace() {
        while (this.#workspace.numChildren > 0) {
            this.#workspace.removeChildAt(0);
        }
    }

    /**
     * Переход между режимами
     */
    nextClick() {
        if (this.regimeGetter() === ManipulatorManager.REGIME_DEMO) {
            this.currentStepGetter().oracle(); // Решаем шаг
        } else if (this.regimeGetter() === ManipulatorManager.REGIME_TRAINING) {
            if (this.currentStepGetter().checkInput(this.#commentPanel.errorGetter()) != null) {
                return;
            }
        } else if (this.regimeGetter() === ManipulatorManager.REGIME_CONTROL) {
            let res = this.currentStepGetter().checkInput(this.#errorCollector);
            if (res != null) {
                this.currentStepGetter().correctSetter(false);
            }
        }

        this.#stepArray.push(this.currentStepGetter().next());
        this.currentStepGetter().update();
        this.updateStep();
        if (!this.#anim && (this.regimeGetter() === ManipulatorManager.REGIME_DEMO ||
            this.regimeGetter() === ManipulatorManager.REGIME_TRAINING)) {
            if (this.currentStepGetter().next() == null) {
                this.submitSolution(true);
            }
        }
    }

    /**
     * Событие кнопки Назад
     */
    backClick() {
        this.currentStepGetter().restore();
        this.#stepArray.pop();
        this.currentStepGetter().antiOracle();
        this.currentStepGetter().update();
        if (!this.currentStepGetter().correctGetter()) {
            this.currentStepGetter().correctSetter(true);
            this.#errorCollector.pop();
        }

        this.updateStep();
    }

    submitSolution(dem = false) {
        if (this.#sendResult) {
            return;
        }

        this.#sendResult = true;
        this.#navigationPanel.enableSubmit(false);
        this.#demoReg = dem;
    }

    stackSizeGetter() {
        return this.#stepArray.length;
    }

    amountOfErrorsGetter() {
        return this.#errorCollector.lengthGetter();
    }

    runAnimation(delay) {
        this.#currentRegime = ManipulatorManager.REGIME_DEMO;
        this.lock();
        this.#anim = true;

        let tween = createjs.Tween.get(this);
        while (this.#anim) {
            tween.wait(delay).call(this.#forwardAction);
        }
    }

    lock() {
        this.#enableAnyAction(this.#workspace, false);
        this.#enableAnyAction(this.#navigationPanel, false);
        this.#enableAnyAction(this.#regimePanel, false);
    }

    #forwardAction() {
        if (this.currentStepGetter().next() != null) {
            this.nextClick();
        } else {
            this.submitSolution();
            this.unlock();
            this.regimeSetter(ManipulatorManager.REGIME_CONTROL);
            this.#anim = false;
        }
    }

    unlock() {
        if (this.regimeGetter() !== ManipulatorManager.REGIME_DEMO) {
            this.#enableAnyAction(this.#workspace, true);
        }

        this.#enableAnyAction(this.#navigationPanel, true);
        this.updateStep();
        this.#enableAnyAction(this.#regimePanel, true);
    }
}