import { ManipulatorManager } from "./ManipulatorManager.js";

/**
 * Класс отвенственен за получение текста комментариев к шагам и ошибкам
 * по ключю с сервера
 *
 * Сингельтон
 */
export class CommentManager {
    /**
     * URL для получения текста комментариев
     */
    static #COMMENT_URL = "/help/index";

    /**
     * Сингельтон
     */
    static #instance;

    /**
     * Определяет, можно ли сконструировать объект
     */
    static #canConstruct = false;

    /**
     * Словарь комментариев, хранит ранее полученные комментарии
     */
    #comments = new Map();

    /**
     * Получает экземпляр
     */
    static getInstance() {
        if (CommentManager.#instance == null) {
            CommentManager.#canConstruct = true;
            CommentManager.#instance = new CommentManager();
            CommentManager.#canConstruct = false;
        }

        return this.#instance;
    }

    /**
     * Конструктор, скрытый для всех вне данного файла
     */
    constructor() {
        if (!CommentManager.#canConstruct) {
            throw new Error("Cannot construct a singleton class");
        } else {
            this.loadComments();
        }
    }

    loadComments() {
        this.#comments.set("horse_calc_weight_control", "Сделайте шаг второго типа");
        this.#comments.set("horse_calc_weight_demonstration", "На этом шаге вычисляются веса ходов");
        this.#comments.set("horse_calc_weight_training", "На этом шаге нужно вычислить веса ходов");
        this.#comments.set("horse_calc_weight_error", "Неправильно вычислины веса ходов");
        this.#comments.set("horse_chose_next_cell_control", "Сделайте шаг третьего типа");
        this.#comments.set("horse_chose_next_cell_demonstration", "На этом шаге выбирается очередной ход");
        this.#comments.set("horse_chose_next_cell_training", "На этом шаге нужно выбрать очередной ход");
        this.#comments.set("horse_chose_next_cell_error", "Неправильно определен очередной ход");
        this.#comments.set("horse_select_next_cell_control", "Сделайте шаг первого типа");
        this.#comments.set("horse_select_next_cell_demonstration", "На этом шаге выбираются возможные ходы");
        this.#comments.set("horse_select_next_cell_training", "На этом шаге нужно выбрать возможные ходы");
        this.#comments.set("horse_select_next_cell_error", "Неправильно выделены возможные шаги");
        this.#comments.set("horse_final_training", "Обход завершен");
        this.#comments.set("horse_final_demonstration", "Обход завершен");
        this.#comments.set("horse_final_control", "Обход завершен");

        this.#comments.set("kruskal_sort_control", "Сделайте шаг первого типа");
        this.#comments.set("kruskal_sort_demonstration", "На этом шаге необходимо упорядочить ребра по длине сверху вниз");
        this.#comments.set("kruskal_sort_training", "На этом шаге необходимо упорядочить ребра по длине сверху вниз");
        this.#comments.set("kruskal_sort_error", "Ребра не упорядочены по длине сверху вниз");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_control", "Сделайте шаг второго типа");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_demonstration", "На этом шаге необходимо включить ребро в остовное дерево если оно не образует цикл или если его вершины имеют разные цвета. В противном случае следует исключить ребро из дерева");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_training", "На этом шаге необходимо включить ребро в остовное дерево если оно не образует цикл или если его вершины имеют разные цвета. В противном случае следует исключить ребро из дерева");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_error1", "На этом шаге необходимо либо включить ребро в остовное дерево, либо исключить из него");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_error2", "Ребро образует цикл значит его нужно исключить из остовного дерева");
        this.#comments.set("kruskal_selectMinNonCycleEdgeStep_error3", "Ребро не образует цикл значит его нужно включить в остовное дерево");
        this.#comments.set("kruskal_final_training", "Построение остовного дерева закончено");
        this.#comments.set("kruskal_final_demonstration", "Построение остовного дерева закончено");
        this.#comments.set("kruskal_final_control", "Построение остовного дерева закончено");

        this.#comments.set("euler_final_control", "Эйлеров путь построен правильно");
        this.#comments.set("euler_final_demonstration", "Эйлеров путь построен");
        this.#comments.set("euler_final_training", "Эйлеров путь построен правильно");
        this.#comments.set("euler_make_path_error", "Очередное ребро пути выбрано неверно");
        this.#comments.set("euler_select_edge_control", "Выполните следующий шаг алгоритма");
        this.#comments.set("euler_select_edge_demonstration", "Происходит выделение следующего ребра");
        this.#comments.set("euler_select_edge_training", "Выделите следующее ребро пути");

        this.#comments.set("huffamn_calccode_error", "Ошибка в кодах");
        this.#comments.set("huffamn_calcweight_error", "Неверно посчитан вес");
        this.#comments.set("huffamn_encodestep_error", "Неверно расшифрован очередной символ");
        this.#comments.set("huffamn_glue_error", "Неверно выбраны узлы для склейки");
        this.#comments.set("huffman_buildcode_control", "Выполните шаг четвертого типа");
        this.#comments.set("huffman_buildcode_demonstration", "На этом шаге кодируется слово");
        this.#comments.set("huffman_buildcode_training", "На этом шаге нужно закодировать слово");
        this.#comments.set("huffman_calccode_control", "Сделайте шаг третьего типа");
        this.#comments.set("huffman_calccode_demonstration", "На этом шаге вычисляются коды узлов");
        this.#comments.set("huffman_calccode_training", "На этом шаге нужно вычислить коды узлов");
        this.#comments.set("huffman_calcweight_control", "Выполните шаг второго типа");
        this.#comments.set("huffman_calcweight_demonstration", "На этом шаге вычисляется вес нового узла");
        this.#comments.set("huffman_calcweight_training", "На этом шаге нужно вычислить вес нового узла");
        this.#comments.set("huffman_encode_control", "Сделайте шаг пятого типа");
        this.#comments.set("huffman_encode_demonstration", "На этом шаге декодируется очередной символ");
        this.#comments.set("huffman_encode_training", "Нужно декодировать очередной символ");
        this.#comments.set("huffman_final_control", "Конец");
        this.#comments.set("huffman_final_demonstration", "Демонстрация завершена");
        this.#comments.set("huffman_final_training", "Тренировка прошла успешно");
        this.#comments.set("huffman_glue_control", "Выполните шаг первого типа");
        this.#comments.set("huffman_glue_demonstration", "На этом шаге склеиваем узлы с минимальными частотами");
        this.#comments.set("huffman_glue_training", "На этом шаге нужно склеить узлы с минимальными частотами");

        this.#comments.set("prim_add_edge_control", "Сделайте шаг второго типа");
        this.#comments.set("prim_add_edge_demonstration", "На этом шаге происходит включение ребра в минимальное остовное дерево");
        this.#comments.set("prim_add_edge_error", "Необходимо выбрать кратчайшее ребро для включения в дерево");
        this.#comments.set("prim_add_edge_training", "На этом шаге требуется включить ребро в дерево");
        this.#comments.set("prim_final_control", "Cеть построена");
        this.#comments.set("prim_final_demonstration", "Оптимальная сеть построена");
        this.#comments.set("prim_final_training", "Оптимальная сеть построена");
        this.#comments.set("prim_select_bridge_control", "Сделайте шаг первого типа");
        this.#comments.set("prim_select_bridge_demonstration", "На этом шаге выделяются граничные ребра");
        this.#comments.set("prim_select_bridge_error", "Неверно выделены граничные ребра");
        this.#comments.set("prim_select_bridge_training", "На этом шаге необходимо выделить граничные ребра");

        this.#comments.set("dijkstra_final_control", "Все кратчайшие пути найдены");
        this.#comments.set("dijkstra_final_demonstration", "Все кратчайшие пути найдены");
        this.#comments.set("dijkstra_final_training", "Все кратчайшие пути найдены");
        this.#comments.set("dijkstra_next_vertex_control", "Сделайте шаг третьего типа");
        this.#comments.set("dijkstra_next_vertex_demonstration", "На этом шаге вершина с минимальной пометкой включается в дерево");
        this.#comments.set("dijkstra_next_vertex_error", "Неверное включение вершины в дерево");
        this.#comments.set("dijkstra_next_vertex_training", "Нужно включить вершину с минимальной пометкой в дерево");
        this.#comments.set("dijkstra_select_adjacent_control", "Сделайте шаг первого типа");
        this.#comments.set("dijkstra_select_adjacent_demonstration", "Выделение вершин, смежных с последней включенной в дерево");
        this.#comments.set("dijkstra_select_adjacent_error", "Неверно выделены смежные вершины");
        this.#comments.set("dijkstra_select_adjacent_training", "Выделите вершины, смежные с последней включенной в дерево");
        this.#comments.set("dijkstra_weight_correction_control", "Сделайте шаг второго типа");
        this.#comments.set("dijkstra_weight_correction_demonstration", "На этом шаге корректируются пометки вершин");
        this.#comments.set("dijkstra_weight_correction_error", "Неверно скорректированы веса");
        this.#comments.set("dijkstra_weight_correction_training", "На этом шаге нужно скорректировать пометки вершин");

        this.#comments.set("matching_draw_graph_control", "Сделайте шаг первого типа");
        this.#comments.set("matching_draw_graph_demonstration", "На этом шаге строится граф паркета");
        this.#comments.set("matching_draw_graph_error	Создан", "неверный граф");
        this.#comments.set("matching_draw_graph_training", "На этом шаге нужно построить граф паркета");
        this.#comments.set("matching_final_control", "Паросочетание построено");
        this.#comments.set("matching_final_demonstration", "Паросочетание построено");
        this.#comments.set("matching_final_training", "Паросочетание построено");
        this.#comments.set("matching_form_graph_control", "Сделайте шаг второго типа");
        this.#comments.set("matching_form_graph_demonstration", "Граф представляется двудольным, добавляются начало, конец и ребра");
        this.#comments.set("matching_form_graph_error", "Неверное разделение на доли");
        this.#comments.set("matching_form_graph_training", "Переместите вершины разных долей графа в разные полуплоскости");
        this.#comments.set("matching_make_path_error", "Неверно выбран улучшающий путь");
        this.#comments.set("matching_select_rhomb_control", "Сделайте шаг третьего типа");
        this.#comments.set("matching_select_rhomb_demonstration", "На этом шаге строится путь, увеличивающий паросочетание");
        this.#comments.set("matching_select_rhomb_training", "Построить путь, увеличивающий паросочетание");
    }

    getStepHelp(key, consumer, alternativeValue = null) {
        if (ManipulatorManager.getInstance().getRegime() === ManipulatorManager.REGIME_DEMO) {
            key = key + "_demonstration";
        } else if (ManipulatorManager.getInstance().getRegime() === ManipulatorManager.REGIME_TRAINING) {
            key = key + "_training";
        } else if (ManipulatorManager.getInstance().getRegime() === ManipulatorManager.REGIME_CONTROL) {
            key = key + "_control";
        } else {
            key = key + "_demonstration";
        }

        this.getHelp(key, consumer, alternativeValue);
    }

    /**
     * Возвращает текст помощи по ключу.
     * При возникновении исключений вернет дефолтное значение
     *
     */
    getHelp(key, consumer, alternativeValue = "", prefix = "") {
        if (consumer == null) {
            return;
        }

        if (this.#comments.get(key) != null) {
            consumer.setText(prefix + this.#comments.get(key));
            return;
        }

        this.#comments.set(key, alternativeValue);
        consumer.setText(alternativeValue);
    }
}