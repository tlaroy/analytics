/***
*
* module/analytics-macros.js
*
* version 0.0.4
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsMacros extends FormApplication {

    /**
    * AnalyticsMacros.constructor().
    *
    * Macro.
    *
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros constructor()");

        super(dialogData, options);

        this.list_items = [];
        game.macros.contents.forEach((a, i) => {
            if (game.macros.contents[i]) {
                let macro = game.macros.contents[i];
                this.list_items[i] = `<tr><td>` + macro.data.name + `</td></tr>`;
            };
        });
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:      i18n("ANALYTICS.Title"),
            id:         "analytics-macros",
            template:   "modules/analytics/templates/analytics-macros-template.html",
            classes:    ["dialog"],
            width:      900,
            height:     425,
            resizable:  true,
          //dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros getData()");

        return { title: i18n("DOCUMENT.Macros") };
    }

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-macros-wrapper");
        wrapper.innerHTML += this.list_items.join("");
    }
}
