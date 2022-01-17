/**
 * Analytics.
 *
 *      ./module/analytics-macros.js
 *      v0.0.1
 */

import * as CM_CONST from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsMacros extends FormApplication {

    /**
    * AnalyticsMacros.constructor().
    */

    constructor(dialogData = {}, options = {}) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.constructor()");

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
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
			title: i18n("m.title-macros"),
			id: "analytics-macros",
            template: "modules/analytics/templates/analytics-macros-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.getData()");

		return { title: i18n("m.title-macros") };
	}

	saveData() {		
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.saveData()");
	}

	async activateListeners($html) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsMacros.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-macros-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
