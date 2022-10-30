/**
 * Менеджер справки, агрегирует список страниц, содержащих описание манипулятора,
 * а также номер отображаемой страницы
 *
 * Сингельтон
 */
export class HelpManager {
    /**
     * Сингельтон
     */
    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    /**
     * Список страниц со справкой
     */
    #pages = [];

    /**
     * Номер страницы справки, отображаемой в данный момент в режиме помощи
     */
    #currentPageNumber = 0;

    /**
     * Возвращает сингельтон
     */
    static getInstance() {
        if (HelpManager.#instance == null) {
            HelpManager.#canConstruct = true;
            HelpManager.#instance = new HelpManager();
            HelpManager.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        if (!HelpManager.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        }
    }

    getPageNumber() {
        return this.#currentPageNumber;
    }

    getPageAmount() {
        return this.#pages.length;
    }

    /**
     * Добавляет страницу с описанием манипулятора
     */
    registerPage(page) {
        this.#pages.push(page);
    }

    /**
     * Получает текущую страницу
     */
    getPage() {
        if (this.#pages.length === 0) {
            throw new Error("Не зарегистрировано ни одной страницы");
        }

        return this.#pages[this.#currentPageNumber];
    }

    /**
     * Проверяет наличие следующих страниц
     */
    hasNext() {
        return this.#pages.length > this.#currentPageNumber + 1;
    }

    /**
     * Проверяет наличие предшествующих страниц
     */
    hasPrevious() {
        return this.#currentPageNumber > 0;
    }

    /**
     * Получает следующую страницу
     */
    nextPage() {
        this.#currentPageNumber++;
        if (this.#currentPageNumber >= this.#pages.length) {
            throw new Error("Попытка получить несуществующую страницу");
        }

        return this.getPage();
    }

    /**
     * Получает предыдущую страницу
     */
    previousPage() {
        this.#currentPageNumber--;
        if (this.#currentPageNumber < 0) {
            throw new Error("Попытка получить несуществующую страницу");
        }

        return this.getPage();
    }
}