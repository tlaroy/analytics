/***
*
* module/analytics-tiles.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsTiles extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles  constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // tile options for each tab.
        this.parent.tile_options = Object.assign(this.parent.tile_options, {
            "tiles_with_macros": {
                tile_count:                   0,
                tile_name_value:              "",
                tile_case_sensitive_checked:  false,
                tile_exact_match_checked:     false,
                },
            "tiles_in_scenes": {
                tile_count:                   0,
                tile_name_value:              "",
                tile_case_sensitive_checked:  false,
                tile_exact_match_checked:     false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (29) with macros options.
        this.parent.macro_options = Object.assign(this.parent.macro_options, {
            "tiles_with_macros": {
                macro_count:                  0,
                macro_name_value:             "",
                macro_case_sensitive_checked: false,
                macro_exact_match_checked:    false,
                }
        });

        // (33) in scenes options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "tiles_in_scenes": {
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,

                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        /* OUTPUT BY TAB */

        // tile lists.
        this.parent.tile_lists = Object.assign(this.parent.tile_lists, {
            "tiles_with_macros": [],
            "tiles_in_scenes":   [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-tiles",
            template:       "modules/analytics/templates/analytics-tiles-template.html",
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "tiles-with-macros"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "tiles-with-macros":
                retval = { primary: "tiles_with_macros", secondary: "tiles_with_macros" };
                break;
            case "tiles-in-scenes":
                retval = { primary: "tiles_in_scenes", secondary: "tiles_in_scenes" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.tile_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "tiles_with_macros":
                retval = {
                    "number-of-tiles":             0,

                    "tile-count":                  this.parent.tile_options[option].tile_count,
                    "tile-name-value":             this.parent.tile_options[option].tile_name_value,
                    "tile-case-sensitive-checked": this.parent.tile_options[option].tile_case_sensitive_checked  ? "checked" : "",
                    "tile-exact-match-checked":    this.parent.tile_options[option].tile_exact_match_checked     ? "checked" : "",

                    "with-macros-name-value":                 this.parent.macro_options[option2].macro_name_value,
                    "with-macros-case-sensitive-checked":     this.parent.macro_options[option2].macro_case_sensitive_checked ? "checked" : "",
                    "with-macros-exact-match-checked":        this.parent.macro_options[option2].macro_exact_match_checked    ? "checked" : "",
                    "with-macros-none-checked":               this.parent.macro_options[option2].macro_none_checked           ? "checked" : "",
                    "with-macros-show-checked":               this.parent.macro_options[option2].macro_show_checked           ? "checked" : "",
                };
                break;
            case "tiles_in_scenes":
                retval = {
                    "number-of-tiles":             0,

                    "tile-count":                  this.parent.tile_options[option].tile_count,
                    "tile-name-value":             this.parent.tile_options[option].tile_name_value,
                    "tile-case-sensitive-checked": this.parent.tile_options[option].tile_case_sensitive_checked  ? "checked" : "",
                    "tile-exact-match-checked":    this.parent.tile_options[option].tile_exact_match_checked     ? "checked" : "",

                    "in-scene-name-value":                  this.parent.scene_options[option2].scene_name_value,
                    "in-scene-case-sensitive-checked":      this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "in-scene-exact-match-checked":         this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "in-scene-none-checked":                this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "in-scene-show-checked":                this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "tiles-with-macros":
                option = "tiles_with_macros";
                retval = !this.parent.macro_options["tiles_with_macros"].macro_submitted;
                break;
            case "tiles-in-scenes":
                option = "tiles_in_scenes";
                retval = !this.parent.scene_options["tiles_in_scenes"].scene_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.tile_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _onSubmit(event)");

        event.preventDefault();

        // prevent double submission
        const states = this.constructor.RENDER_STATES;
        if ((this._state === states.NONE) || !this.isEditable || this._submitting) return false;
        this._submitting = true;

        // handle form state prior to submission
        let closeForm    = this.options.closeOnSubmit && !preventClose;
        const priorState = this._state;
        if (preventRender) this._state = states.RENDERING;
        if (closeForm)     this._state = states.CLOSING;

        // get form data
        const formData = this._getSubmitData();

        // set update flag when changing tabs if tab never submitted.
        switch (this.optionKeys().primary) {
            case "tiles_with_macros":
                if (!this.parent.macro_options["tiles_with_macros"].macro_submitted)
                     this.parent.macro_options["tiles_with_macros"].macro_submitted = true;
                break;
            case "tiles_in_scenes":
                if (!this.parent.scene_options["tiles_in_scenes"].scene_submitted)
                     this.parent.scene_options["tiles_in_scenes"].scene_submitted = true;
                break;
        };

        // trigger the object update
        try {
            await this._updateObject(event, formData);
        }
        catch (err) {
            console.error(err);
            closeForm = false;
            this._state = priorState;
        }

        // restore flags and optionally close the form
        this._submitting = false;
        if (preventRender) this._state = priorState;
        if (closeForm)     await this.close({submit: false, force: true});

        return formData;
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _updateObject(event, formData)");

        // null form data - don't rebuild list.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // reset counters.
        var list_counter = 0;

        // add message to the list.
        function add_message(parent, message) {
            (list_counter % 2 == 0) ? parent.parent.tile_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.tile_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "tiles_with_macros":
                this.parent.tile_options[option].tile_count = 0;
                this.parent.macro_options[option2].macro_count = 0;
                this.parent.tile_lists[option].splice(0, this.parent.tile_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tiles_in_scenes":
                this.parent.tile_options[option].tile_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.tile_lists[option].splice(0, this.parent.tile_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
