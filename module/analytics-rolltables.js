/***
*
* module/analytics-rolltables.js
*
* version 0.0.7
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsRolltables extends FormApplication {

    /**
    * AnalyticsRolltables.constructor().
    *
    * Table.
    *
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables constructor()");

        super(dialogData, options);

        this.list_items = [];
        game.tables.contents.forEach((a, i) => {
            if (game.tables.contents[i]) {
                let rolltable = game.tables.contents[i];
                this.list_items[i] = `<tr><td>` + rolltable.data.name + `</td></tr>`;
            };
        });
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables static show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables static hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:      i18n("ANALYTICS.Title"),
            id:         "analytics-rolltables",
            template:   "modules/analytics/templates/analytics-rolltables-template.html",
            classes:    ["dialog"],
            width:      900,
            height:     425,
            resizable:  true,
          //dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables getData()");

        return { title: i18n("SIDEBAR.TabTables") };
    }

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsRolltables async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-rolltables-wrapper");
        wrapper.innerHTML += this.list_items.join("");
    }
}
