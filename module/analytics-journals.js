/**
 * Analytics.
 *
 *      ./module/analytics-journals.js
 *      v0.0.2
 */

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsJournals extends FormApplication {

    /**
    * AnalyticsJournals.constructor().
	*
	* Journal (Actors) (Cards) (Items) (Journals) (Scenes) (Tables).
	*
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.constructor()");

        super(dialogData, options);

		this.list_items = [];
		game.journal.contents.forEach((a, i) => { 
			if (game.journal.contents[i]) {
				let journal = game.journal.contents[i];
				this.list_items[i] = `<tr><td>` + journal.data.name + `</td></tr>`;
			};
		});
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
			title: i18n("m.title-journals"),
			id: "analytics-journals",
            template: "modules/analytics/templates/analytics-journals-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.getData()");

		return { title: i18n("m.title-journals") };
	}

	saveData() {		
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.saveData()");
	}

	async activateListeners($html) {
        if (ANALYTICS.DEBUG) if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-journals-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
