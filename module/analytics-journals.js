/***
*
* module/analytics-journals.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsJournals extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // journal options for each tab.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "journals_with_actors": {
                journal_count:                  0,
                journal_name_value:             "",
                journal_case_sensitive_checked: false,
                journal_exact_match_checked:    false,

                journal_base_checked:           false,
                journal_checklist_checked:      false,
                journal_encounter_checked:      false,
                journal_loot_checked:           false,
                journal_organization_checked:   false,
                journal_person_checked:         false,
                journal_place_checked:          false,
                journal_poi_checked:            false,
                journal_quest_checked:          false,
                journal_shop_checked:           false,
                },
            "journals_with_cards": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_in_compendiums": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_with_items": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_within_journals": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_with_macros": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_with_playlists": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_with_scenes": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_in_scenes": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_in_scenes_as_pins": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_in_tables": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
            "journals_with_tables": {
                journal_count:                    0,
                journal_name_value:               "",
                journal_case_sensitive_checked:   false,
                journal_exact_match_checked:      false,

                journal_base_checked:             false,
                journal_checklist_checked:        false,
                journal_encounter_checked:        false,
                journal_loot_checked:             false,
                journal_organization_checked:     false,
                journal_person_checked:           false,
                journal_place_checked:            false,
                journal_poi_checked:              false,
                journal_quest_checked:            false,
                journal_shop_checked:             false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (3) with actors options.
        this.parent.actor_options = Object.assign(this.parent.actor_options, {
            "journals_with_actors": {
                actor_npc_checked:                false,
                actor_character_checked:          false,
                actor_vehicle_checked:            false,

                actor_aberration_checked:         false,
                actor_beast_checked:              false,
                actor_celestial_checked:          false,
                actor_construct_checked:          false,
                actor_dragon_checked:             false,
                actor_elemental_checked:          false,
                actor_fey_checked:                false,
                actor_fiend_checked:              false,
                actor_giant_checked:              false,
                actor_humanoid_checked:           false,
                actor_monstrosity_checked:        false,
                actor_ooze_checked:               false,
                actor_plant_checked:              false,
                actor_swarm_checked:              false,
                actor_undead_checked:             false,
                }
        });

        // (7) with cards options.
        this.parent.card_options = Object.assign(this.parent.card_options, {
            "journals_with_cards": {
                card_count:                    0,
                card_name_value:               "",
                card_case_sensitive_checked:   false,
                card_exact_match_checked:      false,

                card_none_checked:             false,
                card_show_checked:             false,
                }
        });

        // (10) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "journals_in_compendiums": {
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,

                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (19) with items options.
        this.parent.item_options = Object.assign(this.parent.item_options, {
            "journals_with_items": {
                item_count:                  0,
                item_name_value:             "",
                item_case_sensitive_checked: false,
                item_exact_match_checked:    false,

                item_none_checked:           false,
                item_show_checked:           false,

                item_weapon_checked:         false,
                item_equipment_checked:      false,
                item_consumable_checked:     false,
                item_tool_checked:           false,
                item_loot_checked:           false,
                item_class_checked:          false,
                item_feat_checked:           false,
                item_backpack_checked:       false,
                item_spell_checked:          false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
            }
        });

        // (20-20) within journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "journals_within_journals_20": {
                journal_count:                  0,
                journal_name_value:             "",
                journal_case_sensitive_checked: false,
                journal_exact_match_checked:    false,

                journal_none_checked:           false,
                journal_show_checked:           false,

                journal_base_checked:           false,
                journal_checklist_checked:      false,
                journal_encounter_checked:      false,
                journal_loot_checked:           false,
                journal_organization_checked:   false,
                journal_person_checked:         false,
                journal_place_checked:          false,
                journal_poi_checked:            false,
                journal_quest_checked:          false,
                journal_shop_checked:           false,
                }
        });

        // (21) with macros options.
        this.parent.macro_options = Object.assign(this.parent.macro_options, {
            "journals_with_macros": {
                macro_count:                      0,
                macro_name_value:                 "",
                macro_case_sensitive_checked:     false,
                macro_exact_match_checked:        false,
                }
        });

        // (22) with playlists options.
        this.parent.playlist_options = Object.assign(this.parent.playlist_options, {
            "journals_with_playlists": {
                playlist_count:                  0,
                playlist_name_value:             "",
                playlist_case_sensitive_checked: false,
                playlist_exact_match_checked:    false,

                playlist_none_checked:           false,
                playlist_show_checked:           false,
                }
        });

        // (23) with scenes options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "journals_with_scenes": {
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,

                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        // (24) in scenes options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "journals_in_scenes": {
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,

                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        // (25) in scenes as pins options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "journals_in_scenes_as_pins": {
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,

                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        // (26) in tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "journals_in_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                },
        });

        // (27) with tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "journals_with_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                },
        });

        /* OUTPUT BY TAB */

        // journal lists.
        this.parent.journal_lists = Object.assign(this.parent.journal_lists, {
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
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "journals-with-actors"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "journals-with-actors":
                retval = { primary: "journals_with_actors", secondary: "journals_with_actors" };
                break;
            case "journals-with-cards":
                retval = { primary: "journals_with_cards", secondary: "journals_with_cards" };
                break;
            case "journals-in-compendiums":
                retval = { primary: "journals_in_compendiums", secondary: "journals_in_compendiums" };
                break;
            case "journals-with-items":
                retval = { primary: "journals_with_items", secondary: "journals_with_items" };
                break;
            case "journals-within-journals":
                retval = { primary: "journals_within_journals", secondary: "journals_within_journals_20" };
                break;
            case "journals-with-macros":
                retval = { primary: "journals_with_macros", secondary: "journals_with_macros" };
                break;
            case "journals-with-playlists":
                retval = { primary: "journals_with_playlists", secondary: "journals_with_playlists" };
                break;
            case "journals-with-scenes":
                retval = { primary: "journals_with_scenes", secondary: "journals_with_scenes" };
                break;
            case "journals-in-scenes":
                retval = { primary: "journals_in_scenes", secondary: "journals_in_scenes" };
                break;
            case "journals-in-scenes-as-pins":
                retval = { primary: "journals_in_scenes_as_pins", secondary: "journals_in_scenes_as_pins" };
                break;
            case "journals-in-tables":
                retval = { primary: "journals_in_tables", secondary: "journals_in_tables" };
                break;
            case "journals-with-tables":
                retval = { primary: "journals_with_tables", secondary: "journals_with_tables" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // disable journal subtypes if monk's enhanced journal not installed or not active.
        if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
            document.getElementById("journal-monks-base").style.display         = "none";
            document.getElementById("journal-monks-checklist").style.display    = "none";
            document.getElementById("journal-monks-encounter").style.display    = "none";
            document.getElementById("journal-monks-loot").style.display         = "none";
            document.getElementById("journal-monks-organization").style.display = "none";
            document.getElementById("journal-monks-person").style.display       = "none";
            document.getElementById("journal-monks-place").style.display        = "none";
            document.getElementById("journal-monks-poi").style.display          = "none";
            document.getElementById("journal-monks-quest").style.display        = "none";
            document.getElementById("journal-monks-shop").style.display         = "none";
        }

        switch (option) {
            case "journals_with_actors":
                // enable/disable npc creature types.
                document.getElementById("with-actor-aberration").disabled  = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-beast").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-celestial").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-construct").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-dragon").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-elemental").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-fey").disabled         = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-fiend").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-giant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-humanoid").disabled    = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-monstrosity").disabled = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-ooze").disabled        = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-plant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-swarm").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-undead").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                break;
            case "journals_with_items":
                // disable on use item macros if midi-qol not installed or not active.
                if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
                    document.getElementById("with-item-macro-label").style.display                = "none";
                    document.getElementById("with-item-macro-note").style.display                 = "none";
                    document.getElementById("with-item-macro-name-label").style.display           = "none";
                    document.getElementById("with-item-macro-name-input").style.display           = "none";
                    document.getElementById("with-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("with-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("with-item-macro-thematic-break").style.display       = "none";
                }

                // toggle macro fields.
                document.getElementById("with-item-macro-name").disabled           = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("with-item-macro-case-sensitive").disabled = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("with-item-macro-exact-match").disabled    = !this.parent.item_options[option2].item_macro_checked;
                break;
            case "journals_wtihin_journals":
                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("within-journal-monks-base").style.display         = "none";
                    document.getElementById("within-journal-monks-checklist").style.display    = "none";
                    document.getElementById("within-journal-monks-encounter").style.display    = "none";
                    document.getElementById("within-journal-monks-loot").style.display         = "none";
                    document.getElementById("within-journal-monks-organization").style.display = "none";
                    document.getElementById("within-journal-monks-person").style.display       = "none";
                    document.getElementById("within-journal-monks-place").style.display        = "none";
                    document.getElementById("within-journal-monks-poi").style.display          = "none";
                    document.getElementById("within-journal-monks-quest").style.display        = "none";
                    document.getElementById("within-journal-monks-shop").style.display         = "none";
                }
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.journal_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "journals_with_actors":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-actor-name-value":                 this.parent.actor_options[option2].actor_name_value,
                    "with-actor-case-sensitive-checked":     this.parent.actor_options[option2].actor_case_sensitive_checked  ? "checked" : "",
                    "with-actor-exact-match-checked":        this.parent.actor_options[option2].actor_exact_match_checked     ? "checked" : "",
                    "with-actor-none-checked":               this.parent.actor_options[option2].actor_none_checked            ? "checked" : "",
                    "with-actor-show-checked":               this.parent.actor_options[option2].actor_show_checked            ? "checked" : "",

                    "with-actor-npc-checked":                this.parent.actor_options[option2].actor_npc_checked             ? "checked" : "",
                    "with-actor-character-checked":          this.parent.actor_options[option2].actor_character_checked       ? "checked" : "",
                    "with-actor-vehicle-checked":            this.parent.actor_options[option2].actor_vehicle_checked         ? "checked" : "",

                    "with-actor-aberration-checked":         this.parent.actor_options[option2].actor_aberration_checked      ? "checked" : "",
                    "with-actor-beast-checked":              this.parent.actor_options[option2].actor_beast_checked           ? "checked" : "",
                    "with-actor-celestial-checked":          this.parent.actor_options[option2].actor_celestial_checked       ? "checked" : "",
                    "with-actor-construct-checked":          this.parent.actor_options[option2].actor_construct_checked       ? "checked" : "",
                    "with-actor-dragon-checked":             this.parent.actor_options[option2].actor_dragon_checked          ? "checked" : "",
                    "with-actor-elemental-checked":          this.parent.actor_options[option2].actor_elemental_checked       ? "checked" : "",
                    "with-actor-fey-checked":                this.parent.actor_options[option2].actor_fey_checked             ? "checked" : "",
                    "with-actor-fiend-checked":              this.parent.actor_options[option2].actor_fiend_checked           ? "checked" : "",
                    "with-actor-giant-checked":              this.parent.actor_options[option2].actor_giant_checked           ? "checked" : "",
                    "with-actor-humanoid-checked":           this.parent.actor_options[option2].actor_humanoid_checked        ? "checked" : "",
                    "with-actor-monstrosity-checked":        this.parent.actor_options[option2].actor_monstrosity_checked     ? "checked" : "",
                    "with-actor-ooze-checked":               this.parent.actor_options[option2].actor_ooze_checked            ? "checked" : "",
                    "with-actor-plant-checked":              this.parent.actor_options[option2].actor_plant_checked           ? "checked" : "",
                    "with-actor-swarm-checked":              this.parent.actor_options[option2].actor_swarm_checked           ? "checked" : "",
                    "with-actor-undead-checked":             this.parent.actor_options[option2].actor_undead_checked          ? "checked" : "",
                };
                break;
            case "journals_with_cards":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-card-name-value":                   this.parent.card_options[option2].card_name_value,
                    "with-card-case-sensitive-checked":       this.parent.card_options[option2].card_case_sensitive_checked  ? "checked" : "",
                    "with-card-exact-match-checked":          this.parent.card_options[option2].card_exact_match_checked     ? "checked" : "",
                    "with-card-none-checked":                 this.parent.card_options[option2].card_none_checked            ? "checked" : "",
                    "with-card-show-checked":                 this.parent.card_options[option2].card_show_checked            ? "checked" : "",
                };
                break;
            case "journals_in_compendiums":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "journals_with_items":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-item-name-value":                   this.parent.item_options[option2].item_name_value,
                    "with-item-case-sensitive-checked":       this.parent.item_options[option2].item_case_sensitive_checked    ? "checked" : "",
                    "with-item-exact-match-checked":          this.parent.item_options[option2].item_exact_match_checked       ? "checked" : "",
                    "with-item-none-checked":                 this.parent.item_options[option2].item_none_checked              ? "checked" : "",
                    "with-item-show-checked":                 this.parent.item_options[option2].item_show_checked              ? "checked" : "",

                    "with-item-weapon-checked":               this.parent.item_options[option2].item_weapon_checked            ? "checked" : "",
                    "with-item-equipment-checked":            this.parent.item_options[option2].item_equipment_checked         ? "checked" : "",
                    "with-item-consumable-checked":           this.parent.item_options[option2].item_consumable_checked        ? "checked" : "",
                    "with-item-tool-checked":                 this.parent.item_options[option2].item_tool_checked              ? "checked" : "",
                    "with-item-loot-checked":                 this.parent.item_options[option2].item_loot_checked              ? "checked" : "",
                    "with-item-class-checked":                this.parent.item_options[option2].item_class_checked             ? "checked" : "",
                    "with-item-feat-checked":                 this.parent.item_options[option2].item_feat_checked              ? "checked" : "",
                    "with-item-backpack-checked":             this.parent.item_options[option2].item_backpack_checked          ? "checked" : "",
                    "with-item-spell-checked":                this.parent.item_options[option2].item_spell_checked             ? "checked" : "",

                    "with-item-macro-checked":                  this.parent.item_options[option2].item_macro_checked                 ? "checked" : "",
                    "with-item-macro-name-value":               this.parent.item_options[option2].item_macro_name_value,
                    "with-item-macro-case-sensitive-checked":   this.parent.item_options[option2].item_macro_case_sensitive_checked  ? "checked" : "",
                    "with-item-macro-exact-match-checked":      this.parent.item_options[option2].item_macro_exact_match_checked     ? "checked" : "",
                };
                break;
            case "journals_within_journals":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "within-journal-name-value":             this.parent.journal_options[option2].journal_name_value,
                    "within-journal-case-sensitive-checked": this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "within-journal-exact-match-checked":    this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "within-journal-none-checked":           this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "within-journal-show-checked":           this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "within-journal-base-checked":           this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "within-journal-checklist-checked":      this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "within-journal-encounter-checked":      this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "within-journal-loot-checked":           this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "within-journal-organization-checked":   this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "within-journal-person-checked":         this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "within-journal-place-checked":          this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "within-journal-poi-checked":            this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "within-journal-quest-checked":          this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "within-journal-shop-checked":           this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "journals_with_macros":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-macros-name-value":                 this.parent.macro_options[option2].macro_name_value,
                    "with-macros-case-sensitive-checked":     this.parent.macro_options[option2].macro_case_sensitive_checked ? "checked" : "",
                    "with-macros-exact-match-checked":        this.parent.macro_options[option2].macro_exact_match_checked    ? "checked" : "",
                    "with-macros-none-checked":               this.parent.macro_options[option2].macro_none_checked           ? "checked" : "",
                    "with-macros-show-checked":               this.parent.macro_options[option2].macro_show_checked           ? "checked" : "",
                };
                break;
            case "journals_with_playlists":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-playlists-name-value":              this.parent.playlist_options[option2].playlists_name_value,
                    "with-playlists-case-sensitive-checked":  this.parent.playlist_options[option2].playlists_case_sensitive_checked ? "checked" : "",
                    "with-playlists-exact-match-checked":     this.parent.playlist_options[option2].playlists_exact_match_checked    ? "checked" : "",
                    "with-playlists-none-checked":            this.parent.playlist_options[option2].playlists_none_checked           ? "checked" : "",
                    "with-playlists-show-checked":            this.parent.playlist_options[option2].playlists_show_checked           ? "checked" : "",
                };
                break;
            case "journals_with_scenes":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-scene-name-value":                  this.parent.scene_options[option2].scene_name_value,
                    "with-scene-case-sensitive-checked":      this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "with-scene-exact-match-checked":         this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "with-scene-none-checked":                this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "with-scene-show-checked":                this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
            case "journals_in_scenes":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "in-scene-name-value":                  this.parent.scene_options[option2].scene_name_value,
                    "in-scene-case-sensitive-checked":      this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "in-scene-exact-match-checked":         this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "in-scene-none-checked":                this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "in-scene-show-checked":                this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
            case "journals_in_scenes_as_pins":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "in-scene-as-pin-scene-name-value":                  this.parent.scene_options[option2].scene_name_value,
                    "in-scene-as-pin-scene-case-sensitive-checked":      this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "in-scene-as-pin-scene-exact-match-checked":         this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "in-scene-as-pin-scene-none-checked":                this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "in-scene-as-pin-scene-show-checked":                this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
            case "journals_in_tables":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "in-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "in-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked    ? "checked" : "",
                    "in-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked       ? "checked" : "",
                    "in-table-none-checked":                this.parent.table_options[option2].table_none_checked              ? "checked" : "",
                    "in-table-show-checked":                this.parent.table_options[option2].table_show_checked              ? "checked" : "",
                };
                break;
            case "journals_with_tables":
                retval = {
                    "number-of-journals":             game.journal.size,

                    "journal-count":                  this.parent.journal_options[option].journal_count,
                    "journal-name-value":             this.parent.journal_options[option].journal_name_value,
                    "journal-case-sensitive-checked": this.parent.journal_options[option].journal_case_sensitive_checked  ? "checked" : "",
                    "journal-exact-match-checked":    this.parent.journal_options[option].journal_exact_match_checked     ? "checked" : "",

                    "journal-base-checked":           this.parent.journal_options[option].journal_base_checked           ? "checked" : "",
                    "journal-checklist-checked":      this.parent.journal_options[option].journal_checklist_checked      ? "checked" : "",
                    "journal-encounter-checked":      this.parent.journal_options[option].journal_encounter_checked      ? "checked" : "",
                    "journal-loot-checked":           this.parent.journal_options[option].journal_loot_checked           ? "checked" : "",
                    "journal-organization-checked":   this.parent.journal_options[option].journal_organization_checked   ? "checked" : "",
                    "journal-person-checked":         this.parent.journal_options[option].journal_person_checked         ? "checked" : "",
                    "journal-place-checked":          this.parent.journal_options[option].journal_place_checked          ? "checked" : "",
                    "journal-poi-checked":            this.parent.journal_options[option].journal_poi_checked            ? "checked" : "",
                    "journal-quest-checked":          this.parent.journal_options[option].journal_quest_checked          ? "checked" : "",
                    "journal-shop-checked":           this.parent.journal_options[option].journal_shop_checked           ? "checked" : "",

                    "with-table-name-value":                  this.parent.table_options[option].table_name_value,
                    "with-table-case-sensitive-checked":      this.parent.table_options[option].table_case_sensitive_checked    ? "checked" : "",
                    "with-table-exact-match-checked":         this.parent.table_options[option].table_exact_match_checked       ? "checked" : "",
                    "with-table-none-checked":                this.parent.table_options[option].table_none_checked              ? "checked" : "",
                    "with-table-show-checked":                this.parent.table_options[option].table_show_checked              ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "journals-with-actors":
                option = "journals_with_actors";
                retval = !this.parent.actor_options["journals_with_actors"].actor_submitted;
                break;
            case "journals-with-cards":
                option = "journals_with_cards";
                retval = !this.parent.card_options["journals_with_cards"].card_submitted;
                break;
            case "journals-in-compendiums":
                option = "journals_in_compendiums";
                retval = !this.parent.compendium_options["journals_in_compendiums"].compendium_submitted;
                break;
            case "journals-with-items":
                option = "journals_with_items";
                retval = !this.parent.item_options["journals_with_items"].item_submitted;
                break;
            case "journals-within-journals":
                option = "journals_within_journals";
                retval = !this.parent.journal_options["journals_within_journals"].journal_submitted;
                break;
            case "journals-with-macros":
                option = "journals_with_macros";
                retval = !this.parent.macro_options["journals_with_macros"].macro_submitted;
                break;
            case "journals-with-playlists":
                option = "journals_with_playlists";
                retval = !this.parent.playlist_options["journals_with_playlists"].playlist_submitted;
                break;
            case "journals-with-scenes":
                option = "journals_wtih_scenes";
                retval = !this.parent.scene_options["journals_with_scenes"].scene_submitted;
                break;
            case "journals-in-scenes":
                option = "journals_in_scenes";
                retval = !this.parent.scene_options["journals_in_scenes"].scene_submitted;
                break;
            case "journals-in-scenes-as-pins":
                option = "journals_in_scenes_as_pins";
                retval = !this.parent.scene_options["journals_in_scenes_as_pins"].scene_submitted;
                break;
            case "journals-in-tables":
                option = "journals_in_tables";
                retval = !this.parent.table_options["journals_in_tables"].table_submitted;
                break;
            case "journals-with-tables":
                option = "journals_wtih_tables";
                retval = !this.parent.table_options["journals_with_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.journal_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
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

        // set update flag when changing tabs if tab never submitted.
        switch (this.optionKeys().primary) {
            case "journals_with_actors":
                if (!this.parent.actor_options["journals_with_actors"].actor_submitted)
                     this.parent.actor_options["journals_with_actors"].actor_submitted = true;
                break;
            case "journals_with_cards":
                if (!this.parent.card_options["journals_with_cards"].card_submitted)
                     this.parent.card_options["journals_with_cards"].card_submitted = true;
                break;
            case "journals_in_compendiums":
                if (!this.parent.compendium_options["journals_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["journals_in_compendiums"].compendium_submitted = true;
                break;
            case "journals_with_items":
                if (!this.parent.item_options["journals_with_items"].item_submitted)
                     this.parent.item_options["journals_with_items"].item_submitted = true;
                break;
            case "journals_within_journals":
                if (!this.parent.journal_options["journals_within_journals"].journal_submitted)
                     this.parent.journal_options["journals_within_journals"].journal_submitted = true;
                break;
            case "journals_with_macros":
                if (!this.parent.macro_options["journals_with_macros"].macro_submitted)
                     this.parent.macro_options["journals_with_macros"].macro_submitted = true;
                break;
            case "journals_with_playlists":
                if (!this.parent.playlist_options["journals_with_playlists"].playlist_submitted)
                     this.parent.playlist_options["journals_with_playlists"].playlist_submitted = true;
                break;
            case "journals_with_scenes":
                if (!this.parent.scene_options["journals_with_scenes"].scene_submitted)
                     this.parent.scene_options["journals_with_scenes"].scene_submitted = true;
                break;
            case "journals_in_scenes":
                if (!this.parent.scene_options["journals_in_scenes"].scene_submitted)
                     this.parent.scene_options["journals_in_scenes"].scene_submitted = true;
                break;
            case "journals_in_scene_as_pins":
                if (!this.parent.scene_options["journals_in_scene_as_pins"].scene_submitted)
                     this.parent.scene_options["journals_in_scene_as_pins"].scene_submitted = true;
                break;
            case "journals_in_tables":
                if (!this.parent.table_options["journals_in_tables"].table_options)
                     this.parent.table_options["journals_in_tables"].table_options = true;
                break;
            case "journals_with_tables":
                if (!this.parent.table_options["journals_with_tables"].table_options)
                     this.parent.table_options["journals_with_tables"].table_options = true;
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

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsJournals async _updateObject(event, formData)");

        // null form data - don't rebuild list.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // reset counters.
        var list_counter = 0;

        // add message to the list.
        function add_message(parent, message) {
            (list_counter % 2 == 0) ? parent.parent.journal_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.journal_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "journals_with_actors":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.actor_options[option2].actor_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_with_cards":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.card_options[option2].card_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "journals_in_compendiums":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "journals_with_items":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option2].item_macro_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_within_journals":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_with_macros":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.macro_options[option2].macro_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_with_playlists":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.playlist_options[option2].playlist_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "journals_with_scenes":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_in_scenes":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_in_scenes_as_pins":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "journals_in_tables":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "journals_with_tables":
                this.parent.journal_options[option].journal_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.journal_lists[option].splice(0, this.parent.journal_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
