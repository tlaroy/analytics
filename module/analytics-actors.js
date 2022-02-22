/***
*
* module/analytics-actors.js
*
* version 0.0.10
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
    buildList(actor) {

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var actor_option = this.actor_options[primary];
        var actor_list   = this.actor_lists[primary];
        var actor_name   = actor.data.name;

        // each tab.
        switch (secondary) {
            case "actors_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "actors_with_items":
                // reset counters.
                var item_option = this.item_options[secondary];
                item_option.item_count = 0;
                item_option.item_on_use_macro_count = 0;

                // actors without items.
                if (actor.items.size == 0) {
                    // when looking for on use macros add actor to list if no item filters or looking for actors without items.
                    if (!item_option.item_on_use_macro_checked && (item_option.item_none_checked || item_option.noItemTypesSelected())) {
                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                        actor_option.actor_count++;
                    };
                };

                // return if only looking for actors without items.
                if (item_option.item_none_checked) {
                    return;
                };

                // spin through actor's item list ...
                actor.items.contents.forEach((item, j) => {
                    if (actor.items.contents[j]) {

                        var item_match  = false;
                        var item_name   = item.data.name;
                        var search_name = this.escapeRegExp(item_option.item_name_value);

                        // lowercase for non-case-sensitive search.
                        if ((search_name.length > 0) && !item_option.item_case_sensitive_checked) {
                            search_name = search_name.toLowerCase();
                            item_name   = item_name.toLowerCase();
                        };

                        // do items match?
                        if ((!item_option.item_exact_match_checked && (item_name.search(search_name) > -1)) ||
                             (item_option.item_exact_match_checked && (item_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(item_name).length)) ||
                             (search_name.length == 0)) {
                            item_match = true;
                        };

                        // item matches.
                        if (item_match) {
                            var selected = false;

                            if      (item_option.noItemTypesSelected()) selected = true;
                            else if (item_option.item_weapon_checked     && item.type == 'weapon')     selected = true;
                            else if (item_option.item_equipment_checked  && item.type == 'equipment')  selected = true;
                            else if (item_option.item_consumable_checked && item.type == 'consumable') selected = true;
                            else if (item_option.item_tool_checked       && item.type == 'tool')       selected = true;
                            else if (item_option.item_loot_checked       && item.type == 'loot')       selected = true;
                            else if (item_option.item_class_checked      && item.type == 'class')      selected = true;
                            else if (item_option.item_feat_checked       && item.type == 'feat')       selected = true;
                            else if (item_option.item_backpack_checked   && item.type == 'backpack')   selected = true;
                            else if (item_option.item_spell_checked      && item.type == 'spell')      selected = true;

                            if (selected) {
                                item_option.item_on_use_macro_count = 0;

                                // any on use macros?
                                if (item_option.item_on_use_macro_checked &&
                                    item.data.flags['midi-qol'] &&
                                    item.data.flags['midi-qol'].onUseMacroParts &&
                                    (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

                                    // spin through item's on use macro list ...
                                    item.data.flags['midi-qol'].onUseMacroParts.items.forEach((macro, k) => {

                                        var macro_match = false;
                                        var macro_name  = item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName;
                                        var search_name = this.escapeRegExp(item_option.item_on_use_macro_name_value);

                                        // lowercase for non-case-sensitive search.
                                        if ((search_name.length > 0) && !item_option.item_on_use_macro_case_sensitive_checked) {
                                            search_name = search_name.toLowerCase();
                                            macro_name  = macro_name.toLowerCase();
                                        };

                                        // do macros match?
                                        if ((!item_option.item_on_use_macro_exact_match_checked && (macro_name.search(search_name) > -1)) ||
                                             (item_option.item_on_use_macro_exact_match_checked && (macro_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(macro_name).length)) ||
                                             (search_name.length == 0)) {
                                            macro_match = true;
                                        };

                                        // macro matches.
                                        if (macro_match) {
                                            // only add one actor to list.
                                            if (item_option.item_count == 0) {
                                                // add actor to the list.
                                                this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                                actor_option.actor_count++;
                                            };
                                            // only add one item to list.
                                            if (item_option.item_on_use_macro_count == 0) {
                                                // add item to the list.
                                                if (item_option.item_show_checked) {
                                                    this.addItemSecondary(actor_list, item, item_option.item_show_id_checked);
                                                };
                                                // increase item count.
                                                item_option.item_count++;
                                            };
                                            // add on use macro to the list.
                                            if (item_option.item_show_checked) {
                                                this.addItemMacroSecondary(actor_list, macro, item_option.item_show_id_checked);
                                            };
                                            // increase on use macro count.
                                            item_option.item_on_use_macro_count++;
                                        }
                                    }); // forEach On Use Macro.
                                }

                                // no on use macros.
                                else if (!item_option.item_on_use_macro_checked) {
                                    // only add one actor to list.
                                    if (item_option.item_count == 0) {
                                        // add actor to the list.
                                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                        actor_option.actor_count++;
                                    };
                                    // only add one item to list.
                                    if (item_option.item_on_use_macro_count == 0) {
                                        // add item to the list.
                                        if (item_option.item_show_checked) {
                                            this.addItemSecondary(actor_list, item, item_option.item_show_id_checked);
                                        };
                                        // increase item count.
                                        item_option.item_count++;
                                    };
                                };
                            };
                        };
                    };
                }); // forEach Item.
                break;
            case "actors_in_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;

                // spin through journal list ...
                game.journal.contents.forEach((journal, j) => {
                    if (game.journal.contents[j]) {

                        var journal_match = false;
                        var journal_name  = journal.data.name;
                        var search_name   = this.escapeRegExp(journal_option.journal_name_value);

                        // lowercase for non-case-sensitive search.
                        if ((search_name.length > 0) && !journal_option.journal_case_sensitive_checked) {
                            search_name  = search_name.toLowerCase();
                            journal_name = journal_name.toLowerCase();
                        };

                        // do journals match?
                        if ((!journal_option.journal_exact_match_checked && (journal_name.search(search_name) > -1)) ||
                             (journal_option.journal_exact_match_checked && (journal_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(journal_name).length)) ||
                             (search_name.length == 0)) {
                            journal_match = true;
                        };

                        // journal matches.
                        if (journal_match) {
                            var selected = false;
                            if      (journal_option.noJournalTypesSelected() || !journal.data.flags['monks-enhanced-journal']) selected = true;
                            else if (journal_option.journal_base_checked         && journal.data.flags['monks-enhanced-journal'].type == 'base')         selected = true;
                            else if (journal_option.journal_checklist_checked    && journal.data.flags['monks-enhanced-journal'].type == 'checklist')    selected = true;
                            else if (journal_option.journal_encounter_checked    && journal.data.flags['monks-enhanced-journal'].type == 'encounter')    selected = true;
                            else if (journal_option.journal_loot_checked         && journal.data.flags['monks-enhanced-journal'].type == 'loot')         selected = true;
                            else if (journal_option.journal_organization_checked && journal.data.flags['monks-enhanced-journal'].type == 'organization') selected = true;
                            else if (journal_option.journal_person_checked       && journal.data.flags['monks-enhanced-journal'].type == 'person')       selected = true;
                            else if (journal_option.journal_place_checked        && journal.data.flags['monks-enhanced-journal'].type == 'place')        selected = true;
                            else if (journal_option.journal_poi_checked          && journal.data.flags['monks-enhanced-journal'].type == 'poi')          selected = true;
                            else if (journal_option.journal_quest_checked        && journal.data.flags['monks-enhanced-journal'].type == 'quest')        selected = true;
                            else if (journal_option.journal_shop_checked         && journal.data.flags['monks-enhanced-journal'].type == 'shop')         selected = true;

                            if (selected) {

                                // actor links?
                                if (journal.data.content.search(new RegExp(`@Actor\\[.{16}\\]\\{` + this.escapeRegExp(actor_name) + `\\}`)) > -1) {

                                    if (journal_option.journal_none_checked) {
                                        journal_option.journal_count++;
                                    }
                                    else {
                                        // only add one actor to list.
                                        if (journal_option.journal_count == 0) {
                                            this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                            actor_option.actor_count++;
                                        };
                                        // only add one journal to list.
                                        if (journal_option.journal_show_checked) {
                                            this.addJournalSecondary(actor_list, journal, journal_option.journal_show_id_checked);
                                        };
                                        // increase journal count.
                                        journal_option.journal_count++;
                                    };
                                };
                            };
                        };
                    };
                }); // forEach Journal

                // actors without journals.
                if (journal_option.journal_count == 0) {
                    // looking for actors without journals.
                    if (journal_option.journal_none_checked) {
                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                        actor_option.actor_count++;
                    };
                };
                break;
            case "actors_in_scenes_as_tokens":
                // reset counters.
                var scene_option = this.scene_options[secondary];
                scene_option.scene_count = 0;

                // spin through scenes list ...
                game.scenes.contents.forEach((scene, j) => {
                    if (game.scenes.contents[j]) {

                        var scene_match = false;
                        var scene_name  = scene.data.name;
                        var search_name = this.escapeRegExp(scene_option.scene_name_value);

                        // lowercase for non-case-sensitive search.
                        if ((search_name.length > 0) && !scene_option.scene_case_sensitive_checked) {
                            search_name = search_name.toLowerCase();
                            scene_name  = scene_name.toLowerCase();
                        };

                        // do scenes match?
                        if ((!scene_option.scene_exact_match_checked && (scene_name.search(search_name) > -1)) ||
                             (scene_option.scene_exact_match_checked && (scene_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(scene_name).length)) ||
                             (search_name.length == 0)) {
                            scene_match = true;
                        };

                        // scene matches.
                        if (scene_match) {

                            // spin through tokens ...
                            scene.tokens.contents.forEach((token, k) => {
                                if (scene.tokens.contents[k]) {

                                    // token without a "represented actor" match token name else match actor name.
                                    var token_name = "";
                                    token.actor ? token_name = this.escapeRegExp(token.actor.name) : token_name = this.escapeRegExp(token.name);

                                    // do tokens match?
                                    if (token.actor && (actor_name.search(token_name) > -1) && (token_name.length == this.escapeRegExp(actor_name).length)) {

                                        if (scene_option.scene_none_checked) {
                                            scene_option.scene_count++;
                                        }
                                        else {
                                            // only add one actor to list.
                                            if (scene_option.scene_count == 0) {
                                                this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                                                actor_option.actor_count++;
                                            };
                                            // only add one scene to list.
                                            if (scene_option.scene_show_checked) {
                                                this.addSceneSecondary(actor_list, scene, scene_option.scene_show_id_checked);
                                            };
                                            // increase scene count.
                                            scene_option.scene_count++;
                                        };
                                    };
                                };
                            });  // forEach Token
                        };
                    };
                }); // forEach Scene

                // actors without scenes.
                if (scene_option.scene_count == 0) {
                    // looking for actors without scenes.
                    if (scene_option.scene_none_checked) {
                        this.addActorPrimary(actor_list, actor, actor_option.actor_show_id_checked);
                        actor_option.actor_count++;
                    };
                };
                break;
            case "actors_in_tables":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary      = this.sortOptions().primary;
        var secondary    = this.sortOptions().secondary;
        var actor_option = this.actor_options[primary];
        var actor_list   = this.actor_lists[primary];

        // set data from form.
        this.setData(expandObject(formData));

        // reset counters and lists.
        actor_option.actor_count = 0;
        actor_list.splice(0, actor_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "actors_in_compendiums":
                this.addMessage(actor_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "actors_in_tables":
                this.addMessage(actor_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-actors-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through actor list ...
        game.actors.contents.forEach((actor, i) => {
            if (game.actors.contents[i]) {

                var name_match  = false;
                var actor_name  = actor.data.name;
                var search_name = this.escapeRegExp(actor_option.actor_name_value);

                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !actor_option.actor_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };

                // do actors match?
                if ((search_name.length == 0) ||
                    (!actor_option.actor_exact_match_checked && (actor_name.search(search_name) > -1)) ||
                     (actor_option.actor_exact_match_checked && (actor_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(actor_name).length))) {
                    name_match = true;
                };

                // actor matches.
                if (name_match) {
                    var selected = false;
                    if (actor_option.noActorTypesSelected() &&
                        actor_option.noCreatureTypesSelected()) selected = true;
                    else if (actor_option.actor_character_checked        && actor.type == 'character') selected = true;
                    else if (actor_option.actor_vehicle_checked          && actor.type == 'vehicle')   selected = true;
                    else if (actor_option.actor_npc_checked              && actor.type == 'npc') {
                        if (actor_option.noCreatureTypesSelected()) selected = true;
                        else if  (actor_option.actor_aberration_checked  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
                        else if  (actor_option.actor_beast_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'beast')       selected = true;
                        else if  (actor_option.actor_celestial_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
                        else if  (actor_option.actor_construct_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
                        else if  (actor_option.actor_dragon_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon')      selected = true;
                        else if  (actor_option.actor_elemental_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
                        else if  (actor_option.actor_fey_checked         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey')         selected = true;
                        else if  (actor_option.actor_fiend_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend')       selected = true;
                        else if  (actor_option.actor_giant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'giant')       selected = true;
                        else if  (actor_option.actor_humanoid_checked    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
                        else if  (actor_option.actor_monstrosity_checked && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
                        else if  (actor_option.actor_ooze_checked        && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze')        selected = true;
                        else if  (actor_option.actor_plant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'plant')       selected = true;
                        else if  (actor_option.actor_swarm_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm')       selected = true;
                        else if  (actor_option.actor_undead_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead')      selected = true;
                    }

                    // add actor to list.
                    if (selected) {
                        this.buildList(actor);
                    };
                };
            };
        }); // forEach Actor.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
