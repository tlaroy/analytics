/***
*
* module/analytics-scenes.js
*
* version 0.0.8
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsScenes extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes constructor(parent, formData, options)");

        super(formData, options);

        // save parent.
        this.parent = parent;

        /* PRIMARY SORT */

        // scene options for each tab.
        this.parent.scene_options = Object.assign(this.parent.scene_options, {
            "scenes_with_actors_as_tokens": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_in_compendiums": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_in_journals": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_with_journals": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_with_journals_as_pins": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_with_playlists": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_in_tables": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
            "scenes_with_tiles": {
                scene_count:                         0,
                scene_name_value:                    "",
                scene_case_sensitive_checked:        false,
                scene_exact_match_checked:           false,
                },
        });

        /* SECONDARY SORT BY TAB */

        // (4) with actors as tokens options.
        this.parent.actor_options = Object.assign(this.parent.actor_options, {
            "scenes_with_actors_as_tokens": {
                actor_npc_checked:                   false,
                actor_character_checked:             false,
                actor_vehicle_checked:               false,

                actor_aberration_checked:            false,
                actor_beast_checked:                 false,
                actor_celestial_checked:             false,
                actor_construct_checked:             false,
                actor_dragon_checked:                false,
                actor_elemental_checked:             false,
                actor_fey_checked:                   false,
                actor_fiend_checked:                 false,
                actor_giant_checked:                 false,
                actor_humanoid_checked:              false,
                actor_monstrosity_checked:           false,
                actor_ooze_checked:                  false,
                actor_plant_checked:                 false,
                actor_swarm_checked:                 false,
                actor_undead_checked:                false,
                }
        });

        // (13) in compendiums options.
        this.parent.compendium_options = Object.assign(this.parent.compendium_options, {
            "scenes_in_compendiums": {
                compendium_count:                  0,
                compendium_name_value:             "",
                compendium_case_sensitive_checked: false,
                compendium_exact_match_checked:    false,

                compendium_none_checked:           false,
                compendium_show_checked:           false,
                }
        });

        // (23) in journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "scenes_in_journals": {
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

        // (24) with journals options.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "scenes_with_journals": {
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

        // (25) with journals as pins option pins.
        this.parent.journal_options = Object.assign(this.parent.journal_options, {
            "scenes_with_journals_as_pins": {
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

        // (30) with playlists options.
        this.parent.playlist_options = Object.assign(this.parent.playlist_options, {
            "scenes_with_playlists": {
                playlist_count:                  0,
                playlist_name_value:             "",
                playlist_case_sensitive_checked: false,
                playlist_exact_match_checked:    false,

                playlist_none_checked:           false,
                playlist_show_checked:           false,
                }
        });

        // (32) in tables options.
        this.parent.table_options = Object.assign(this.parent.table_options, {
            "scenes_in_tables": {
                table_count:                  0,
                table_name_value:             "",
                table_case_sensitive_checked: false,
                table_exact_match_checked:    false,

                table_none_checked:           false,
                table_show_checked:           false,
                },
        });

        // (34) with tiles options.
        this.parent.tile_options = Object.assign(this.parent.tile_options, {
            "scenes_with_tiles": {
                tile_count:                         0,
                tile_name_value:                    "",
                tile_case_sensitive_checked:        false,
                tile_exact_match_checked:           false,
                }
        });

        /* OUTPUT BY TAB */

        // scene lists.
        this.parent.scene_lists = Object.assign(this.parent.scene_lists, {
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
            classes:       ["sheet", "scene-sheet"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "scenes-with-actors-as-tokens"}]
        });
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes show()");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes hide()");

        this.close();
    }

    optionKeys() {
        // map tab name to object keys.
        var retval = { };
        switch (this._tabs[0].active) {
            case "scenes-with-actors-as-tokens":
                retval = { primary: "scenes_with_actors_as_tokens", secondary: "scenes_with_actors_as_tokens" };
                break;
            case "scenes-in-compendiums":
                retval = { primary: "scenes_in_compendiums", secondary: "scenes_in_compendiums" };
                break;
            case "scenes-in-journals":
                retval = { primary: "scenes_in_journals", secondary: "scenes_in_journals" };
                break;
            case "scenes-with-journals":
                retval = { primary: "scenes_with_journals", secondary: "scenes_with_journals" };
                break;
            case "scenes-with-journals-as-pins":
                retval = { primary: "scenes_with_journals_as_pins", secondary: "scenes_with_journals_as_pins" };
                break;
            case "scenes-with-playlists":
                retval = { primary: "scenes_with_playlists", secondary: "scenes_with_playlists" };
                break;
            case "scenes-in-tables":
                retval = { primary: "scenes_in_tables", secondary: "scenes_in_tables" };
                break;
            case "scenes-with-tiles":
                retval = { primary: "scenes_with_tiles", secondary: "scenes_with_tiles" };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();

        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;

        switch (option) {
            case "scenes_with_actors_as_tokens":
                // enable/disable npc creature types.
                document.getElementById("with-actor-as-token-aberration").disabled  = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-beast").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-celestial").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-construct").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-dragon").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-elemental").disabled   = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-fey").disabled         = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-fiend").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-giant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-humanoid").disabled    = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-monstrosity").disabled = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-ooze").disabled        = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-plant").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-swarm").disabled       = !this.parent.actor_options[option2].actor_npc_checked;
                document.getElementById("with-actor-as-token-undead").disabled      = !this.parent.actor_options[option2].actor_npc_checked;
                break;
            case "scenes_in_journals":
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
            case "scenes_with_journals":
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
            case "scenes_with_journals_as_pins":
                // disable journal subtypes if monk's enhanced journal not installed or not active.
                if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
                    document.getElementById("with-journal-as-pin-monks-base").style.display         = "none";
                    document.getElementById("with-journal-as-pin-monks-checklist").style.display    = "none";
                    document.getElementById("with-journal-as-pin-monks-encounter").style.display    = "none";
                    document.getElementById("with-journal-as-pin-monks-loot").style.display         = "none";
                    document.getElementById("with-journal-as-pin-monks-organization").style.display = "none";
                    document.getElementById("with-journal-as-pin-monks-person").style.display       = "none";
                    document.getElementById("with-journal-as-pin-monks-place").style.display        = "none";
                    document.getElementById("with-journal-as-pin-monks-poi").style.display          = "none";
                    document.getElementById("with-journal-as-pin-monks-quest").style.display        = "none";
                    document.getElementById("with-journal-as-pin-monks-shop").style.display         = "none";
                }
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.parent.scene_lists[option].join("");
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes getData()");

        // SET key (id) values in the form.
        var option  = this.optionKeys().primary;
        var option2 = this.optionKeys().secondary;
        var retval  = {};
        switch (option) {
            case "scenes_with_actors_as_tokens":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "with-actor-as-token-name-value":                 this.parent.actor_options[option2].actor_name_value,
                    "with-actor-as-token-case-sensitive-checked":     this.parent.actor_options[option2].actor_case_sensitive_checked  ? "checked" : "",
                    "with-actor-as-token-exact-match-checked":        this.parent.actor_options[option2].actor_exact_match_checked     ? "checked" : "",
                    "with-actor-as-token-none-checked":               this.parent.actor_options[option2].actor_none_checked            ? "checked" : "",
                    "with-actor-as-toekn-show-checked":               this.parent.actor_options[option2].actor_show_checked            ? "checked" : "",

                    "with-actor-as-token-npc-checked":                this.parent.actor_options[option2].actor_npc_checked             ? "checked" : "",
                    "with-actor-as-token-character-checked":          this.parent.actor_options[option2].actor_character_checked       ? "checked" : "",
                    "with-actor-as-token-vehicle-checked":            this.parent.actor_options[option2].actor_vehicle_checked         ? "checked" : "",

                    "with-actor-as-token-aberration-checked":         this.parent.actor_options[option2].actor_aberration_checked      ? "checked" : "",
                    "with-actor-as-token-beast-checked":              this.parent.actor_options[option2].actor_beast_checked           ? "checked" : "",
                    "with-actor-as-token-celestial-checked":          this.parent.actor_options[option2].actor_celestial_checked       ? "checked" : "",
                    "with-actor-as-token-construct-checked":          this.parent.actor_options[option2].actor_construct_checked       ? "checked" : "",
                    "with-actor-as-token-dragon-checked":             this.parent.actor_options[option2].actor_dragon_checked          ? "checked" : "",
                    "with-actor-as-token-elemental-checked":          this.parent.actor_options[option2].actor_elemental_checked       ? "checked" : "",
                    "with-actor-as-token-fey-checked":                this.parent.actor_options[option2].actor_fey_checked             ? "checked" : "",
                    "with-actor-as-token-fiend-checked":              this.parent.actor_options[option2].actor_fiend_checked           ? "checked" : "",
                    "with-actor-as-token-giant-checked":              this.parent.actor_options[option2].actor_giant_checked           ? "checked" : "",
                    "with-actor-as-token-humanoid-checked":           this.parent.actor_options[option2].actor_humanoid_checked        ? "checked" : "",
                    "with-actor-as-token-monstrosity-checked":        this.parent.actor_options[option2].actor_monstrosity_checked     ? "checked" : "",
                    "with-actor-as-token-ooze-checked":               this.parent.actor_options[option2].actor_ooze_checked            ? "checked" : "",
                    "with-actor-as-token-plant-checked":              this.parent.actor_options[option2].actor_plant_checked           ? "checked" : "",
                    "with-actor-as-token-swarm-checked":              this.parent.actor_options[option2].actor_swarm_checked           ? "checked" : "",
                    "with-actor-as-token-undead-checked":             this.parent.actor_options[option2].actor_undead_checked          ? "checked" : "",
                };
                break;
            case "scenes_in_compendiums":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "in-compendium-name-value":             this.parent.compendium_options[option2].compendium_name_value,
                    "in-compendium-case-sensitive-checked": this.parent.compendium_options[option2].compendium_case_sensitive_checked    ? "checked" : "",
                    "in-compendium-exact-match-checked":    this.parent.compendium_options[option2].compendium_exact_match_checked       ? "checked" : "",
                    "in-compendium-none-checked":           this.parent.compendium_options[option2].compendium_none_checked              ? "checked" : "",
                    "in-compendium-show-checked":           this.parent.compendium_options[option2].compendium_show_checked              ? "checked" : "",
                };
                break;
            case "scenes_in_journals":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

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
            case "scenes_with_journals":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

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
            case "scenes_with_journals_as_pins":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "with-journal-as-pin-name-value":             this.parent.journal_options[option2].journal_name_value,
                    "with-journal-as-pin-case-sensitive-checked": this.parent.journal_options[option2].journal_case_sensitive_checked ? "checked" : "",
                    "with-journal-as-pin-exact-match-checked":    this.parent.journal_options[option2].journal_exact_match_checked    ? "checked" : "",
                    "with-journal-as-pin-none-checked":           this.parent.journal_options[option2].journal_none_checked           ? "checked" : "",
                    "with-journal-as-pin-show-checked":           this.parent.journal_options[option2].journal_show_checked           ? "checked" : "",

                    "with-journal-as-pin-base-checked":           this.parent.journal_options[option2].journal_base_checked           ? "checked" : "",
                    "with-journal-as-pin-checklist-checked":      this.parent.journal_options[option2].journal_checklist_checked      ? "checked" : "",
                    "with-journal-as-pin-encounter-checked":      this.parent.journal_options[option2].journal_encounter_checked      ? "checked" : "",
                    "with-journal-as-pin-loot-checked":           this.parent.journal_options[option2].journal_loot_checked           ? "checked" : "",
                    "with-journal-as-pin-organization-checked":   this.parent.journal_options[option2].journal_organization_checked   ? "checked" : "",
                    "with-journal-as-pin-person-checked":         this.parent.journal_options[option2].journal_person_checked         ? "checked" : "",
                    "with-journal-as-pin-place-checked":          this.parent.journal_options[option2].journal_place_checked          ? "checked" : "",
                    "with-journal-as-pin-poi-checked":            this.parent.journal_options[option2].journal_poi_checked            ? "checked" : "",
                    "with-journal-as-pin-quest-checked":          this.parent.journal_options[option2].journal_quest_checked          ? "checked" : "",
                    "with-journal-as-pin-shop-checked":           this.parent.journal_options[option2].journal_shop_checked           ? "checked" : "",
                };
                break;
            case "scenes_with_playlists":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "with-playlists-name-value":              this.parent.playlist_options[option2].playlists_name_value,
                    "with-playlists-case-sensitive-checked":  this.parent.playlist_options[option2].playlists_case_sensitive_checked ? "checked" : "",
                    "with-playlists-exact-match-checked":     this.parent.playlist_options[option2].playlists_exact_match_checked    ? "checked" : "",
                    "with-playlists-none-checked":            this.parent.playlist_options[option2].playlists_none_checked           ? "checked" : "",
                    "with-playlists-show-checked":            this.parent.playlist_options[option2].playlists_show_checked           ? "checked" : "",
                };
                break;
            case "scenes_in_tables":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "in-table-name-value":                  this.parent.table_options[option2].table_name_value,
                    "in-table-case-sensitive-checked":      this.parent.table_options[option2].table_case_sensitive_checked    ? "checked" : "",
                    "in-table-exact-match-checked":         this.parent.table_options[option2].table_exact_match_checked       ? "checked" : "",
                    "in-table-none-checked":                this.parent.table_options[option2].table_none_checked              ? "checked" : "",
                    "in-table-show-checked":                this.parent.table_options[option2].table_show_checked              ? "checked" : "",
                };
                break;
            case "scenes_with_tiles":
                retval = {
                    "number-of-scenes":             game.scenes.size,

                    "scene-count":                  this.parent.scene_options[option].scene_count,
                    "scene-name-value":             this.parent.scene_options[option].scene_name_value,
                    "scene-case-sensitive-checked": this.parent.scene_options[option].scene_case_sensitive_checked  ? "checked" : "",
                    "scene-exact-match-checked":    this.parent.scene_options[option].scene_exact_match_checked     ? "checked" : "",

                    "with-tile-name-value":                  this.parent.tile_options[option2].tile_name_value,
                    "with-tile-case-sensitive-checked":      this.parent.tile_options[option2].tile_case_sensitive_checked    ? "checked" : "",
                    "with-tile-exact-match-checked":         this.parent.tile_options[option2].tile_exact_match_checked       ? "checked" : "",
                    "with-tile-none-checked":                this.parent.tile_options[option2].tile_none_checked              ? "checked" : "",
                    "with-tile-show-checked":                this.parent.tile_options[option2].tile_show_checked              ? "checked" : "",
                };
                break;
        };
        return retval;
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var option = "";
        var retval = false;
        switch (active) {
            case "scenes-with-actors-as-tokens":
                option = "scenes_with_actors_as_tokens";
                retval = !this.parent.actor_options["scenes_with_actors_as_tokens"].actor_submitted;
                break;
            case "scenes-in-compendiums":
                option = "scenes_in_compendiums";
                retval = !this.parent.compendium_options["scenes_in_compendiums"].compendium_submitted;
                break;
            case "scenes-in-journals":
                option = "scenes_in_journals";
                retval = !this.parent.journal_options["scenes_in_journals"].journal_submitted;
                break;
            case "scenes-with-journals":
                option = "scenes_with_journals";
                retval = !this.parent.journal_options["scenes_with_journals"].journal_submitted;
                break;
            case "scenes-with-journals-as-pins":
                option = "scenes_with_journals_as_pins";
                retval = !this.parent.journal_options["scenes_with_journals_as_pins"].journal_submitted;
                break;
            case "scenes-with-playlists":
                option = "scenes_with_playlists";
                retval = !this.parent.playlist_options["scenes_with_playlists"].playlist_submitted;
                break;
            case "scenes-in-tables":
                option = "scenes_in_tables";
                retval = !this.parent.table_options["scenes_in_tables"].table_submitted;
                break;
            case "scenes-with-tiles":
                option = "scenes_with_tiles";
                retval = !this.parent.tile_options["scenes_with_tiles"].tile_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (this.parent.scene_lists[option].length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
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

        // set update flag when changing tabs if tab never submitted.
        switch (this.optionKeys().primary) {
            case "scenes_with_actors_as_tokens":
                if (!this.parent.actor_options["scenes_with_actors_as_tokens"].actor_submitted)
                     this.parent.actor_options["scenes_with_actors_as_tokens"].actor_submitted = true;
                break;
            case "scenes_in_compendiums":
                if (!this.parent.compendium_options["scenes_in_compendiums"].compendium_submitted)
                     this.parent.compendium_options["scenes_in_compendiums"].compendium_submitted = true;
                break;
            case "scenes_in_journals":
                if (!this.parent.journal_options["scenes_in_journals"].journal_submitted)
                     this.parent.journal_options["scenes_in_journals"].journal_submitted = true;
                break;
            case "scenes_with_journals_as_pins":
                if (!this.parent.journal_options["scenes_with_journals_as_pins"].journal_submitted)
                     this.parent.journal_options["scenes_with_journals_as_pins"].journal_submitted = true;
                break;
            case "scenes_with_playlists":
                if (!this.parent.playlist_options["scenes_with_playlists"].playlist_submitted)
                     this.parent.playlist_options["scenes_with_playlists"].playlist_submitted = true;
                break;
            case "scenes_in_tables":
                if (!this.parent.table_options["scenes_in_tables"].table_options)
                     this.parent.table_options["scenes_in_tables"].table_options = true;
                break;
            case "scenes_with_tiles":
                if (!this.parent.tile_options["scenes_with_tiles"].tile_options)
                     this.parent.tile_options["scenes_with_tiles"].tile_options = true;
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsScenes async _updateObject(event, formData)");

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
            (list_counter % 2 == 0) ? parent.parent.scene_lists[option][list_counter] = `<p class="analytics-message-even">` + message + `</p>` : parent.parent.scene_lists[option][list_counter] = `<p class="analytics-message-odd">` + message + `</p>`;
            list_counter++;
        }

        // reset lists.
        switch (option) {
            case "scenes_with_actors_as_tokens":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.actor_options[option2].actor_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_in_compendiums":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.compendium_options[option2].compendium_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "scenes_in_journals":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_journals":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_journals_as_pins":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.journal_options[option2].journal_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase1"));
                this.render(true);
                return;
                break;
            case "scenes_with_playlists":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.playlist_options[option2].playlist_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "scenes_in_tables":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.table_options[option2].table_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
            case "scenes_with_tiles":
                this.parent.scene_options[option].scene_count = 0;
                this.parent.tile_options[option2].tile_count = 0;
                this.parent.scene_lists[option].splice(0, this.parent.scene_lists[option].length);

                add_message(this, i18n("ANALYTICS.Phase2"));
                this.render(true);
                return;
                break;
        };

        // re-draw the updated form
        this.render(true);
    }
}
