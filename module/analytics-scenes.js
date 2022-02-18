/***
*
* module/analytics-scenes.js
*
* version 0.0.9
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { SceneOptions }      from "./analytics.js";

import { ActorOptions }      from "./analytics.js";
import { CompendiumOptions } from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { PlaylistOptions }   from "./analytics.js";
import { TableOptions }      from "./analytics.js";
import { TileOptions }       from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsScenes extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // scene options for each tab.
        this.scene_options = Object.assign(this.scene_options, {
            "scenes_with_actors_as_tokens": new SceneOptions(),
            "scenes_in_compendiums":        new SceneOptions(),
            "scenes_in_journals":           new SceneOptions(),
            "scenes_with_journals":         new SceneOptions(),
            "scenes_with_journals_as_pins": new SceneOptions(),
            "scenes_with_playlists":        new SceneOptions(),
            "scenes_in_tables":             new SceneOptions(),
            "scenes_with_tiles":            new SceneOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (4) with actors as tokens options.
        this.actor_options = Object.assign(this.actor_options, {
            "scenes_with_actors_as_tokens": new ActorOptions(),
        });

        // (13) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "scenes_in_compendiums": new CompendiumOptions(),
        });

        // (23) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "scenes_in_journals": new JournalOptions(),
        });

        // (24) with journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "scenes_with_journals": new JournalOptions(),
        });

        // (25) with journals as pins option pins.
        this.journal_options = Object.assign(this.journal_options, {
            "scenes_with_journals_as_pins": new JournalOptions(),
        });

        // (30) with playlists options.
        this.playlist_options = Object.assign(this.playlist_options, {
            "scenes_with_playlists": new PlaylistOptions(),
        });

        // (32) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "scenes_in_tables": new TableOptions(),
        });

        // (34) with tiles options.
        this.tile_options = Object.assign(this.tile_options, {
            "scenes_with_tiles": new TileOptions(),
        });

        /* OUTPUT BY TAB */

        // scene lists.
        this.scene_lists = Object.assign(this.scene_lists, {
            "scenes_with_actors_as_tokens": [],
            "scenes_in_compendiums":        [],
            "scenes_in_journals":           [],
            "scenes_with_journals":         [],
            "scenes_with_journals_as_pins": [],
            "scenes_with_playlists":        [],
            "scenes_in_tables":             [],
            "scenes_with_tiles":            [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-scenes",
            template:       "modules/analytics/templates/analytics-scenes-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-scenes"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-scenes-with-actors-as-tokens"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-scenes-with-actors-as-tokens":
                retval = {
                    primary:   "scenes_with_actors_as_tokens",
                    secondary: "scenes_with_actors_as_tokens"
                };
                break;
            case "analytics-scenes-in-compendiums":
                retval = {
                    primary:   "scenes_in_compendiums",
                    secondary: "scenes_in_compendiums"
                };
                break;
            case "analytics-scenes-in-journals":
                retval = {
                    primary:   "scenes_in_journals",
                    secondary: "scenes_in_journals"
                };
                break;
            case "analytics-scenes-with-journals":
                retval = {
                    primary:   "scenes_with_journals",
                    secondary: "scenes_with_journals"
                };
                break;
            case "analytics-scenes-with-journals-as-pins":
                retval = {
                    primary:   "scenes_with_journals_as_pins",
                    secondary: "scenes_with_journals_as_pins"
                };
                break;
            case "analytics-scenes-with-playlists":
                retval = {
                    primary:   "scenes_with_playlists",
                    secondary: "scenes_with_playlists"
                };
                break;
            case "analytics-scenes-in-tables":
                retval = {
                    primary:   "scenes_in_tables",
                    secondary: "scenes_in_tables"
                };
                break;
            case "analytics-scenes-with-tiles":
                retval = {
                    primary:   "scenes_with_tiles",
                    secondary: "scenes_with_tiles"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async activateListeners(html)");

        super.activateListeners($html);

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var scene_option = this.scene_options[primary];
        var scene_list   = this.scene_lists[primary];

        // enable/disable by name or id.
        document.getElementById("analytics-scenes-name").disabled           = !document.getElementById("analytics-scenes-radio-name").checked;
        document.getElementById("analytics-scenes-case-sensitive").disabled = !document.getElementById("analytics-scenes-radio-name").checked;
        document.getElementById("analytics-scenes-exact-match").disabled    = !document.getElementById("analytics-scenes-radio-name").checked;
        document.getElementById("analytics-scenes-id").disabled             = !document.getElementById("analytics-scenes-radio-id").checked;

        switch (secondary) {
            case "scenes_with_actors_as_tokens":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-with-actor-as-token-name").disabled           = !document.getElementById("analytics-scenes-with-actor-as-token-radio-name").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-case-sensitive").disabled = !document.getElementById("analytics-scenes-with-actor-as-token-radio-name").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-exact-match").disabled    = !document.getElementById("analytics-scenes-with-actor-as-token-radio-name").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-id").disabled             = !document.getElementById("analytics-scenes-with-actor-as-token-radio-id").checked;

                // enable/disable npc creature types.
                document.getElementById("analytics-scenes-with-actor-as-token-aberration").disabled  = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-beast").disabled       = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-celestial").disabled   = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-construct").disabled   = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-dragon").disabled      = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-elemental").disabled   = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-fey").disabled         = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-fiend").disabled       = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-giant").disabled       = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-humanoid").disabled    = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-monstrosity").disabled = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-ooze").disabled        = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-plant").disabled       = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-swarm").disabled       = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                document.getElementById("analytics-scenes-with-actor-as-token-undead").disabled      = !document.getElementById("analytics-scenes-with-actor-as-token-npc").checked;
                break;
            case "scenes_in_compendiums":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-in-compendium-name").disabled           = !document.getElementById("analytics-scenes-in-compendium-radio-name").checked;
                document.getElementById("analytics-scenes-in-compendium-case-sensitive").disabled = !document.getElementById("analytics-scenes-in-compendium-radio-name").checked;
                document.getElementById("analytics-scenes-in-compendium-exact-match").disabled    = !document.getElementById("analytics-scenes-in-compendium-radio-name").checked;
                document.getElementById("analytics-scenes-in-compendium-id").disabled             = !document.getElementById("analytics-scenes-in-compendium-radio-id").checked;
                break;
            case "scenes_in_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-in-journal-name").disabled           = !document.getElementById("analytics-scenes-in-journal-radio-name").checked;
                document.getElementById("analytics-scenes-in-journal-case-sensitive").disabled = !document.getElementById("analytics-scenes-in-journal-radio-name").checked;
                document.getElementById("analytics-scenes-in-journal-exact-match").disabled    = !document.getElementById("analytics-scenes-in-journal-radio-name").checked;
                document.getElementById("analytics-scenes-in-journal-id").disabled             = !document.getElementById("analytics-scenes-in-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-scenes-in-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-scenes-in-journal-monks-shop").style.display         = "none";
                }
                break;
            case "scenes_with_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-with-journal-name").disabled           = !document.getElementById("analytics-scenes-with-journal-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-case-sensitive").disabled = !document.getElementById("analytics-scenes-with-journal-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-exact-match").disabled    = !document.getElementById("analytics-scenes-with-journal-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-id").disabled             = !document.getElementById("analytics-scenes-with-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-scenes-with-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-scenes-with-journal-monks-shop").style.display         = "none";
                }
                break;
            case "scenes_with_journals_as_pins":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-with-journal-as-pin-name").disabled           = !document.getElementById("analytics-scenes-with-journal-as-pin-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-as-pin-case-sensitive").disabled = !document.getElementById("analytics-scenes-with-journal-as-pin-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-as-pin-exact-match").disabled    = !document.getElementById("analytics-scenes-with-journal-as-pin-radio-name").checked;
                document.getElementById("analytics-scenes-with-journal-as-pin-id").disabled             = !document.getElementById("analytics-scenes-with-journal-as-pin-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-base").style.display         = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-loot").style.display         = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-organization").style.display = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-person").style.display       = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-place").style.display        = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-poi").style.display          = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-quest").style.display        = "none";
                    document.getElementById("analytics-scenes-with-journal-as-pin-monks-shop").style.display         = "none";
                }
                break;
            case "scenes_with_playlists":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-with-playlist-name").disabled           = !document.getElementById("analytics-scenes-with-playlist-radio-name").checked;
                document.getElementById("analytics-scenes-with-playlist-case-sensitive").disabled = !document.getElementById("analytics-scenes-with-playlist-radio-name").checked;
                document.getElementById("analytics-scenes-with-playlist-exact-match").disabled    = !document.getElementById("analytics-scenes-with-playlist-radio-name").checked;
                document.getElementById("analytics-scenes-with-playlist-id").disabled             = !document.getElementById("analytics-scenes-with-playlist-radio-id").checked;
                break;
            case "scenes_in_tables":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-in-table-name").disabled           = !document.getElementById("analytics-scenes-in-table-radio-name").checked;
                document.getElementById("analytics-scenes-in-table-case-sensitive").disabled = !document.getElementById("analytics-scenes-in-table-radio-name").checked;
                document.getElementById("analytics-scenes-in-table-exact-match").disabled    = !document.getElementById("analytics-scenes-in-table-radio-name").checked;
                document.getElementById("analytics-scenes-in-table-id").disabled             = !document.getElementById("analytics-scenes-in-table-radio-id").checked;
                break;
            case "scenes_with_tiles":
                // enable/disable by name or id.
                document.getElementById("analytics-scenes-with-tile-name").disabled           = !document.getElementById("analytics-scenes-with-tile-radio-name").checked;
                document.getElementById("analytics-scenes-with-tile-case-sensitive").disabled = !document.getElementById("analytics-scenes-with-tile-radio-name").checked;
                document.getElementById("analytics-scenes-with-tile-exact-match").disabled    = !document.getElementById("analytics-scenes-with-tile-radio-name").checked;
                document.getElementById("analytics-scenes-with-tile-id").disabled             = !document.getElementById("analytics-scenes-with-tile-radio-id").checked;
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-scenes-list");
        html_list.innerHTML = scene_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-scenes-with-actors-as-tokens":
                output_list = this.scene_lists["scenes_with_actors_as_tokens"];
                retval = !this.actor_options["scenes_with_actors_as_tokens"].actor_submitted;
                break;
            case "analytics-scenes-in-compendiums":
                output_list = this.scene_lists["scenes_in_compendiums"];
                retval = !this.compendium_options["scenes_in_compendiums"].compendium_submitted;
                break;
            case "analytics-scenes-in-journals":
                output_list = this.scene_lists["scenes_in_journals"];
                retval = !this.journal_options["scenes_in_journals"].journal_submitted;
                break;
            case "analytics-scenes-with-journals":
                output_list = this.scene_lists["scenes_with_journals"];
                retval = !this.journal_options["scenes_with_journals"].journal_submitted;
                break;
            case "analytics-scenes-with-journals-as-pins":
                output_list = this.scene_lists["scenes_with_journals_as_pins"];
                retval = !this.journal_options["scenes_with_journals_as_pins"].journal_submitted;
                break;
            case "analytics-scenes-with-playlists":
                output_list = this.scene_lists["scenes_with_playlists"];
                retval = !this.playlist_options["scenes_with_playlists"].playlist_submitted;
                break;
            case "analytics-scenes-in-tables":
                output_list = this.scene_lists["scenes_in_tables"];
                retval = !this.table_options["scenes_in_tables"].table_submitted;
                break;
            case "analytics-scenes-with-tiles":
                output_list = this.scene_lists["scenes_with_tiles"];
                retval = !this.tile_options["scenes_with_tiles"].tile_submitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes getData()");

        // get data for form.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var scene_option = this.scene_options[primary];

        var retval = scene_option.getSceneData();

        switch (secondary) {
            case "scenes_with_actors_as_tokens":
                var actor_option = this.actor_options[secondary];
                retval = Object.assign(retval, actor_option.getActorData(secondary));
                break;
            case "scenes_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "scenes_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "scenes_with_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "scenes_with_journals_as_pins":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "scenes_with_playlists":
                var playlist_option = this.playlist_options[secondary];
                retval = Object.assign(retval, playlist_option.getPlaylistData(secondary));
                break;
            case "scenes_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
            case "scenes_with_tiles":
                var tile_option = this.tile_options[secondary];
                retval = Object.assign(retval, tile_option.getTileData(secondary));
                break;
        };
        return retval;
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async _onSubmit(event)");

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
            case "scenes_with_actors_as_tokens":
                var actor_option = this.actor_options[primary];
                if (!actor_option.actor_submitted) actor_option.actor_submitted = true;
                break;
            case "scenes_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "scenes_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "scenes_with_journals_as_pins":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "scenes_with_playlists":
                var playlist_option = this.playlist_options[primary];
                if (!playlist_option.playlist_submitted) playlist_option.playlist_submitted = true;
                break;
            case "scenes_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.table_options) table_option.table_options = true;
                break;
            case "scenes_with_tiles":
                var tile_option = this.tile_options[primary];
                if (!tile_option.tile_options) tile_option.tile_options = true;
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

    // create scene list.
    buildList(scene) {

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var scene_option = this.scene_options[primary];
        var scene_list   = this.scene_lists[primary];
        var scene_name   = scene.data.name;

        // each tab.
        switch (secondary) {
            case "scenes_with_actors_as_tokens":
                // reset counters.
                var actor_option = this.actor_options[secondary];
                actor_option.actor_count = 0;
                break;
            case "scenes_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "scenes_in_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "scenes_with_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "scenes_with_journals_as_pins":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "scenes_with_playlists":
                // reset counters.
                var playlist_option = this.playlist_options[secondary];
                playlist_option.playlist_count = 0;
                break;
            case "scenes_in_tables":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
            case "scenes_with_tiles":
                // reset counters.
                var tile_option = this.tile_options[secondary];
                tile_option.tile_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var scene_option = this.scene_options[primary];
        var scene_list   = this.scene_lists[primary];

        // set data from form.
        const data = expandObject(formData);
        for ( let [k, v] of Object.entries(data) ) {
            scene_option.setSceneData(k, v);

            switch (secondary) {
                case "scenes_with_actors_as_tokens":
                    var actor_option = this.actor_options[secondary];
                    actor_option.setActorData(k, v, secondary);
                    break;
                case "scenes_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "scenes_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "scenes_with_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "scenes_with_journals_as_pins":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "scenes_with_playlists":
                    var playlist_option = this.playlist_options[secondary];
                    playlist_option.setPlaylistData(k, v, secondary);
                    break;
                case "scenes_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
                case "scenes_with_tiles":
                    var tile_option = this.tile_options[secondary];
                    tile_option.setTileData(k, v, secondary);
                    break;
            };
        };

        // reset counters and lists.
        scene_option.scene_count = 0;
        scene_list.splice(0, scene_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "scenes_with_actors_as_tokens":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_in_compendiums":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "scenes_in_journals":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_journals":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_journals_as_pins":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_playlists":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "scenes_in_tables":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "scenes_with_tiles":
                this.addMessage(scene_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-scenes-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through scene list ...
        game.scenes.contents.forEach((scene, i) => {
            if (game.scenes.contents[i]) {
            };
        }); // forEach Scene.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
