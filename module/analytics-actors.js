/***
*
* module/analytics-actors.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // actor options for each tab.
        this.parent.actor_options = Object.assign(this.parent.actor_options, {
            "actors_in_compendiums": {
                actor_count:                    0,
                actor_name_value:               "",
                actor_case_sensitive_checked:   false,
                actor_exact_match_checked:      false,

                actor_npc_checked:              false,
                actor_character_checked:        false,
                actor_vehicle_checked:          false,

                actor_aberration_checked:       false,
                actor_beast_checked:            false,
                actor_celestial_checked:        false,
                actor_construct_checked:        false,
                actor_dragon_checked:           false,
                actor_elemental_checked:        false,
                actor_fey_checked:              false,
                actor_fiend_checked:            false,
                actor_giant_checked:            false,
                actor_humanoid_checked:         false,
                actor_monstrosity_checked:      false,
                actor_ooze_checked:             false,
                actor_plant_checked:            false,
                actor_swarm_checked:            false,
                actor_undead_checked:           false,
                },
            "actors_with_items": {
                actor_count:                    0,
                actor_name_value:               "",
                actor_case_sensitive_checked:   false,
                actor_exact_match_checked:      false,

                actor_npc_checked:              false,
                actor_character_checked:        false,
                actor_vehicle_checked:          false,

                actor_aberration_checked:       false,
                actor_beast_checked:            false,
                actor_celestial_checked:        false,
                actor_construct_checked:        false,
                actor_dragon_checked:           false,
                actor_elemental_checked:        false,
                actor_fey_checked:              false,
                actor_fiend_checked:            false,
                actor_giant_checked:            false,
                actor_humanoid_checked:         false,
                actor_monstrosity_checked:      false,
                actor_ooze_checked:             false,
                actor_plant_checked:            false,
                actor_swarm_checked:            false,
                actor_undead_checked:           false,
                },
            "actors_in_journals": {
                actor_count:                    0,
                actor_name_value:               "",
                actor_case_sensitive_checked:   false,
                actor_exact_match_checked:      false,

                actor_npc_checked:              false,
                actor_character_checked:        false,
                actor_vehicle_checked:          false,

                actor_aberration_checked:       false,
                actor_beast_checked:            false,
                actor_celestial_checked:        false,
                actor_construct_checked:        false,
                actor_dragon_checked:           false,
                actor_elemental_checked:        false,
                actor_fey_checked:              false,
                actor_fiend_checked:            false,
                actor_giant_checked:            false,
                actor_humanoid_checked:         false,
                actor_monstrosity_checked:      false,
                actor_ooze_checked:             false,
                actor_plant_checked:            false,
                actor_swarm_checked:            false,
                actor_undead_checked:           false,
                },
            "actors_in_scenes_as_tokens": {
                actor_count:                    0,
                actor_name_value:               "",
                actor_case_sensitive_checked:   false,
                actor_exact_match_checked:      false,

                actor_npc_checked:              false,
                actor_character_checked:        false,
                actor_vehicle_checked:          false,

                actor_aberration_checked:       false,
                actor_beast_checked:            false,
                actor_celestial_checked:        false,
                actor_construct_checked:        false,
                actor_dragon_checked:           false,
                actor_elemental_checked:        false,
                actor_fey_checked:              false,
                actor_fiend_checked:            false,
                actor_giant_checked:            false,
                actor_humanoid_checked:         false,
                actor_monstrosity_checked:      false,
                actor_ooze_checked:             false,
                actor_plant_checked:            false,
                actor_swarm_checked:            false,
                actor_undead_checked:           false,
                },
            "actors_in_tables": {
                actor_count:                    0,
                actor_name_value:               "",
                actor_case_sensitive_checked:   false,
                actor_exact_match_checked:      false,

                actor_npc_checked:              false,
                actor_character_checked:        false,
                actor_vehicle_checked:          false,

                actor_aberration_checked:       false,
                actor_beast_checked:            false,
                actor_celestial_checked:        false,
                actor_construct_checked:        false,
                actor_dragon_checked:           false,
                actor_elemental_checked:        false,
                actor_fey_checked:              false,
                actor_fiend_checked:            false,
                actor_giant_checked:            false,
                actor_humanoid_checked:         false,
                actor_monstrosity_checked:      false,
                actor_ooze_checked:             false,
                actor_plant_checked:            false,
                actor_swarm_checked:            false,
                actor_undead_checked:           false,
                }
        });

        /* SECONDARY SORT BY TAB */

        // (1) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "actors_in_compendiums": {
                compendium_submitted:              false,
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,
                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (2) with items options.
        this.parent.item_options = Object.assign(this.parent.item_options, {
            "actors_with_items": {
                item_submitted:              false,
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

        // (3) in journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "actors_in_journals": {
                journal_submitted:              false,
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

        // (4) in scenes as tokens options.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "actors_in_scenes_as_tokens": {
                scene_submitted:              false,
                scene_count:                  0,
                scene_name_value:             "",
                scene_case_sensitive_checked: false,
                scene_exact_match_checked:    false,
                scene_none_checked:           false,
                scene_show_checked:           false,
                }
        });

        // (5) in tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "actors_in_tables": {
                table_submitted:              false,
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,
                table_none_checked:           false,
                table_show_checked:           false,
                }
        });

        /* OUTPUT BY TAB */

        // actor lists.
        this.parent.actor_lists = Object.assign(this.parent.actor_lists, {
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
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "actors-in-compendiums"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors static isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors show(inFocus)");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "actors-in-compendiums":
                retval = { primary: "actors_in_compendiums", secondary: "actors_in_compendiums" };
                break;
            case "actors-with-items":
                retval = { primary: "actors_with_items", secondary: "actors_with_items" };
                break;
            case "actors-in-journals":
                retval = { primary: "actors_in_journals", secondary: "actors_in_journals" };
                break;
            case "actors-in-scenes-as-tokens":
                retval = { primary: "actors_in_scenes_as_tokens", secondary: "actors_in_scenes_as_tokens" };
                break;
            case "actors-in-tables":
                retval = { primary: "actors_in_tables", secondary: "actors_in_tables" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // enable/disable npc creature types.
        document.getElementById("actor-aberration").disabled  = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-beast").disabled       = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-celestial").disabled   = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-construct").disabled   = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-dragon").disabled      = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-elemental").disabled   = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-fey").disabled         = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-fiend").disabled       = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-giant").disabled       = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-humanoid").disabled    = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-monstrosity").disabled = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-ooze").disabled        = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-plant").disabled       = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-swarm").disabled       = !this.parent.actor_options[option].actor_npc_checked;
        document.getElementById("actor-undead").disabled      = !this.parent.actor_options[option].actor_npc_checked;

        switch (option) {
            case "actors_with_items":
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
            case "actors_in_journals":
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
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.actor_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "actors_in_compendiums":
                retval = {
                    "number-of-actors":                  game.actors.size,
                    "actor-tooltip":                     i18n('DOCUMENT.Actors') + " " + i18n('Name'),

                    "actor-count":                       this.parent.actor_options[option].actor_count,
                    "actor-name-value":                  this.parent.actor_options[option].actor_name_value,
                    "actor-case-sensitive-checked":      this.parent.actor_options[option].actor_case_sensitive_checked  ? "checked" : "",
                    "actor-exact-match-checked":         this.parent.actor_options[option].actor_exact_match_checked     ? "checked" : "",

                    "actor-npc-checked":                 this.parent.actor_options[option].actor_npc_checked             ? "checked" : "",
                    "actor-character-checked":           this.parent.actor_options[option].actor_character_checked       ? "checked" : "",
                    "actor-vehicle-checked":             this.parent.actor_options[option].actor_vehicle_checked         ? "checked" : "",

                    "actor-aberration-checked":          this.parent.actor_options[option].actor_aberration_checked      ? "checked" : "",
                    "actor-beast-checked":               this.parent.actor_options[option].actor_beast_checked           ? "checked" : "",
                    "actor-celestial-checked":           this.parent.actor_options[option].actor_celestial_checked       ? "checked" : "",
                    "actor-construct-checked":           this.parent.actor_options[option].actor_construct_checked       ? "checked" : "",
                    "actor-dragon-checked":              this.parent.actor_options[option].actor_dragon_checked          ? "checked" : "",
                    "actor-elemental-checked":           this.parent.actor_options[option].actor_elemental_checked       ? "checked" : "",
                    "actor-fey-checked":                 this.parent.actor_options[option].actor_fey_checked             ? "checked" : "",
                    "actor-fiend-checked":               this.parent.actor_options[option].actor_fiend_checked           ? "checked" : "",
                    "actor-giant-checked":               this.parent.actor_options[option].actor_giant_checked           ? "checked" : "",
                    "actor-humanoid-checked":            this.parent.actor_options[option].actor_humanoid_checked        ? "checked" : "",
                    "actor-monstrosity-checked":         this.parent.actor_options[option].actor_monstrosity_checked     ? "checked" : "",
                    "actor-ooze-checked":                this.parent.actor_options[option].actor_ooze_checked            ? "checked" : "",
                    "actor-plant-checked":               this.parent.actor_options[option].actor_plant_checked           ? "checked" : "",
                    "actor-swarm-checked":               this.parent.actor_options[option].actor_swarm_checked           ? "checked" : "",
                    "actor-undead-checked":              this.parent.actor_options[option].actor_undead_checked          ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "actors_with_items":
                retval = {
                    "number-of-actors":               game.actors.size,
                    "actor-tooltip":                  i18n('DOCUMENT.Actors') + " " + i18n('Name'),

                    "actor-count":                    this.parent.actor_options[option].actor_count,
                    "actor-name-value":               this.parent.actor_options[option].actor_name_value,
                    "actor-case-sensitive-checked":   this.parent.actor_options[option].actor_case_sensitive_checked  ? "checked" : "",
                    "actor-exact-match-checked":      this.parent.actor_options[option].actor_exact_match_checked     ? "checked" : "",

                    "actor-npc-checked":              this.parent.actor_options[option].actor_npc_checked             ? "checked" : "",
                    "actor-character-checked":        this.parent.actor_options[option].actor_character_checked       ? "checked" : "",
                    "actor-vehicle-checked":          this.parent.actor_options[option].actor_vehicle_checked         ? "checked" : "",

                    "actor-aberration-checked":       this.parent.actor_options[option].actor_aberration_checked      ? "checked" : "",
                    "actor-beast-checked":            this.parent.actor_options[option].actor_beast_checked           ? "checked" : "",
                    "actor-celestial-checked":        this.parent.actor_options[option].actor_celestial_checked       ? "checked" : "",
                    "actor-construct-checked":        this.parent.actor_options[option].actor_construct_checked       ? "checked" : "",
                    "actor-dragon-checked":           this.parent.actor_options[option].actor_dragon_checked          ? "checked" : "",
                    "actor-elemental-checked":        this.parent.actor_options[option].actor_elemental_checked       ? "checked" : "",
                    "actor-fey-checked":              this.parent.actor_options[option].actor_fey_checked             ? "checked" : "",
                    "actor-fiend-checked":            this.parent.actor_options[option].actor_fiend_checked           ? "checked" : "",
                    "actor-giant-checked":            this.parent.actor_options[option].actor_giant_checked           ? "checked" : "",
                    "actor-humanoid-checked":         this.parent.actor_options[option].actor_humanoid_checked        ? "checked" : "",
                    "actor-monstrosity-checked":      this.parent.actor_options[option].actor_monstrosity_checked     ? "checked" : "",
                    "actor-ooze-checked":             this.parent.actor_options[option].actor_ooze_checked            ? "checked" : "",
                    "actor-plant-checked":            this.parent.actor_options[option].actor_plant_checked           ? "checked" : "",
                    "actor-swarm-checked":            this.parent.actor_options[option].actor_swarm_checked           ? "checked" : "",
                    "actor-undead-checked":           this.parent.actor_options[option].actor_undead_checked          ? "checked" : "",

                    "with-item-name-value":                this.parent.item_options[option2].item_name_value,
                    "with-item-case-sensitive-checked":    this.parent.item_options[option2].item_case_sensitive_checked    ? "checked" : "",
                    "with-item-exact-match-checked":       this.parent.item_options[option2].item_exact_match_checked       ? "checked" : "",
                    "with-item-none-checked":              this.parent.item_options[option2].item_none_checked              ? "checked" : "",
                    "with-item-show-checked":              this.parent.item_options[option2].item_show_checked              ? "checked" : "",

                    "with-item-weapon-checked":            this.parent.item_options[option2].item_weapon_checked            ? "checked" : "",
                    "with-item-equipment-checked":         this.parent.item_options[option2].item_equipment_checked         ? "checked" : "",
                    "with-item-consumable-checked":        this.parent.item_options[option2].item_consumable_checked        ? "checked" : "",
                    "with-item-tool-checked":              this.parent.item_options[option2].item_tool_checked              ? "checked" : "",
                    "with-item-loot-checked":              this.parent.item_options[option2].item_loot_checked              ? "checked" : "",
                    "with-item-class-checked":             this.parent.item_options[option2].item_class_checked             ? "checked" : "",
                    "with-item-feat-checked":              this.parent.item_options[option2].item_feat_checked              ? "checked" : "",
                    "with-item-backpack-checked":          this.parent.item_options[option2].item_backpack_checked          ? "checked" : "",
                    "with-item-spell-checked":             this.parent.item_options[option2].item_spell_checked             ? "checked" : "",

                    "with-item-macro-checked":                  this.parent.item_options[option2].item_macro_checked                 ? "checked" : "",
                    "with-item-macro-name-value":               this.parent.item_options[option2].item_macro_name_value,
                    "with-item-macro-case-sensitive-checked":   this.parent.item_options[option2].item_macro_case_sensitive_checked  ? "checked" : "",
                    "with-item-macro-exact-match-checked":      this.parent.item_options[option2].item_macro_exact_match_checked     ? "checked" : "",
                };
                break;
            case "actors_in_journals":
                retval = {
                    "number-of-actors":               game.actors.size,
                    "actor-tooltip":                  i18n('DOCUMENT.Actors') + " " + i18n('Name'),

                    "actor-count":                    this.parent.actor_options[option].actor_count,
                    "actor-name-value":               this.parent.actor_options[option].actor_name_value,
                    "actor-case-sensitive-checked":   this.parent.actor_options[option].actor_case_sensitive_checked     ? "checked" : "",
                    "actor-exact-match-checked":      this.parent.actor_options[option].actor_exact_match_checked        ? "checked" : "",

                    "actor-npc-checked":              this.parent.actor_options[option].actor_npc_checked                ? "checked" : "",
                    "actor-character-checked":        this.parent.actor_options[option].actor_character_checked          ? "checked" : "",
                    "actor-vehicle-checked":          this.parent.actor_options[option].actor_vehicle_checked            ? "checked" : "",

                    "actor-aberration-checked":       this.parent.actor_options[option].actor_aberration_checked         ? "checked" : "",
                    "actor-beast-checked":            this.parent.actor_options[option].actor_beast_checked              ? "checked" : "",
                    "actor-celestial-checked":        this.parent.actor_options[option].actor_celestial_checked          ? "checked" : "",
                    "actor-construct-checked":        this.parent.actor_options[option].actor_construct_checked          ? "checked" : "",
                    "actor-dragon-checked":           this.parent.actor_options[option].actor_dragon_checked             ? "checked" : "",
                    "actor-elemental-checked":        this.parent.actor_options[option].actor_elemental_checked          ? "checked" : "",
                    "actor-fey-checked":              this.parent.actor_options[option].actor_fey_checked                ? "checked" : "",
                    "actor-fiend-checked":            this.parent.actor_options[option].actor_fiend_checked              ? "checked" : "",
                    "actor-giant-checked":            this.parent.actor_options[option].actor_giant_checked              ? "checked" : "",
                    "actor-humanoid-checked":         this.parent.actor_options[option].actor_humanoid_checked           ? "checked" : "",
                    "actor-monstrosity-checked":      this.parent.actor_options[option].actor_monstrosity_checked        ? "checked" : "",
                    "actor-ooze-checked":             this.parent.actor_options[option].actor_ooze_checked               ? "checked" : "",
                    "actor-plant-checked":            this.parent.actor_options[option].actor_plant_checked              ? "checked" : "",
                    "actor-swarm-checked":            this.parent.actor_options[option].actor_swarm_checked              ? "checked" : "",
                    "actor-undead-checked":           this.parent.actor_options[option].actor_undead_checked             ? "checked" : "",

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
            case "actors_in_scenes_as_tokens":
                retval = {
                    "number-of-actors":               game.actors.size,
                    "actor-tooltip":                  i18n('DOCUMENT.Tokens') + " " + i18n('TOKEN.CharActor') + " " + i18n('Name'),

                    "actor-count":                    this.parent.actor_options[option].actor_count,
                    "actor-name-value":               this.parent.actor_options[option].actor_name_value,
                    "actor-case-sensitive-checked":   this.parent.actor_options[option].actor_case_sensitive_checked   ? "checked" : "",
                    "actor-exact-match-checked":      this.parent.actor_options[option].actor_exact_match_checked      ? "checked" : "",

                    "actor-npc-checked":              this.parent.actor_options[option].actor_npc_checked              ? "checked" : "",
                    "actor-character-checked":        this.parent.actor_options[option].actor_character_checked        ? "checked" : "",
                    "actor-vehicle-checked":          this.parent.actor_options[option].actor_vehicle_checked          ? "checked" : "",

                    "actor-aberration-checked":       this.parent.actor_options[option].actor_aberration_checked       ? "checked" : "",
                    "actor-beast-checked":            this.parent.actor_options[option].actor_beast_checked            ? "checked" : "",
                    "actor-celestial-checked":        this.parent.actor_options[option].actor_celestial_checked        ? "checked" : "",
                    "actor-construct-checked":        this.parent.actor_options[option].actor_construct_checked        ? "checked" : "",
                    "actor-dragon-checked":           this.parent.actor_options[option].actor_dragon_checked           ? "checked" : "",
                    "actor-elemental-checked":        this.parent.actor_options[option].actor_elemental_checked        ? "checked" : "",
                    "actor-fey-checked":              this.parent.actor_options[option].actor_fey_checked              ? "checked" : "",
                    "actor-fiend-checked":            this.parent.actor_options[option].actor_fiend_checked            ? "checked" : "",
                    "actor-giant-checked":            this.parent.actor_options[option].actor_giant_checked            ? "checked" : "",
                    "actor-humanoid-checked":         this.parent.actor_options[option].actor_humanoid_checked         ? "checked" : "",
                    "actor-monstrosity-checked":      this.parent.actor_options[option].actor_monstrosity_checked      ? "checked" : "",
                    "actor-ooze-checked":             this.parent.actor_options[option].actor_ooze_checked             ? "checked" : "",
                    "actor-plant-checked":            this.parent.actor_options[option].actor_plant_checked            ? "checked" : "",
                    "actor-swarm-checked":            this.parent.actor_options[option].actor_swarm_checked            ? "checked" : "",
                    "actor-undead-checked":           this.parent.actor_options[option].actor_undead_checked           ? "checked" : "",

                    "in-scene-as-token-name-value":               this.parent.scene_options[option2].scene_name_value,
                    "in-scene-as-token-case-sensitive-checked":   this.parent.scene_options[option2].scene_case_sensitive_checked   ? "checked" : "",
                    "in-scene-as-token-exact-match-checked":      this.parent.scene_options[option2].scene_exact_match_checked      ? "checked" : "",
                    "in-scene-as-token-none-checked":             this.parent.scene_options[option2].scene_none_checked             ? "checked" : "",
                    "in-scene-as-token-show-checked":             this.parent.scene_options[option2].scene_show_checked             ? "checked" : "",
                };
                break;
            case "actors_in_tables":
                retval = {
                    "number-of-actors":                  game.actors.size,
                    "actor-tooltip":                     i18n('DOCUMENT.Actors') + " " + i18n('Name'),

                    "actor-count":                       this.parent.actor_options[option].actor_count,
                    "actor-name-value":                  this.parent.actor_options[option].actor_name_value,
                    "actor-case-sensitive-checked":      this.parent.actor_options[option].actor_case_sensitive_checked  ? "checked" : "",
                    "actor-exact-match-checked":         this.parent.actor_options[option].actor_exact_match_checked     ? "checked" : "",

                    "actor-npc-checked":                 this.parent.actor_options[option].actor_npc_checked             ? "checked" : "",
                    "actor-character-checked":           this.parent.actor_options[option].actor_character_checked       ? "checked" : "",
                    "actor-vehicle-checked":             this.parent.actor_options[option].actor_vehicle_checked         ? "checked" : "",

                    "actor-aberration-checked":          this.parent.actor_options[option].actor_aberration_checked      ? "checked" : "",
                    "actor-beast-checked":               this.parent.actor_options[option].actor_beast_checked           ? "checked" : "",
                    "actor-celestial-checked":           this.parent.actor_options[option].actor_celestial_checked       ? "checked" : "",
                    "actor-construct-checked":           this.parent.actor_options[option].actor_construct_checked       ? "checked" : "",
                    "actor-dragon-checked":              this.parent.actor_options[option].actor_dragon_checked          ? "checked" : "",
                    "actor-elemental-checked":           this.parent.actor_options[option].actor_elemental_checked       ? "checked" : "",
                    "actor-fey-checked":                 this.parent.actor_options[option].actor_fey_checked             ? "checked" : "",
                    "actor-fiend-checked":               this.parent.actor_options[option].actor_fiend_checked           ? "checked" : "",
                    "actor-giant-checked":               this.parent.actor_options[option].actor_giant_checked           ? "checked" : "",
                    "actor-humanoid-checked":            this.parent.actor_options[option].actor_humanoid_checked        ? "checked" : "",
                    "actor-monstrosity-checked":         this.parent.actor_options[option].actor_monstrosity_checked     ? "checked" : "",
                    "actor-ooze-checked":                this.parent.actor_options[option].actor_ooze_checked            ? "checked" : "",
                    "actor-plant-checked":               this.parent.actor_options[option].actor_plant_checked           ? "checked" : "",
                    "actor-swarm-checked":               this.parent.actor_options[option].actor_swarm_checked           ? "checked" : "",
                    "actor-undead-checked":              this.parent.actor_options[option].actor_undead_checked          ? "checked" : "",

                    "in-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "in-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked    ? "checked" : "",
                    "in-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked       ? "checked" : "",
                    "in-table-none-checked":                this.parent.table_options[option2].table_none_checked              ? "checked" : "",
                    "in-table-show-checked":                this.parent.table_options[option2].table_show_checked              ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "actors-in-compendiums":
                option = "actors_in_compendiums";
                retval = !this.parent.compendium_options["actors_in_compendiums"].compendium_submitted;
                break;
            case "actors-with-items":
                option = "actors_with_items";
                retval = !this.parent.item_options["actors_with_items"].item_submitted;
                break;
            case "actors-in-journals":
                option = "actors_in_journals";
                retval = !this.parent.journal_options["actors_in_journals"].journal_submitted;
                break;
            case "actors-in-scenes-as-tokens":
                option = "actors_in_scenes_as_tokens";
                retval = !this.parent.scene_options["actors_in_scenes_as_tokens"].scene_submitted;
                break;
            case "actors-in-tables":
                option = "actors_in_tables";
                retval = !this.parent.table_options["actors_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.actor_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
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

        // set update flag when changing tabs if tab never submitted.
        switch (this.optionKeys().primary) {
            case "actors_in_compendiums":
                if (!this.parent.compendium_options["actors_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["actors_in_compendiums"].compendium_submitted = true;
                break;
            case "actors_with_items":
                if (!this.parent.item_options["actors_with_items"].item_submitted)
                     this.parent.item_options["actors_with_items"].item_submitted = true;
                break;
            case "actors_in_journals":
                if (!this.parent.journal_options["actors_in_journals"].journal_submitted)
                     this.parent.journal_options["actors_in_journals"].journal_submitted = true;
                break;
            case "actors_in_scenes_as_tokens":
                if (!this.parent.scene_options["actors_in_scenes_as_tokens"].scene_submitted)
                     this.parent.scene_options["actors_in_scenes_as_tokens"].scene_submitted = true;
                break;
            case "actors_in_tables":
                if (!this.parent.table_options["actors_in_tables"].table_options)
                     this.parent.table_options["actors_in_tables"].table_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "actors_in_compendiums":
                this.parent.actor_options[option].actor_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.actor_lists[option].splice(0, this.parent.actor_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "actors_with_items":
                this.parent.actor_options[option].actor_count = 0;
                this.parent.item_options[option2].item_count = 0;
                this.parent.item_options[option2].item_macro_count = 0;
                this.parent.actor_lists[option].splice(0, this.parent.actor_lists[option].length);
                break;
            case "actors_in_journals":
                this.parent.actor_options[option].actor_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.actor_lists[option].splice(0, this.parent.actor_lists[option].length);
                break;
            case "actors_in_scenes_as_tokens":
                this.parent.actor_options[option].actor_count = 0;
                this.parent.scene_options[option2].scene_count = 0;
                this.parent.actor_lists[option].splice(0, this.parent.actor_lists[option].length);
                break;
            case "actors_in_tables":
                this.parent.actor_options[option].actor_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.actor_lists[option].splice(0, this.parent.actor_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        let button      = document.getElementById("analytics-actors-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // pull in the form data.
        const data = expandObject(formData);

        // GET the key values (id) from the submitted form.
		for ( let [k, v] of Object.entries(data) ) {
			if (k == "actor-name")             { this.parent.actor_options[option].actor_name_value               = v ? v : ""; }
			if (k == "actor-case-sensitive")   { this.parent.actor_options[option].actor_case_sensitive_checked   = v; }
			if (k == "actor-exact-match")      { this.parent.actor_options[option].actor_exact_match_checked      = v; }

			if (k == "actor-npc")              { this.parent.actor_options[option].actor_npc_checked              = v; }
			if (k == "actor-character")        { this.parent.actor_options[option].actor_character_checked        = v; }
			if (k == "actor-vehicle")          { this.parent.actor_options[option].actor_vehicle_checked          = v; }

			if (k == "actor-aberration")       { this.parent.actor_options[option].actor_aberration_checked       = v; }
			if (k == "actor-beast")            { this.parent.actor_options[option].actor_beast_checked            = v; }
			if (k == "actor-celestial")        { this.parent.actor_options[option].actor_celestial_checked        = v; }
			if (k == "actor-construct")        { this.parent.actor_options[option].actor_construct_checked        = v; }
			if (k == "actor-dragon")           { this.parent.actor_options[option].actor_dragon_checked           = v; }
			if (k == "actor-elemental")        { this.parent.actor_options[option].actor_elemental_checked        = v; }
			if (k == "actor-fey")              { this.parent.actor_options[option].actor_fey_checked              = v; }
			if (k == "actor-fiend")            { this.parent.actor_options[option].actor_fiend_checked            = v; }
			if (k == "actor-giant")            { this.parent.actor_options[option].actor_giant_checked            = v; }
			if (k == "actor-humanoid")         { this.parent.actor_options[option].actor_humanoid_checked         = v; }
			if (k == "actor-monstrosity")      { this.parent.actor_options[option].actor_monstrosity_checked      = v; }
			if (k == "actor-ooze")             { this.parent.actor_options[option].actor_ooze_checked             = v; }
			if (k == "actor-plant")            { this.parent.actor_options[option].actor_plant_checked            = v; }
			if (k == "actor-swarm")            { this.parent.actor_options[option].actor_swarm_checked            = v; }
			if (k == "actor-undead")           { this.parent.actor_options[option].actor_undead_checked           = v; }

			switch (option) {
				case "actors_with_items":
					if (k == "with-item-name")              { this.parent.item_options[option2].item_name_value                   = v ? v : ""; }
					if (k == "with-item-case-sensitive")    { this.parent.item_options[option2].item_case_sensitive_checked       = v; }
					if (k == "with-item-exact-match")       { this.parent.item_options[option2].item_exact_match_checked          = v; }
					if (k == "with-item-none")              { this.parent.item_options[option2].item_none_checked                 = v; }
					if (k == "with-item-show")              { this.parent.item_options[option2].item_show_checked                 = v; }

					if (k == "with-item-weapon")            { this.parent.item_options[option2].item_weapon_checked               = v; }
					if (k == "with-item-equipment")         { this.parent.item_options[option2].item_equipment_checked            = v; }
					if (k == "with-item-consumable")        { this.parent.item_options[option2].item_consumable_checked           = v; }
					if (k == "with-item-tool")              { this.parent.item_options[option2].item_tool_checked                 = v; }
					if (k == "with-item-loot")              { this.parent.item_options[option2].item_loot_checked                 = v; }
					if (k == "with-item-class")             { this.parent.item_options[option2].item_class_checked                = v; }
					if (k == "with-item-feat")              { this.parent.item_options[option2].item_feat_checked                 = v; }
					if (k == "with-item-backpack")          { this.parent.item_options[option2].item_backpack_checked             = v; }
					if (k == "with-item-spell")             { this.parent.item_options[option2].item_spell_checked                = v; }

					if (k == "with-item-macro")                { this.parent.item_options[option2].item_macro_checked                = v; }
					if (k == "with-item-macro-name")           { this.parent.item_options[option2].item_macro_name_value             = v ? v : ""; }
					if (k == "with-item-macro-case-sensitive") { this.parent.item_options[option2].item_macro_case_sensitive_checked = v; }
					if (k == "with-item-macro-exact-match")    { this.parent.item_options[option2].item_macro_exact_match_checked    = v; }
					break;

				case "actors_in_journals":
					if (k == "in-journal-name")           { this.parent.journal_options[option2].journal_name_value             = v ? v : ""; }
					if (k == "in-journal-case-sensitive") { this.parent.journal_options[option2].journal_case_sensitive_checked = v; }
					if (k == "in-journal-exact-match")    { this.parent.journal_options[option2].journal_exact_match_checked    = v; }
					if (k == "in-journal-none")           { this.parent.journal_options[option2].journal_none_checked           = v; }
					if (k == "in-journal-show")           { this.parent.journal_options[option2].journal_show_checked           = v; }

					if (k == "in-journal-base")           { this.parent.journal_options[option2].journal_base_checked           = v; }
					if (k == "in-journal-checklist")      { this.parent.journal_options[option2].journal_checklist_checked      = v; }
					if (k == "in-journal-encounter")      { this.parent.journal_options[option2].journal_encounter_checked      = v; }
					if (k == "in-journal-loot")           { this.parent.journal_options[option2].journal_loot_checked           = v; }
					if (k == "in-journal-organization")   { this.parent.journal_options[option2].journal_organization_checked   = v; }
					if (k == "in-journal-person")         { this.parent.journal_options[option2].journal_person_checked         = v; }
					if (k == "in-journal-place")          { this.parent.journal_options[option2].journal_place_checked          = v; }
					if (k == "in-journal-poi")            { this.parent.journal_options[option2].journal_poi_checked            = v; }
					if (k == "in-journal-quest")          { this.parent.journal_options[option2].journal_quest_checked          = v; }
					if (k == "in-journal-shop")           { this.parent.journal_options[option2].journal_shop_checked           = v; }
					break;

				case "actors_in_scenes_as_tokens":
					if (k == "in-scene-as-token-name")             { this.parent.scene_options[option2].scene_name_value                 = v ? v : ""; }
					if (k == "in-scene-as-token-case-sensitive")   { this.parent.scene_options[option2].scene_case_sensitive_checked     = v; }
					if (k == "in-scene-as-token-exact-match")      { this.parent.scene_options[option2].scene_exact_match_checked        = v; }
					if (k == "in-scene-as-token-none")             { this.parent.scene_options[option2].scene_none_checked               = v; }
					if (k == "in-scene-as-token-show")             { this.parent.scene_options[option2].scene_show_checked               = v; }
					break;
			};
		};

        // any actor options set?
        var no_actor_types_selected = (
            !this.parent.actor_options[option].actor_npc_checked            &&
            !this.parent.actor_options[option].actor_character_checked      &&
            !this.parent.actor_options[option].actor_vehicle_checked);

        // any actor creature options set?
        var no_creature_types_selected = (
            !this.parent.actor_options[option].actor_aberration_checked     &&
            !this.parent.actor_options[option].actor_beast_checked          &&
            !this.parent.actor_options[option].actor_celestial_checked      &&
            !this.parent.actor_options[option].actor_construct_checked      &&
            !this.parent.actor_options[option].actor_dragon_checked         &&
            !this.parent.actor_options[option].actor_elemental_checked      &&
            !this.parent.actor_options[option].actor_fey_checked            &&
            !this.parent.actor_options[option].actor_fiend_checked          &&
            !this.parent.actor_options[option].actor_giant_checked          &&
            !this.parent.actor_options[option].actor_humanoid_checked       &&
            !this.parent.actor_options[option].actor_monstrosity_checked    &&
            !this.parent.actor_options[option].actor_ooze_checked           &&
            !this.parent.actor_options[option].actor_plant_checked          &&
            !this.parent.actor_options[option].actor_swarm_checked          &&
            !this.parent.actor_options[option].actor_undead_checked);

        // any item or journal options set?
        var no_item_types_selected    = false;
        var no_journal_types_selected = false;
        switch (option) {
            case "actors_with_items":
                no_item_types_selected = (
                    !this.parent.item_options[option2].item_weapon_checked             &&
                    !this.parent.item_options[option2].item_equipment_checked          &&
                    !this.parent.item_options[option2].item_consumable_checked         &&
                    !this.parent.item_options[option2].item_tool_checked               &&
                    !this.parent.item_options[option2].item_loot_checked               &&
                    !this.parent.item_options[option2].item_class_checked              &&
                    !this.parent.item_options[option2].item_feat_checked               &&
                    !this.parent.item_options[option2].item_backpack_checked           &&
                    !this.parent.item_options[option2].item_spell_checked);
                break;
            case "actors_in_journals":
                no_journal_types_selected = (
                    !this.parent.journal_options[option2].journal_base_checked         &&
                    !this.parent.journal_options[option2].journal_checklist_checked    &&
                    !this.parent.journal_options[option2].journal_encounter_checked    &&
                    !this.parent.journal_options[option2].journal_organization_checked &&
                    !this.parent.journal_options[option2].journal_person_checked       &&
                    !this.parent.journal_options[option2].journal_place_checked        &&
                    !this.parent.journal_options[option2].journal_poi_checked          &&
                    !this.parent.journal_options[option2].journal_quest_checked        &&
                    !this.parent.journal_options[option2].journal_shop_checked);
                break;
            case "actors_in_scenes_as_tokens":
                break;
        };

        // escape conflicting characters for regexp searches.
        function escapeRegExp(text) {
            return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        }

        // add an actor to the list.
        function add_actor(parent, actor_name) {

            (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-actor-name-even">` + actor_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-actor-name-odd">` + actor_name + `</p>`;
            list_counter++;

            parent.parent.actor_options[option].actor_count++;
        }

        // add an item to the list.
        function add_item(parent, item_name) {
            if (parent.parent.item_options[option2].item_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-item-name-even">` + item_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-item-name-odd">` + item_name + `</p>`;
                list_counter++;
            }

            parent.parent.actor_options[option2].item_count++;
        }

        // add a macro to the list.
        function add_macro(parent, macro_name) {
            if (parent.parent.item_options[option2].item_show_checked) {
                // add macro to list.
                if (game.macros.getName(macro_name)) {
                    (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-macro-name-even">` + macro_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-macro-name-odd">` + macro_name + `</p>`;
                }
                else
                {
                    (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-macro-name-error-even">` + macro_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-macro-name-error-odd">` + macro_name + `</p>`;
                }
                list_counter++;
            }

            parent.parent.item_options[option2].item_macro_count++;
        }

        // add a journal to the list.
        function add_journal(parent, journal_name) {
            if (parent.parent.journal_options[option2].journal_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-journal-name-even">` + journal_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-journal-name-odd">` + journal_name + `</p>`;
                list_counter++;
            }

            parent.parent.journal_options[option2].journal_count++;
        }

        // add a scene to the list.
        function add_scene(parent, scene_name) {
            if (parent.parent.scene_options[option2].scene_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[option][list_counter] = `<p class="analytics-scene-name-even">` + scene_name + `</p>` : parent.parent.actor_lists[option][list_counter] = `<p class="analytics-scene-name-odd">` + scene_name + `</p>`;
                list_counter++;
            }

            parent.parent.scene_options[option2].scene_count++;
        }

        // for each tab, build the list.
        function build_list(parent, actor) {

            // items.
            switch (option) {
                case "actors_with_items":
                    parent.parent.actor_options[option].item_count = 0;
                    parent.parent.item_options[option2].item_macro_count = 0;

                    // actors without items.
                    if (actor.items.size == 0) {
                        // when looking for macros add actor to list if no item filters or looking for actors without items.
                        if (!parent.parent.item_options[option2].item_macro_checked && (no_item_types_selected || parent.parent.item_options[option2].item_none_checked)) {
                            add_actor(parent, actor.data.name);
                        };
                    };

                    // return if only looking for actors without items.
                    if (parent.parent.item_options[option2].item_none_checked) {
                        return;
                    };

                    // spin through actor's item list ...
                    actor.items.contents.forEach((item, j) => {
                        if (actor.items.contents[j]) {

                            var item_match  = false;
                            var item_name   = item.data.name;
                            var search_name = escapeRegExp(parent.parent.item_options[option2].item_name_value);

                            // lowercase for non-case-sensitive search.
                            if ((search_name.length > 0) && !parent.parent.item_options[option2].item_case_sensitive_checked) {
                                search_name = search_name.toLowerCase();
                                item_name   = item_name.toLowerCase();
                            };

                            // do items match?
                            if ((!parent.parent.item_options[option2].item_exact_match_checked && (item_name.search(search_name) > -1)) ||
                                 (parent.parent.item_options[option2].item_exact_match_checked && (item_name.search(search_name) > -1) && (search_name.length == escapeRegExp(item_name).length)) ||
                                 (search_name.length == 0)) {
                                item_match = true;
                            };

                            // item matches.
                            if (item_match) {
                                var selected = false;

                                if      (no_item_types_selected) selected = true;
                                else if (parent.parent.item_options[option2].item_weapon_checked     && item.type == 'weapon')     selected = true;
                                else if (parent.parent.item_options[option2].item_equipment_checked  && item.type == 'equipment')  selected = true;
                                else if (parent.parent.item_options[option2].item_consumable_checked && item.type == 'consumable') selected = true;
                                else if (parent.parent.item_options[option2].item_tool_checked       && item.type == 'tool')       selected = true;
                                else if (parent.parent.item_options[option2].item_loot_checked       && item.type == 'loot')       selected = true;
                                else if (parent.parent.item_options[option2].item_class_checked      && item.type == 'class')      selected = true;
                                else if (parent.parent.item_options[option2].item_feat_checked       && item.type == 'feat')       selected = true;
                                else if (parent.parent.item_options[option2].item_backpack_checked   && item.type == 'backpack')   selected = true;
                                else if (parent.parent.item_options[option2].item_spell_checked      && item.type == 'spell')      selected = true;

                                if (selected) {
                                    parent.parent.item_options[option2].item_macro_count = 0;

                                    // any macros?
                                    if (parent.parent.item_options[option2].item_macro_checked &&
                                        item.data.flags['midi-qol'] &&
                                        item.data.flags['midi-qol'].onUseMacroParts &&
                                        (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

                                        // spin through item's on use macro list ...
                                        item.data.flags['midi-qol'].onUseMacroParts.items.forEach((macro, k) => {

                                            var macro_match = false;
                                            var macro_name  = item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName;
                                            var search_name = escapeRegExp(parent.parent.item_options[option2].item_macro_name_value);

                                            // lowercase for non-case-sensitive search.
                                            if ((search_name.length > 0) && !parent.parent.item_options[option2].item_macro_case_sensitive_checked) {
                                                search_name = search_name.toLowerCase();
                                                macro_name  = macro_name.toLowerCase();
                                            };

                                            // do macros match?
                                            if ((!parent.parent.item_options[option2].item_macro_exact_match_checked && (macro_name.search(search_name) > -1)) ||
                                                 (parent.parent.item_options[option2].item_macro_exact_match_checked && (macro_name.search(search_name) > -1) && (search_name.length == escapeRegExp(macro_name).length)) ||
                                                 (search_name.length == 0)) {
                                                macro_match = true;
                                            };

                                            // macro matches.
                                            if (macro_match) {
                                                // only add one actor to list.
                                                if (parent.parent.actor_options[option].item_count == 0) {
                                                    add_actor(parent, actor.data.name);
                                                };

                                                // only add one item to list.
                                                if (parent.parent.item_options[option2].item_macro_count == 0) {
                                                    add_item(parent, item.data.name);
                                                };

                                                add_macro(parent, item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName);
                                            }
                                        }); // forEach Macro.
                                    }

                                    else if (!parent.parent.item_options[option2].item_macro_checked) {
                                        // only add one actor to list.
                                        if (parent.parent.actor_options[option].item_count == 0) {
                                            add_actor(parent, actor.data.name);
                                        };

                                        // only add one item to list.
                                        if (parent.parent.item_options[option2].item_macro_count == 0) {
                                            add_item(parent, item.data.name);
                                        };
                                    };
                                };
                            };
                        };
                    }); // forEach Item.
                    break;

                case "actors_in_journals":
                    parent.parent.journal_options[option2].journal_count = 0;

                    // spin through journal list ...
                    game.journal.contents.forEach((journal, j) => {
                        if (game.journal.contents[j]) {

                            var journal_match = false;
                            var actor_name    = actor.data.name;
                            var journal_name  = journal.data.name;
                            var search_name   = escapeRegExp(parent.parent.journal_options[option2].journal_name_value);

                            // lowercase for non-case-sensitive search.
                            if ((search_name.length > 0) && !parent.parent.journal_options[option2].journal_case_sensitive_checked) {
                                search_name  = search_name.toLowerCase();
                                journal_name = journal_name.toLowerCase();
                            };

                            // do journals match?
                            if ((!parent.parent.journal_options[option2].journal_exact_match_checked && (journal_name.search(search_name) > -1)) ||
                                 (parent.parent.journal_options[option2].journal_exact_match_checked && (journal_name.search(search_name) > -1) && (search_name.length == escapeRegExp(journal_name).length)) ||
                                 (search_name.length == 0)) {
                                journal_match = true;
                            };

                            // journal matches.
                            if (journal_match) {
                                var selected = false;
                                if      (no_journal_types_selected || !journal.data.flags['monks-enhanced-journal']) selected = true;
                                else if (parent.parent.journal_options[option2].journal_base_checked         && journal.data.flags['monks-enhanced-journal'].type == 'base')         selected = true;
                                else if (parent.parent.journal_options[option2].journal_checklist_checked    && journal.data.flags['monks-enhanced-journal'].type == 'checklist')    selected = true;
                                else if (parent.parent.journal_options[option2].journal_encounter_checked    && journal.data.flags['monks-enhanced-journal'].type == 'encounter')    selected = true;
                                else if (parent.parent.journal_options[option2].journal_loot_checked         && journal.data.flags['monks-enhanced-journal'].type == 'loot')         selected = true;
                                else if (parent.parent.journal_options[option2].journal_organization_checked && journal.data.flags['monks-enhanced-journal'].type == 'organization') selected = true;
                                else if (parent.parent.journal_options[option2].journal_person_checked       && journal.data.flags['monks-enhanced-journal'].type == 'person')       selected = true;
                                else if (parent.parent.journal_options[option2].journal_place_checked        && journal.data.flags['monks-enhanced-journal'].type == 'place')        selected = true;
                                else if (parent.parent.journal_options[option2].journal_poi_checked          && journal.data.flags['monks-enhanced-journal'].type == 'poi')          selected = true;
                                else if (parent.parent.journal_options[option2].journal_quest_checked        && journal.data.flags['monks-enhanced-journal'].type == 'quest')        selected = true;
                                else if (parent.parent.journal_options[option2].journal_shop_checked         && journal.data.flags['monks-enhanced-journal'].type == 'shop')         selected = true;

                                if (selected) {

                                    // actor links?
                                    if (journal.data.content.search(new RegExp(`@Actor\\[.{16}\\]\\{` + escapeRegExp(actor_name) + `\\}`)) > -1) {

                                        if (parent.parent.journal_options[option2].journal_none_checked) {
                                            parent.parent.journal_options[option2].journal_count++;
                                        }
                                        else
                                        {
                                            // only add one actor and one journal to list.
                                            if (parent.parent.journal_options[option2].journal_count == 0) {
                                                add_actor(parent, actor.data.name);
                                            };
                                            add_journal(parent, journal.data.name);
                                        };
                                    };
                                };
                            };
                        };
                    }); //forEach Journal

                    // actors without journals.
                    if (parent.parent.journal_options[option2].journal_count == 0) {
                        // looking for actors without journals.
                        if (parent.parent.journal_options[option2].journal_none_checked) {
                            add_actor(parent, actor.data.name);
                        };
                    };
                    break;

                case "actors_in_scenes_as_tokens":
                    parent.parent.scene_options[option2].scene_count = 0;

                    // spin through scenes list ...
                    game.scenes.contents.forEach((scene, j) => {
                        if (game.scenes.contents[j]) {

                            var scene_match = false;
                            var actor_name  = actor.data.name;
                            var scene_name  = scene.data.name;
                            var search_name = escapeRegExp(parent.parent.scene_options[option2].scene_name_value);

                            // lowercase for non-case-sensitive search.
                            if ((search_name.length > 0) && !parent.parent.scene_options[option2].scene_case_sensitive_checked) {
                                search_name = search_name.toLowerCase();
                                scene_name  = scene_name.toLowerCase();
                            };

                            // do scenes match?
                            if ((!parent.parent.scene_options[option2].scene_exact_match_checked && (scene_name.search(search_name) > -1)) ||
                                 (parent.parent.scene_options[option2].scene_exact_match_checked && (scene_name.search(search_name) > -1) && (search_name.length == escapeRegExp(scene_name).length)) ||
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
                                        token.actor ? token_name = escapeRegExp(token.actor.name) : token_name = escapeRegExp(token.name);

                                        if (token.actor && (actor_name.search(token_name) > -1) && (token_name.length == escapeRegExp(actor_name).length)) {

                                            if (parent.parent.scene_options[option2].scene_none_checked) {
                                                parent.parent.scene_options[option2].scene_count++;
                                            }
                                            else
                                            {
                                                // only add one actor to list.
                                                if (parent.parent.scene_options[option2].scene_count == 0) {
                                                    add_actor(parent, actor.data.name);
                                                };
                                                add_scene(parent, scene.data.name);
                                            };
                                        };
                                    };
                                });  // ForEach Token
                            };
                        };
                    }); //forEach Scene

                    // actors without scenes.
                    if (parent.parent.scene_options[option2].scene_count == 0) {
                        // looking for actors without scenes.
                        if (parent.parent.scene_options[option2].scene_none_checked) {
                            add_actor(parent, actor.data.name);
                        };
                    };
                    break;
            };
        }

        // spin through actor list ...
        game.actors.contents.forEach((actor, i) => {
            if (game.actors.contents[i]) {

                var name_match  = false;
                var actor_name  = actor.data.name;
                var search_name = escapeRegExp(this.parent.actor_options[option].actor_name_value);

                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.parent.actor_options[option].actor_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };

                // do actors match?
                if ((search_name.length == 0) ||
                    (!this.parent.actor_options[option].actor_exact_match_checked && (actor_name.search(search_name) > -1)) ||
                     (this.parent.actor_options[option].actor_exact_match_checked && (actor_name.search(search_name) > -1) && (search_name.length == escapeRegExp(actor_name).length))) {
                    name_match = true;
                };

                // actor matches.
                if (name_match) {
                    var selected = false;
                    if (no_actor_types_selected && no_creature_types_selected) selected = true;
                    else if (this.parent.actor_options[option].actor_character_checked        && actor.type == 'character') selected = true;
                    else if (this.parent.actor_options[option].actor_vehicle_checked          && actor.type == 'vehicle')   selected = true;
                    else if (this.parent.actor_options[option].actor_npc_checked              && actor.type == 'npc') {
                        if (no_creature_types_selected) selected = true;
                        else if  (this.parent.actor_options[option].actor_aberration_checked  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
                        else if  (this.parent.actor_options[option].actor_beast_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'beast')       selected = true;
                        else if  (this.parent.actor_options[option].actor_celestial_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
                        else if  (this.parent.actor_options[option].actor_construct_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
                        else if  (this.parent.actor_options[option].actor_dragon_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon')      selected = true;
                        else if  (this.parent.actor_options[option].actor_elemental_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
                        else if  (this.parent.actor_options[option].actor_fey_checked         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey')         selected = true;
                        else if  (this.parent.actor_options[option].actor_fiend_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend')       selected = true;
                        else if  (this.parent.actor_options[option].actor_giant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'giant')       selected = true;
                        else if  (this.parent.actor_options[option].actor_humanoid_checked    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
                        else if  (this.parent.actor_options[option].actor_monstrosity_checked && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
                        else if  (this.parent.actor_options[option].actor_ooze_checked        && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze')        selected = true;
                        else if  (this.parent.actor_options[option].actor_plant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'plant')       selected = true;
                        else if  (this.parent.actor_options[option].actor_swarm_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm')       selected = true;
                        else if  (this.parent.actor_options[option].actor_undead_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead')      selected = true;
                    }

                    // add actor to list.
                    if (selected) {
                        build_list(this, actor);
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
