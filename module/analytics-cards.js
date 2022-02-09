/***
*
* module/analytics-cards.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsCards extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // card options for each tab.
        this.parent.card_options = Object.assign(this.parent.card_options, {
            "cards_in_compendiums": {
                card_count:                    0,
                card_name_value:               "",
                card_case_sensitive_checked:   false,
                card_exact_match_checked:      false,
                },
            "cards_in_journals": {
                card_count:                    0,
                card_name_value:               "",
                card_case_sensitive_checked:   false,
                card_exact_match_checked:      false,
                },
            "cards_in_tables": {
                card_count:                    0,
                card_name_value:               "",
                card_case_sensitive_checked:   false,
                card_exact_match_checked:      false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (6) in compendium options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "cards_in_compendiums": {
                compendium_submitted:              false,
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,
                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (7) in journal options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "cards_in_journals": {
                journal_submitted:              false,
                journal_count:                  0,
                journal_name_value:             "",
                journal_case_sensitive_checked: false,
                journal_exact_match_checked:    false,
                journal_none_checked:           false,
                journal_show_checked:           false,

                journal_base_checked:           false,
                journal_checklist_checked:      false,
                journal_encounter_checked:      false,
                journal_loot_checked:           false,
                journal_organization_checked:   false,
                journal_person_checked:         false,
                journal_place_checked:          false,
                journal_poi_checked:            false,
                journal_quest_checked:          false,
                journal_shop_checked:           false,
                }
        });

        // (8) in table options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "cards_in_tables": {
                table_submitted:              false,
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                table_none_checked:           false,
                table_show_checked:           false,
                }
        });

        /* OUTPUT BY TAB */

        // card lists.
        this.parent.card_lists = Object.assign(this.parent.card_lists, {
            "cards_in_compendiums": [],
            "cards_in_journals":    [],
            "cards_in_tables":      [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-cards",
            template:       "modules/analytics/templates/analytics-cards-template.html",
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "cards-in-compendiums"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "cards-in-compendiums":
                retval = { primary: "cards_in_compendiums", secondary: "cards_in_compendiums" };
                break;
            case "cards-in-journals":
                retval = { primary: "cards_in_journals", secondary: "cards_in_journals" };
                break;
            case "cards-in-tables":
                retval = { primary: "cards_in_tables", secondary: "cards_in_tables" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        switch (option) {
            case "cards_in_journals":
                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("in-journal-monks-base").style.display         = "none";
                    document.getElementById("in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("in-journal-monks-loot").style.display         = "none";
                    document.getElementById("in-journal-monks-organization").style.display = "none";
                    document.getElementById("in-journal-monks-person").style.display       = "none";
                    document.getElementById("in-journal-monks-place").style.display        = "none";
                    document.getElementById("in-journal-monks-poi").style.display          = "none";
                    document.getElementById("in-journal-monks-quest").style.display        = "none";
                    document.getElementById("in-journal-monks-shop").style.display         = "none";
                }
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.card_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "cards_in_compendiums":
                retval = {
                    "number-of-cards":                   game.cards.size,

                    "card-count":                        this.parent.card_options[option].card_count,
                    "card-name-value":                   this.parent.card_options[option].card_name_value,
                    "card-case-sensitive-checked":       this.parent.card_options[option].card_case_sensitive_checked  ? "checked" : "",
                    "card-exact-match-checked":          this.parent.card_options[option].card_exact_match_checked     ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "cards_in_journals":
                retval = {
                    "number-of-cards":                   game.cards.size,

                    "card-count":                        this.parent.card_options[option].card_count,
                    "card-name-value":                   this.parent.card_options[option].card_name_value,
                    "card-case-sensitive-checked":       this.parent.card_options[option].card_case_sensitive_checked  ? "checked" : "",
                    "card-exact-match-checked":          this.parent.card_options[option].card_exact_match_checked     ? "checked" : "",

                    "in-journal-name-value":                this.parent.journal_options[option2].journal_name_value,
                    "in-journal-case-sensitive-checked":    this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "in-journal-exact-match-checked":       this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "in-journal-none-checked":              this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "in-journal-show-checked":              this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "in-journal-base-checked":              this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "in-journal-checklist-checked":         this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "in-journal-encounter-checked":         this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "in-journal-loot-checked":              this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "in-journal-organization-checked":      this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "in-journal-person-checked":            this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "in-journal-place-checked":             this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "in-journal-poi-checked":               this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "in-journal-quest-checked":             this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "in-journal-shop-checked":              this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "cards_in_tables":
                retval = {
                    "number-of-cards":                   game.cards.size,

                    "card-count":                        this.parent.card_options[option].card_count,
                    "card-name-value":                   this.parent.card_options[option].card_name_value,
                    "card-case-sensitive-checked":       this.parent.card_options[option].card_case_sensitive_checked  ? "checked" : "",
                    "card-exact-match-checked":          this.parent.card_options[option].card_exact_match_checked     ? "checked" : "",

                    "in-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "in-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked    ? "checked" : "",
                    "in-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked       ? "checked" : "",
                    "in-table-none-checked":                this.parent.table_options[option2].table_none_checked              ? "checked" : "",
                    "in-table-show-checked":                this.parent.table_options[option2].table_show_checked              ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "cards-in-compendiums":
                option = "cards_in_compendiums";
                retval = !this.parent.compendium_options["cards_in_compendiums"].compendium_submitted;
                break;
            case "cards-in-journals":
                option = "cards_in_journals";
                retval = !this.parent.journal_options["cards_in_journals"].journal_submitted;
                break;
            case "cards-in-tables":
                option = "cards_in_tables";
                retval = !this.parent.table_options["cards_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.card_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _onSubmit(event)");

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
            case "cards_in_compendiums":
                if (!this.parent.compendium_options["cards_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["cards_in_compendiums"].compendium_submitted = true;
                break;
            case "cards_in_journals":
                if (!this.parent.journal_options["cards_in_journals"].journal_submitted)
                     this.parent.journal_options["cards_in_journals"].journal_submitted = true;
                break;
            case "cards_in_tables":
                if (!this.parent.table_options["cards_in_tables"].table_options)
                     this.parent.table_options["cards_in_tables"].table_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.card_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.card_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "cards_in_compendiums":
                this.parent.card_options[option].card_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.card_lists[option].splice(0, this.parent.card_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "cards_in_journals":
                this.parent.card_options[option].card_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.card_lists[option].splice(0, this.parent.card_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "cards_in_tables":
                this.parent.card_options[option].card_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.card_lists[option].splice(0, this.parent.card_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
