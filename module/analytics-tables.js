/***
*
* module/analytics-tables.js
*
* version 0.0.9
*
*/

import * as ANALYTICS        from "./const.js";
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

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async activateListeners(html)");

        super.activateListeners($html);

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];
        var table_list   = this.table_lists[primary];

        // enable/disable by name or id.
        document.getElementById("analytics-tables-name").disabled           = !document.getElementById("analytics-tables-radio-name").checked;
        document.getElementById("analytics-tables-case-sensitive").disabled = !document.getElementById("analytics-tables-radio-name").checked;
        document.getElementById("analytics-tables-exact-match").disabled    = !document.getElementById("analytics-tables-radio-name").checked;
        document.getElementById("analytics-tables-id").disabled             = !document.getElementById("analytics-tables-radio-id").checked;

        switch (secondary) {
            case "tables_with_actors":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-actor-name").disabled           = !document.getElementById("analytics-tables-with-actor-radio-name").checked;
                document.getElementById("analytics-tables-with-actor-case-sensitive").disabled = !document.getElementById("analytics-tables-with-actor-radio-name").checked;
                document.getElementById("analytics-tables-with-actor-exact-match").disabled    = !document.getElementById("analytics-tables-with-actor-radio-name").checked;
                document.getElementById("analytics-tables-with-actor-id").disabled             = !document.getElementById("analytics-tables-with-actor-radio-id").checked;

                // enable/disable npc creature types.
                document.getElementById("analytics-tables-with-actor-aberration").disabled  = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-beast").disabled       = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-celestial").disabled   = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-construct").disabled   = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-dragon").disabled      = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-elemental").disabled   = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-fey").disabled         = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-fiend").disabled       = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-giant").disabled       = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-humanoid").disabled    = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-monstrosity").disabled = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-ooze").disabled        = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-plant").disabled       = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-swarm").disabled       = !document.getElementById("analytics-tables-with-actor-npc").checked;
                document.getElementById("analytics-tables-with-actor-undead").disabled      = !document.getElementById("analytics-tables-with-actor-npc").checked;
                break;
            case "tables_with_cards":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-card-name").disabled           = !document.getElementById("analytics-tables-with-card-radio-name").checked;
                document.getElementById("analytics-tables-with-card-case-sensitive").disabled = !document.getElementById("analytics-tables-with-card-radio-name").checked;
                document.getElementById("analytics-tables-with-card-exact-match").disabled    = !document.getElementById("analytics-tables-with-card-radio-name").checked;
                document.getElementById("analytics-tables-with-card-id").disabled             = !document.getElementById("analytics-tables-with-card-radio-id").checked;
                break;
            case "tables_in_compendiums":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-in-compendium-name").disabled           = !document.getElementById("analytics-tables-in-compendium-radio-name").checked;
                document.getElementById("analytics-tables-in-compendium-case-sensitive").disabled = !document.getElementById("analytics-tables-in-compendium-radio-name").checked;
                document.getElementById("analytics-tables-in-compendium-exact-match").disabled    = !document.getElementById("analytics-tables-in-compendium-radio-name").checked;
                document.getElementById("analytics-tables-in-compendium-id").disabled             = !document.getElementById("analytics-tables-in-compendium-radio-id").checked;
                break;
            case "tables_with_compendiums":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-compendium-name").disabled           = !document.getElementById("analytics-tables-with-compendium-radio-name").checked;
                document.getElementById("analytics-tables-with-compendium-case-sensitive").disabled = !document.getElementById("analytics-tables-with-compendium-radio-name").checked;
                document.getElementById("analytics-tables-with-compendium-exact-match").disabled    = !document.getElementById("analytics-tables-with-compendium-radio-name").checked;
                document.getElementById("analytics-tables-with-compendium-id").disabled             = !document.getElementById("analytics-tables-with-compendium-radio-id").checked;
                break;
            case "tables_with_items":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-item-name").disabled           = !document.getElementById("analytics-tables-with-item-radio-name").checked;
                document.getElementById("analytics-tables-with-item-case-sensitive").disabled = !document.getElementById("analytics-tables-with-item-radio-name").checked;
                document.getElementById("analytics-tables-with-item-exact-match").disabled    = !document.getElementById("analytics-tables-with-item-radio-name").checked;
                document.getElementById("analytics-tables-with-item-id").disabled             = !document.getElementById("analytics-tables-with-item-radio-id").checked;

                // disable on use item macros if midi-qol not installed or not active.
                if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
                    document.getElementById("analytics-tables-with-item-macro-label").style.display                = "none";
                    document.getElementById("analytics-tables-with-item-macro-name-input").style.display           = "none";
                    document.getElementById("analytics-tables-with-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("analytics-tables-with-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("analytics-tables-with-item-macro-thematic-break").style.display       = "none";
                    document.getElementById("analytics-tables-with-item-macro-id").style.display                   = "none";
                    document.getElementById("analytics-tables-with-item-macro-radio-name").style.display           = "none";
                    document.getElementById("analytics-tables-with-item-macro-radio-id").style.display             = "none";
                }

                // enable/disable on use macro fields.
                document.getElementById("analytics-tables-with-item-macro-name").disabled           = !document.getElementById("analytics-tables-with-item-macro").checked;
                document.getElementById("analytics-tables-with-item-macro-case-sensitive").disabled = !document.getElementById("analytics-tables-with-item-macro").checked;
                document.getElementById("analytics-tables-with-item-macro-exact-match").disabled    = !document.getElementById("analytics-tables-with-item-macro").checked;
                document.getElementById("analytics-tables-with-item-macro-id").disabled             = !document.getElementById("analytics-tables-with-item-macro").checked;
                document.getElementById("analytics-tables-with-item-macro-radio-name").disabled     = !document.getElementById("analytics-tables-with-item-macro").checked;
                document.getElementById("analytics-tables-with-item-macro-radio-id").disabled       = !document.getElementById("analytics-tables-with-item-macro").checked;

                if (document.getElementById("analytics-tables-with-item-macro").checked) {
                    document.getElementById("analytics-tables-with-item-macro-name").disabled           = !document.getElementById("analytics-tables-with-item-macro-radio-name").checked;
                    document.getElementById("analytics-tables-with-item-macro-case-sensitive").disabled = !document.getElementById("analytics-tables-with-item-macro-radio-name").checked;
                    document.getElementById("analytics-tables-with-item-macro-exact-match").disabled    = !document.getElementById("analytics-tables-with-item-macro-radio-name").checked;
                    document.getElementById("analytics-tables-with-item-macro-id").disabled             = !document.getElementById("analytics-tables-with-item-macro-radio-id").checked;
                };
                break;
            case "tables_in_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-in-journal-name").disabled           = !document.getElementById("analytics-tables-in-journal-radio-name").checked;
                document.getElementById("analytics-tables-in-journal-case-sensitive").disabled = !document.getElementById("analytics-tables-in-journal-radio-name").checked;
                document.getElementById("analytics-tables-in-journal-exact-match").disabled    = !document.getElementById("analytics-tables-in-journal-radio-name").checked;
                document.getElementById("analytics-tables-in-journal-id").disabled             = !document.getElementById("analytics-tables-in-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-tables-in-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-tables-in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-tables-in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-tables-in-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-tables-in-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-tables-in-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-tables-in-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-tables-in-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-tables-in-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-tables-in-journal-monks-shop").style.display         = "none";
                }
                break;
            case "tables_with_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-journal-name").disabled           = !document.getElementById("analytics-tables-with-journal-radio-name").checked;
                document.getElementById("analytics-tables-with-journal-case-sensitive").disabled = !document.getElementById("analytics-tables-with-journal-radio-name").checked;
                document.getElementById("analytics-tables-with-journal-exact-match").disabled    = !document.getElementById("analytics-tables-with-journal-radio-name").checked;
                document.getElementById("analytics-tables-with-journal-id").disabled             = !document.getElementById("analytics-tables-with-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-tables-with-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-tables-with-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-tables-with-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-tables-with-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-tables-with-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-tables-with-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-tables-with-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-tables-with-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-tables-with-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-tables-with-journal-monks-shop").style.display         = "none";
                }
                break;
            case "tables_with_macros":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-macro-name").disabled           = !document.getElementById("analytics-tables-with-macro-radio-name").checked;
                document.getElementById("analytics-tables-with-macro-case-sensitive").disabled = !document.getElementById("analytics-tables-with-macro-radio-name").checked;
                document.getElementById("analytics-tables-with-macro-exact-match").disabled    = !document.getElementById("analytics-tables-with-macro-radio-name").checked;
                document.getElementById("analytics-tables-with-macro-id").disabled             = !document.getElementById("analytics-tables-with-macro-radio-id").checked;
                break;
            case "tables_with_playlists":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-playlist-name").disabled           = !document.getElementById("analytics-tables-with-playlist-radio-name").checked;
                document.getElementById("analytics-tables-with-playlist-case-sensitive").disabled = !document.getElementById("analytics-tables-with-playlist-radio-name").checked;
                document.getElementById("analytics-tables-with-playlist-exact-match").disabled    = !document.getElementById("analytics-tables-with-playlist-radio-name").checked;
                document.getElementById("analytics-tables-with-playlist-id").disabled             = !document.getElementById("analytics-tables-with-playlist-radio-id").checked;
                break;
            case "tables_with_scenes":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-with-scene-name").disabled           = !document.getElementById("analytics-tables-with-scene-radio-name").checked;
                document.getElementById("analytics-tables-with-scene-case-sensitive").disabled = !document.getElementById("analytics-tables-with-scene-radio-name").checked;
                document.getElementById("analytics-tables-with-scene-exact-match").disabled    = !document.getElementById("analytics-tables-with-scene-radio-name").checked;
                document.getElementById("analytics-tables-with-scene-id").disabled             = !document.getElementById("analytics-tables-with-scene-radio-id").checked;
                break;
            case "tables_within_tables_34":
                // enable/disable by name or id.
                document.getElementById("analytics-tables-within-table-name").disabled           = !document.getElementById("analytics-tables-within-table-radio-name").checked;
                document.getElementById("analytics-tables-within-table-case-sensitive").disabled = !document.getElementById("analytics-tables-within-table-radio-name").checked;
                document.getElementById("analytics-tables-within-table-exact-match").disabled    = !document.getElementById("analytics-tables-within-table-radio-name").checked;
                document.getElementById("analytics-tables-within-table-id").disabled             = !document.getElementById("analytics-tables-within-table-radio-id").checked;
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-tables-list");
        html_list.innerHTML = table_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-tables-with-actors":
                output_list = this.table_lists["tables_with_actors"];
                retval = !this.actor_options["tables_with_actors"].actor_submitted;
                break;
            case "analytics-tables-with-cards":
                output_list = this.table_lists["tables_with_cards"];
                retval = !this.card_options["tables_with_cards"].card_submitted;
                break;
            case "analytics-tables-in-compendiums":
                output_list = this.table_lists["tables_in_compendiums"];
                retval = !this.compendium_options["tables_in_compendiums"].compendium_submitted;
                break;
            case "analytics-tables-with-compendiums":
                output_list = this.table_lists["tables_with_compendiums"];
                retval = !this.compendium_options["tables_with_compendiums"].compendium_submitted;
                break;
            case "analytics-tables-with-items":
                output_list = this.table_lists["tables_with_items"];
                retval = !this.item_options["tables_with_items"].item_submitted;
                break;
            case "analytics-tables-in-journals":
                output_list = this.table_lists["tables_in_journals"];
                retval = !this.journal_options["tables_in_journals"].journal_submitted;
                break;
            case "analytics-tables-with-journals":
                output_list = this.table_lists["tables_with_journals"];
                retval = !this.journal_options["tables_with_journals"].journal_submitted;
                break;
            case "analytics-tables-with-macros":
                output_list = this.table_lists["tables_with_macros"];
                retval = !this.macro_options["tables_with_macros"].macro_submitted;
                break;
            case "analytics-tables-with-playlists":
                output_list = this.table_lists["tables_with_playlists"];
                retval = !this.playlist_options["tables_with_playlists"].playlist_submitted;
                break;
            case "analytics-tables-with-scenes":
                output_list = this.table_lists["tables_with_scenes"];
                retval = !this.scene_options["tables_with_scenes"].scene_submitted;
                break;
            case "analytics-tables-within-tables":
                output_list = this.table_lists["tables_within_tables"];
                retval = !this.table_options["tables_within_tables"].table_submitted;
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
                if (!actor_option.actor_submitted) actor_option.actor_submitted = true;
                break;
            case "tables_with_cards":
                var card_option = this.card_options[primary];
                if (!card_option.card_submitted) card_option.card_submitted = true;
                break;
            case "tables_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "tables_with_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "tables_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.item_submitted) item_option.item_submitted = true;
                break;
            case "tables_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "tables_with_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "tables_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macro_submitted) macro_option.macro_submitted = true;
                break;
            case "tables_with_playlists":
                var playlist_option = this.playlist_options[primary];
                if (!playlist_option.playlist_submitted) playlist_option.playlist_submitted = true;
                break;
            case "tables_with_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "tables_within_tables_34":
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

    // create table list.
    buildList(table) {

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];
        var table_list   = this.table_lists[primary];
        var table_name   = table.data.name;

        // each tab.
        switch (secondary) {
            case "tables_with_actors":
                // reset counters.
                var actor_option = this.actor_options[secondary];
                actor_option.actor_count = 0;
                break;
            case "tables_with_cards":
                // reset counters.
                var card_option = this.card_options[secondary];
                card_option.card_count = 0;
                break;
            case "tables_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "tables_with_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "tables_with_items":
                // reset counters.
                var item_option = this.item_options[secondary];
                item_option.item_count = 0;
                break;
            case "tables_in_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "tables_with_macros":
                // reset counters.
                var macro_option = this.macro_options[secondary];
                macro_option.macro_count = 0;
                break;
            case "tables_with_playlists":
                // reset counters.
                var playlist_option = this.playlist_options[secondary];
                playlist_option.playlist_count = 0;
                break;
            case "tables_in_scenes":
                // reset counters.
                var scene_option = this.scene_options[secondary];
                scene_option.scene_count = 0;
                break;
            case "tables_within_tables_34":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var table_option = this.table_options[primary];
        var table_list   = this.table_lists[primary];

        // set data from form.
        const data = expandObject(formData);
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

        // reset counters and lists.
        table_option.table_count = 0;
        table_list.splice(0, table_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "tables_with_actors":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_cards":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_in_compendiums":
                this.addMessage(table_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "tables_with_compendiums":
                this.addMessage(table_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "tables_with_items":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_in_journals":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_journals":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_macros":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_playlists":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_scenes":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_within_tables_34":
                this.addMessage(table_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-tables-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through table list ...
        game.tables.contents.forEach((table, i) => {
            if (game.tables.contents[i]) {
            };
        }); // forEach Table.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
