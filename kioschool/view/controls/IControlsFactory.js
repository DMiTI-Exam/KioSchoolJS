/**
 * Абстрактная фабрика визуальных элементов управления
 *
 * Создает все необходимые элементы и управляет из размещеием на сцене
 */
export class IControlsFactory {
    constructor() {
        if (this.constructor === IControlsFactory) {
            throw new Error("Abstract class can't be instantiated");
        }
    }

    hideHelp() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    showHelp() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Создает панель смены режимов <br/>
     * Предполагается, что данный компонент позволяет переключать режимы платформы
     * при помощи свойства regime в ManipulatorManager
     */
    createRegimePanel(width = 0, height= 0) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Создает панель навигации - переходов между шагами.
     *
     */
    createNavigationPanel(width = 0, height = 0) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Создает панель комментариев
     *
     */
    createCommentPanel(width = 0, height = 0) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Создает область визуализации алгоритма
     *
     */
    createWorkspace(width = 0, height = 0) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Располагает компоненты на сцене
     */
    placeComponents(stage, width, height, regimePanel, navigationPanel, commentPanel, workspace) {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Получает доступную ширину рабочей области
     */
    getWorkspaceWidth() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }

    /**
     * Получает доступную высоту рабочей области
     */
    getWorkspaceHeight() {
        throw new Error("Abstract method: must be overridden in a subclass");
    }
}