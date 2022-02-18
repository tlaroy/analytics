/***
*
* module/analytics-items.js
*
* version 0.0.9
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { ItemOptions }       from "./analytics.js";

import { ActorOptions }      from "./analytics.js";
import { CompendiumOptions } from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { MacroOptions }      from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsItems extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems constructor(parent, dialogData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // item options for each tab.
        this.item_options = Object.assign(this.item_options, {
            "items_in_actors":       new ItemOptions(),
            "items_in_compendiums":  new ItemOptions(),
            "items_within_items":    new ItemOptions(),
            "items_in_journals":     new ItemOptions(),
            "items_with_macros":     new ItemOptions(),
            "items_in_tables":       new ItemOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (2) in actors options.
        this.actor_options = Object.assign(this.actor_options, {
            "items_in_actors": new ActorOptions(),
        });

        // (9) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "items_in_compendiums": new CompendiumOptions(),
        });

        // (16-16) within items options.
        this.item_options = Object.assign(this.item_options, {
            "items_within_items_16": new ItemOptions(),
        });

        // (17) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "items_in_journals": new JournalOptions(),
        });

        // (18) with macro options.
        this.macro_options = Object.assign(this.macro_options, {
            "items_with_macros": new MacroOptions(),
        });

        // (19) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "items_in_tables": new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // item lists.
        this.item_lists = Object.assign(this.item_lists, {
            "items_in_actors":      [],
            "items_in_compendiums": [],
            "items_within_items":   [],
            "items_in_journals":    [],
            "items_with_macros":    [],
            "items_in_tables":      [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-items",
            template:       "modules/analytics/templates/analytics-items-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-items"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-items-in-actors"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-items-in-actors":
                retval = {
                    primary:   "items_in_actors",
                    secondary: "items_in_actors"
                };
                break;
            case "analytics-items-in-compendiums":
                retval = {
                    primary:   "items_in_compendiums",
                    secondary: "items_in_compendiums"
                };
                break;
            case "analytics-items-within-items":
                retval = {
                    primary:   "items_within_items",
                    secondary: "items_within_items_16"
                };
                break;
            case "analytics-items-in-journals":
                retval = {
                    primary:   "items_in_journals",
                    secondary: "items_in_journals"
                };
                break;
            case "analytics-items-with-macros":
                retval = {
                    primary:   "items_with_macros",
                    secondary: "items_with_macros"
                };
                break;
            case "analytics-items-in-tables":
                retval = {
                    primary:   "items_in_tables",
                    secondary: "items_in_tables"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async activateListeners(html)");

        super.activateListeners($html);

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];
        var item_list   = this.item_lists[primary];

        // enable/disable by name or id.
        document.getElementById("analytics-items-name").disabled           = !document.getElementById("analytics-items-radio-name").checked;
        document.getElementById("analytics-items-case-sensitive").disabled = !document.getElementById("analytics-items-radio-name").checked;
        document.getElementById("analytics-items-exact-match").disabled    = !document.getElementById("analytics-items-radio-name").checked;
        document.getElementById("analytics-items-id").disabled             = !document.getElementById("analytics-items-radio-id").checked;

        // disable on use item macros if midi-qol not installed or not active.
        if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
            document.getElementById("analytics-items-macro-label").style.display                = "none";
            document.getElementById("analytics-items-macro-note").style.display                 = "none";
            document.getElementById("analytics-items-macro-name-label").style.display           = "none";
            document.getElementById("analytics-items-macro-name-input").style.display           = "none";
            document.getElementById("analytics-items-macro-case-sensitive-label").style.display = "none";
            document.getElementById("analytics-items-macro-exact-match-label").style.display    = "none";
            document.getElementById("analytics-items-macro-thematic-break").style.display       = "none";
        }

        // toggle macro fields.
        document.getElementById("analytics-items-macro-name").disabled           = !item_option.item_macro_checked;
        document.getElementById("analytics-items-macro-case-sensitive").disabled = !item_option.item_macro_checked;
        document.getElementById("analytics-items-macro-exact-match").disabled    = !item_option.item_macro_checked;

        switch (secondary) {
            case "items_in_actors":
                // enable/disable by name or id.
                document.getElementById("analytics-items-in-actor-name").disabled           = !document.getElementById("analytics-items-in-actor-radio-name").checked;
                document.getElementById("analytics-items-in-actor-case-sensitive").disabled = !document.getElementById("analytics-items-in-actor-radio-name").checked;
                document.getElementById("analytics-items-in-actor-exact-match").disabled    = !document.getElementById("analytics-items-in-actor-radio-name").checked;
                document.getElementById("analytics-items-in-actor-id").disabled             = !document.getElementById("analytics-items-in-actor-radio-id").checked;

                // enable/disable npc creature types.
                document.getElementById("analytics-items-in-actor-aberration").disabled  = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-beast").disabled       = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-celestial").disabled   = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-construct").disabled   = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-dragon").disabled      = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-elemental").disabled   = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-fey").disabled         = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-fiend").disabled       = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-giant").disabled       = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-humanoid").disabled    = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-monstrosity").disabled = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-ooze").disabled        = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-plant").disabled       = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-swarm").disabled       = !document.getElementById("analytics-items-in-actor-npc").checked;
                document.getElementById("analytics-items-in-actor-undead").disabled      = !document.getElementById("analytics-items-in-actor-npc").checked;
                break;
            case "items_in_compendiums":
                // enable/disable by name or id.
                document.getElementById("analytics-items-in-compendium-name").disabled           = !document.getElementById("analytics-items-in-compendium-radio-name").checked;
                document.getElementById("analytics-items-in-compendium-case-sensitive").disabled = !document.getElementById("analytics-items-in-compendium-radio-name").checked;
                document.getElementById("analytics-items-in-compendium-exact-match").disabled    = !document.getElementById("analytics-items-in-compendium-radio-name").checked;
                document.getElementById("analytics-items-in-compendium-id").disabled             = !document.getElementById("analytics-items-in-compendium-radio-id").checked;
                break;
            case "items_within_items_16":
                // enable/disable by name or id.
                document.getElementById("analytics-items-within-item-name").disabled           = !document.getElementById("analytics-items-within-item-radio-name").checked;
                document.getElementById("analytics-items-within-item-case-sensitive").disabled = !document.getElementById("analytics-items-within-item-radio-name").checked;
                document.getElementById("analytics-items-within-item-exact-match").disabled    = !document.getElementById("analytics-items-within-item-radio-name").checked;
                document.getElementById("analytics-items-within-item-id").disabled             = !document.getElementById("analytics-items-within-item-radio-id").checked;

                // disable on use macros if midi-qol not installed or not active.
                if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
                    document.getElementById("analytics-items-item-macro-label").style.display                = "none";
                    document.getElementById("analytics-items-item-macro-name-input").style.display           = "none";
                    document.getElementById("analytics-items-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("analytics-items-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("analytics-items-item-macro-thematic-break").style.display       = "none";
                    document.getElementById("analytics-items-item-macro-id").style.display                   = "none";
                    document.getElementById("analytics-items-item-macro-radio-name").style.display           = "none";
                    document.getElementById("analytics-items-item-macro-radio-id").style.display             = "none";

                    document.getElementById("analytics-items-within-item-macro-label").style.display                = "none";
                    document.getElementById("analytics-items-within-item-macro-name-input").style.display           = "none";
                    document.getElementById("analytics-items-within-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("analytics-items-within-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("analytics-items-within-item-macro-thematic-break").style.display       = "none";
                    document.getElementById("analytics-items-within-item-macro-id").style.display                   = "none";
                    document.getElementById("analytics-items-within-item-macro-radio-name").style.display           = "none";
                    document.getElementById("analytics-items-within-item-macro-radio-id").style.display             = "none";
                }

                // enable/disable on use macro fields.
                document.getElementById("analytics-items-macro-name").disabled           = !document.getElementById("analytics-items-macro").checked;
                document.getElementById("analytics-items-macro-case-sensitive").disabled = !document.getElementById("analytics-items-macro").checked;
                document.getElementById("analytics-items-macro-exact-match").disabled    = !document.getElementById("analytics-items-macro").checked;
                document.getElementById("analytics-items-macro-id").disabled             = !document.getElementById("analytics-items-macro").checked;
                document.getElementById("analytics-items-macro-radio-name").disabled     = !document.getElementById("analytics-items-macro").checked;
                document.getElementById("analytics-items-macro-radio-id").disabled       = !document.getElementById("analytics-items-macro").checked;

                document.getElementById("analytics-items-within-item-macro-name").disabled           = !document.getElementById("analytics-items-within-item-macro").checked;
                document.getElementById("analytics-items-within-item-macro-case-sensitive").disabled = !document.getElementById("analytics-items-within-item-macro").checked;
                document.getElementById("analytics-items-within-item-macro-exact-match").disabled    = !document.getElementById("analytics-items-within-item-macro").checked;
                document.getElementById("analytics-items-within-item-macro-id").disabled             = !document.getElementById("analytics-items-within-item-macro").checked;
                document.getElementById("analytics-items-within-item-macro-radio-name").disabled     = !document.getElementById("analytics-items-within-item-macro").checked;
                document.getElementById("analytics-items-within-item-macro-radio-id").disabled       = !document.getElementById("analytics-items-within-item-macro").checked;

                if (document.getElementById("analytics-items-macro").checked) {
                    document.getElementById("analytics-items-macro-name").disabled           = !document.getElementById("analytics-items-macro-radio-name").checked;
                    document.getElementById("analytics-items-macro-case-sensitive").disabled = !document.getElementById("analytics-items-macro-radio-name").checked;
                    document.getElementById("analytics-items-macro-exact-match").disabled    = !document.getElementById("analytics-items-macro-radio-name").checked;
                    document.getElementById("analytics-items-macro-id").disabled             = !document.getElementById("analytics-items-macro-radio-id").checked;
                };

                if (document.getElementById("analytics-items-within-item-macro").checked) {
                    document.getElementById("analytics-items-within-item-macro-name").disabled           = !document.getElementById("analytics-items-within-item-macro-radio-name").checked;
                    document.getElementById("analytics-items-within-item-macro-case-sensitive").disabled = !document.getElementById("analytics-items-within-item-macro-radio-name").checked;
                    document.getElementById("analytics-items-within-item-macro-exact-match").disabled    = !document.getElementById("analytics-items-within-item-macro-radio-name").checked;
                    document.getElementById("analytics-items-within-item-macro-id").disabled             = !document.getElementById("analytics-items-within-item-macro-radio-id").checked;
                };
                break;
            case "items_in_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-items-in-journal-name").disabled           = !document.getElementById("analytics-items-in-journal-radio-name").checked;
                document.getElementById("analytics-items-in-journal-case-sensitive").disabled = !document.getElementById("analytics-items-in-journal-radio-name").checked;
                document.getElementById("analytics-items-in-journal-exact-match").disabled    = !document.getElementById("analytics-items-in-journal-radio-name").checked;
                document.getElementById("analytics-items-in-journal-id").disabled             = !document.getElementById("analytics-items-in-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-items-in-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-items-in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-items-in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-items-in-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-items-in-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-items-in-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-items-in-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-items-in-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-items-in-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-items-in-journal-monks-shop").style.display         = "none";
                }
                break;
            case "items_with_macros":
                // enable/disable by name or id.
                document.getElementById("analytics-items-with-macro-name").disabled           = !document.getElementById("analytics-items-with-macro-radio-name").checked;
                document.getElementById("analytics-items-with-macro-case-sensitive").disabled = !document.getElementById("analytics-items-with-macro-radio-name").checked;
                document.getElementById("analytics-items-with-macro-exact-match").disabled    = !document.getElementById("analytics-items-with-macro-radio-name").checked;
                document.getElementById("analytics-items-with-macro-id").disabled             = !document.getElementById("analytics-items-with-macro-radio-id").checked;
                break;
            case "items_in_tables":
                // enable/disable by name or id.
                document.getElementById("analytics-items-in-table-name").disabled           = !document.getElementById("analytics-items-in-table-radio-name").checked;
                document.getElementById("analytics-items-in-table-case-sensitive").disabled = !document.getElementById("analytics-items-in-table-radio-name").checked;
                document.getElementById("analytics-items-in-table-exact-match").disabled    = !document.getElementById("analytics-items-in-table-radio-name").checked;
                document.getElementById("analytics-items-in-table-id").disabled             = !document.getElementById("analytics-items-in-table-radio-id").checked;
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-items-list");
        html_list.innerHTML = item_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-items-in-actors":
                output_list = this.item_lists["items_in_actors"];
                retval = !this.actor_options["items_in_actors"].actor_submitted;
                break;
            case "analytics-items-in-compendiums":
                output_list = this.item_lists["items_in_compendiums"];
                retval = !this.compendium_options["items_in_compendiums"].compendium_submitted;
                break;
            case "analytics-items-within-items":
                output_list = this.item_lists["items_within_items"];
                retval = !this.item_options["items_within_items"].item_submitted;
                break;
            case "analytics-items-in-journals":
                output_list = this.item_lists["items_in_journals"];
                retval = !this.journal_options["items_in_journals"].journal_submitted;
                break;
            case "analytics-items-with-macros":
                output_list = this.item_lists["items_with_macros"];
                retval = !this.macro_options["items_with_macros"].macro_submitted;
                break;
            case "analytics-items-in-tables":
                output_list = this.item_lists["items_in_tables"];
                retval = !this.table_options["items_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (output_list.length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    // get data for form.
    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems getData()");

        // get data for form.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];

        var retval = item_option.getItemData();

        switch (secondary) {
            case "items_in_actors":
                var actor_option = this.actor_options[secondary];
                retval = Object.assign(retval, actor_option.getActorData(secondary));
                break;
            case "items_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "items_within_items_16":
                var item_option_sec = this.item_options[secondary];
                retval = Object.assign(retval, item_option_sec.getItemData(secondary));
                break;
            case "items_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "items_with_macros":
                var macro_option = this.macro_options[secondary];
                retval = Object.assign(retval, macro_option.getMacroData(secondary));
                break;
            case "items_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };
        return retval;
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _onSubmit(event)");

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
        var primary = this.sortOptions().primary;

        // set update flag when changing tabs if tab never submitted.
        switch (primary) {
            case "items_in_actors":
                var actor_option = this.actor_options[primary];
                if (!actor_option.actor_submitted) actor_option.actor_submitted = true;
                break;
            case "items_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "items_within_items_16":
                var item_option = this.item_options[primary];
                if (!item_option.item_submitted) item_option.item_submitted = true;
                break;
            case "items_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "items_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macro_submitted) macro_option.macro_submitted = true;
                break;
            case "items_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.table_options) table_option.table_options = true;
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

    // create item list.
    buildList(item) {

        // active tab.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];
        var item_list   = this.item_lists[primary];
        var item_name   = item.data.name;

        // each tab.
        switch (secondary) {
            case "items_in_actors":
                // reset counters.
                var actor_option = this.actor_options[secondary];
                actor_option.actor_count = 0;
                break;
            case "items_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "items_with_items":
                // reset counters.
                var item_option = this.item_options[secondary];
                item_option.item_count = 0;
                break;
            case "items_with_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "items_with_macros":
                // reset counters.
                var macro_option = this.macro_options[secondary];
                macro_option.macro_count = 0;
                break;
            case "items_in_tables":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];
        var item_list   = this.item_lists[primary];

        // set data from form.
        const data = expandObject(formData);
        for ( let [k, v] of Object.entries(data) ) {

            item_option.setItemData(k, v);

            switch (secondary) {
                case "items_in_actors":
                    var actor_option = this.actor_options[secondary];
                    actor_option.setActorData(k, v, secondary);
                    break;
                case "items_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "items_within_items_16":
                    var item_option_sec = this.item_options[secondary];
                    item_option_sec.setItemData(k, v, secondary);
                    break;
                case "items_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "items_with_macros":
                    var macro_option = this.macro_options[secondary];
                    macro_option.setMacroData(k, v, secondary);
                    break;
                case "items_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };

        // reset counters and lists.
        item_option.item_count = 0;
        item_option.item_macro_count = 0;
        item_list.splice(0, item_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "items_in_actors":
                this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_compendiums":
                this.addMessage(item_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "items_within_items_16":
                this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_journals":
                this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_with_macros":
                this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_tables":
                this.addMessage(item_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-items-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through item list ...
        game.items.contents.forEach((item, i) => {
            if (game.items.contents[i]) {
            };
        }); // forEach Item.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
