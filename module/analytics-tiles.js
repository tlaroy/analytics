/***
*
* module/analytics-tiles.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
import { AnalyticsForm }     from "./analytics.js";
import { TileOptions }       from "./analytics.js";

import { MacroOptions }      from "./analytics.js";
import { SceneOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsTiles extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles  constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // tile options for each tab.
        this.tile_options = Object.assign(this.tile_options, {
            "tiles_with_macros": new TileOptions(),
            "tiles_in_scenes":   new TileOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (29) with macros options.
        this.macro_options = Object.assign(this.macro_options, {
            "tiles_with_macros": new MacroOptions(),
        });

        // (33) in scenes options.
        this.scene_options = Object.assign(this.scene_options, {
            "tiles_in_scenes": new SceneOptions(),
        });

        /* OUTPUT BY TAB */

        // tile lists.
        this.tile_lists = Object.assign(this.tile_lists, {
            "tiles_with_macros": [],
            "tiles_in_scenes":   [],
        });
    }

	// defaults.
    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-tiles",
            template:       "modules/analytics/templates/analytics-tiles-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-tiles"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-tiles-with-macros"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-tiles-with-macros":
                retval = {
                    primary:   "tiles_with_macros",
                    secondary: "tiles_with_macros"
                };
                break;
            case "analytics-tiles-in-scenes":
                retval = {
                    primary:   "tiles_in_scenes",
                    secondary: "tiles_in_scenes"
                };
                break;
        };
        return retval;
    };

	// initialize.
    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async activateListeners(html)");

        super.activateListeners($html);

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var tile_option = this.tile_options[primary];
        var tile_list   = this.tile_lists[primary];

        tile_option.activateListeners();

        switch (secondary) {
            case "tiles_with_macros":
                var macro_option = this.macro_options[secondary];
                macro_option.activateListeners(secondary);
                break;
            case "tiles_in_scenes":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-tiles-list");
        html_list.innerHTML = tile_list.join("");
    }

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-tiles-with-macros":
                output_list = this.tile_lists["tiles_with_macros"];
                retval = !this.macro_options["tiles_with_macros"].macroSubmitted;
                break;
            case "analytics-tiles-in-scenes":
                output_list = this.tile_lists["tiles_in_scenes"];
                retval = !this.scene_options["tiles_in_scenes"].sceneSubmitted;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles getData()");

        // get data for form.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var tile_option = this.tile_options[primary];

        var retval = tile_option.getTileData();

        switch (secondary) {
            case "tiles_with_macros":
                var macro_option = this.macro_options[secondary];
                retval = Object.assign(retval, macro_option.getMacroData(secondary));
                break;
            case "tiles_in_scenes":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                break;
        };

        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles setData()");

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var tile_option = this.tile_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            tile_option.setTileData(k, v);

            switch (secondary) {
                case "tiles_with_macros":
                    var macro_option = this.macro_options[secondary];
                    macro_option.setMacroData(k, v, secondary);
                    break;
                case "tiles_in_scenes":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
            };
        };
    }

	// submit.
    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _onSubmit(event)");

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
            case "tiles_with_macros":
                var macro_option = this.macro_options[primary];
                if (!macro_option.macroSubmitted) macro_option.macroSubmitted = true;
                break;
            case "tiles_in_scenes":
                var scene_option = this.scene_options[primary];
                if (!scene_option.sceneSubmitted) scene_option.sceneSubmitted = true;
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

    // create tile list.
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles buildList()");

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var tile_option   = this.tile_options[primary];
        var tile_list     = this.tile_lists[primary];
        var message_added = false;

        // reset counters and lists.
        tile_list.splice(0, tile_list.length);
        tile_option.tileCount = 0;

        // only add one message to list.
        if (!message_added) {
            // *** ADD MESSAGE ***
            this.addMessage(tile_list, i18n("ANALYTICS.Phase2"));
            message_added = true;
            return;
        };

        // *** SEARCH tiles.
        var matching_tiles = tile_option.searchTiles(game.tiles);

        // iterate thru matching tables.
        matching_tiles.forEach((tile, i) => {

            var tile_name  = tile.data.name;
            var tile_added = false;

            // each tab.
            switch (secondary) {
                case "tiles_with_macros":
                    // reset counters.
                    var macro_option = this.macro_options[secondary];
                    macro_option.macroCount = 0;

                    break;
                case "tiles_in_scenes":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.sceneCount = 0;

                    break;
            };
        }); // forEach matching Tile.
    }

	// update and render.
    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTiles async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-tiles-submit");
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
