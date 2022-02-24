/***
*
* module/analytics-journals.js
*
* version 0.0.11
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { JournalOptions }    from "./analytics.js";

import { ActorOptions }      from "./analytics.js";
import { CardOptions }       from "./analytics.js";
import { CompendiumOptions } from "./analytics.js";
import { ItemOptions }       from "./analytics.js";
import { MacroOptions }      from "./analytics.js";
import { PlaylistOptions }   from "./analytics.js";
import { SceneOptions }      from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsJournals extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // journal options for each tab.
        this.journal_options = Object.assign(this.journal_options, {
            "journals_with_actors":       new JournalOptions(),
            "journals_with_cards":        new JournalOptions(),
            "journals_in_compendiums":    new JournalOptions(),
            "journals_with_items":        new JournalOptions(),
            "journals_within_journals":   new JournalOptions(),
            "journals_with_macros":       new JournalOptions(),
            "journals_with_playlists":    new JournalOptions(),
            "journals_with_scenes":       new JournalOptions(),
            "journals_in_scenes":         new JournalOptions(),
            "journals_in_scenes_as_pins": new JournalOptions(),
            "journals_in_tables":         new JournalOptions(),
            "journals_with_tables":       new JournalOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (3) with actors options.
        this.actor_options = Object.assign(this.actor_options, {
            "journals_with_actors": new ActorOptions(),
        });

        // (7) with cards options.
        this.card_options = Object.assign(this.card_options, {
            "journals_with_cards": new CardOptions(),
        });

        // (10) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "journals_in_compendiums": new CompendiumOptions(),
        });

        // (19) with items options.
        this.item_options = Object.assign(this.item_options, {
            "journals_with_items": new ItemOptions(),
        });

        // (20-20) within journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "journals_within_journals_20": new JournalOptions(),
        });

        // (21) with macros options.
        this.macro_options = Object.assign(this.macro_options, {
            "journals_with_macros": new MacroOptions(),
        });

        // (22) with playlists options.
        this.playlist_options = Object.assign(this.playlist_options, {
            "journals_with_playlists": new PlaylistOptions(),
        });

        // (23) with scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "journals_with_scenes": new SceneOptions(),
        });

        // (24) in scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "journals_in_scenes": new SceneOptions(),
        });

        // (25) in scenes as pins options.
        this.scene_options = Object.assign(this.scene_options, {
            "journals_in_scenes_as_pins": new SceneOptions(),
        });

        // (26) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "journals_in_tables": new TableOptions(),
        });

        // (27) with tables options.
        this.table_options = Object.assign(this.table_options, {
            "journals_with_tables": new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // journal lists.
        this.journal_lists = Object.assign(this.journal_lists, {
            "journals_with_actors":       [],
            "journals_with_cards":        [],
            "journals_in_compendiums":    [],
            "journals_with_items":        [],
            "journals_within_journals":   [],
            "journals_with_macros":       [],
            "journals_with_playlists":    [],
            "journals_with_scenes":       [],
            "journals_in_scenes":         [],
            "journals_in_scenes_as_pins": [],
            "journals_in_tables":         [],
            "journals_with_tables":       [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-journals",
            template:       "modules/analytics/templates/analytics-journals-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-journals"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-journals-with-actors"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-journals-with-actors":
                retval = {
                    primary:   "journals_with_actors",
                    secondary: "journals_with_actors"
                };
                break;
            case "analytics-journals-with-cards":
                retval = {
                    primary:   "journals_with_cards",
                    secondary: "journals_with_cards"
                };
                break;
            case "analytics-journals-in-compendiums":
                retval = {
                    primary:   "journals_in_compendiums",
                    secondary: "journals_in_compendiums"
                };
                break;
            case "analytics-journals-with-items":
                retval = {
                    primary:   "journals_with_items",
                    secondary: "journals_with_items"
                };
                break;
            case "analytics-journals-within-journals":
                retval = {
                    primary:   "journals_within_journals",
                    secondary: "journals_within_journals_20"
                };
                break;
            case "analytics-journals-with-macros":
                retval = {
                    primary:   "journals_with_macros",
                    secondary: "journals_with_macros"
                };
                break;
            case "analytics-journals-with-playlists":
                retval = {
                    primary:   "journals_with_playlists",
                    secondary: "journals_with_playlists"
                };
                break;
            case "analytics-journals-with-scenes":
                retval = {
                    primary:   "journals_with_scenes",
                    secondary: "journals_with_scenes"
                };
                break;
            case "analytics-journals-in-scenes":
                retval = {
                    primary: "journals_in_scenes",
                    secondary: "journals_in_scenes"
                };
                break;
            case "analytics-journals-in-scenes-as-pins":
                retval = {
                    primary:   "journals_in_scenes_as_pins",
                    secondary: "journals_in_scenes_as_pins"
                };
                break;
            case "analytics-journals-in-tables":
                retval = {
                    primary:   "journals_in_tables",
                    secondary: "journals_in_tables"
                };
                break;
            case "analytics-journals-with-tables":
                retval = {
                    primary:   "journals_with_tables",
                    secondary: "journals_with_tables"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async activateListeners(html)");

        super.activateListeners($html);

        var primary        = this.sortOptions().primary;
        var secondary      = this.sortOptions().secondary;
        var journal_option = this.journal_options[primary];
        var journal_list   = this.journal_lists[primary];

        journal_option.activateListeners();

        switch (secondary) {
            case "journals_with_actors":
                var actor_option = this.actor_options[secondary];
                actor_option.activateListeners(secondary);
                break;
            case "journals_with_cards":
                var card_option = this.card_options[secondary];
                card_option.activateListeners(secondary);
                break;
            case "journals_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "journals_with_items":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "journals_within_journals_20":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "journals_with_macros":
                var macro_option = this.macro_options[secondary];
                macro_option.activateListeners(secondary);
                break;
            case "journals_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                playlist_option.activateListeners(secondary);
                break;
            case "journals_with_scenes":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "journals_in_scenes":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "journals_in_scenes_as_pins":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "journals_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
            case "journals_with_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-journals-list");
        html_list.innerHTML = journal_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-journals-with-actors":
                output_list = this.journal_lists["journals_with_actors"];
                retval = !this.actor_options["journals_with_actors"].actor_submitted;
                break;
            case "analytics-journals-with-cards":
                output_list = this.journal_lists["journals_with_cards"];
                retval = !this.card_options["journals_with_cards"].card_submitted;
                break;
            case "analytics-journals-in-compendiums":
                output_list = this.journal_lists["journals_in_compendiums"];
                retval = !this.compendium_options["journals_in_compendiums"].compendium_submitted;
                break;
            case "analytics-journals-with-items":
                output_list = this.journal_lists["journals_with_items"];
                retval = !this.item_options["journals_with_items"].item_submitted;
                break;
            case "analytics-journals-within-journals":
                output_list = this.journal_lists["journals_within_journals"];
                retval = !this.journal_options["journals_within_journals"].journal_submitted;
                break;
            case "analytics-journals-with-macros":
                output_list = this.journal_lists["journals_with_macros"];
                retval = !this.macro_options["journals_with_macros"].macro_submitted;
                break;
            case "analytics-journals-with-playlists":
                output_list = this.journal_lists["journals_with_playlists"];
                retval = !this.playlist_options["journals_with_playlists"].playlist_submitted;
                break;
            case "analytics-journals-with-scenes":
                output_list = this.journal_lists["journals_with_scenes"];
                retval = !this.scene_options["journals_with_scenes"].scene_submitted;
                break;
            case "analytics-journals-in-scenes":
                output_list = this.journal_lists["journals_in_scenes"];
                retval = !this.scene_options["journals_in_scenes"].scene_submitted;
                break;
            case "analytics-journals-in-scenes-as-pins":
                output_list = this.journal_lists["journals_in_scenes_as_pins"];
                retval = !this.scene_options["journals_in_scenes_as_pins"].scene_submitted;
                break;
            case "analytics-journals-in-tables":
                output_list = this.journal_lists["journals_in_tables"];
                retval = !this.table_options["journals_in_tables"].table_submitted;
                break;
            case "analytics-journals-with-tables":
                output_list = this.journal_lists["journals_with_tables"];
                retval = !this.table_options["journals_with_tables"].table_submitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals getData()");

        // get data for form.
        var primary        = this.sortOptions().primary;
        var secondary      = this.sortOptions().secondary;
        var journal_option = this.journal_options[primary];

        var retval = journal_option.getJournalData();

        switch (secondary) {
            case "journals_with_actors":
                var actor_option = this.actor_options[secondary];
                retval = Object.assign(retval, actor_option.getActorData(secondary));
                break;
            case "journals_with_cards":
                var card_option = this.card_options[secondary];
                retval = Object.assign(retval, card_option.getCardData(secondary));
                break;
            case "journals_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "journals_with_items":
                var item_option = this.item_options[secondary];
                retval = Object.assign(retval, item_option.getItemData(secondary));
                break;
            case "journals_within_journals_20":
                var journal_option_sec = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option_sec.getJournalData(secondary));
                break;
            case "journals_with_macros":
                var macro_option = this.macro_options[secondary];
                retval = Object.assign(retval, macro_option.getMacroData(secondary));
                break;
            case "journals_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                retval = Object.assign(retval, playlist_option.getPlaylistData(secondary));
                break;
            case "journals_with_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "journals_in_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "journals_in_scenes_as_pins":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "journals_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
            case "journals_with_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };
        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals setData()");

        var primary        = this.sortOptions().primary;
        var secondary      = this.sortOptions().secondary;
        var journal_option = this.journal_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            journal_option.setJournalData(k, v);

            switch (secondary) {
                case "journals_with_actors":
                    var actor_option = this.actor_options[secondary];
                    actor_option.setActorData(k, v, secondary);
                    break;
                case "journals_with_cards":
                    var card_option = this.card_options[secondary];
                    card_option.setCardData(k, v, secondary);
                    break;
                case "journals_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "journals_with_items":
                    var item_option = this.item_options[secondary];
                    item_option.setItemData(k, v, secondary);
                    break;
                case "journals_within_journals_20":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "journals_with_macros":
                    var macro_option = this.macro_options[secondary];
                    macro_option.setMacroData(k, v, secondary);
                    break;
                case "journals_with_playlists":
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.setPlaylistData(k, v, secondary);
                    break;
                case "journals_with_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "journals_in_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "journals_in_scenes_as_pins":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "journals_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
                case "journals_with_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async _onSubmit(event)");

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
            case "journals_with_actors":
                var actor_option = this.actor_options[primary];
                if (!actor_option.actor_submitted) actor_option.actor_submitted = true;
                break;
            case "journals_with_cards":
                var card_option = this.card_options[primary];
                if (!card_option.card_submitted) card_option.card_submitted = true;
                break;
            case "journals_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "journals_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.item_submitted) item_option.item_submitted = true;
                break;
            case "journals_within_journals_20":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "journals_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macro_submitted) macro_option.macro_submitted = true;
                break;
            case "journals_with_playlists":
                var playlist_option = this.playlist_options[primary];
                if (!playlist_option.playlist_submitted) playlist_option.playlist_submitted = true;
                break;
            case "journals_with_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "journals_in_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "journals_in_scene_as_pins":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "journals_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.table_options) table_option.table_options = true;
                break;
            case "journals_with_tables":
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

    // create journal list.
    buildList() {

        // active tab.
        var primary        = this.sortOptions().primary;
        var secondary      = this.sortOptions().secondary;
        var journal_option = this.journal_options[primary];
        var journal_list   = this.journal_lists[primary];
        var message_added  = false;

        // reset counters and lists.
        journal_option.journal_count = 0;
        journal_list.splice(0, journal_list.length);

        // *** SEARCH journals.
        journal_option.searchJournals(game.journal);

        // iterate thru matching journals.
        journal_option.matching_journals.forEach((journal, i) => {

            var journal_name  = journal.data.name;
            var journal_added = false;

            // each tab.
            switch (secondary) {
                case "journals_with_actors":
                    // reset counters.
                    var actor_option = this.actor_options[secondary];
                    actor_option.actor_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    actor_option.matching_actors = [ ];
                    break;
                case "journals_with_cards":
                    // reset counters.
                    var card_option = this.card_options[secondary];
                    card_option.card_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    card_option.matching_cards = [ ];
                    break;
                case "journals_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendium_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    compendium_option.matching_compendiums = [ ];
                    break;
                case "journals_with_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.item_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    item_option.matching_items = [ ];
                    break;
                case "journals_within_journals_20":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journal_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    journal_option.matching_journals = [ ];
                    break;
                case "journals_with_macros":
                    // reset counters.
                    var macro_option = this.macro_options[secondary];
                    macro_option.macro_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    macro_option.matching_macros = [ ];
                    break;
                case "journals_with_playlists":
                    // reset counters.
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.playlist_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    playlist_option.matching_playlists = [ ];
                    break;
                case "journals_with_scenes":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.scene_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    scene_option.matching_scenes = [ ];
                    break;
                case "journals_in_scenes":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.scene_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    scene_option.matching_scenes = [ ];
                    break;
                case "journals_in_scenes_as_pins":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.scene_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase1"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    scene_option.matching_scenes = [ ];
                    break;
                case "journals_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.table_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    table_option.matching_tables = [ ];
                    break;
                case "journals_with_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.table_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(journal_list, i18n("ANALYTICS.Phase2"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    table_option.matching_tables = [ ];
                    break;
            };
        }); // forEach matching Journal.

        // reset matching array.
        journal_option.matching_journals = [ ];
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-journals-submit");
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
