/***
*
* module/analytics-tables.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsTables extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // table options for each tab.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "tables_with_actors": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_cards": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_in_compendiums": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_compendiums": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_items": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_in_journals": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_journals": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_macros": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_playlists": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_with_scenes": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
            "tables_within_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (5) with actors options.
        this.parent.actor_options = Object.assign(this.parent.actor_options, {
            "tables_with_actors": {
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

        // (8) with cards options.
        this.parent.card_options = Object.assign(this.parent.card_options, {
            "tables_with_cards": {
                card_count:                    0,
                card_name_value:               "",
                card_case_sensitive_checked:   false,
                card_exact_match_checked:      false,

                card_none_checked:             false,
                card_show_checked:             false,
                }
        });

        // (14) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "tables_in_compendiums": {
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,

                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (15) with compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "tables_with_compendiums": {
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
            "tables_with_items": {
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

                item_macro_checked:                 false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
            }
        });

        // (27) in journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "tables_in_journals": {
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

        // (26) with journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "tables_with_journals": {
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

        // (25) with macros options.
        this.parent.macro_options = Object.assign(this.parent.macro_options, {
            "tables_with_macros": {
                macro_count:                      0,
                macro_name_value:                 "",
                macro_case_sensitive_checked:     false,
                macro_exact_match_checked:        false,
                }
        });

        // (31) with playlists options.
        this.parent.playlist_options = Object.assign(this.parent.playlist_options, {
            "tables_with_playlists": {
                playlist_count:                  0,
                playlist_name_value:             "",
                playlist_case_sensitive_checked: false,
                playlist_exact_match_checked:    false,

                playlist_none_checked:           false,
                playlist_show_checked:           false,
                }
        });

        // (32) with scenes options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "tables_with_scenes": {
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,

                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        // (34-34) within tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "tables_within_tables_34": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                },
        });

        /* OUTPUT BY TAB */

        // table lists.
        this.parent.table_lists = Object.assign(this.parent.table_lists, {
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
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "tables-with-actors"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "tables-with-actors":
                retval = { primary: "tables_with_actors", secondary: "tables_with_actors" };
                break;
            case "tables-with-cards":
                retval = { primary: "tables_with_cards", secondary: "tables_with_cards" };
                break;
            case "tables-in-compendiums":
                retval = { primary: "tables_in_compendiums", secondary: "tables_in_compendiums" };
                break;
            case "tables-with-compendiums":
                retval = { primary: "tables_with_compendiums", secondary: "tables_with_compendiums" };
                break;
            case "tables-with-items":
                retval = { primary: "tables_with_items", secondary: "tables_with_items" };
                break;
            case "tables-in-journals":
                retval = { primary: "tables_in_journals", secondary: "tables_in_journals" };
                break;
            case "tables-with-journals":
                retval = { primary: "tables_with_journals", secondary: "tables_with_journals" };
                break;
            case "tables-with-macros":
                retval = { primary: "tables_with_macros", secondary: "tables_with_macros" };
                break;
            case "tables-with-playlists":
                retval = { primary: "tables_with_playlists", secondary: "tables_with_playlists" };
                break;
            case "tables-with-scenes":
                retval = { primary: "tables_with_scenes", secondary: "tables_with_scenes" };
                break;
            case "tables-within-tables":
                retval = { primary: "tables_within_tables", secondary: "tables_within_tables_34" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        switch (option) {
            case "tables_with_actors":
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
            case "tables_with_items":
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
            case "tables_in_journals":
                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("in-journal-monks-base").style.display         = "none";
                    document.getElementById("in-journal-monks-checklist").style.display    = "none";
                    document.getElementById("in-journal-monks-encounter").style.display    = "none";
                    document.getElementById("in-journal-monks-loot").style.display         = "none";
                    document.getElementById("in-journal-monks-organization").style.display = "none";
                    document.getElementById("in-journal-monks-person").style.display       = "none";
                    document.getElementById("in-journal-monks-place").style.display        = "none";
                    document.getElementById("in-journal-monks-poi").style.display          = "none";
                    document.getElementById("in-journal-monks-quest").style.display        = "none";
                    document.getElementById("in-journal-monks-shop").style.display         = "none";
                }
                break;
            case "tables_with_journals":
                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("with-journal-monks-base").style.display         = "none";
                    document.getElementById("with-journal-monks-checklist").style.display    = "none";
                    document.getElementById("with-journal-monks-encounter").style.display    = "none";
                    document.getElementById("with-journal-monks-loot").style.display         = "none";
                    document.getElementById("with-journal-monks-organization").style.display = "none";
                    document.getElementById("with-journal-monks-person").style.display       = "none";
                    document.getElementById("with-journal-monks-place").style.display        = "none";
                    document.getElementById("with-journal-monks-poi").style.display          = "none";
                    document.getElementById("with-journal-monks-quest").style.display        = "none";
                    document.getElementById("with-journal-monks-shop").style.display         = "none";
                }
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.table_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "tables_with_actors":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

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
            case "tables_with_cards":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-card-name-value":                   this.parent.card_options[option2].card_name_value,
                    "with-card-case-sensitive-checked":       this.parent.card_options[option2].card_case_sensitive_checked  ? "checked" : "",
                    "with-card-exact-match-checked":          this.parent.card_options[option2].card_exact_match_checked     ? "checked" : "",
                    "with-card-none-checked":                 this.parent.card_options[option2].card_none_checked            ? "checked" : "",
                    "with-card-show-checked":                 this.parent.card_options[option2].card_show_checked            ? "checked" : "",
                };
                break;
            case "tables_in_compendiums":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "tables_with_compendiums":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-compendium-name-value":             this.parent.compendium_options[option].compendium_name_value,
                    "with-compendium-case-sensitive-checked": this.parent.compendium_options[option].compendium_case_sensitive_checked    ? "checked" : "",
                    "with-compendium-exact-match-checked":    this.parent.compendium_options[option].compendium_exact_match_checked       ? "checked" : "",
                    "with-compendium-none-checked":           this.parent.compendium_options[option].compendium_none_checked              ? "checked" : "",
                    "with-compendium-show-checked":           this.parent.compendium_options[option].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "tables_with_items":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

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
            case "tables_in_journals":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "in-journal-name-value":             this.parent.journal_options[option2].journal_name_value,
                    "in-journal-case-sensitive-checked": this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "in-journal-exact-match-checked":    this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "in-journal-none-checked":           this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "in-journal-show-checked":           this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "in-journal-base-checked":           this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "in-journal-checklist-checked":      this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "in-journal-encounter-checked":      this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "in-journal-loot-checked":           this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "in-journal-organization-checked":   this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "in-journal-person-checked":         this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "in-journal-place-checked":          this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "in-journal-poi-checked":            this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "in-journal-quest-checked":          this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "in-journal-shop-checked":           this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "tables_with_journals":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-journal-name-value":             this.parent.journal_options[option2].journal_name_value,
                    "with-journal-case-sensitive-checked": this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "with-journal-exact-match-checked":    this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "with-journal-none-checked":           this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "with-journal-show-checked":           this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "with-journal-base-checked":           this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "with-journal-checklist-checked":      this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "with-journal-encounter-checked":      this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "with-journal-loot-checked":           this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "with-journal-organization-checked":   this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "with-journal-person-checked":         this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "with-journal-place-checked":          this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "with-journal-poi-checked":            this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "with-journal-quest-checked":          this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "with-journal-shop-checked":           this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "tables_with_macros":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-macros-name-value":                 this.parent.macro_options[option2].macro_name_value,
                    "with-macros-case-sensitive-checked":     this.parent.macro_options[option2].macro_case_sensitive_checked ? "checked" : "",
                    "with-macros-exact-match-checked":        this.parent.macro_options[option2].macro_exact_match_checked    ? "checked" : "",
                    "with-macros-none-checked":               this.parent.macro_options[option2].macro_none_checked           ? "checked" : "",
                    "with-macros-show-checked":               this.parent.macro_options[option2].macro_show_checked           ? "checked" : "",
                };
                break;
            case "tables_with_playlists":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-playlists-name-value":              this.parent.playlist_options[option2].playlists_name_value,
                    "with-playlists-case-sensitive-checked":  this.parent.playlist_options[option2].playlists_case_sensitive_checked ? "checked" : "",
                    "with-playlists-exact-match-checked":     this.parent.playlist_options[option2].playlists_exact_match_checked    ? "checked" : "",
                    "with-playlists-none-checked":            this.parent.playlist_options[option2].playlists_none_checked           ? "checked" : "",
                    "with-playlists-show-checked":            this.parent.playlist_options[option2].playlists_show_checked           ? "checked" : "",
                };
                break;
            case "tables_with_scenes":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "with-scene-name-value":                  this.parent.scene_options[option2].scene_name_value,
                    "with-scene-case-sensitive-checked":      this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "with-scene-exact-match-checked":         this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "with-scene-none-checked":                this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "with-scene-show-checked":                this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
            case "tables_within_tables":
                retval = {
                    "number-of-tables":             game.tables.size,

                    "table-count":                  this.parent.table_options[option].table_count,
                    "table-name-value":             this.parent.table_options[option].table_name_value,
                    "table-case-sensitive-checked": this.parent.table_options[option].table_case_sensitive_checked  ? "checked" : "",
                    "table-exact-match-checked":    this.parent.table_options[option].table_exact_match_checked     ? "checked" : "",

                    "within-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "within-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked   ? "checked" : "",
                    "within-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked      ? "checked" : "",
                    "within-table-none-checked":                this.parent.table_options[option2].table_none_checked             ? "checked" : "",
                    "within-table-show-checked":                this.parent.table_options[option2].table_show_checked             ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "tables-with-actors":
                option = "tables_with_actors";
                retval = !this.parent.actor_options["tables_with_actors"].actor_submitted;
                break;
            case "tables-with-cards":
                option = "tables_with_cards";
                retval = !this.parent.card_options["tables_with_cards"].card_submitted;
                break;
            case "tables-in-compendiums":
                option = "tables_in_compendiums";
                retval = !this.parent.compendium_options["tables_in_compendiums"].compendium_submitted;
                break;
            case "tables-with-compendiums":
                option = "tables_with_compendiums";
                retval = !this.parent.compendium_options["tables_with_compendiums"].compendium_submitted;
                break;
            case "tables-with-items":
                option = "tables_with_items";
                retval = !this.parent.item_options["tables_with_items"].item_submitted;
                break;
            case "tables-in-journals":
                option = "tables_in_journals";
                retval = !this.parent.journal_options["tables_in_journals"].journal_submitted;
                break;
            case "tables-with-journals":
                option = "tables_with_journals";
                retval = !this.parent.journal_options["tables_with_journals"].journal_submitted;
                break;
            case "tables-with-macros":
                option = "tables_with_macros";
                retval = !this.parent.macro_options["tables_with_macros"].macro_submitted;
                break;
            case "tables-with-playlists":
                option = "tables_with_playlists";
                retval = !this.parent.playlist_options["tables_with_playlists"].playlist_submitted;
                break;
            case "tables-with-scenes":
                option = "tables_with_scenes";
                retval = !this.parent.scene_options["tables_with_scenes"].scene_submitted;
                break;
            case "tables-within-tables":
                option = "tables_wtihin_tables";
                retval = !this.parent.table_options["tables_within_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.table_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
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

        // set update flag when changing tabs if tab never submitted.
        switch (this.optionKeys().primary) {
            case "tables_with_actors":
                if (!this.parent.actor_options["tables_with_actors"].actor_submitted)
                     this.parent.actor_options["tables_with_actors"].actor_submitted = true;
                break;
            case "tables_with_cards":
                if (!this.parent.card_options["tables_with_cards"].card_submitted)
                     this.parent.card_options["tables_with_cards"].card_submitted = true;
                break;
            case "tables_in_compendiums":
                if (!this.parent.compendium_options["tables_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["tables_in_compendiums"].compendium_submitted = true;
                break;
            case "tables_with_compendiums":
                if (!this.parent.compendium_options["tables_with_compendiums"].compendium_submitted)
                     this.parent.compendium_options["tables_with_compendiums"].compendium_submitted = true;
                break;
            case "tables_with_items":
                if (!this.parent.item_options["tables_with_items"].item_submitted)
                     this.parent.item_options["tables_with_items"].item_submitted = true;
                break;
            case "tables_in_journals":
                if (!this.parent.journal_options["tables_in_journals"].journal_submitted)
                     this.parent.journal_options["tables_in_journals"].journal_submitted = true;
                break;
            case "tables_with_journals":
                if (!this.parent.journal_options["tables_with_journals"].journal_submitted)
                     this.parent.journal_options["tables_with_journals"].journal_submitted = true;
                break;
            case "tables_with_macros":
                if (!this.parent.macro_options["tables_with_macros"].macro_submitted)
                     this.parent.macro_options["tables_with_macros"].macro_submitted = true;
                break;
            case "tables_with_playlists":
                if (!this.parent.playlist_options["tables_with_playlists"].playlist_submitted)
                     this.parent.playlist_options["tables_with_playlists"].playlist_submitted = true;
                break;
            case "tables_with_scenes":
                if (!this.parent.scene_options["tables_with_scenes"].scene_submitted)
                     this.parent.scene_options["tables_with_scenes"].scene_submitted = true;
                break;
            case "tables_within_tables":
                if (!this.parent.table_options["tables_within_tables"].table_options)
                     this.parent.table_options["tables_within_tables"].table_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsTables async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.table_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.table_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "tables_with_actors":
                this.parent.table_options[option].table_count = 0;
                this.parent.actor_options[option2].actor_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_cards":
                this.parent.table_options[option].table_count = 0;
                this.parent.card_options[option2].card_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_in_compendiums":
                this.parent.table_options[option].table_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "tables_with_compendiums":
                this.parent.table_options[option].table_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "tables_with_items":
                this.parent.table_options[option].table_count = 0;
                this.parent.item_options[option2].item_count = 0;
                this.parent.item_options[option2].item_macro_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_in_journals":
                this.parent.table_options[option].table_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_journals":
                this.parent.table_options[option].table_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_macros":
                this.parent.table_options[option].table_count = 0;
                this.parent.macro_options[option2].macro_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_playlists":
                this.parent.table_options[option].table_count = 0;
                this.parent.playlist_options[option2].playlist_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_with_scenes":
                this.parent.table_options[option].table_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "tables_within_tables":
                this.parent.table_options[option].table_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.table_lists[option].splice(0, this.parent.table_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
