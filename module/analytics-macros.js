/***
*
* module/analytics-macros.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsMacros extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // macro options for each tab.
        this.parent.macro_options = Object.assign(this.parent.macro_options, {
            "macros_in_compendiums": {
                macro_count:                    0,
                macro_name_value:               "",
                macro_case_sensitive_checked:   false,
                macro_exact_match_checked:      false,
                },
            "macros_in_items": {
                macro_count:                    0,
                macro_name_value:               "",
                macro_case_sensitive_checked:   false,
                macro_exact_match_checked:      false,
                },
            "macros_in_journals": {
                macro_count:                    0,
                macro_name_value:               "",
                macro_case_sensitive_checked:   false,
                macro_exact_match_checked:      false,
                },
            "macros_in_tables": {
                macro_count:                    0,
                macro_name_value:               "",
                macro_case_sensitive_checked:   false,
                macro_exact_match_checked:      false,
                },
            "macros_in_tiles": {
                macro_count:                    0,
                macro_name_value:               "",
                macro_case_sensitive_checked:   false,
                macro_exact_match_checked:      false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (11) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "macros_in_compendiums": {
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,

                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (18) in items options.
        this.parent.item_options = Object.assign(this.parent.item_options, {
            "macros_in_items": {
                item_count:                  0,
                item_name_value:             "",
                item_case_sensitive_checked: false,
                item_exact_match_checked:    false,

                item_none_checked:           false,
                item_show_checked:           false,

                item_weapon_checked:         false,
                item_equipment_checked:      false,
                item_consumable_checked:     false,
                item_tool_checked:           false,
                item_loot_checked:           false,
                item_class_checked:          false,
                item_feat_checked:           false,
                item_backpack_checked:       false,
                item_spell_checked:          false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                }
        });

        // (21) in journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "macros_in_journals": {
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

        // (28) in tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "macros_in_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                },
        });

        // (29) in tiles options.
        this.parent.tile_options = Object.assign(this.parent.tile_options, {
            "macros_in_tiles": {
                tile_count:                    0,
                tile_name_value:               "",
                tile_case_sensitive_checked:   false,
                tile_exact_match_checked:      false,
                }
        });

        /* OUTPUT BY TAB */

        // macro lists.
        this.parent.macro_lists = Object.assign(this.parent.macro_lists, {
            "macros_in_compendiums": [],
            "macros_in_items":       [],
            "macros_in_journals":    [],
            "macros_in_tables":      [],
            "macros_in_tiles":       [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-macros",
            template:       "modules/analytics/templates/analytics-macros-template.html",
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "macros-in-compendiums"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "macros-in-compendiums":
                retval = { primary: "macros_in_compendiums", secondary: "macros_in_compendiums" };
                break;
            case "macros-in-items":
                retval = { primary: "macros_in_items", secondary: "macros_in_items" };
                break;
            case "macros-in-journals":
                retval = { primary: "macros_in_journals", secondary: "macros_in_journals" };
                break;
            case "macros-in-tables":
                retval = { primary: "macros_in_tables", secondary: "macros_in_tables" };
                break;
            case "macros-in-tiles":
                retval = { primary: "macros_in_tiles", secondary: "macros_in_tiles" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        switch (option) {
            case "macros_in_items":
                // disable on use item macros if midi-qol not installed or not active.
                if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
                    document.getElementById("in-item-macro-label").style.display                = "none";
                    document.getElementById("in-item-macro-note").style.display                 = "none";
                    document.getElementById("in-item-macro-name-label").style.display           = "none";
                    document.getElementById("in-item-macro-name-input").style.display           = "none";
                    document.getElementById("in-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("in-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("in-item-macro-thematic-break").style.display       = "none";
                }

                // toggle macro fields.
                document.getElementById("in-item-macro-name").disabled           = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("in-item-macro-case-sensitive").disabled = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("in-item-macro-exact-match").disabled    = !this.parent.item_options[option2].item_macro_checked;
                break;
            case "macros_in_journals":
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
        html_list.innerHTML = this.parent.macro_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "macros_in_compendiums":
                retval = {
                    "number-of-macros":             game.macros.size,

                    "macro-count":                  this.parent.macro_options[option].macro_count,
                    "macro-name-value":             this.parent.macro_options[option].macro_name_value,
                    "macro-case-sensitive-checked": this.parent.macro_options[option].macro_case_sensitive_checked  ? "checked" : "",
                    "macro-exact-match-checked":    this.parent.macro_options[option].macro_exact_match_checked     ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "macros_in_items":
                retval = {
                    "number-of-macros":             game.macros.size,

                    "macro-count":                  this.parent.macro_options[option].macro_count,
                    "macro-name-value":             this.parent.macro_options[option].macro_name_value,
                    "macro-case-sensitive-checked": this.parent.macro_options[option].macro_case_sensitive_checked  ? "checked" : "",
                    "macro-exact-match-checked":    this.parent.macro_options[option].macro_exact_match_checked     ? "checked" : "",

                    "in-item-name-value":                   this.parent.item_options[option2].item_name_value,
                    "in-item-case-sensitive-checked":       this.parent.item_options[option2].item_case_sensitive_checked    ? "checked" : "",
                    "in-item-exact-match-checked":          this.parent.item_options[option2].item_exact_match_checked       ? "checked" : "",
                    "in-item-none-checked":                 this.parent.item_options[option2].item_none_checked              ? "checked" : "",
                    "in-item-show-checked":                 this.parent.item_options[option2].item_show_checked              ? "checked" : "",

                    "in-item-weapon-checked":               this.parent.item_options[option2].item_weapon_checked            ? "checked" : "",
                    "in-item-equipment-checked":            this.parent.item_options[option2].item_equipment_checked         ? "checked" : "",
                    "in-item-consumable-checked":           this.parent.item_options[option2].item_consumable_checked        ? "checked" : "",
                    "in-item-tool-checked":                 this.parent.item_options[option2].item_tool_checked              ? "checked" : "",
                    "in-item-loot-checked":                 this.parent.item_options[option2].item_loot_checked              ? "checked" : "",
                    "in-item-class-checked":                this.parent.item_options[option2].item_class_checked             ? "checked" : "",
                    "in-item-feat-checked":                 this.parent.item_options[option2].item_feat_checked              ? "checked" : "",
                    "in-item-backpack-checked":             this.parent.item_options[option2].item_backpack_checked          ? "checked" : "",
                    "in-item-spell-checked":                this.parent.item_options[option2].item_spell_checked             ? "checked" : "",

                    "in-item-macro-checked":                  this.parent.item_options[option2].item_macro_checked                 ? "checked" : "",
                    "in-item-macro-name-value":               this.parent.item_options[option2].item_macro_name_value,
                    "in-item-macro-case-sensitive-checked":   this.parent.item_options[option2].item_macro_case_sensitive_checked  ? "checked" : "",
                    "in-item-macro-exact-match-checked":      this.parent.item_options[option2].item_macro_exact_match_checked     ? "checked" : "",
                };
                break;
            case "macros_in_journals":
                retval = {
                    "number-of-macros":             game.macros.size,

                    "macro-count":                  this.parent.macro_options[option].macro_count,
                    "macro-name-value":             this.parent.macro_options[option].macro_name_value,
                    "macro-case-sensitive-checked": this.parent.macro_options[option].macro_case_sensitive_checked  ? "checked" : "",
                    "macro-exact-match-checked":    this.parent.macro_options[option].macro_exact_match_checked     ? "checked" : "",

                    "in-journal-name-value":             this.parent.journal_options[option2].journal_name_value,
                    "in-journal-case-sensitive-checked": this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "in-journal-exact-match-checked":    this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "in-journal-none-checked":           this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "in-journal-show-checked":           this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "in-journal-base-checked":           this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "in-journal-checklist-checked":      this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "in-journal-encounter-checked":      this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "in-journal-loot-checked":           this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "in-journal-organization-checked":   this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "in-journal-person-checked":         this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "in-journal-place-checked":          this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "in-journal-poi-checked":            this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "in-journal-quest-checked":          this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "in-journal-shop-checked":           this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "macros_in_tables":
                retval = {
                    "number-of-macros":             game.macros.size,

                    "macro-count":                  this.parent.macro_options[option].macro_count,
                    "macro-name-value":             this.parent.macro_options[option].macro_name_value,
                    "macro-case-sensitive-checked": this.parent.macro_options[option].macro_case_sensitive_checked  ? "checked" : "",
                    "macro-exact-match-checked":    this.parent.macro_options[option].macro_exact_match_checked     ? "checked" : "",

                    "in-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "in-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked    ? "checked" : "",
                    "in-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked       ? "checked" : "",
                    "in-table-none-checked":                this.parent.table_options[option2].table_none_checked              ? "checked" : "",
                    "in-table-show-checked":                this.parent.table_options[option2].table_show_checked              ? "checked" : "",
                };
                break;
            case "macros_in_tiles":
                retval = {
                    "number-of-macros":             game.macros.size,

                    "macro-count":                  this.parent.macro_options[option].macro_count,
                    "macro-name-value":             this.parent.macro_options[option].macro_name_value,
                    "macro-case-sensitive-checked": this.parent.macro_options[option].macro_case_sensitive_checked  ? "checked" : "",
                    "macro-exact-match-checked":    this.parent.macro_options[option].macro_exact_match_checked     ? "checked" : "",

                    "in-tile-name-value":                  this.parent.tile_options[option2].tile_name_value,
                    "in-tile-case-sensitive-checked":      this.parent.tile_options[option2].tile_case_sensitive_checked    ? "checked" : "",
                    "in-tile-exact-match-checked":         this.parent.tile_options[option2].tile_exact_match_checked       ? "checked" : "",
                    "in-tile-none-checked":                this.parent.tile_options[option2].tile_none_checked              ? "checked" : "",
                    "in-tile-show-checked":                this.parent.tile_options[option2].tile_show_checked              ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "macros-in-compendiums":
                option = "macros_in_compendiums";
                retval = !this.parent.compendium_options["macros_in_compendiums"].compendium_submitted;
                break;
            case "macros-in-items":
                option = "macros_in_items";
                retval = !this.parent.item_options["macros_in_items"].item_submitted;
                break;
            case "macros-in-journals":
                option = "macros_in_journals";
                retval = !this.parent.journal_options["macros_in_journals"].journal_submitted;
                break;
            case "macros-in-tables":
                option = "macros_in_tables";
                retval = !this.parent.table_options["macros_in_tables"].table_submitted;
                break;
            case "macros-in-tiles":
                option = "macros_in_tiles";
                retval = !this.parent.tile_options["macros_in_tiles"].tile_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.macro_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async _onSubmit(event)");

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
            case "macros_in_compendiums":
                if (!this.parent.compendium_options["macros_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["macros_in_compendiums"].compendium_submitted = true;
                break;
            case "macros_in_items":
                if (!this.parent.item_options["macros_in_items"].item_submitted)
                     this.parent.item_options["macros_in_items"].item_submitted = true;
                break;
            case "macros_in_journals":
                if (!this.parent.journal_options["macros_in_journals"].journal_submitted)
                     this.parent.journal_options["macros_in_journals"].journal_submitted = true;
                break;
            case "macros_in_tables":
                if (!this.parent.table_options["macros_in_tables"].table_options)
                     this.parent.table_options["macros_in_tables"].table_options = true;
                break;
            case "macros_in_tiles":
                if (!this.parent.tile_options["macros_in_tiles"].tile_options)
                     this.parent.tile_options["macros_in_tiles"].tile_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.macro_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.macro_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "macros_in_compendiums":
                this.parent.macro_options[option].macro_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.macro_lists[option].splice(0, this.parent.macro_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "macros_in_items":
                this.parent.macro_options[option].macro_count = 0;
                this.parent.item_options[option2].item_count = 0;
                this.parent.item_options[option2].item_macro_count = 0;
                this.parent.macro_lists[option].splice(0, this.parent.macro_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "macros_in_journals":
                this.parent.macro_options[option].macro_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.macro_lists[option].splice(0, this.parent.macro_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "macros_in_tables":
                this.parent.macro_options[option].macro_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.macro_lists[option].splice(0, this.parent.macro_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "macros_in_tiles":
                this.parent.macro_options[option].macro_count = 0;
                this.parent.tile_options[option2].tile_count = 0;
                this.parent.macro_lists[option].splice(0, this.parent.macro_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
