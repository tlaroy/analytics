/**
 * Analytics.
 *
 *      ./module/analytics-journals.js
 *      v0.0.1
 */

import * as CM_CONST from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsJournals extends FormApplication {

    /**
    * AnalyticsJournals.constructor().
    */

    constructor(dialogData = {}, options = {}) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.constructor()");

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
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.defaultOptions()");

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
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.getData()");

		return { title: i18n("m.title-journals") };
	}

	saveData() {		
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.saveData()");
	}

	async activateListeners($html) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsJournals.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-journals-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
