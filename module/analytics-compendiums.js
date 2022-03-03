/***
*
* module/analytics-compendiums.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
import { AnalyticsForm }     from "./analytics.js";
import { CompendiumOptions } from "./analytics.js";

import { ActorOptions }      from "./analytics.js";
import { CardOptions }       from "./analytics.js";
import { ItemOptions }       from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { MacroOptions }      from "./analytics.js";
import { PlaylistOptions }   from "./analytics.js";
import { SceneOptions }      from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsCompendiums extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // compendium options for each tab.
        this.compendium_options = Object.assign(this.compendium_options, {
            "compendiums_with_actors":    new CompendiumOptions(),
            "compendiums_with_cards":     new CompendiumOptions(),
            "compendiums_with_items":     new CompendiumOptions(),
            "compendiums_with_journals":  new CompendiumOptions(),
            "compendiums_with_macros":    new CompendiumOptions(),
            "compendiums_with_playlists": new CompendiumOptions(),
            "compendiums_with_scenes":    new CompendiumOptions(),
            "compendiums_with_tables":    new CompendiumOptions(),
            "compendiums_in_tables":      new CompendiumOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (1) with actors options.
        this.actor_options = Object.assign(this.actor_options, {
            "compendiums_with_actors": new ActorOptions(),
        });

        // (6) with cards options.
        this.card_options = Object.assign(this.card_options, {
            "compendiums_with_cards": new CardOptions(),
        });

        // (9) with items options.
        this.item_options = Object.assign(this.item_options, {
            "compendiums_with_items": new ItemOptions(),
        });

        // (10) with journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "compendiums_with_journals": new JournalOptions(),
        });

        // (11) with macros options.
        this.macro_options = Object.assign(this.macro_options, {
            "compendiums_with_macros": new MacroOptions(),
        });

        // (12) with playlists options.
        this.playlist_options = Object.assign(this.playlist_options, {
            "compendiums_with_playlists": new PlaylistOptions(),
        });

        // (13) with scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "compendiums_with_scenes": new SceneOptions(),
        });

        // (14) with tables options.
        this.table_options = Object.assign(this.table_options, {
            "compendiums_with_tables": new TableOptions(),
        });

        // (15) in table options.
        this.table_options = Object.assign(this.table_options, {
            "compendiums_in_tables": new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // compendium lists.
        this.compendium_lists = Object.assign(this.compendium_lists, {
            "compendiums_with_actors":    [],
            "compendiums_with_cards":     [],
            "compendiums_with_items":     [],
            "compendiums_with_journals":  [],
            "compendiums_with_macros":    [],
            "compendiums_with_playlists": [],
            "compendiums_with_scenes":    [],
            "compendiums_with_tables":    [],
            "compendiums_in_tables":      [],
        });
    }

	// defaults.
    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-compendiums",
            template:       "modules/analytics/templates/analytics-compendiums-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-compendiums"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-compendiums-with-actors"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-compendiums-with-actors":
                retval = {
                    primary:   "compendiums_with_actors",
                    secondary: "compendiums_with_actors"
                };
                break;
            case "analytics-compendiums-with-cards":
                retval = {
                    primary:   "compendiums_with_cards",
                    secondary: "compendiums_with_cards"
                };
                break;
            case "analytics-compendiums-with-items":
                retval = {
                    primary:   "compendiums_with_items",
                    secondary: "compendiums_with_items"
                };
                break;
            case "analytics-compendiums-with-journals":
                retval = {
                    primary:   "compendiums_with_journals",
                    secondary: "compendiums_with_journals"
                };
                break;
            case "analytics-compendiums-with-macros":
                retval = {
                    primary:   "compendiums_with_macros",
                    secondary: "compendiums_with_macros"
                };
                break;
            case "analytics-compendiums-with-playlists":
                retval = {
                    primary:   "compendiums_with_playlists",
                    secondary: "compendiums_with_playlists"
                };
                break;
            case "analytics-compendiums-with-scenes":
                retval = {
                    primary:   "compendiums_with_scenes",
                    secondary: "compendiums_with_scenes"
                };
                break;
            case "analytics-compendiums-with-tables":
                retval = {
                    primary:   "compendiums_with_tables",
                    secondary: "compendiums_with_tables"
                };
                break;
            case "analytics-compendiums-in-tables":
                retval = {
                    primary:   "compendiums_in_tables",
                    secondary: "compendiums_in_tables"
                };
                break;
        };
        return retval;
    };

	// initialize.
    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums async activateListeners(html)");

        super.activateListeners($html);

        var primary           = this.sortOptions().primary;
        var secondary         = this.sortOptions().secondary;
        var compendium_option = this.compendium_options[primary];
        var compendium_list   = this.compendium_lists[primary];

        compendium_option.activateListeners();

        switch (secondary) {
            case "compendiums_with_actors":
                var actor_option = this.actor_options[secondary];
                actor_option.activateListeners(secondary);
                break;
            case "compendiums_with_cards":
                var card_option = this.card_options[secondary];
                card_option.activateListeners(secondary);
                break;
            case "compendiums_with_items":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "compendiums_with_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "compendiums_with_macros":
                var macro_option = this.macro_options[secondary];
                macro_option.activateListeners(secondary);
                break;
            case "compendiums_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                playlist_option.activateListeners(secondary);
                break;
            case "compendiums_with_scenes":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "compendiums_with_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
            case "compendiums_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-compendiums-list");
        html_list.innerHTML = compendium_list.join("");
    }

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-compendiums-with-actors":
                output_list = this.compendium_lists["compendiums_with_actors"];
                retval = !this.actor_options["compendiums_with_actors"].actorSubmitted;
                break;
            case "analytics-compendiums-with-cards":
                output_list = this.compendium_lists["compendiums_with_cards"];
                retval = !this.card_options["compendiums_with_cards"].cardSubmitted;
                break;
            case "analytics-compendiums-with-items":
                output_list = this.compendium_lists["compendiums_with_items"];
                retval = !this.item_options["compendiums_with_items"].itemSubmitted;
                break;
            case "analytics-compendiums-with-journals":
                output_list = this.compendium_lists["compendiums_with_journals"];
                retval = !this.journal_options["compendiums_with_journals"].journalSubmitted;
                break;
            case "analytics-compendiums-with-macros":
                output_list = this.compendium_lists["compendiums_with_macros"];
                retval = !this.macro_options["compendiums_with_macros"].macroSubmitted;
                break;
            case "analytics-compendiums-with-playlists":
                output_list = this.compendium_lists["compendiums_with_playlists"];
                retval = !this.playlist_options["compendiums_with_playlists"].playlistSubmitted;
                break;
            case "analytics-compendiums-with-scenes":
                output_list = this.compendium_lists["compendiums_with_scenes"];
                retval = !this.scene_options["compendiums_with_scenes"].sceneSubmitted;
                break;
            case "analytics-compendiums-with-tables":
                output_list = this.compendium_lists["compendiums_with_tables"];
                retval = !this.table_options["compendiums_with_tables"].tableSubmitted;
                break;
            case "analytics-compendiums-in-tables":
                output_list = this.compendium_lists["compendiums_in_tables"];
                retval = !this.table_options["compendiums_in_tables"].tableSubmitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums getData()");

        // get data for form.
        var primary           = this.sortOptions().primary;
        var secondary         = this.sortOptions().secondary;
        var compendium_option = this.compendium_options[primary];

        var retval = compendium_option.getCompendiumData();

        switch (secondary) {
            case "compendiums_with_actors":
                var actor_option = this.actor_options[secondary];
                retval = Object.assign(retval, actor_option.getActorData(secondary));
                break;
            case "compendiums_with_cards":
                var card_option = this.card_options[secondary];
                retval = Object.assign(retval, card_option.getCardData(secondary));
                break;
            case "compendiums_with_items":
                var item_option = this.item_options[secondary];
                retval = Object.assign(retval, item_option.getItemData(secondary));
                break;
            case "compendiums_with_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "compendiums_with_macros":
                var macro_option = this.macro_options[secondary];
                retval = Object.assign(retval, macro_option.getMacroData(secondary));
                break;
            case "compendiums_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                retval = Object.assign(retval, playlist_option.getPlaylistData(secondary));
                break;
            case "compendiums_with_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "compendiums_with_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
            case "compendiums_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };

        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums setData()");

        var primary           = this.sortOptions().primary;
        var secondary         = this.sortOptions().secondary;
        var compendium_option = this.compendium_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            compendium_option.setCompendiumData(k, v);

            switch (secondary) {
                case "compendiums_with_actors":
                    var actor_option = this.actor_options[secondary];
                    actor_option.setActorData(k, v, secondary);
                    break;
                case "compendiums_with_cards":
                    var card_option = this.card_options[secondary];
                    card_option.setCardData(k, v, secondary);
                    break;
                case "compendiums_with_items":
                    var item_option = this.item_options[secondary];
                    item_option.setItemData(k, v, secondary);
                    break;
                case "compendiums_with_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "compendiums_with_macros":
                    var macro_option = this.macro_options[secondary];
                    macro_option.setMacroData(k, v, secondary);
                    break;
                case "compendiums_with_playlists":
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.setPlaylistData(k, v, secondary);
                    break;
                case "compendiums_with_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "compendiums_with_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
                case "compendiums_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };
    }

	// submit.
    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums async _onSubmit(event)");

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
            case "compendiums_with_actors":
                var actor_option = this.actor_options[primary];
                if (!actor_option.actorSubmitted) actor_option.actorSubmitted = true;
                break;
            case "compendiums_with_cards":
                var card_option = this.card_options[primary];
                if (!card_option.cardSubmitted) card_option.cardSubmitted = true;
                break;
            case "compendiums_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.itemSubmitted) item_option.itemSubmitted = true;
                break;
            case "compendiums_with_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "compendiums_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macroSubmitted) macro_option.macroSubmitted = true;
                break;
            case "compendiums_with_playlists":
                var playlist_option = this.playlist_options[primary];
                if (!playlist_option.playlistSubmitted) playlist_option.playlistSubmitted = true;
                break;
            case "compendiums_with_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.sceneSubmitted) scene_option.sceneSubmitted = true;
                break;
            case "compendiums_with_tables":
                var table_option = this.table_options[primary];
                if (!table_option.tableSubmitted) table_option.tableSubmitted = true;
                break;
            case "compendiums_in_tables":
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

    // create compendium list.
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums buildList()");

        // active tab.
        var primary           = this.sortOptions().primary;
        var secondary         = this.sortOptions().secondary;
        var compendium_option = this.compendium_options[primary];
        var compendium_list   = this.compendium_lists[primary];
        var message_added     = false;

        // reset counters and lists.
        compendium_list.splice(0, compendium_list.length);
        compendium_option.compendiumCount = 0;

        // *** SEARCH compendiums.
        var matching_compendiums = compendium_option.searchCompendiums(game.packs);

        // iterate thru matching compendiums.
        matching_compendiums.forEach((compendium, i) => {

            var compendium_name  = compendium.documentName;
            var compendium_added = false;

            // each tab.
            switch (secondary) {
                case "compendiums_with_actors":
                    // reset counters.
                    var actor_option = this.actor_options[secondary];
                    actor_option.actorCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_cards":
                    // reset counters.
                    var card_option = this.card_options[secondary];
                    card_option.cardCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.itemCount = 0;
                    item_option.itemMacroCount = 0;
                    item_option.itemOnUseMacroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_macros":
                    // reset counters.
                    var macro_option = this.macro_options[secondary];
                    macro_option.macroCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_playlists":
                    // reset counters.
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.playlistCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_scenes":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.sceneCount = 0;
                    scene_option.sceneTokenCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_with_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
                case "compendiums_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(compendium_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    break;
            };
        }); // forEach matching Compendium.
    }

	// update and render.
    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCompendiums async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-compendiums-submit");
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
