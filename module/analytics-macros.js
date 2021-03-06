/***
*
* module/analytics-macros.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
import { AnalyticsForm }     from "./analytics.js";
import { MacroOptions }      from "./analytics.js";

import { CompendiumOptions } from "./analytics.js";
import { ItemOptions }       from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { TableOptions }      from "./analytics.js";
import { TileOptions }       from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsMacros extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // macro options for each tab.
        this.macro_options = Object.assign(this.macro_options, {
            "macros_in_compendiums": new MacroOptions(),
            "macros_in_items":       new MacroOptions(),
            "macros_in_journals":    new MacroOptions(),
            "macros_in_tables":      new MacroOptions(),
            "macros_in_tiles":       new MacroOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (11) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "macros_in_compendiums": new CompendiumOptions(),
        });

        // (18) in items options.
        this.item_options = Object.assign(this.item_options, {
            "macros_in_items": new ItemOptions(),
        });

        // (21) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "macros_in_journals": new JournalOptions(),
        });

        // (28) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "macros_in_tables": new TableOptions(),
        });

        // (29) in tiles options.
        this.tile_options = Object.assign(this.tile_options, {
            "macros_in_tiles": new TileOptions(),
        });

        /* OUTPUT BY TAB */

        // macro lists.
        this.macro_lists = Object.assign(this.macro_lists, {
            "macros_in_compendiums": [],
            "macros_in_items":       [],
            "macros_in_journals":    [],
            "macros_in_tables":      [],
            "macros_in_tiles":       [],
        });
    }

	// defaults.
    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-macros",
            template:       "modules/analytics/templates/analytics-macros-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-macros"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-macros-in-compendiums"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-macros-in-compendiums":
                retval = {
                    primary:   "macros_in_compendiums",
                    secondary: "macros_in_compendiums"
                };
                break;
            case "analytics-macros-in-items":
                retval = {
                    primary:   "macros_in_items",
                    secondary: "macros_in_items"
                };
                break;
            case "analytics-macros-in-journals":
                retval = {
                    primary:   "macros_in_journals",
                    secondary: "macros_in_journals"
                };
                break;
            case "analytics-macros-in-tables":
                retval = {
                    primary:   "macros_in_tables",
                    secondary: "macros_in_tables"
                };
                break;
            case "analytics-macros-in-tiles":
                retval = {
                    primary:   "macros_in_tiles",
                    secondary: "macros_in_tiles"
                };
                break;
        };
        return retval;
    };

	// initialize.
    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async activateListeners(html)");

        super.activateListeners($html);

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var macro_option = this.macro_options[primary];
        var macro_list   = this.macro_lists[primary];

        macro_option.activateListeners();

        switch (secondary) {
            case "macros_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "macros_in_items":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "macros_in_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "macros_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
            case "macros_in_tiles":
                var tile_option = this.tile_options[secondary];
                tile_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-macros-list");
        html_list.innerHTML = macro_list.join("");
    }

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-macros-in-compendiums":
                output_list = this.macro_lists["macros_in_compendiums"];
                retval = !this.compendium_options["macros_in_compendiums"].compendiumSubmitted;
                break;
            case "analytics-macros-in-items":
                output_list = this.macro_lists["macros_in_items"];
                retval = !this.item_options["macros_in_items"].itemSubmitted;
                break;
            case "analytics-macros-in-journals":
                output_list = this.macro_lists["macros_in_journals"];
                retval = !this.journal_options["macros_in_journals"].journalSubmitted;
                break;
            case "analytics-macros-in-tables":
                output_list = this.macro_lists["macros_in_tables"];
                retval = !this.table_options["macros_in_tables"].tableSubmitted;
                break;
            case "analytics-macros-in-tiles":
                output_list = this.macro_lists["macros_in_tiles"];
                retval = !this.tile_options["macros_in_tiles"].tileSubmitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros getData()");

        // get data for form.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var macro_option = this.macro_options[primary];

        var retval = macro_option.getMacroData();

        switch (secondary) {
            case "macros_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "macros_in_items":
                var item_option = this.item_options[secondary];
                retval = Object.assign(retval, item_option.getItemData(secondary));
                break;
            case "macros_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "macros_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
            case "macros_in_tiles":
                var tile_option = this.tile_options[secondary];
                retval = Object.assign(retval, tile_option.getTileData(secondary));
                break;
        };
        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros setData()");

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var macro_option = this.macro_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            macro_option.setMacroData(k, v);

            switch (secondary) {
                case "macros_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "macros_in_items":
                    var item_option = this.item_options[secondary];
                    item_option.setItemData(k, v, secondary);
                    break;
                case "macros_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "macros_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
                case "macros_in_tiles":
                    var tile_option = this.tile_options[secondary];
                    tile_option.setTileData(k, v, secondary);
                    break;
            };
        };
    }

	// submit.
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
        var primary = this.sortOptions().primary;

        // set update flag when changing tabs if tab never submitted.
        switch (primary) {
            case "macros_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendiumSubmitted) compendium_option.compendiumSubmitted = true;
                break;
            case "macros_in_items":
                var item_option = this.item_options[primary];
                if (!item_option.itemSubmitted) item_option.itemSubmitted = true;
                break;
            case "macros_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "macros_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.tableSubmitted) table_option.tableSubmitted = true;
                break;
            case "macros_in_tiles":
                var tile_option = this.tile_options[primary];
                if (!tile_option.tileSubmitted) tile_option.tileSubmitted = true;
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

    // create macro list.
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros buildList()");

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var macro_option  = this.macro_options[primary];
        var macro_list    = this.macro_lists[primary];
        var message_added = false;

        // reset counters and lists.
        macro_list.splice(0, macro_list.length);
        macro_option.macroCount = 0;

        // *** SEARCH macros.
        var matching_macros = macro_option.searchMacros(game.macros);

        // iterate thru matching macros.
        matching_macros.forEach((macro, i) => {

            var macro_name  = macro.data.name;
            var macro_added = false;

            // each tab.
            switch (secondary) {
                case "macros_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendiumCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(macro_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "macros_in_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.itemCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(macro_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "macros_in_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(macro_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    break;
                case "macros_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(macro_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "macros_in_tiles":
                    // reset counters.
                    var tile_option = this.tile_options[secondary];
                    tile_option.tileCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(macro_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
            };
        }); // forEach matching Macro.
    }

	// update and render.
    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsMacros async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-macros-submit");
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
