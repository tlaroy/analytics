/**
 * Analytics.
 *
 *      ./module/analytics-items.js
 *      v0.0.1
 */

import * as CM_CONST from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsItems extends FormApplication {

    /**
    * AnalyticsItems.constructor().
    */

    constructor(dialogData = {}, options = {}) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.constructor()");

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
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.show()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) {
                return app.render(true, { focus: inFocus });
            }
        }
        return new this().render(true);
    }

    static hide() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.hide()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) app.close();
        }
    }

    static get isVisible() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

	static get defaultOptions() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
			title: i18n("m.title-itmes"),
			id: "analytics-itmes",
            template: "modules/analytics/templates/analytics-items-template.html",
            classes: ["dialog"],
            width: 900,
            height: 425,
			resizable: true,
			dragDrop: [{ dragSelector: null, dropSelector: null }],
        });
	}

	getData() {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.getData()");

		return { title: i18n("m.title-items") };
	}

	saveData() {		
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.saveData()");
	}

	async activateListeners($html) {
        console.info(CM_CONST.CM_LABEL + "AnalyticsItems.activateListeners()");

        super.activateListeners($html);

		// tools
		if(canvas.background._active) canvas.foreground.activate()

        const wrapper = document.getElementById("analytics-items-wrapper");
        wrapper.innerHTML += this.list_items.join("");
	}
}
