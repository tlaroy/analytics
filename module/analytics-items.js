/***
*
* module/analytics-items.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
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

	// defaults.
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

	// initialize.
    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async activateListeners(html)");

        super.activateListeners($html);

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];
        var item_list   = this.item_lists[primary];

        item_option.activateListeners();

        switch (secondary) {
            case "items_in_actors":
                var actor_option = this.actor_options[secondary];
                actor_option.activateListeners(secondary);
                break;
            case "items_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "items_within_items_16":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "items_in_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "items_with_macros":
                var macro_option = this.macro_options[secondary];
                macro_option.activateListeners(secondary);
                break;
            case "items_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-items-list");
        html_list.innerHTML = item_list.join("");
    }

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-items-in-actors":
                output_list = this.item_lists["items_in_actors"];
                retval = !this.actor_options["items_in_actors"].actorSubmitted;
                break;
            case "analytics-items-in-compendiums":
                output_list = this.item_lists["items_in_compendiums"];
                retval = !this.compendium_options["items_in_compendiums"].compendiumSubmitted;
                break;
            case "analytics-items-within-items":
                output_list = this.item_lists["items_within_items"];
                retval = !this.item_options["items_within_items"].itemSubmitted;
                break;
            case "analytics-items-in-journals":
                output_list = this.item_lists["items_in_journals"];
                retval = !this.journal_options["items_in_journals"].journalSubmitted;
                break;
            case "analytics-items-with-macros":
                output_list = this.item_lists["items_with_macros"];
                retval = !this.macro_options["items_with_macros"].macroSubmitted;
                break;
            case "analytics-items-in-tables":
                output_list = this.item_lists["items_in_tables"];
                retval = !this.table_options["items_in_tables"].tableSubmitted;
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

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems setData()");

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var item_option = this.item_options[primary];

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
    }

	// submit.
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
                if (!actor_option.actorSubmitted) actor_option.actorSubmitted = true;
                break;
            case "items_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendiumSubmitted) compendium_option.compendiumSubmitted = true;
                break;
            case "items_within_items_16":
                var item_option = this.item_options[primary];
                if (!item_option.itemSubmitted) item_option.itemSubmitted = true;
                break;
            case "items_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "items_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macroSubmitted) macro_option.macroSubmitted = true;
                break;
            case "items_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.tableSubmitted) table_option.tableSubmitted = true;
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
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems buildList()");

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var item_option   = this.item_options[primary];
        var item_list     = this.item_lists[primary];
        var message_added = false;

        // reset counters and lists.
        item_list.splice(0, item_list.length);
        item_option.itemCount = 0;
        item_option.itemOnUseMacroCount = 0;

        // *** SEARCH items.
        var matching_items = item_option.searchItems(game.items);

        // iterate thru matching items.
        matching_items.forEach((item, i) => {

            var item_name  = item.data.name;
            var item_added = false;

            // each tab.
            switch (secondary) {
                case "items_in_actors":
                    // reset counters.
                    var actor_option = this.actor_options[secondary];
                    actor_option.actorCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "items_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendiumCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "items_within_items_16":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.itemCount = 0;
					item_option.itemOnUseMacroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "items_in_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "items_with_macros":
                    // reset counters.
                    var macro_option = this.macro_options[secondary];
                    macro_option.macroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "items_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(item_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
            };
        }); // forEach matching Item.
    }

	// update and render.
    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-items-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // build out the list.
        this.buildList();

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
