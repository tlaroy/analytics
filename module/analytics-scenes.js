/**
 * Analytics.
 *
 *      ./module/analytics-screens.js
 *      v0.0.2
 */

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsScenes extends FormApplication {

    /**
    * AnalyticsScenes.constructor().
	*
	* Scene (Actors) (Journals) (Playlists) (Tiles).
	*
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.constructor()");

        super(dialogData, options);
		
		this.list_items = [];
		game.scenes.contents.forEach((a, i) => { 
			if (game.scenes.contents[i]) {
				let scene = game.scenes.contents[i];
				this.list_items[i] = `<tr><td>` + scene.data.name + `</td><td>` + scene.dimensions.height + `</td><td>` + scene.dimensions.width + `</td><td>` + scene.img + `</td><td>` + scene.tokens.size + `</td></tr>`;
			};
		});
    }

    static show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.title"),
			id: "analytics-scenes",
            template: "modules/analytics/templates/analytics-scenes-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.getData()");

		return { title: i18n("m.title-scenes") };
	}

	saveData() {		
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.saveData()");
	}

	async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-scenes-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
