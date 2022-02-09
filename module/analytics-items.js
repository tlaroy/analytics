/***
*
* module/analytics-items.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsItems extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems constructor(parent, dialogData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // item options for each tab.
        this.parent.item_options = Object.assign(this.parent.item_options, {
            "items_in_actors": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                },
            "items_in_compendiums": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                },
            "items_within_items": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                },
            "items_in_journals": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                },
            "items_in_tables": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                },
            "items_with_macros": {
                item_count:                       0,
                item_name_value:                  "",
                item_case_sensitive_checked:      false,
                item_exact_match_checked:         false,

                item_weapon_checked:              false,
                item_equipment_checked:           false,
                item_consumable_checked:          false,
                item_tool_checked:                false,
                item_loot_checked:                false,
                item_class_checked:               false,
                item_feat_checked:                false,
                item_backpack_checked:            false,
                item_spell_checked:               false,

                item_macro_checked:                false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                }
        });

        /* SECONDARY SORT BY TAB */

        // (2) in actors options.
        this.parent.actor_options = Object.assign(this.parent.actor_options, {
            "items_in_actors": {
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

        // (9) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "items_in_compendiums": {
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,

                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (16-16) within items options.
        this.parent.item_options = Object.assign(this.parent.item_options, {
            "items_within_items_16": {
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

                item_macro_checked:               false,
                item_macro_count:                  0,
                item_macro_name_value:             "",
                item_macro_case_sensitive_checked: false,
                item_macro_exact_match_checked:    false,
                }
        });

        // (17) in journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "items_in_journals": {
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

        // (18) with macro options.
        this.parent.macro_options = Object.assign(this.parent.macro_options, {
            "items_with_macros": {
                macro_count:                      0,
                macro_name_value:                 "",
                macro_case_sensitive_checked:     false,
                macro_exact_match_checked:        false,
                }
        });

        // (19) in tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "items_in_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                }
        });

        /* OUTPUT BY TAB */

        // item lists.
        this.parent.item_lists = Object.assign(this.parent.item_lists, {
            "items_in_actors":      [],
            "items_in_compendiums": [],
            "items_within_items":   [],
            "items_in_journals":    [],
            "items_with_macros":    [],
            "items_in_tables":      [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-items",
            template:       "modules/analytics/templates/analytics-items-template.html",
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "items-in-actors"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems static get isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "items-in-actors":
                retval = { primary: "items_in_actors", secondary: "items_in_actors" };
                break;
            case "items-in-compendiums":
                retval = { primary: "items_in_compendiums", secondary: "items_in_compendiums" };
                break;
            case "items-within-items":
                retval = { primary: "items_within_items", secondary: "items_within_items_16" };
                break;
            case "items-in-journals":
                retval = { primary: "items_in_journals", secondary: "items_in_journals" };
                break;
            case "items-with-macros":
                retval = { primary: "items_with_macros", secondary: "items_with_macros" };
                break;
            case "items-in-tables":
                retval = { primary: "items_in_tables", secondary: "items_in_tables" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        // disable on use item macros if midi-qol not installed or not active.
        if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
            document.getElementById("item-macro-label").style.display                = "none";
            document.getElementById("item-macro-note").style.display                 = "none";
            document.getElementById("item-macro-name-label").style.display           = "none";
            document.getElementById("item-macro-name-input").style.display           = "none";
            document.getElementById("item-macro-case-sensitive-label").style.display = "none";
            document.getElementById("item-macro-exact-match-label").style.display    = "none";
            document.getElementById("item-macro-thematic-break").style.display       = "none";
        }

        // toggle macro fields.
        document.getElementById("item-macro-name").disabled           = !this.parent.item_options[option].item_macro_checked;
        document.getElementById("item-macro-case-sensitive").disabled = !this.parent.item_options[option].item_macro_checked;
        document.getElementById("item-macro-exact-match").disabled    = !this.parent.item_options[option].item_macro_checked;

        switch (option) {
            case "items_in_actors":
                // enable/disable npc creature types.
                document.getElementById("in-actor-aberration").disabled  = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-beast").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-celestial").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-construct").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-dragon").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-elemental").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-fey").disabled         = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-fiend").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-giant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-humanoid").disabled    = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-monstrosity").disabled = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-ooze").disabled        = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-plant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-swarm").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("in-actor-undead").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                break;
            case "items_within_items":
                // disable on use item macros if midi-qol not installed or not active.
                if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
                    document.getElementById("within-item-macro-label").style.display                = "none";
                    document.getElementById("within-item-macro-note").style.display                 = "none";
                    document.getElementById("within-item-macro-name-label").style.display           = "none";
                    document.getElementById("within-item-macro-name-input").style.display           = "none";
                    document.getElementById("within-item-macro-case-sensitive-label").style.display = "none";
                    document.getElementById("within-item-macro-exact-match-label").style.display    = "none";
                    document.getElementById("within-item-macro-thematic-break").style.display       = "none";
                }

                // toggle macro fields.
                document.getElementById("within-item-macro-name").disabled           = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("within-item-macro-case-sensitive").disabled = !this.parent.item_options[option2].item_macro_checked;
                document.getElementById("within-item-macro-exact-match").disabled    = !this.parent.item_options[option2].item_macro_checked;
                break;
            case "items_in_journals":
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
        html_list.innerHTML = this.parent.item_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "items_in_actors":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked                 ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

                    "in-actor-name-value":                 this.parent.actor_options[option2].actor_name_value,
                    "in-actor-case-sensitive-checked":     this.parent.actor_options[option2].actor_case_sensitive_checked  ? "checked" : "",
                    "in-actor-exact-match-checked":        this.parent.actor_options[option2].actor_exact_match_checked     ? "checked" : "",
                    "in-actor-none-checked":               this.parent.actor_options[option2].actor_none_checked            ? "checked" : "",
                    "in-actor-show-checked":               this.parent.actor_options[option2].actor_show_checked            ? "checked" : "",

                    "in-actor-npc-checked":                this.parent.actor_options[option2].actor_npc_checked             ? "checked" : "",
                    "in-actor-character-checked":          this.parent.actor_options[option2].actor_character_checked       ? "checked" : "",
                    "in-actor-vehicle-checked":            this.parent.actor_options[option2].actor_vehicle_checked         ? "checked" : "",

                    "in-actor-aberration-checked":         this.parent.actor_options[option2].actor_aberration_checked      ? "checked" : "",
                    "in-actor-beast-checked":              this.parent.actor_options[option2].actor_beast_checked           ? "checked" : "",
                    "in-actor-celestial-checked":          this.parent.actor_options[option2].actor_celestial_checked       ? "checked" : "",
                    "in-actor-construct-checked":          this.parent.actor_options[option2].actor_construct_checked       ? "checked" : "",
                    "in-actor-dragon-checked":             this.parent.actor_options[option2].actor_dragon_checked          ? "checked" : "",
                    "in-actor-elemental-checked":          this.parent.actor_options[option2].actor_elemental_checked       ? "checked" : "",
                    "in-actor-fey-checked":                this.parent.actor_options[option2].actor_fey_checked             ? "checked" : "",
                    "in-actor-fiend-checked":              this.parent.actor_options[option2].actor_fiend_checked           ? "checked" : "",
                    "in-actor-giant-checked":              this.parent.actor_options[option2].actor_giant_checked           ? "checked" : "",
                    "in-actor-humanoid-checked":           this.parent.actor_options[option2].actor_humanoid_checked        ? "checked" : "",
                    "in-actor-monstrosity-checked":        this.parent.actor_options[option2].actor_monstrosity_checked     ? "checked" : "",
                    "in-actor-ooze-checked":               this.parent.actor_options[option2].actor_ooze_checked            ? "checked" : "",
                    "in-actor-plant-checked":              this.parent.actor_options[option2].actor_plant_checked           ? "checked" : "",
                    "in-actor-swarm-checked":              this.parent.actor_options[option2].actor_swarm_checked           ? "checked" : "",
                    "in-actor-undead-checked":             this.parent.actor_options[option2].actor_undead_checked          ? "checked" : "",
                };
                break;
            case "items_in_compendiums":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked               ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "items_within_items":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked               ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

                    "within-item-name-value":                this.parent.item_options[option2].item_name_value,
                    "within-item-case-sensitive-checked":    this.parent.item_options[option2].item_case_sensitive_checked    ? "checked" : "",
                    "within-item-exact-match-checked":       this.parent.item_options[option2].item_exact_match_checked       ? "checked" : "",
                    "within-item-none-checked":              this.parent.item_options[option2].item_none_checked              ? "checked" : "",
                    "within-item-show-checked":              this.parent.item_options[option2].item_show_checked              ? "checked" : "",

                    "within-item-weapon-checked":            this.parent.item_options[option2].item_weapon_checked            ? "checked" : "",
                    "within-item-equipment-checked":         this.parent.item_options[option2].item_equipment_checked         ? "checked" : "",
                    "within-item-consumable-checked":        this.parent.item_options[option2].item_consumable_checked        ? "checked" : "",
                    "within-item-tool-checked":              this.parent.item_options[option2].item_tool_checked              ? "checked" : "",
                    "within-item-loot-checked":              this.parent.item_options[option2].item_loot_checked              ? "checked" : "",
                    "within-item-class-checked":             this.parent.item_options[option2].item_class_checked             ? "checked" : "",
                    "within-item-feat-checked":              this.parent.item_options[option2].item_feat_checked              ? "checked" : "",
                    "within-item-backpack-checked":          this.parent.item_options[option2].item_backpack_checked          ? "checked" : "",
                    "within-item-spell-checked":             this.parent.item_options[option2].item_spell_checked             ? "checked" : "",

                    "within-item-macro-checked":                  this.parent.item_options[option2].item_macro_checked                 ? "checked" : "",
                    "within-item-macro-name-value":               this.parent.item_options[option2].item_macro_name_value,
                    "within-item-macro-case-sensitive-checked":   this.parent.item_options[option2].item_macro_case_sensitive_checked  ? "checked" : "",
                    "within-item-macro-exact-match-checked":      this.parent.item_options[option2].item_macro_exact_match_checked     ? "checked" : "",
                };
                break;
            case "items_in_journals":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked               ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

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
            case "items_with_macros":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked               ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

                    "with-macros-name-value":                 this.parent.macro_options[option2].macro_name_value,
                    "with-macros-case-sensitive-checked":     this.parent.macro_options[option2].macro_case_sensitive_checked ? "checked" : "",
                    "with-macros-exact-match-checked":        this.parent.macro_options[option2].macro_exact_match_checked    ? "checked" : "",
                    "with-macros-none-checked":               this.parent.macro_options[option2].macro_none_checked           ? "checked" : "",
                    "with-macros-show-checked":               this.parent.macro_options[option2].macro_show_checked           ? "checked" : "",
                };
                break;
            case "items_in_tables":
                retval = {
                    "number-of-items":                game.items.size,

                    "item-count":                     this.parent.item_options[option].item_count,
                    "item-name-value":                this.parent.item_options[option].item_name_value,
                    "item-case-sensitive-checked":    this.parent.item_options[option].item_case_sensitive_checked    ? "checked" : "",
                    "item-exact-match-checked":       this.parent.item_options[option].item_exact_match_checked       ? "checked" : "",

                    "item-weapon-checked":            this.parent.item_options[option].item_weapon_checked            ? "checked" : "",
                    "item-equipment-checked":         this.parent.item_options[option].item_equipment_checked         ? "checked" : "",
                    "item-consumable-checked":        this.parent.item_options[option].item_consumable_checked        ? "checked" : "",
                    "item-tool-checked":              this.parent.item_options[option].item_tool_checked              ? "checked" : "",
                    "item-loot-checked":              this.parent.item_options[option].item_loot_checked              ? "checked" : "",
                    "item-class-checked":             this.parent.item_options[option].item_class_checked             ? "checked" : "",
                    "item-feat-checked":              this.parent.item_options[option].item_feat_checked              ? "checked" : "",
                    "item-backpack-checked":          this.parent.item_options[option].item_backpack_checked          ? "checked" : "",
                    "item-spell-checked":             this.parent.item_options[option].item_spell_checked             ? "checked" : "",

                    "item-macro-checked":                  this.parent.item_options[option].item_macro_checked               ? "checked" : "",
                    "item-macro-name-value":               this.parent.item_options[option].item_macro_name_value,
                    "item-macro-case-sensitive-checked":   this.parent.item_options[option].item_macro_case_sensitive_checked  ? "checked" : "",
                    "item-macro-exact-match-checked":      this.parent.item_options[option].item_macro_exact_match_checked     ? "checked" : "",

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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "items-in-actors":
                option = "items_in_actors";
                retval = !this.parent.actor_options["items_in_actors"].actor_submitted;
                break;
            case "items-in-compendiums":
                option = "items_in_compendiums";
                retval = !this.parent.compendium_options["items_in_compendiums"].compendium_submitted;
                break;
            case "items-within-items":
                option = "items_witnin_items";
                retval = !this.parent.item_options["items_within_items"].item_submitted;
                break;
            case "items-in-journals":
                option = "items_in_journals";
                retval = !this.parent.journal_options["items_in_journals"].journal_submitted;
                break;
            case "items-with-macros":
                option = "items_with_macros";
                retval = !this.parent.macro_options["items_with_macros"].macro_submitted;
                break;
            case "items-in-tables":
                option = "items_in_tables";
                retval = !this.parent.table_options["items_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.item_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _onSubmit(event)");

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
            case "items_in_actors":
                if (!this.parent.actor_options["items_in_actors"].actor_submitted)
                     this.parent.actor_options["items_in_actors"].actor_submitted = true;
                break;
            case "items_in_compendiums":
                if (!this.parent.compendium_options["items_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["items_in_compendiums"].compendium_submitted = true;
                break;
            case "items_within_items":
                if (!this.parent.item_options["items_within_items"].item_submitted)
                     this.parent.item_options["items_within_items"].item_submitted = true;
                break;
            case "items_in_journals":
                if (!this.parent.journal_options["items_in_journals"].journal_submitted)
                     this.parent.journal_options["items_in_journals"].journal_submitted = true;
                break;
            case "items_with_macros":
                if (!this.parent.macro_options["items_with_macros"].macro_submitted)
                     this.parent.macro_options["items_with_macros"].macro_submitted = true;
                break;
            case "items_in_tables":
                if (!this.parent.table_options["items_in_tables"].table_options)
                     this.parent.table_options["items_in_tables"].table_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsItems async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.item_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.item_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "items_in_actors":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.actor_options[option2].actor_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_compendiums":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "items_within_items":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.item_options[option2].item_count = 0;
                this.parent.item_options[option2].item_macro_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_journals":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_with_macros":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.macro_options[option2].macro_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "items_in_tables":
                this.parent.item_options[option].item_count = 0;
                this.parent.item_options[option].item_macro_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.item_lists[option].splice(0, this.parent.item_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
