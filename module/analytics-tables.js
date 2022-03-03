/***
*
* module/analytics-tables.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
import { AnalyticsForm }     from "./analytics.js";
import { TableOptions }      from "./analytics.js";

import { ActorOptions }      from "./analytics.js";
import { CardOptions }       from "./analytics.js";
import { CompendiumOptions } from "./analytics.js";
import { ItemOptions }       from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { MacroOptions }      from "./analytics.js";
import { PlaylistOptions }   from "./analytics.js";
import { SceneOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsTables extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // table options for each tab.
        this.table_options = Object.assign(this.table_options, {
            "tables_with_actors":       new TableOptions(),
            "tables_with_cards":        new TableOptions(),
            "tables_in_compendiums":    new TableOptions(),
            "tables_with_compendiums":  new TableOptions(),
            "tables_with_items":        new TableOptions(),
            "tables_in_journals":       new TableOptions(),
            "tables_with_journals":     new TableOptions(),
            "tables_with_macros":       new TableOptions(),
            "tables_with_playlists":    new TableOptions(),
            "tables_with_scenes":       new TableOptions(),
            "tables_within_tables":     new TableOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (5) with actors options.
        this.actor_options = Object.assign(this.actor_options, {
            "tables_with_actors": new ActorOptions(),
        });

        // (8) with cards options.
        this.card_options = Object.assign(this.card_options, {
            "tables_with_cards": new CardOptions(),
        });

        // (14) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "tables_in_compendiums": new CompendiumOptions(),
        });

        // (15) with compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "tables_with_compendiums": new CompendiumOptions(),
        });

        // (19) with items options.
        this.item_options = Object.assign(this.item_options, {
            "tables_with_items": new ItemOptions(),
        });

        // (27) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "tables_in_journals": new JournalOptions(),
        });

        // (26) with journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "tables_with_journals": new JournalOptions(),
        });

        // (25) with macros options.
        this.macro_options = Object.assign(this.macro_options, {
            "tables_with_macros":  new MacroOptions(),
        });

        // (31) with playlists options.
        this.playlist_options = Object.assign(this.playlist_options, {
            "tables_with_playlists": new PlaylistOptions(),
        });

        // (32) with scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "tables_with_scenes": new SceneOptions(),
        });

        // (34-34) within tables options.
        this.table_options = Object.assign(this.table_options, {
            "tables_within_tables_34": new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // table lists.
        this.table_lists = Object.assign(this.table_lists, {
            "tables_with_actors":      [],
            "tables_with_cards":       [],
            "tables_in_compendiums":   [],
            "tables_with_compendiums": [],
            "tables_with_items":       [],
            "tables_in_journals":      [],
            "tables_with_journals":    [],
            "tables_with_macros":      [],
            "tables_with_playlists":   [],
            "tables_with_scenes":      [],
            "tables_within_tables":    [],
        });
    }

	// defaults.
    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-tables",
            template:       "modules/analytics/templates/analytics-tables-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-tables"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-tables-with-actors"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-tables-with-actors":
                retval = {
                    primary:   "tables_with_actors",
                    secondary: "tables_with_actors"
                };
                break;
            case "analytics-tables-with-cards":
                retval = {
                    primary:   "tables_with_cards",
                    secondary: "tables_with_cards"
                };
                break;
            case "analytics-tables-in-compendiums":
                retval = {
                    primary:   "tables_in_compendiums",
                    secondary: "tables_in_compendiums"
                };
                break;
            case "analytics-tables-with-compendiums":
                retval = {
                    primary:   "tables_with_compendiums",
                    secondary: "tables_with_compendiums"
                };
                break;
            case "analytics-tables-with-items":
                retval = {
                    primary:   "tables_with_items",
                    secondary: "tables_with_items"
                };
                break;
            case "analytics-tables-in-journals":
                retval = {
                    primary:   "tables_in_journals",
                    secondary: "tables_in_journals"
                };
                break;
            case "analytics-tables-with-journals":
                retval = {
                    primary:   "tables_with_journals",
                    secondary: "tables_with_journals"
                };
                break;
            case "analytics-tables-with-macros":
                retval = {
                    primary:   "tables_with_macros",
                    secondary: "tables_with_macros"
                };
                break;
            case "analytics-tables-with-playlists":
                retval = {
                    primary:   "tables_with_playlists",
                    secondary: "tables_with_playlists"
                };
                break;
            case "analytics-tables-with-scenes":
                retval = {
                    primary:   "tables_with_scenes",
                    secondary: "tables_with_scenes"
                };
                break;
            case "analytics-tables-within-tables":
                retval = {
                    primary:   "tables_within_tables",
                    secondary: "tables_within_tables_34"
                };
                break;
        };
        return retval;
    };

	// initialize.
    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async activateListeners(html)");

        super.activateListeners($html);

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];
        var table_list   = this.table_lists[primary];

        table_option.activateListeners();

        switch (secondary) {
            case "tables_with_actors":
                var actor_option = this.actor_options[secondary];
                actor_option.activateListeners(secondary);
                break;
            case "tables_with_cards":
                var card_option = this.card_options[secondary];
                card_option.activateListeners(secondary);
                break;
            case "tables_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "tables_with_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "tables_with_items":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "tables_in_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "tables_with_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "tables_with_macros":
                var macro_option = this.macro_options[secondary];
                macro_option.activateListeners(secondary);
                break;
            case "tables_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                playlist_option.activateListeners(secondary);
                break;
            case "tables_with_scenes":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "tables_within_tables_34":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-tables-list");
        html_list.innerHTML = table_list.join("");
    }

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-tables-with-actors":
                output_list = this.table_lists["tables_with_actors"];
                retval = !this.actor_options["tables_with_actors"].actorSubmitted;
                break;
            case "analytics-tables-with-cards":
                output_list = this.table_lists["tables_with_cards"];
                retval = !this.card_options["tables_with_cards"].cardSubmitted;
                break;
            case "analytics-tables-in-compendiums":
                output_list = this.table_lists["tables_in_compendiums"];
                retval = !this.compendium_options["tables_in_compendiums"].compendiumSubmitted;
                break;
            case "analytics-tables-with-compendiums":
                output_list = this.table_lists["tables_with_compendiums"];
                retval = !this.compendium_options["tables_with_compendiums"].compendiumSubmitted;
                break;
            case "analytics-tables-with-items":
                output_list = this.table_lists["tables_with_items"];
                retval = !this.item_options["tables_with_items"].itemSubmitted;
                break;
            case "analytics-tables-in-journals":
                output_list = this.table_lists["tables_in_journals"];
                retval = !this.journal_options["tables_in_journals"].journalSubmitted;
                break;
            case "analytics-tables-with-journals":
                output_list = this.table_lists["tables_with_journals"];
                retval = !this.journal_options["tables_with_journals"].journalSubmitted;
                break;
            case "analytics-tables-with-macros":
                output_list = this.table_lists["tables_with_macros"];
                retval = !this.macro_options["tables_with_macros"].macroSubmitted;
                break;
            case "analytics-tables-with-playlists":
                output_list = this.table_lists["tables_with_playlists"];
                retval = !this.playlist_options["tables_with_playlists"].playlistSubmitted;
                break;
            case "analytics-tables-with-scenes":
                output_list = this.table_lists["tables_with_scenes"];
                retval = !this.scene_options["tables_with_scenes"].sceneSubmitted;
                break;
            case "analytics-tables-within-tables":
                output_list = this.table_lists["tables_within_tables"];
                retval = !this.table_options["tables_within_tables"].tableSubmitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables getData()");

        // get data for form.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];

        var retval = table_option.getTableData();

        switch (secondary) {
            case "tables_with_actors":
                var actor_option = this.actor_options[secondary];
                retval = Object.assign(retval, actor_option.getActorData(secondary));
                break;
            case "tables_with_cards":
                var card_option = this.card_options[secondary];
                retval = Object.assign(retval, card_option.getCardData(secondary));
                break;
            case "tables_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "tables_with_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "tables_with_items":
                var item_option = this.item_options[secondary];
                retval = Object.assign(retval, item_option.getItemData(secondary));
                break;
            case "tables_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "tables_with_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "tables_with_macros":
                var macro_option = this.macro_options[secondary];
                retval = Object.assign(retval, macro_option.getMacroData(secondary));
                break;
            case "tables_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                retval = Object.assign(retval, playlist_option.getPlaylistData(secondary));
                break;
            case "tables_with_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "tables_within_tables_34":
                var table_option_sec = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };
        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables setData()");

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            table_option.setTableData(k, v);

            switch (secondary) {
                case "tables_with_actors":
                    var actor_option = this.actor_options[secondary];
                    actor_option.setActorData(k, v, secondary);
                    break;
                case "tables_with_cards":
                    var card_option = this.card_options[secondary];
                    card_option.setCardData(k, v, secondary);
                    break;
                case "tables_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "tables_with_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "tables_with_items":
                    var item_option = this.item_options[secondary];
                    item_option.setItemData(k, v, secondary);
                    break;
                case "tables_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "tables_with_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "tables_with_macros":
                    var macro_option = this.macro_options[secondary];
                    macro_option.setMacroData(k, v, secondary);
                    break;
                case "tables_with_playlists":
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.setPlaylistData(k, v, secondary);
                    break;
                case "tables_with_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "tables_within_tables_34":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };
    }

	// submit.
    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _onSubmit(event)");

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
            case "tables_with_actors":
                var actor_option = this.actor_options[primary];
                if (!actor_option.actorSubmitted) actor_option.actorSubmitted = true;
                break;
            case "tables_with_cards":
                var card_option = this.card_options[primary];
                if (!card_option.cardSubmitted) card_option.cardSubmitted = true;
                break;
            case "tables_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendiumSubmitted) compendium_option.compendiumSubmitted = true;
                break;
            case "tables_with_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendiumSubmitted) compendium_option.compendiumSubmitted = true;
                break;
            case "tables_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.itemSubmitted) item_option.itemSubmitted = true;
                break;
            case "tables_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "tables_with_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "tables_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macroSubmitted) macro_option.macroSubmitted = true;
                break;
            case "tables_with_playlists":
                var playlist_option = this.playlist_options[primary];
                if (!playlist_option.playlistSubmitted) playlist_option.playlistSubmitted = true;
                break;
            case "tables_with_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.sceneSubmitted) scene_option.sceneSubmitted = true;
                break;
            case "tables_within_tables_34":
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

    // create table list.
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables buildList()");

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var table_option  = this.table_options[primary];
        var table_list    = this.table_lists[primary];
        var message_added = false;

        // reset counters and lists.
        table_list.splice(0, table_list.length);
        table_option.tableCount = 0;

        // *** SEARCH tables.
        var matching_tables = table_option.searchTables(game.tables);

        // iterate thru matching tables.
        matching_tables.forEach((table, i) => {

            var table_name  = table.data.name;
            var table_added = false;

            // each tab.
            switch (secondary) {
                case "tables_with_actors":
                    // reset counters.
                    var actor_option = this.actor_options[secondary];
                    actor_option.actor_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_with_cards":
                    // reset counters.
                    var card_option = this.card_options[secondary];
                    card_option.cardCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendiumCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "tables_with_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendiumCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "tables_with_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.itemCount = 0;
					item_option.itemOnUseMacroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_in_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_with_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_with_macros":
                    // reset counters.
                    var macro_option = this.macro_options[secondary];
                    macro_option.macroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_with_playlists":
                    // reset counters.
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.playlistCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_with_scenes":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.sceneCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
                case "tables_within_tables_34":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    break;
            };
        }); // forEach matching Table.
    }

	// update and render.
    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-tables-submit");
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
