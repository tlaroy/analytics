/***
*
* module/analytics-actors.js
*
* version 0.0.11
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { ActorOptions }      from "./analytics.js";

import { CompendiumOptions } from "./analytics.js";
import { ItemOptions }       from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { SceneOptions }      from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // actor options for each tab.
        this.actor_options = Object.assign(this.actor_options, {
            "actors_in_compendiums":      new ActorOptions(),
            "actors_with_items":          new ActorOptions(),
            "actors_in_journals":         new ActorOptions(),
            "actors_in_scenes_as_tokens": new ActorOptions(),
            "actors_in_tables":           new ActorOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (1) in compendiums options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "actors_in_compendiums": new CompendiumOptions()
        });

        // (2) with items options.
        this.item_options = Object.assign(this.item_options, {
            "actors_with_items": new ItemOptions()
        });

        // (3) in journals options.
        this.journal_options = Object.assign(this.journal_options, {
            "actors_in_journals": new JournalOptions()
        });

        // (4) in scenes as tokens options.
        this.scene_options = Object.assign(this.scene_options, {
            "actors_in_scenes_as_tokens": new SceneOptions()
        });

        // (5) in tables options.
        this.table_options = Object.assign(this.table_options, {
            "actors_in_tables":  new TableOptions()
        });

        /* OUTPUT BY TAB */

        // actor lists.
        this.actor_lists = Object.assign(this.actor_lists, {
            "actors_in_compendiums":      [],
            "actors_with_items":          [],
            "actors_in_journals":         [],
            "actors_in_scenes_as_tokens": [],
            "actors_in_tables":           [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-actors",
            template:       "modules/analytics/templates/analytics-actors-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-actors"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-actors-in-compendiums"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-actors-in-compendiums":
                retval = {
                    primary:   "actors_in_compendiums",
                    secondary: "actors_in_compendiums"
                };
                break;
            case "analytics-actors-with-items":
                retval = {
                    primary:   "actors_with_items",
                    secondary: "actors_with_items"
                };
                break;
            case "analytics-actors-in-journals":
                retval = {
                    primary:   "actors_in_journals",
                    secondary: "actors_in_journals"
                };
                break;
            case "analytics-actors-in-scenes-as-tokens":
                retval = {
                    primary:   "actors_in_scenes_as_tokens",
                    secondary: "actors_in_scenes_as_tokens"
                };
                break;
            case "analytics-actors-in-tables":
                retval = {
                    primary:   "actors_in_tables",
                    secondary: "actors_in_tables"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async activateListeners(html)");

        super.activateListeners($html);

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var actor_option = this.actor_options[primary];
        var actor_list   = this.actor_lists[primary];

        actor_option.activateListeners();

        switch (secondary) {
            case "actors_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "actors_with_items":
                var item_option = this.item_options[secondary];
                item_option.activateListeners(secondary);
                break;
            case "actors_in_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "actors_in_scenes_as_tokens":
                var scene_option = this.scene_options[secondary];
                scene_option.activateListeners(secondary);
                break;
            case "actors_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-actors-list");
        html_list.innerHTML = actor_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-actors-in-compendiums":
                output_list = this.actor_lists["actors_in_compendiums"];
                retval = !this.compendium_options["actors_in_compendiums"].compendium_submitted;
                break;
            case "analytics-actors-with-items":
                output_list = this.actor_lists["actors_with_items"];
                retval = !this.item_options["actors_with_items"].item_submitted;
                break;
            case "analytics-actors-in-journals":
                output_list = this.actor_lists["actors_in_journals"];
                retval = !this.journal_options["actors_in_journals"].journal_submitted;
                break;
            case "analytics-actors-in-scenes-as-tokens":
                output_list = this.actor_lists["actors_in_scenes_as_tokens"];
                retval = !this.scene_options["actors_in_scenes_as_tokens"].scene_submitted;
                break;
            case "analytics-actors-in-tables":
                output_list = this.actor_lists["actors_in_tables"];
                retval = !this.table_options["actors_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted and return.
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors getData()");

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var actor_option = this.actor_options[primary];

        var retval = actor_option.getActorData();

        switch (secondary) {
            case "actors_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                retval = Object.assign(retval, { "analytics-actors-tooltip": i18n('DOCUMENT.Actors') + " " + i18n('Name') });
                break;
            case "actors_with_items":
                var item_option = this.item_options[secondary];
                retval = Object.assign(retval, item_option.getItemData(secondary));
                retval = Object.assign(retval, { "analytics-actors-tooltip": i18n('DOCUMENT.Actors') + " " + i18n('Name') });
                break;
            case "actors_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                retval = Object.assign(retval, { "analytics-actors-tooltip": i18n('DOCUMENT.Actors') + " " + i18n('Name') });
                break;
            case "actors_in_scenes_as_tokens":
                var scene_option = this.scene_options[secondary];
                retval = Object.assign(retval, scene_option.getSceneData(secondary));
                retval = Object.assign(retval, { "analytics-actors-tooltip": i18n('DOCUMENT.Tokens') + " " + i18n('TOKEN.CharActor') + " " + i18n('Name') });
                break;
            case "actors_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                retval = Object.assign(retval, { "analytics-actors-tooltip": i18n('DOCUMENT.Actors') + " " + i18n('Name') });
                break;
        };

        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors setData()");

        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var actor_option = this.actor_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            actor_option.setActorData(k, v);

            switch (secondary) {
                case "actors_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "actors_with_items":
                    var item_option = this.item_options[secondary];
                    item_option.setItemData(k, v, secondary);
                    break;
                case "actors_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "actors_in_scenes_as_tokens":
                    var scene_option = this.scene_options[secondary];
                    scene_option.setSceneData(k, v, secondary);
                    break;
                case "actors_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onSubmit(event)");

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
            case "actors_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "actors_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.item_submitted) item_option.item_submitted = true;
                break;
            case "actors_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "actors_in_scenes_as_tokens":
                var scene_option = this.scene_options[primary];
                if (!scene_option.scene_submitted) scene_option.scene_submitted = true;
                break;
            case "actors_in_tables":
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

    // create actor list.
    buildList() {

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var actor_option  = this.actor_options[primary];
        var actor_list    = this.actor_lists[primary];
        var message_added = false;

        // reset counters and lists.
        actor_option.actor_count = 0;
        actor_list.splice(0, actor_list.length);

        // *** SEARCH actors.
        actor_option.searchActors(game.actors);

        // iterate thru matching actors.
        actor_option.matching_actors.forEach((actor, i) => {

            var actor_name  = actor.data.name;
            var actor_added = false;
            var item_added  = false;

            // each tab.
            switch (secondary) {
                case "actors_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendium_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(actor_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    compendium_option.matching_compendiums = [ ];
                    break;
                case "actors_with_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.item_count = 0;
                    item_option.item_macro_count = 0;
                    item_option.item_on_use_macro_count = 0;

                    // actors without items.
                    if (actor.items.size == 0) {
                        // when NOT looking for macros - add actor to list if no item filters or looking for actors without items.
                        if (!item_option.item_on_use_macro_checked &&
                            !item_option.item_macro_checked &&
                            (item_option.item_none_checked || item_option.noItemTypesSelected())) {
                            // *** ADD ACTOR ***
                            this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                            actor_option.actor_count++;
                            return;
                        };
                    };

                    // *** SEARCH items.
                    item_option.searchItems(actor.items);

                    // iterate thru matches.
                    item_option.matching_items.forEach((item, j) => {

                        // item macros
                        if (item_option.item_macro_checked) {

                            if (item.data.flags['itemacro'] && item.data.flags['itemacro'].macro.data.command) {

                                // *** SEARCH item macros.
                                item_option.searchItemMacros(item);

                                // iterate thru matches.
                                item_option.matching_macros.forEach((macro, k) => {

                                    // only add one actor to list.
                                    if (!actor_added) {
                                        // *** ADD ACTOR ***
                                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                        actor_option.actor_count++;
                                        actor_added = true;
                                    };
                                    // only add one item to list.
                                    if (!item_added) {
                                        if (item_option.item_show_checked) {
                                            // *** ADD ITEM ***
                                            this.addItemSecondary(actor_list, item, item_option.item_show_id_checked);
                                        };
                                        item_added = true;
                                    };
                                    // add item macro to the list.
                                    if (item_option.item_show_checked) {
                                        // *** ADD ITEM MACRO ***
                                        this.addItemMacroSecondary(actor_list, macro, item_option.item_show_id_checked);
                                    };
                                }); // forEach matching Item Macro
                            };
                        };

                        // on use macros
                        if (item_option.item_on_use_macro_checked) {

                            if (item.data.flags['midi-qol'] &&
                                item.data.flags['midi-qol'].onUseMacroParts &&
                                (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

                                // *** SEARCH on use macros.
                                item_option.searchOnUseMacros(item);

                                // iterate thru matches.
                                item_option.matching_on_use_macros.forEach((macro, k) => {

                                    // only add one actor to list.
                                    if (!actor_added) {
                                        // *** ADD ACTOR ***
                                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                        actor_option.actor_count++;
                                        actor_added = true;
                                    };
                                    // only add one item to list.
                                    if (!item_added) {
                                        if (item_option.item_show_checked) {
                                            // *** ADD ITEM ***
                                            this.addItemSecondary(actor_list, item, item_option.item_show_id_checked);
                                        };
                                        item_added = true;
                                    };
                                    // add on use macro to the list.
                                    if (item_option.item_show_checked) {
                                        // *** ADD ON USE MACRO ***
                                        this.addItemOnUseMacroSecondary(actor_list, macro, item_option.item_show_id_checked);
                                    };
                                }); // forEach matching On Use Macro
                            };
                        };

                        // no macros
                        if (!item_option.item_macro_checked && !item_option.item_on_use_macro_checked) {
                            // only add one actor to list.
                            if (!actor_added) {
                                // *** ADD ACTOR ***
                                this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                actor_option.actor_count++;
                                actor_added = true;
                            };
                            // add item to list.
                            if (item_option.item_show_checked) {
                                // *** ADD ITEM ***
                                this.addItemSecondary(actor_list, item, item_option.item_show_id_checked);
                            };
                        };
                    }); // forEach matching Item

                    // reset matching arrays.
                    item_option.matching_items = [ ];
                    item_option.matching_macros = [ ];
                    item_option.matching_on_use_macros = [ ];
                    break;
                case "actors_in_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journal_count = 0;

                    // *** SEARCH journals.
                    if (journal_option.journal_radio_name_checked)
                        journal_option.searchJournals(game.journal, actor.name);
                    else
                        journal_option.searchJournals(game.journal, actor.id);

                    // actors not in journals.
                    if ((journal_option.matching_journals.length == 0) && journal_option.journal_none_checked) {
                        // *** ADD ACTOR ***
                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                        actor_option.actor_count++;
                        return;
                    };

                    // iterate thru matches.
                    journal_option.matching_journals.forEach((journal, j) => {

                        if (!journal_option.journal_none_checked) {
                            // only add one actor to list.
                            if (!actor_added) {
                                // *** ADD ACTOR ***
                                this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                actor_option.actor_count++;
                                actor_added = true;
                            };
                            // add journal to list.
                            if (journal_option.journal_show_checked) {
                                // *** ADD JOURNAL ***
                                this.addJournalSecondary(actor_list, journal, journal_option.journal_show_id_checked);
                            };
                        };
                    }); // forEach matching Journal

                    // reset matching array.
                    journal_option.matching_journals = [ ];
                    break;
                case "actors_in_scenes_as_tokens":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.scene_count = 0;
                    scene_option.scene_token_count = 0;

                    // *** SEARCH scenes.
                    scene_option.searchScenes(game.scenes);

                    // actors without scenes.
                    if ((scene_option.matching_scenes.length == 0) && scene_option.scene_none_checked) {
                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                        actor_option.actor_count++;
                        return;
                    };

                    // iterate thru matches.
                    scene_option.matching_scenes.forEach((scene, j) => {

                        // *** SEARCH tokens.
                        if (scene_option.scene_radio_name_checked)
                            scene_option.searchSceneTokens(scene, actor.name);
                        else
                            scene_option.searchSceneTokens(scene, actor.id);

                        // iterate thru matches.
                        scene_option.matching_scene_tokens.forEach((token, j) => {
                            if (!scene_option.scene_none_checked) {
                                // only add one actor to list.
                                if (!actor_added) {
                                    // *** ADD ACTOR ***
                                    this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                    actor_option.actor_count++;
                                    actor_added = true;
                                };
                                // add scene to list.
                                if (scene_option.scene_show_checked) {
                                    // *** ADD JOURNAL ***
                                    this.addJournalSecondary(actor_list, scene, scene_option.scene_show_id_checked);
                                };
                            };
                        }); // forEach matching Token
                    }); // forEach matching Scene

                    // reset matching arrays.
                    scene_option.matching_scenes = [ ];
                    scene_option.matching_scene_tokens = [ ];
                    break;
                case "actors_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.table_count = 0;

                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(actor_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };

                    // reset matching arrays.
                    table_option.matching_tables = [ ];
                    break;
            };
        }); // forEach matching Actor.

        // reset matching array.
        actor_option.matching_actors = [ ];
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // set data from form.
        this.setData(expandObject(formData));

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-actors-submit");
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
