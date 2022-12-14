import { ICommentPanel } from "../../controls/ICommentPanel.js";
import { CommentTextConsumer } from "./CommentTextConsumer.js";
import { ErrorTextConsumer } from "./ErrorTextConsumer.js";
import { Comment } from "../../../gui/Comment.js";
import { ErrorComment } from "../../../gui/ErrorComment.js";

/**
 * Панель с комментариями
 */
export class DefaultCommentPanel extends ICommentPanel {
    /**
     * Дефолтное представление - текстовое поле
     */
    #view = new createjs.Text();

    #erview = new createjs.Text();
    #commentmc;
    #ercommentmc;
    #evilHero;
    #hero;

    /**
     * Конструктор, инициализирует слушателей кнопок смены режимов
     */
    constructor(hero, cloudX, cloudY, evilHero = null,
                commentSprite = null, errorSprite = null,
                commentField = null, errorField = null) {
        super();

        if (commentSprite == null) {
            this.#commentmc = new Comment();
            this.#view = this.#commentmc.comment_txt;
        } else {
            this.#commentmc = commentSprite;
            this.#view = commentField;
        }

        if (errorSprite == null) {
            this.#ercommentmc = new ErrorComment();
            this.#erview = this.#ercommentmc.comment_txt;
        } else {
            this.#ercommentmc = errorSprite;
            this.#erview = errorField;
        }

        this.#hero = hero;
        this.#evilHero = evilHero;

        this.addChild(this.#commentmc);
        this.addChild(this.#ercommentmc);
        this.addChild(hero);
        if (evilHero != null) {
            this.addChild(evilHero);
        }

        this.#commentmc.x = cloudX;
        this.#commentmc.y = cloudY;
        this.#ercommentmc.x = cloudX;
        this.#ercommentmc.y = cloudY;
    }

    commentGetter() {
        this.#commentmc.visible = true;
        this.#ercommentmc.visible = false;

        if (this.#evilHero != null) {
            this.#evilHero.visible = false;
            this.#hero.visible = true;
        }

        return new CommentTextConsumer(this.#view);
    }

    errorGetter() {
        this.#commentmc.visible = false;
        this.#ercommentmc.visible = true;

        if (this.#evilHero != null) {
            this.#hero.visible = false;
            this.#evilHero.visible = true;
        }

        return new ErrorTextConsumer(this.#erview);
    }

    getView() {
        return this;
    }
}