/**
 * Analytics.
 *
 *      ./module/analytics-compendiums.js
 *      v0.0.2
 */

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsCompendiums extends FormApplication {

    /**
    * AnalyticsCompendiums.constructor().
	*
	* Compendium.
	*
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.constructor()");

        super(dialogData, options);

		this.list_items = [];
		/*
		game.compendiums.contents.forEach((a, i) => { 
			if (game.compendiums.contents[i]) {
				let compendium = game.compendiums.contents[i];
				this.list_items[i] = `<tr><td>` + compendium.data.name + `</td></tr>`;
			};
		});
		*/
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.title"),
			id: "analytics-compendiums",
            template: "modules/analytics/templates/analytics-compendiums-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.getData()");

		return { title: i18n("m.title-compendiums") };
	}

	saveData() {		
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.saveData()");
	}

	async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-compendiums-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
