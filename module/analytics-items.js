/***
*
* module/analytics-items.js
*
* version 0.0.7
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsItems extends FormApplication {

    /**
    * AnalyticsItems.constructor().
    *
    * Item (Items) (Macros) (Playlists).
    *
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems constructor()");

        super(dialogData, options);

        this.list_items = [];
        game.items.contents.forEach((a, i) => {
            if (game.items.contents[i]) {
                let item = game.items.contents[i];
                this.list_items[i] = `<tr><td>` + item.data.name + `</td></tr>`;
            };
        });
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:      i18n("ANALYTICS.Title"),
            id:         "analytics-itmes",
            template:   "modules/analytics/templates/analytics-items-template.html",
            classes:    ["dialog"],
            width:      900,
            height:     425,
            resizable:  true,
          //dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems getData()");

        return { title: i18n("DOCUMENT.Items") };
    }

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-items-wrapper");
        wrapper.innerHTML += this.list_items.join("");
    }
}
