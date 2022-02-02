/***
*
* module/analytics-cards.js
*
* version 0.0.7
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsCards extends FormApplication {

    /**
    * AnalyticsCards.constructor().
    *
    * Card Stack.
    *
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards constructor()");

        super(dialogData, options);

        this.list_items = [];
        game.cards.contents.forEach((a, i) => {
            if (game.cards.contents[i]) {
                let card = game.cards.contents[i];
                this.list_items[i] = `<tr><td>` + card.data.name + `</td></tr>`;
            };
        });
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:      i18n("ANALYTICS.Title"),
            id:         "analytics-cards",
            template:   "modules/analytics/templates/analytics-cards-template.html",
            classes:    ["dialog"],
            width:      900,
            height:     425,
            resizable:  true,
          //dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards getData()");

        return { title: i18n("DOCUMENT.Cards") };
    }

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async activateListeners()");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-cards-wrapper");
        wrapper.innerHTML += this.list_items.join("");
    }
}
