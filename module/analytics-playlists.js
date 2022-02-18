/***
*
* module/analytics-playlists.js
*
* version 0.0.9
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { PlaylistOptions }   from "./analytics.js";

import { CompendiumOptions } from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { SceneOptions }      from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsPlaylists extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // playlist options for each tab.
        this.playlist_options = Object.assign(this.playlist_options, {
            "playlists_in_compendiums": new PlaylistOptions(),
            "playlists_in_journals":    new PlaylistOptions(),
            "playlists_in_scenes":      new PlaylistOptions(),
            "playlists_in_tables":      new PlaylistOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (12) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "playlists_in_compendiums": new CompendiumOptions(),
        });

        // (22) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "playlists_in_journals": new JournalOptions(),
        });

        // (30) in scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "playlists_in_scenes": new SceneOptions(),
        });

        // (31) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "playlists_in_tables":  new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // playlist lists.
        this.playlist_lists = Object.assign(this.playlist_lists, {
            "playlists_in_compendiums": [],
            "playlists_in_journals":    [],
            "playlists_in_scenes":      [],
            "playlists_in_tables":      [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-playlists",
            template:       "modules/analytics/templates/analytics-playlists-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-playlists"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-playlists-in-compendiums"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-playlists-in-compendiums":
                retval = {
                    primary:   "playlists_in_compendiums",
                    secondary: "playlists_in_compendiums"
                };
                break;
            case "analytics-playlists-in-journals":
                retval = {
                    primary:   "playlists_in_journals",
                    secondary: "playlists_in_journals"
                };
                break;
            case "analytics-playlists-in-scenes":
                retval = {
                    primary:   "playlists_in_scenes",
                    secondary: "playlists_in_scenes"
                };
                break;
            case "analytics-playlists-in-tables":
                retval = {
                    primary:   "playlists_in_tables",
                    secondary: "playlists_in_tables"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists async activateListeners(html)");

        super.activateListeners($html);

        var primary         = this.sortOptions().primary;
        var secondary       = this.sortOptions().secondary;
        var playlist_option = this.playlist_options[primary];
        var playlist_list   = this.playlist_lists[primary];

        // enable/disable by name or id.
        document.getElementById("analytics-playlists-name").disabled           = !document.getElementById("analytics-playlists-radio-name").checked;
        document.getElementById("analytics-playlists-case-sensitive").disabled = !document.getElementById("analytics-playlists-radio-name").checked;
        document.getElementById("analytics-playlists-exact-match").disabled    = !document.getElementById("analytics-playlists-radio-name").checked;
        document.getElementById("analytics-playlists-id").disabled             = !document.getElementById("analytics-playlists-radio-id").checked;

        switch (secondary) {
            case "playlists_in_compendiums":
                // enable/disable by name or id.
                document.getElementById("analytics-playlists-in-compendium-name").disabled           = !document.getElementById("analytics-playlists-in-compendium-radio-name").checked;
                document.getElementById("analytics-playlists-in-compendium-case-sensitive").disabled = !document.getElementById("analytics-playlists-in-compendium-radio-name").checked;
                document.getElementById("analytics-playlists-in-compendium-exact-match").disabled    = !document.getElementById("analytics-playlists-in-compendium-radio-name").checked;
                document.getElementById("analytics-playlists-in-compendium-id").disabled             = !document.getElementById("analytics-playlists-in-compendium-radio-id").checked;
                break;
            case "playlists_in_journals":
                // enable/disable by name or id.
                document.getElementById("analytics-playlists-in-journal-name").disabled           = !document.getElementById("analytics-playlists-in-journal-radio-name").checked;
                document.getElementById("analytics-playlists-in-journal-case-sensitive").disabled = !document.getElementById("analytics-playlists-in-journal-radio-name").checked;
                document.getElementById("analytics-playlists-in-journal-exact-match").disabled    = !document.getElementById("analytics-playlists-in-journal-radio-name").checked;
                document.getElementById("analytics-playlists-in-journal-id").disabled             = !document.getElementById("analytics-playlists-in-journal-radio-id").checked;

                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("analytics-playlists-in-journal-monks-base").style.display         = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-loot").style.display         = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-organization").style.display = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-person").style.display       = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-place").style.display        = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-poi").style.display          = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-quest").style.display        = "none";
                    document.getElementById("analytics-playlists-in-journal-monks-shop").style.display         = "none";
                }
                break;
            case "playlists_in_scenes":
                // enable/disable by name or id.
                document.getElementById("analytics-playlists-in-scene-name").disabled           = !document.getElementById("analytics-playlists-in-scene-radio-name").checked;
                document.getElementById("analytics-playlists-in-scene-case-sensitive").disabled = !document.getElementById("analytics-playlists-in-scene-radio-name").checked;
                document.getElementById("analytics-playlists-in-scene-exact-match").disabled    = !document.getElementById("analytics-playlists-in-scene-radio-name").checked;
                document.getElementById("analytics-playlists-in-scene-id").disabled             = !document.getElementById("analytics-playlists-in-scene-radio-id").checked;
                break;
            case "playlists_in_tables":
                // enable/disable by name or id.
                document.getElementById("analytics-playlists-in-table-name").disabled           = !document.getElementById("analytics-playlists-in-table-radio-name").checked;
                document.getElementById("analytics-playlists-in-table-case-sensitive").disabled = !document.getElementById("analytics-playlists-in-table-radio-name").checked;
                document.getElementById("analytics-playlists-in-table-exact-match").disabled    = !document.getElementById("analytics-playlists-in-table-radio-name").checked;
                document.getElementById("analytics-playlists-in-table-id").disabled             = !document.getElementById("analytics-playlists-in-table-radio-id").checked;
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-playlists-list");
        html_list.innerHTML = playlist_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-playlists-in-compendiums":
                output_list = this.playlist_lists["playlists_in_compendiums"];
                retval = !this.compendium_options["playlists_in_compendiums"].compendium_submitted;
                break;
            case "analytics-playlists-in-journals":
                output_list = this.playlist_lists["playlists_in_journals"];
                retval = !this.journal_options["playlists_in_journals"].journal_submitted;
                break;
            case "analytics-playlists-in-scenes":
                output_list = this.playlist_lists["playlists_in_scenes"];
                retval = !this.scene_options["playlists_in_scenes"].scene_submitted;
                break;
            case "analytics-playlists-in-tables":
                output_list = this.playlist_lists["playlists_in_tables"];
                retval = !this.table_options["playlists_in_tables"].table_submitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists getData()");

        // get data for form.
        var primary         = this.sortOptions().primary;
        var secondary       = this.sortOptions().secondary;
        var playlist_option = this.playlist_options[primary];

        var retval = playlist_option.getPlaylistData();

        switch (secondary) {
            case "playlists_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "playlists_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "playlists_in_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
            case "playlists_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };
        return retval;
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists async _onSubmit(event)");

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
            case "playlists_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "playlists_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "playlists_in_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "playlists_in_tables":
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

    // create playlist list.
    buildList(playlist) {

        // active tab.
        var primary         = this.sortOptions().primary;
        var secondary       = this.sortOptions().secondary;
        var playlist_option = this.playlist_options[primary];
        var playlist_list   = this.playlist_lists[primary];
        var playlist_name   = playlist.data.name;

        // each tab.
        switch (secondary) {
            case "playlists_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "playlists_in_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "playlists_in_scenes":
                // reset counters.
                var scene_option = this.scene_options[secondary];
                scene_option.scene_count = 0;
                break;
            case "playlists_in_tables":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsPlaylists async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary         = this.sortOptions().primary;
        var secondary       = this.sortOptions().secondary;
        var playlist_option = this.playlist_options[primary];
        var playlist_list   = this.playlist_lists[primary];

        // set data from form.
        const data = expandObject(formData);
        for ( let [k, v] of Object.entries(data) ) {
            playlist_option.setPlaylistData(k, v);

            switch (secondary) {
                case "playlists_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "playlists_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "playlists_in_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "playlists_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };

        // reset counters and lists.
        playlist_option.playlist_count = 0;
        playlist_list.splice(0, playlist_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "playlists_in_compendiums":
                this.addMessage(playlist_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "playlists_in_journals":
                this.addMessage(playlist_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "playlists_in_scenes":
                this.addMessage(playlist_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "playlists_in_tables":
                this.addMessage(playlist_list, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-playlists-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through playlist list ...
        game.playlists.contents.forEach((playlist, i) => {
            if (game.playlists.contents[i]) {
            };
        }); // forEach Playlist.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
