/***
*
* module/analytics-actors.js
*
* version 0.0.12
*
*/

import * as ANALYTICS 	     from "./analytics-const.js";
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

	// defaults.
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

	// initialize.
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

	// tab change.
    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-actors-in-compendiums":
                output_list = this.actor_lists["actors_in_compendiums"];
                retval = !this.compendium_options["actors_in_compendiums"].compendiumSubmitted;
                break;
            case "analytics-actors-with-items":
                output_list = this.actor_lists["actors_with_items"];
                retval = !this.item_options["actors_with_items"].itemSubmitted;
                break;
            case "analytics-actors-in-journals":
                output_list = this.actor_lists["actors_in_journals"];
                retval = !this.journal_options["actors_in_journals"].journalSubmitted;
                break;
            case "analytics-actors-in-scenes-as-tokens":
                output_list = this.actor_lists["actors_in_scenes_as_tokens"];
                retval = !this.scene_options["actors_in_scenes_as_tokens"].sceneSubmitted;
                break;
            case "analytics-actors-in-tables":
                output_list = this.actor_lists["actors_in_tables"];
                retval = !this.table_options["actors_in_tables"].tableSubmitted;
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

	// submit.
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
                if (!compendium_option.compendiumSubmitted) compendium_option.compendiumSubmitted = true;
                break;
            case "actors_with_items":
                var item_option = this.item_options[primary];
                if (!item_option.itemSubmitted) item_option.itemSubmitted = true;
                break;
            case "actors_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journalSubmitted) journal_option.journalSubmitted = true;
                break;
            case "actors_in_scenes_as_tokens":
                var scene_option = this.scene_options[primary];
                if (!scene_option.sceneSubmitted) scene_option.sceneSubmitted = true;
                break;
            case "actors_in_tables":
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

    // create actor list.
    buildList() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors buildList()");

        // active tab.
        var primary       = this.sortOptions().primary;
        var secondary     = this.sortOptions().secondary;
        var actor_option  = this.actor_options[primary];
        var actor_list    = this.actor_lists[primary];
        var message_added = false;

        // reset counters and lists.
        actor_list.splice(0, actor_list.length);
		actor_option.actorCount = 0;

        // *** SEARCH actors.
        var matching_actors = actor_option.searchActors(game.actors);

        // iterate thru matching actors.
        matching_actors.forEach((actor, i) => {

            var actor_name  = actor.data.name;
            var actor_added = false;
            var item_added  = false;

            // each tab.
            switch (secondary) {
                case "actors_in_compendiums":
                    // reset counters.
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.compendiumCount = 0;

                    // *** SEARCH compendiums.
                    var matching_compendiums = compendium_option.searchCompendiums(game.packs, "Actor");

					var compendium_last = "";

                    // iterate thru matches.
                    matching_compendiums.forEach((compendium, j) => {

						// *** SEARCH compendium.
						var matching_actors = compendium_option.searchCompendium(compendium, actor, actor_option.actorNameRadio);

						// iterate thru matches.
						matching_actors.forEach((match, k) => {
							
							if (!compendium_option.compendiumNone) {
								// only add one actor to list.
								if (!actor_added) {
									// *** ADD ACTOR ***
									this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
									actor_option.actorCount++;
									actor_added = true;
								};
								// only add one compendium to list.
								if (compendium_last != compendium.metadata.label) {
									// add compendium to list.
									if (compendium_option.compendiumShow) {
										// *** ADD COMPENDIUM ***
										this.addCompendiumSecondary(actor_list, compendium, compendium_option.compendiumShowID);
									};
									compendium_last = compendium.metadata.label;
								};
							} 
							else {
								actor_added = true;								
							};
						}); // forEach matching Actor
                    }); // forEach matching Compendium

					// actors not in compendiums.
					if (!actor_added && compendium_option.compendiumNone) {
						// *** ADD ACTOR ***
						this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
						actor_option.actorCount++;
						actor_added = true;
					};
                    break;

                case "actors_with_items":
                    // reset counters.
                    var item_option = this.item_options[secondary];
                    item_option.itemCount = 0;
                    item_option.itemMacroCount = 0;
                    item_option.itemOnUseMacroCount = 0;

                    // actors without items.
                    if (actor.items.size == 0) {
                        // when NOT looking for macros - add actor to list if no item filters or looking for actors without items.
                        if (!item_option.itemOnUseMacro &&
                            !item_option.itemMacro &&
                            (item_option.itemNone || item_option.noItemTypesSelected())) {
                            // *** ADD ACTOR ***
                            this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
							actor_option.actorCount++;
                            return;
                        };
                    };

                    // *** SEARCH items.
                    var matching_items = item_option.searchItems(actor.items);

                    // iterate thru matches.
                    matching_items.forEach((item, j) => {

						// item macros
                        if (item_option.itemMacro) {

                            if (item.data.flags['itemacro'] && item.data.flags['itemacro'].macro.data.command) {

								var item_added = false;
								
                                // *** SEARCH item macros.
                                var matching_macros = item_option.searchItemMacros(item);

                                // iterate thru matches.
                                matching_macros.forEach((macro, k) => {

                                    // only add one actor to list.
                                    if (!actor_added) {
                                        // *** ADD ACTOR ***
                                        this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
										actor_option.actorCount++;
                                        actor_added = true;
                                    };
                                    // only add one item to list.
                                    if (!item_added) {
                                        if (item_option.itemShow) {
                                            // *** ADD ITEM ***
                                            this.addItemSecondary(actor_list, item, item_option.itemShowID);
                                        };
                                        item_added = true;
                                    };
                                    // add item macro to the list.
                                    if (item_option.itemShow) {
                                        // *** ADD ITEM MACRO ***
                                        this.addItemMacroSecondary(actor_list, macro, item_option.itemShowID);
                                    };
                                }); // forEach matching Item Macro
                            };
                        };

                        // on use macros
                        if (item_option.itemOnUseMacro) {

                            if (item.data.flags['midi-qol'] &&
                                item.data.flags['midi-qol'].onUseMacroParts &&
                                (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

								var item_added = false;
								
                                // *** SEARCH on use macros.
                                var matching_on_use_macros = item_option.searchOnUseMacros(item);

                                // iterate thru matches.
                                matching_on_use_macros.forEach((macro, k) => {

                                    // only add one actor to list.
                                    if (!actor_added) {
                                        // *** ADD ACTOR ***
                                        this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
										actor_option.actorCount++;
                                        actor_added = true;
                                    };
                                    // only add one item to list.
                                    if (!item_added) {
                                        if (item_option.itemShow) {
                                            // *** ADD ITEM ***
                                            this.addItemSecondary(actor_list, item, item_option.itemShowID);
                                        };
                                        item_added = true;
                                    };
                                    // add on use macro to the list.
                                    if (item_option.itemShow) {
                                        // *** ADD ON USE MACRO ***
                                        this.addItemOnUseMacroSecondary(actor_list, macro, item_option.itemShowID);
                                    };
                                }); // forEach matching On Use Macro
                            };
                        };

                        // no macros
                        if (!item_option.itemMacro && !item_option.itemOnUseMacro) {
                            // only add one actor to list.
                            if (!actor_added) {
                                // *** ADD ACTOR ***
                                this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
								actor_option.actorCount++;
                                actor_added = true;
                            };
                            // add item to list.
                            if (item_option.itemShow) {
                                // *** ADD ITEM ***
                                this.addItemSecondary(actor_list, item, item_option.itemShowID);
                            };
                        };
                    }); // forEach matching Item

                    break;
                case "actors_in_journals":
                    // reset counters.
                    var journal_option = this.journal_options[secondary];
                    journal_option.journalCount = 0;

                    // *** SEARCH journals.
                    var matching_journals;
					if (journal_option.journalNameRadio)
                        matching_journals = journal_option.searchJournals(game.journal, actor.name);
                    else
                        matching_journals = journal_option.searchJournals(game.journal, actor.id);

                    // actors not in journals.
                    if ((matching_journals.length == 0) && journal_option.journalNone) {
                        // *** ADD ACTOR ***
                        this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
						actor_option.actorCount++;
                        return;
                    };

                    // iterate thru matches.
                    matching_journals.forEach((journal, j) => {

                        if (!journal_option.journalNone) {
                            // only add one actor to list.
                            if (!actor_added) {
                                // *** ADD ACTOR ***
                                this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
								actor_option.actorCount++;
                                actor_added = true;
                            };
                            // add journal to list.
                            if (journal_option.journalShow) {
                                // *** ADD JOURNAL ***
                                this.addJournalSecondary(actor_list, journal, journal_option.journalShowID);
                            };
                        };
                    }); // forEach matching Journal

                    break;
                case "actors_in_scenes_as_tokens":
                    // reset counters.
                    var scene_option = this.scene_options[secondary];
                    scene_option.sceneCount = 0;
                    scene_option.sceneTokenCount = 0;

                    // *** SEARCH scenes.
                    var matching_scenes = scene_option.searchScenes(game.scenes);

                    // actors without scenes.
                    if ((matching_scenes.length == 0) && scene_option.sceneNone) {
                        this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
						actor_option.actorCount++;
                        return;
                    };

                    // iterate thru matches.
                    matching_scenes.forEach((scene, j) => {

                        // *** SEARCH tokens.
						var matching_scene_tokens;
                        if (scene_option.sceneNameRadio)
                            matching_scene_tokens = scene_option.searchSceneTokens(scene, actor.name);
                        else
                            matching_scene_tokens = scene_option.searchSceneTokens(scene, actor.id);

                        // iterate thru matches.
                        matching_scene_tokens.forEach((token, j) => {
                            if (!scene_option.sceneNone) {
                                // only add one actor to list.
                                if (!actor_added) {
                                    // *** ADD ACTOR ***
                                    this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
									actor_option.actorCount++;
                                    actor_added = true;
                                };
                                // add scene to list.
                                if (scene_option.sceneShow) {
                                    // *** ADD JOURNAL ***
                                    this.addJournalSecondary(actor_list, scene, scene_option.sceneShowID);
                                };
                            };
                        }); // forEach matching Token
                    }); // forEach matching Scene

                    break;
                case "actors_in_tables":
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;
/*
                    // only add one message to list.
                    if (!message_added) {
                        // *** ADD MESSAGE ***
                        this.addMessage(actor_list, i18n("ANALYTICS.Phase3"));
                        message_added = true;
                    };
*/
                    // reset counters.
                    var table_option = this.table_options[secondary];
                    table_option.tableCount = 0;

                    // *** SEARCH tables.
                    var matching_tables;
					if (table_option.tableNameRadio)
                        matching_tables = table_option.searchTables(game.tables, actor.name);
                    else
                        matching_tables = table_option.searchTables(game.tables, actor.id);

					var table_last = "";

                    // iterate thru matches.
                    matching_tables.forEach((table, j) => {

						// *** SEARCH table.
						var matching_actors = table_option.search(table, actor, actor_option.actorNameRadio);

						// iterate thru matches.
						matching_actors.forEach((match, k) => {
							
							if (!table_option.tableNone) {
								// only add one actor to list.
								if (!actor_added) {
									// *** ADD ACTOR ***
									this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
									actor_option.actorCount++;
									actor_added = true;
								};
								// only add one table to list.
								if (table_last != table.metadata.label) {
									// add table to list.
									if (table_option.tableShow) {
										// *** ADD TABLE ***
										this.addTableSecondary(actor_list, table, table_option.tableShowID);
									};
									table_last = table.metadata.label;
								};
							} 
							else {
								actor_added = true;								
							};
						}); // forEach matching Actor
                    }); // forEach matching Table

					// actors not in tables.
					if (!actor_added && table_option.tableNone) {
						// *** ADD ACTOR ***
						this.addActorPrimary(actor_list, actor, actor_option.actorShowID);
						actor_option.actorCount++;
						actor_added = true;
					};

                    break;
            };
        }); // forEach matching Actor.
    }

	// update and render.
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
