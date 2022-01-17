/**
 * Analytics.
 *
 *      ./module/analytics-actors.js
 *      v0.0.1
 */

import * as CM_CONST from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends FormApplication {

    /**
    * AnalyticsActors.constructor().
    */
	
    constructor(dialogData = {}, options = {}) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.constructor()");

        super(dialogData, options);

		this.list_items = [];
		game.actors.contents.forEach((a, i) => { 
			if (game.actors.contents[i]) {
				let actor = game.actors.contents[i];
				this.list_items[i] = `<tr><td>` + actor.data.name + `</td><td>` + actor.data.type + `</td><td>` + actor.data.data.attr.ac.value + `</td><td>` + actor.data.data.attr.hp.value + `</td><td>` + actor.labels.creatureType + `</td></tr>`;
			};
		});
    }

    static show(inFocus = false) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
			title: i18n("m.title-actors"),
			id: "analytics-actors",
            template: "modules/analytics/templates/analytics-actors-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.getData()");

		return { title: i18n("m.title-actors") };
	}

	saveData() {		
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.saveData()");
	}

	async activateListeners($html) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsActors.activateListeners()");

        super.activateListeners($html);
		
		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-actors-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
