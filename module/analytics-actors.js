/***
*
* module/analytics-actors.js
*
* version 0.0.6
*
*/

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends FormApplication {

    constructor(parent, dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors constructor(dialogData, options)");

        super(dialogData, options);

		// save parent.
        this.parent = parent;

		// actor options.
        this.parent.actor_options = { 
			"actor_items": {
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
			"actor_journals": {
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
			"actor_scenes": {
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
		};

		// item options.
        this.parent.item_options = {
			"actor_items": {
				item_count:						0,
				item_name_value:                "",
				item_case_sensitive_checked:    false,
				item_exact_match_checked:       false,
				item_none_checked:              false,
				item_show_checked:              false,

				item_weapon_checked:            false,
				item_equipment_checked:         false,
				item_consumable_checked:        false,
				item_tool_checked:              false,
				item_loot_checked:              false,
				item_class_checked:             false,
				item_feat_checked:              false,
				item_backpack_checked:          false,
				item_spell_checked:             false,
				}
		};

		// macro options (TEMP. migrate to Macros/Items dialog).
        this.parent.macro_options = {
			"actor_items": {
				item_macro_checked:             false,
				macro_count:					0,
				macro_name_value:               "",
				macro_case_sensitive_checked:   false,
				macro_exact_match_checked:      false,
				}
		};

		// journal options.
        this.parent.journal_options = {
			"actor_journals": {
				journal_count:					0,
				journal_name_value:             "",
				journal_case_sensitive_checked: false,
				journal_exact_match_checked:    false,
				journal_none_checked:           false,
				journal_show_checked:           false,

				journal_base_checked:    	    false,
				journal_checklist_checked:      false,
				journal_encounter_checked:      false,
				journal_loot_checked:    	    false,
				journal_organization_checked:   false,
				journal_person_checked:    	    false,
				journal_place_checked:          false,
				journal_poi_checked:    	    false,
				journal_quest_checked:    	    false,
				journal_shop_checked:    	    false,
				}
		};

		// scene options.
        this.parent.scene_options = {
			"actor_scenes": {
				scene_count:					0,
				scene_name_value:               "",
				scene_exact_match_checked:      false,
				scene_none_checked:             false,
				scene_show_checked:             false,
				}
        };

		// actor lists.
        this.parent.actor_lists = { 
			"actor_items":    [],
			"actor_journals": [],
			"actor_scenes":   [],
		};

		// flags to skip update when changing tabs if tab never submitted.
		this.item_tab_first_submit    = false;
		this.journal_tab_first_submit = false;
		this.scene_tab_first_submit   = false;
		this.changing_tabs			  = false;
    }

    static get isVisible() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors static isVisible()");

        for (const app of Object.values(ui.windows)) {
            if (app instanceof this) return app;
        }
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION + " - " + i18n("DOCUMENT.Actors"),
            id:             "analytics-actors",
            template:       "modules/analytics/templates/analytics-actors-template.html",
			classes: 	   ["sheet", "scene-sheet"],
            width:          700,
            height:         700,
            resizable:      true,
            closeOnSubmit:  false,
			tabs: 		   [{navSelector: ".tabs", contentSelector: "form", initial: "actor-items"}]
        });
    }

    show(inFocus = false) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors show(inFocus)");

        return this.render(true);
    }

    hide() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors hide()");

        this.close();
    }

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate();

        // inject actor_list into form.
        const html_list     = document.getElementById("analytics-list");

		// map tab name to object key.
		var obj_key = "";
		switch (this._tabs[0].active) {
			case "actor-items":
				obj_key = "actor_items";
				break;
			case "actor-journals":
				obj_key = "actor_journals";
				break;
			case "actor-scenes":
				obj_key = "actor_scenes";
				break;
		};

		// join active list.
		html_list.innerHTML = this.parent.actor_lists[obj_key].join("");

        // toggle npc creature types.
        document.getElementById("actor-aberration").disabled  = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-beast").disabled       = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-celestial").disabled   = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-construct").disabled   = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-dragon").disabled      = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-elemental").disabled   = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-fey").disabled         = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-fiend").disabled       = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-giant").disabled       = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-humanoid").disabled    = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-monstrosity").disabled = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-ooze").disabled        = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-plant").disabled       = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-swarm").disabled       = !this.parent.actor_options[obj_key].actor_npc_checked;
        document.getElementById("actor-undead").disabled      = !this.parent.actor_options[obj_key].actor_npc_checked;

		switch (this._tabs[0].active) {
			case "actor-items":
				// enable on use item macros if midi-qol installed and active.
				if (game.modules.get("midi-qol") && game.modules.get("midi-qol").active) {
					document.getElementById("item-macro").style.display     	  		= "block";
					document.getElementById("item-macro-label").style.display     		= "block";
					document.getElementById("item-macro-note").style.display      		= "block";
					document.getElementById("macro-name").style.display     			= "block";
					document.getElementById("macro-name-label").style.display     		= "block";
					document.getElementById("macro-case-sensitive").style.display 		= "block";
					document.getElementById("macro-case-sensitive-label").style.display = "block";
					document.getElementById("macro-exact-match").style.display    		= "block";
					document.getElementById("macro-exact-match-label").style.display    = "block";
					document.getElementById("macro-thematic-break").style.display       = "block";
				}
				else {
					document.getElementById("item-macro").style.display     			= "none";
					document.getElementById("item-macro-label").style.display     		= "none";
					document.getElementById("item-macro-note").style.display     		= "none";
					document.getElementById("macro-name").style.display     			= "none";
					document.getElementById("macro-name-label").style.display     		= "none";
					document.getElementById("macro-case-sensitive").style.display 		= "none";
					document.getElementById("macro-case-sensitive-label").style.display = "none";
					document.getElementById("macro-exact-match").style.display    		= "none";
					document.getElementById("macro-exact-match-label").style.display    = "none";
					document.getElementById("macro-thematic-break").style.display    	= "none";
				}

				// toggle macro fields.
				document.getElementById("macro-name").disabled           = !this.parent.macro_options[obj_key].item_macro_checked;
				document.getElementById("macro-case-sensitive").disabled = !this.parent.macro_options[obj_key].item_macro_checked;
				document.getElementById("macro-exact-match").disabled    = !this.parent.macro_options[obj_key].item_macro_checked;
				break;
			case "actor-journals":
				// enable journal subtypes if monk's enhanced journal installed and active.
				if (game.modules.get("monks-enhanced-journal") && game.modules.get("monks-enhanced-journal").active) {
					document.getElementById("journal-base").style.display     	  		= "block";
					document.getElementById("journal-base-label").style.display     	= "block";
					document.getElementById("journal-checklist").style.display     	  	= "block";
					document.getElementById("journal-checklist-label").style.display    = "block";
					document.getElementById("journal-encounter").style.display     	  	= "block";
					document.getElementById("journal-encounter-label").style.display    = "block";
					document.getElementById("journal-loot").style.display     	  		= "block";
					document.getElementById("journal-loot-label").style.display    		= "block";
					document.getElementById("journal-organization").style.display     	= "block";
					document.getElementById("journal-organization-label").style.display = "block";
					document.getElementById("journal-person").style.display     	  	= "block";
					document.getElementById("journal-person-label").style.display     	= "block";
					document.getElementById("journal-place").style.display     	  		= "block";
					document.getElementById("journal-place-label").style.display     	= "block";
					document.getElementById("journal-poi").style.display     	  		= "block";
					document.getElementById("journal-poi-label").style.display     	  	= "block";
					document.getElementById("journal-quest").style.display     	  		= "block";
					document.getElementById("journal-quest-label").style.display     	= "block";
					document.getElementById("journal-shop").style.display     	  		= "block";
					document.getElementById("journal-shop-label").style.display     	= "block";
				}
				else {
					document.getElementById("journal-base").style.display     	  		= "none";
					document.getElementById("journal-base-label").style.display     	= "none";
					document.getElementById("journal-checklist").style.display     	  	= "none";
					document.getElementById("journal-checklist-label").style.display    = "none";
					document.getElementById("journal-encounter").style.display     	  	= "none";
					document.getElementById("journal-encounter-label").style.display    = "none";
					document.getElementById("journal-loot").style.display     	  		= "none";
					document.getElementById("journal-loot-label").style.display    		= "none";
					document.getElementById("journal-organization").style.display     	= "none";
					document.getElementById("journal-organization-label").style.display = "none";
					document.getElementById("journal-person").style.display     	  	= "none";
					document.getElementById("journal-person-label").style.display     	= "none";
					document.getElementById("journal-place").style.display     	  		= "none";
					document.getElementById("journal-place-label").style.display     	= "none";
					document.getElementById("journal-poi").style.display     	  		= "none";
					document.getElementById("journal-poi-label").style.display     	  	= "none";
					document.getElementById("journal-quest").style.display     	  		= "none";
					document.getElementById("journal-quest-label").style.display     	= "none";
					document.getElementById("journal-shop").style.display     	  		= "none";
					document.getElementById("journal-shop-label").style.display     	= "none";
				}
				break;
		};
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors getData()");

		// SET key values in the form.
		var obj_key = "";
		var ret_val = {};
		switch (this._tabs[0].active) {
			case "actor-items":
				obj_key = "actor_items";
				ret_val = {
					"number-of-actors":               game.actors.size,

					"actor-count":                    this.parent.actor_options[obj_key].actor_count,
					"actor-name-value":               this.parent.actor_options[obj_key].actor_name_value,
					"actor-case-sensitive-checked":   this.parent.actor_options[obj_key].actor_case_sensitive_checked  ? "checked" : "",
					"actor-exact-match-checked":      this.parent.actor_options[obj_key].actor_exact_match_checked     ? "checked" : "",
					
					"actor-npc-checked":              this.parent.actor_options[obj_key].actor_npc_checked             ? "checked" : "",
					"actor-character-checked":        this.parent.actor_options[obj_key].actor_character_checked       ? "checked" : "",
					"actor-vehicle-checked":          this.parent.actor_options[obj_key].actor_vehicle_checked         ? "checked" : "",
					
					"actor-aberration-checked":       this.parent.actor_options[obj_key].actor_aberration_checked      ? "checked" : "",
					"actor-beast-checked":            this.parent.actor_options[obj_key].actor_beast_checked           ? "checked" : "",
					"actor-celestial-checked":        this.parent.actor_options[obj_key].actor_celestial_checked       ? "checked" : "",
					"actor-construct-checked":        this.parent.actor_options[obj_key].actor_construct_checked       ? "checked" : "",
					"actor-dragon-checked":           this.parent.actor_options[obj_key].actor_dragon_checked          ? "checked" : "",
					"actor-elemental-checked":        this.parent.actor_options[obj_key].actor_elemental_checked       ? "checked" : "",
					"actor-fey-checked":              this.parent.actor_options[obj_key].actor_fey_checked             ? "checked" : "",
					"actor-fiend-checked":            this.parent.actor_options[obj_key].actor_fiend_checked           ? "checked" : "",
					"actor-giant-checked":            this.parent.actor_options[obj_key].actor_giant_checked           ? "checked" : "",
					"actor-humanoid-checked":         this.parent.actor_options[obj_key].actor_humanoid_checked        ? "checked" : "",
					"actor-monstrosity-checked":      this.parent.actor_options[obj_key].actor_monstrosity_checked     ? "checked" : "",
					"actor-ooze-checked":             this.parent.actor_options[obj_key].actor_ooze_checked            ? "checked" : "",
					"actor-plant-checked":            this.parent.actor_options[obj_key].actor_plant_checked           ? "checked" : "",
					"actor-swarm-checked":            this.parent.actor_options[obj_key].actor_swarm_checked           ? "checked" : "",
					"actor-undead-checked":           this.parent.actor_options[obj_key].actor_undead_checked          ? "checked" : "",

					"item-name-value":                this.parent.item_options[obj_key].item_name_value,               
					"item-case-sensitive-checked":    this.parent.item_options[obj_key].item_case_sensitive_checked    ? "checked" : "",
					"item-exact-match-checked":       this.parent.item_options[obj_key].item_exact_match_checked       ? "checked" : "",
					"item-none-checked":              this.parent.item_options[obj_key].item_none_checked              ? "checked" : "",
					"item-show-checked":              this.parent.item_options[obj_key].item_show_checked              ? "checked" : "",

					"item-weapon-checked":            this.parent.item_options[obj_key].item_weapon_checked            ? "checked" : "",
					"item-equipment-checked":         this.parent.item_options[obj_key].item_equipment_checked         ? "checked" : "",
					"item-consumable-checked":        this.parent.item_options[obj_key].item_consumable_checked        ? "checked" : "",
					"item-tool-checked":              this.parent.item_options[obj_key].item_tool_checked              ? "checked" : "",
					"item-loot-checked":              this.parent.item_options[obj_key].item_loot_checked              ? "checked" : "",
					"item-class-checked":             this.parent.item_options[obj_key].item_class_checked             ? "checked" : "",
					"item-feat-checked":              this.parent.item_options[obj_key].item_feat_checked              ? "checked" : "",
					"item-backpack-checked":          this.parent.item_options[obj_key].item_backpack_checked          ? "checked" : "",
					"item-spell-checked":             this.parent.item_options[obj_key].item_spell_checked             ? "checked" : "",

					"item-macro-checked":             this.parent.macro_options[obj_key].item_macro_checked            ? "checked" : "",
					"macro-name-value":               this.parent.macro_options[obj_key].macro_name_value,              
					"macro-case-sensitive-checked":   this.parent.macro_options[obj_key].macro_case_sensitive_checked  ? "checked" : "",
					"macro-exact-match-checked":      this.parent.macro_options[obj_key].macro_exact_match_checked     ? "checked" : "",
				};
				break;
				
			case "actor-journals":
				obj_key = "actor_journals";
				ret_val = {
					"number-of-actors":               game.actors.size,

					"actor-count":                    this.parent.actor_options[obj_key].actor_count,
					"actor-name-value":               this.parent.actor_options[obj_key].actor_name_value,
					"actor-case-sensitive-checked":   this.parent.actor_options[obj_key].actor_case_sensitive_checked     ? "checked" : "",
					"actor-exact-match-checked":      this.parent.actor_options[obj_key].actor_exact_match_checked        ? "checked" : "",
 
					"actor-npc-checked":              this.parent.actor_options[obj_key].actor_npc_checked                ? "checked" : "",
					"actor-character-checked":        this.parent.actor_options[obj_key].actor_character_checked          ? "checked" : "",
					"actor-vehicle-checked":          this.parent.actor_options[obj_key].actor_vehicle_checked            ? "checked" : "",

					"actor-aberration-checked":       this.parent.actor_options[obj_key].actor_aberration_checked         ? "checked" : "",
					"actor-beast-checked":            this.parent.actor_options[obj_key].actor_beast_checked              ? "checked" : "",
					"actor-celestial-checked":        this.parent.actor_options[obj_key].actor_celestial_checked          ? "checked" : "",
					"actor-construct-checked":        this.parent.actor_options[obj_key].actor_construct_checked          ? "checked" : "",
					"actor-dragon-checked":           this.parent.actor_options[obj_key].actor_dragon_checked             ? "checked" : "",
					"actor-elemental-checked":        this.parent.actor_options[obj_key].actor_elemental_checked          ? "checked" : "",
					"actor-fey-checked":              this.parent.actor_options[obj_key].actor_fey_checked                ? "checked" : "",
					"actor-fiend-checked":            this.parent.actor_options[obj_key].actor_fiend_checked              ? "checked" : "",
					"actor-giant-checked":            this.parent.actor_options[obj_key].actor_giant_checked              ? "checked" : "",
					"actor-humanoid-checked":         this.parent.actor_options[obj_key].actor_humanoid_checked           ? "checked" : "",
					"actor-monstrosity-checked":      this.parent.actor_options[obj_key].actor_monstrosity_checked        ? "checked" : "",
					"actor-ooze-checked":             this.parent.actor_options[obj_key].actor_ooze_checked               ? "checked" : "",
					"actor-plant-checked":            this.parent.actor_options[obj_key].actor_plant_checked              ? "checked" : "",
					"actor-swarm-checked":            this.parent.actor_options[obj_key].actor_swarm_checked              ? "checked" : "",
					"actor-undead-checked":           this.parent.actor_options[obj_key].actor_undead_checked             ? "checked" : "",

					"journal-name-value":             this.parent.journal_options[obj_key].journal_name_value,
					"journal-case-sensitive-checked": this.parent.journal_options[obj_key].journal_case_sensitive_checked ? "checked" : "",
					"journal-exact-match-checked":    this.parent.journal_options[obj_key].journal_exact_match_checked    ? "checked" : "",
					"journal-none-checked":           this.parent.journal_options[obj_key].journal_none_checked           ? "checked" : "",
					"journal-show-checked":           this.parent.journal_options[obj_key].journal_show_checked           ? "checked" : "",

					"journal-base-checked":    		  this.parent.journal_options[obj_key].journal_base_checked    	      ? "checked" : "",
					"journal-checklist-checked":      this.parent.journal_options[obj_key].journal_checklist_checked      ? "checked" : "",
					"journal-encounter-checked":      this.parent.journal_options[obj_key].journal_encounter_checked      ? "checked" : "",
					"journal-loot-checked":    		  this.parent.journal_options[obj_key].journal_loot_checked 		  ? "checked" : "",
					"journal-organization-checked":   this.parent.journal_options[obj_key].journal_organization_checked   ? "checked" : "",
					"journal-person-checked":    	  this.parent.journal_options[obj_key].journal_person_checked         ? "checked" : "",
					"journal-place-checked":    	  this.parent.journal_options[obj_key].journal_place_checked    	  ? "checked" : "",
					"journal-poi-checked":    		  this.parent.journal_options[obj_key].journal_poi_checked    	      ? "checked" : "",
					"journal-quest-checked":    	  this.parent.journal_options[obj_key].journal_quest_checked    	  ? "checked" : "",
					"journal-shop-checked":    		  this.parent.journal_options[obj_key].journal_shop_checked    	      ? "checked" : "",
				};
				break;
				
			case "actor-scenes":
				obj_key = "actor_scenes";
				ret_val = {
					"number-of-actors":               game.actors.size,

					"actor-count":                    this.parent.actor_options[obj_key].actor_count,
					"actor-name-value":               this.parent.actor_options[obj_key].actor_name_value,
					"actor-case-sensitive-checked":   this.parent.actor_options[obj_key].actor_case_sensitive_checked   ? "checked" : "",
					"actor-exact-match-checked":      this.parent.actor_options[obj_key].actor_exact_match_checked      ? "checked" : "",
					
					"actor-npc-checked":              this.parent.actor_options[obj_key].actor_npc_checked              ? "checked" : "",
					"actor-character-checked":        this.parent.actor_options[obj_key].actor_character_checked        ? "checked" : "",
					"actor-vehicle-checked":          this.parent.actor_options[obj_key].actor_vehicle_checked          ? "checked" : "",
					
					"actor-aberration-checked":       this.parent.actor_options[obj_key].actor_aberration_checked       ? "checked" : "",
					"actor-beast-checked":            this.parent.actor_options[obj_key].actor_beast_checked            ? "checked" : "",
					"actor-celestial-checked":        this.parent.actor_options[obj_key].actor_celestial_checked        ? "checked" : "",
					"actor-construct-checked":        this.parent.actor_options[obj_key].actor_construct_checked        ? "checked" : "",
					"actor-dragon-checked":           this.parent.actor_options[obj_key].actor_dragon_checked           ? "checked" : "",
					"actor-elemental-checked":        this.parent.actor_options[obj_key].actor_elemental_checked        ? "checked" : "",
					"actor-fey-checked":              this.parent.actor_options[obj_key].actor_fey_checked              ? "checked" : "",
					"actor-fiend-checked":            this.parent.actor_options[obj_key].actor_fiend_checked            ? "checked" : "",
					"actor-giant-checked":            this.parent.actor_options[obj_key].actor_giant_checked            ? "checked" : "",
					"actor-humanoid-checked":         this.parent.actor_options[obj_key].actor_humanoid_checked         ? "checked" : "",
					"actor-monstrosity-checked":      this.parent.actor_options[obj_key].actor_monstrosity_checked      ? "checked" : "",
					"actor-ooze-checked":             this.parent.actor_options[obj_key].actor_ooze_checked             ? "checked" : "",
					"actor-plant-checked":            this.parent.actor_options[obj_key].actor_plant_checked            ? "checked" : "",
					"actor-swarm-checked":            this.parent.actor_options[obj_key].actor_swarm_checked            ? "checked" : "",
					"actor-undead-checked":           this.parent.actor_options[obj_key].actor_undead_checked           ? "checked" : "",

					"scene-name-value":               this.parent.scene_options[obj_key].scene_name_value,
					"scene-case-sensitive-checked":   this.parent.scene_options[obj_key].scene_case_sensitive_checked   ? "checked" : "",
					"scene-exact-match-checked":      this.parent.scene_options[obj_key].scene_exact_match_checked      ? "checked" : "",
					"scene-none-checked":             this.parent.scene_options[obj_key].scene_none_checked             ? "checked" : "",
					"scene-show-checked":             this.parent.scene_options[obj_key].scene_show_checked             ? "checked" : "",
				};
				break;
		};
		return ret_val;
    }

	async _onChangeTab(event, tabs, active) {
		if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onChangeTab()");

		super._onChangeTab(event, tabs, active);

		this.changing_tabs = true;

		// update with null formData if tab never submitted.
		if (((active == "actor-items")    && !this.item_tab_first_submit) || 
		    ((active == "actor-journals") && !this.journal_tab_first_submit) || 
		    ((active == "actor-scenes")   && !this.scene_tab_first_submit)) {
			await this._updateObject(event, null);
		}
		else
		{
			// map active tab to output list.
			var output_list = "";
			switch (active) {
				case "actor-items":
					output_list	= "actor_items";
					break;
				case "actor-journals":
					output_list	= "actor_journals";
					break;
				case "actor-scenes":
					output_list	= "actor_scenes";
					break;
			};
			
			// update with saved list or submitted data.
			if (this.parent.actor_lists[output_list].length > 0)
				await this._updateObject(event, null);
			else
				await this._updateObject(event, this._getSubmitData());
		};

		this.changing_tabs = false;
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

		// flag to skip update when changing tabs if tab never submitted.
		switch (this._tabs[0].active) {
			case "actor-items":
				if (!this.item_tab_first_submit)    this.item_tab_first_submit    = true; 
				break;
			case "actor-journals":
				if (!this.journal_tab_first_submit) this.journal_tab_first_submit = true; 
				break;
			case "actor-scenes":
				if (!this.scene_tab_first_submit)   this.scene_tab_first_submit   = true; 
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

		// reset counters.
        var list_counter = 0;

		// map tab name to object key and reset lists.
		var obj_key = "";
		switch (this._tabs[0].active) {
			case "actor-items":
				obj_key = "actor_items";
				this.parent.actor_options[obj_key].actor_count = 0;
				this.parent.item_options[obj_key].item_count   = 0;
				this.parent.macro_options[obj_key].macro_count = 0;
				this.parent.actor_lists[obj_key].splice(0, this.parent.actor_lists[obj_key].length);
				break;
			case "actor-journals":
				obj_key = "actor_journals";
				this.parent.actor_options[obj_key].actor_count     = 0;
				this.parent.journal_options[obj_key].journal_count = 0;
				this.parent.actor_lists[obj_key].splice(0, this.parent.actor_lists[obj_key].length);
				break;
			case "actor-scenes":
				obj_key = "actor_scenes";
				this.parent.actor_options[obj_key].actor_count = 0;
				this.parent.scene_options[obj_key].scene_count = 0;
				this.parent.actor_lists[obj_key].splice(0, this.parent.actor_lists[obj_key].length);
				break;
		};

		// spin the submit button icon and disable.
		let button      = document.getElementById("analytics-submit");
		button.disabled = true;
		const icon 		= button.querySelector("i");
		icon.className  = "fas fa-spinner fa-pulse";
		
		const delay = ms => new Promise(res => setTimeout(res, ms));
		await delay(20);

		// pull in the form data.
        const data = expandObject(formData);

		// GET the key values from the submitted form unless changing tabs.
		if (!this.changing_tabs) {
			for ( let [k, v] of Object.entries(data) ) {
				if (k == "actor-name")             { this.parent.actor_options[obj_key].actor_name_value               = v ? v : ""; }
				if (k == "actor-case-sensitive")   { this.parent.actor_options[obj_key].actor_case_sensitive_checked   = v; }
				if (k == "actor-exact-match")      { this.parent.actor_options[obj_key].actor_exact_match_checked      = v; }
				
				if (k == "actor-npc")              { this.parent.actor_options[obj_key].actor_npc_checked              = v; }
				if (k == "actor-character")        { this.parent.actor_options[obj_key].actor_character_checked        = v; }
				if (k == "actor-vehicle")          { this.parent.actor_options[obj_key].actor_vehicle_checked          = v; }
				
				if (k == "actor-aberration")       { this.parent.actor_options[obj_key].actor_aberration_checked       = v; }
				if (k == "actor-beast")            { this.parent.actor_options[obj_key].actor_beast_checked            = v; }
				if (k == "actor-celestial")        { this.parent.actor_options[obj_key].actor_celestial_checked        = v; }
				if (k == "actor-construct")        { this.parent.actor_options[obj_key].actor_construct_checked        = v; }
				if (k == "actor-dragon")           { this.parent.actor_options[obj_key].actor_dragon_checked           = v; }
				if (k == "actor-elemental")        { this.parent.actor_options[obj_key].actor_elemental_checked        = v; }
				if (k == "actor-fey")              { this.parent.actor_options[obj_key].actor_fey_checked              = v; }
				if (k == "actor-fiend")            { this.parent.actor_options[obj_key].actor_fiend_checked            = v; }
				if (k == "actor-giant")            { this.parent.actor_options[obj_key].actor_giant_checked            = v; }
				if (k == "actor-humanoid")         { this.parent.actor_options[obj_key].actor_humanoid_checked         = v; }
				if (k == "actor-monstrosity")      { this.parent.actor_options[obj_key].actor_monstrosity_checked      = v; }
				if (k == "actor-ooze")             { this.parent.actor_options[obj_key].actor_ooze_checked             = v; }
				if (k == "actor-plant")            { this.parent.actor_options[obj_key].actor_plant_checked            = v; }
				if (k == "actor-swarm")            { this.parent.actor_options[obj_key].actor_swarm_checked            = v; }
				if (k == "actor-undead")           { this.parent.actor_options[obj_key].actor_undead_checked           = v; }

				switch (obj_key) {
					case "actor_items":
						if (k == "item-name")              { this.parent.item_options[obj_key].item_name_value                   = v ? v : ""; }
						if (k == "item-case-sensitive")    { this.parent.item_options[obj_key].item_case_sensitive_checked       = v; }
						if (k == "item-exact-match")       { this.parent.item_options[obj_key].item_exact_match_checked          = v; }
						if (k == "item-none")              { this.parent.item_options[obj_key].item_none_checked                 = v; }
						if (k == "item-show")              { this.parent.item_options[obj_key].item_show_checked                 = v; }

						if (k == "item-weapon")            { this.parent.item_options[obj_key].item_weapon_checked               = v; }
						if (k == "item-equipment")         { this.parent.item_options[obj_key].item_equipment_checked            = v; }
						if (k == "item-consumable")        { this.parent.item_options[obj_key].item_consumable_checked           = v; }
						if (k == "item-tool")              { this.parent.item_options[obj_key].item_tool_checked                 = v; }
						if (k == "item-loot")              { this.parent.item_options[obj_key].item_loot_checked                 = v; }
						if (k == "item-class")             { this.parent.item_options[obj_key].item_class_checked                = v; }
						if (k == "item-feat")              { this.parent.item_options[obj_key].item_feat_checked                 = v; }
						if (k == "item-backpack")          { this.parent.item_options[obj_key].item_backpack_checked             = v; }
						if (k == "item-spell")             { this.parent.item_options[obj_key].item_spell_checked                = v; }

						if (k == "item-macro")             { this.parent.macro_options[obj_key].item_macro_checked               = v; }
						if (k == "macro-name")             { this.parent.macro_options[obj_key].macro_name_value                 = v ? v : ""; }
						if (k == "macro-case-sensitive")   { this.parent.macro_options[obj_key].macro_case_sensitive_checked     = v; }
						if (k == "macro-exact-match")      { this.parent.macro_options[obj_key].macro_exact_match_checked        = v; }
						break;

					case "actor_journals":
						if (k == "journal-name")           { this.parent.journal_options[obj_key].journal_name_value             = v ? v : ""; }
						if (k == "journal-case-sensitive") { this.parent.journal_options[obj_key].journal_case_sensitive_checked = v; }
						if (k == "journal-exact-match")    { this.parent.journal_options[obj_key].journal_exact_match_checked    = v; }
						if (k == "journal-none")           { this.parent.journal_options[obj_key].journal_none_checked           = v; }
						if (k == "journal-show")           { this.parent.journal_options[obj_key].journal_show_checked           = v; }

						if (k == "journal-base")           { this.parent.journal_options[obj_key].journal_base_checked    	     = v; }
						if (k == "journal-checklist")      { this.parent.journal_options[obj_key].journal_checklist_checked      = v; }
						if (k == "journal-encounter")      { this.parent.journal_options[obj_key].journal_encounter_checked      = v; }
						if (k == "journal-loot")    	   { this.parent.journal_options[obj_key].journal_loot_checked    	     = v; }
						if (k == "journal-organization")   { this.parent.journal_options[obj_key].journal_organization_checked   = v; }
						if (k == "journal-person")         { this.parent.journal_options[obj_key].journal_person_checked         = v; }
						if (k == "journal-place")          { this.parent.journal_options[obj_key].journal_place_checked          = v; }
						if (k == "journal-poi")            { this.parent.journal_options[obj_key].journal_poi_checked    	     = v; }
						if (k == "journal-quest")          { this.parent.journal_options[obj_key].journal_quest_checked    	     = v; }
						if (k == "journal-shop")           { this.parent.journal_options[obj_key].journal_shop_checked    	     = v; }
						break;

					case "actor_scenes":
						if (k == "scene-name")             { this.parent.scene_options[obj_key].scene_name_value                 = v ? v : ""; }
						if (k == "scene-case-sensitive")   { this.parent.scene_options[obj_key].scene_case_sensitive_checked     = v; }
						if (k == "scene-exact-match")      { this.parent.scene_options[obj_key].scene_exact_match_checked        = v; }
						if (k == "scene-none")             { this.parent.scene_options[obj_key].scene_none_checked               = v; }
						if (k == "scene-show")             { this.parent.scene_options[obj_key].scene_show_checked               = v; }
						break;
				};
			};
		};

		// any actor options set?
        var no_actor_types_selected = (
            !this.parent.actor_options[obj_key].actor_npc_checked            &&
            !this.parent.actor_options[obj_key].actor_character_checked      &&
            !this.parent.actor_options[obj_key].actor_vehicle_checked);

		// any actor creature options set?
        var no_creature_types_selected = (
            !this.parent.actor_options[obj_key].actor_aberration_checked     &&
            !this.parent.actor_options[obj_key].actor_beast_checked          &&
            !this.parent.actor_options[obj_key].actor_celestial_checked      &&
            !this.parent.actor_options[obj_key].actor_construct_checked      &&
            !this.parent.actor_options[obj_key].actor_dragon_checked         &&
            !this.parent.actor_options[obj_key].actor_elemental_checked      &&
            !this.parent.actor_options[obj_key].actor_fey_checked            &&
            !this.parent.actor_options[obj_key].actor_fiend_checked          &&
            !this.parent.actor_options[obj_key].actor_giant_checked          &&
            !this.parent.actor_options[obj_key].actor_humanoid_checked       &&
            !this.parent.actor_options[obj_key].actor_monstrosity_checked    &&
            !this.parent.actor_options[obj_key].actor_ooze_checked           &&
            !this.parent.actor_options[obj_key].actor_plant_checked          &&
            !this.parent.actor_options[obj_key].actor_swarm_checked          &&
            !this.parent.actor_options[obj_key].actor_undead_checked);

		// any item or journal options set?
		var no_item_types_selected    = false;
		var no_journal_types_selected = false;
		switch (obj_key) {
			case "actor_items":
				no_item_types_selected = (
					!this.parent.item_options[obj_key].item_weapon_checked             &&
					!this.parent.item_options[obj_key].item_equipment_checked          &&
					!this.parent.item_options[obj_key].item_consumable_checked         &&
					!this.parent.item_options[obj_key].item_tool_checked               &&
					!this.parent.item_options[obj_key].item_loot_checked               &&
					!this.parent.item_options[obj_key].item_class_checked              &&
					!this.parent.item_options[obj_key].item_feat_checked               &&
					!this.parent.item_options[obj_key].item_backpack_checked           &&
					!this.parent.item_options[obj_key].item_spell_checked);
				break;
			case "actor_journals":
				no_journal_types_selected = (
					!this.parent.journal_options[obj_key].journal_base_checked         &&
					!this.parent.journal_options[obj_key].journal_checklist_checked    &&
					!this.parent.journal_options[obj_key].journal_encounter_checked    &&
					!this.parent.journal_options[obj_key].journal_organization_checked &&
					!this.parent.journal_options[obj_key].journal_person_checked       &&
					!this.parent.journal_options[obj_key].journal_place_checked        &&
					!this.parent.journal_options[obj_key].journal_poi_checked    	   &&
					!this.parent.journal_options[obj_key].journal_quest_checked        &&
					!this.parent.journal_options[obj_key].journal_shop_checked);
				break;
			case "actor_scenes":
				break;
		};

		// escape conflicting characters for regexp searches.
		function escapeRegExp(text) {
		  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); // \s spaces ? no.
		  //return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
		}

		// add an actor to the list.
        function add_actor(parent, actor_name) {

            (list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-actor-name-even">` + actor_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-actor-name-odd">` + actor_name + `</p>`;
            list_counter++;

			parent.parent.actor_options[obj_key].actor_count++;
        }

		// add an item to the list.
        function add_item(parent, item_name) {
            if (parent.parent.item_options[obj_key].item_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-item-name-even">` + item_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-item-name-odd">` + item_name + `</p>`;
                list_counter++;
            }

            parent.parent.actor_options[obj_key].item_count++;
        }

		// add a macro to the list.
        function add_macro(parent, macro_name) {
            if (parent.parent.item_options[obj_key].item_show_checked) {
				// add macro to list.
				if (game.macros.getName(macro_name)) {
					(list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-macro-name-even">` + macro_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-macro-name-odd">` + macro_name + `</p>`;
				}
				else
				{
					(list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-macro-name-error-even">` + macro_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-macro-name-error-odd">` + macro_name + `</p>`;
				}
                list_counter++;
            }

            parent.parent.macro_options[obj_key].macro_count++;
        }

		// add a journal to the list.
        function add_journal(parent, journal_name) {
            if (parent.parent.journal_options[obj_key].journal_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-journal-name-even">` + journal_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-journal-name-odd">` + journal_name + `</p>`;
                list_counter++;
            }

            parent.parent.journal_options[obj_key].journal_count++;
        }

		// add a scene to the list.
        function add_scene(parent, scene_name) {
            if (parent.parent.scene_options[obj_key].scene_show_checked) {
                (list_counter % 2 == 0) ? parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-scene-name-even">` + scene_name + `</p>` : parent.parent.actor_lists[obj_key][list_counter] = `<p class="analytics-scene-name-odd">` + scene_name + `</p>`;
                list_counter++;
            }

            parent.parent.scene_options[obj_key].scene_count++;
        }

		// for each tab, build the list.
        function build_list(parent, actor) {

			// items.
			switch (obj_key) {
				case "actor_items":
					parent.parent.actor_options[obj_key].item_count  = 0;
					parent.parent.macro_options[obj_key].macro_count = 0;

					// actors without items.
					if (actor.items.size == 0) {
						// when looking for macros add actor to list if no item filters or looking for actors without items.
						if (!parent.parent.macro_options[obj_key].item_macro_checked && (no_item_types_selected || parent.parent.item_options[obj_key].item_none_checked)) {
							add_actor(parent, actor.data.name);
						};
					};

					// return if only looking for actors without items.
					if (parent.parent.item_options[obj_key].item_none_checked) {
						return;
					};

					// spin through actor's item list ...
					actor.items.contents.forEach((item, j) => {
						if (actor.items.contents[j]) {

							var item_match  = false;
							var item_name   = item.data.name;
							var search_name = escapeRegExp(parent.parent.item_options[obj_key].item_name_value);

							// lowercase for non-case-sensitive search.
							if ((search_name.length > 0) && !parent.parent.item_options[obj_key].item_case_sensitive_checked) {
								search_name = search_name.toLowerCase();
								item_name   = item_name.toLowerCase();
							};

							// do items match?
							if ((!parent.parent.item_options[obj_key].item_exact_match_checked && (item_name.search(search_name) > -1)) ||
								 (parent.parent.item_options[obj_key].item_exact_match_checked && (item_name.search(search_name) > -1) && (search_name.length == escapeRegExp(item_name).length)) ||
								 (search_name.length == 0)) {
								item_match = true;
							};

							// item matches.
							if (item_match) {
								var selected = false;

								if      (no_item_types_selected) selected = true;
								else if (parent.parent.item_options[obj_key].item_weapon_checked     && item.type == 'weapon')     selected = true;
								else if (parent.parent.item_options[obj_key].item_equipment_checked  && item.type == 'equipment')  selected = true;
								else if (parent.parent.item_options[obj_key].item_consumable_checked && item.type == 'consumable') selected = true;
								else if (parent.parent.item_options[obj_key].item_tool_checked       && item.type == 'tool')       selected = true;
								else if (parent.parent.item_options[obj_key].item_loot_checked       && item.type == 'loot')       selected = true;
								else if (parent.parent.item_options[obj_key].item_class_checked      && item.type == 'class')      selected = true;
								else if (parent.parent.item_options[obj_key].item_feat_checked       && item.type == 'feat')       selected = true;
								else if (parent.parent.item_options[obj_key].item_backpack_checked   && item.type == 'backpack')   selected = true;
								else if (parent.parent.item_options[obj_key].item_spell_checked      && item.type == 'spell')      selected = true;

								if (selected) {
									parent.parent.macro_options[obj_key].macro_count = 0;

									// any macros?
									if (parent.parent.macro_options[obj_key].item_macro_checked &&
										item.data.flags['midi-qol'] &&
										item.data.flags['midi-qol'].onUseMacroParts &&
										(item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

										// spin through item's on use macro list ...
										item.data.flags['midi-qol'].onUseMacroParts.items.forEach((macro, k) => {

											var macro_match = false;
											var macro_name  = item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName;
											var search_name = escapeRegExp(parent.parent.macro_options[obj_key].macro_name_value);

											// lowercase for non-case-sensitive search.
											if ((search_name.length > 0) && !parent.parent.macro_options[obj_key].macro_case_sensitive_checked) {
												search_name = search_name.toLowerCase();
												macro_name  = macro_name.toLowerCase();
											};

											// do macros match?
											if ((!parent.parent.macro_options[obj_key].macro_exact_match_checked && (macro_name.search(search_name) > -1)) ||
												 (parent.parent.macro_options[obj_key].macro_exact_match_checked && (macro_name.search(search_name) > -1) && (search_name.length == escapeRegExp(macro_name).length)) ||
												 (search_name.length == 0)) {
												macro_match = true;
											};

											// macro matches.
											if (macro_match) {
												// only add one actor to list.
												if (parent.parent.actor_options[obj_key].item_count == 0) {
													add_actor(parent, actor.data.name);
												};

												// only add one item to list.
												if (parent.parent.macro_options[obj_key].macro_count == 0) {
													add_item(parent, item.data.name);
												};

												add_macro(parent, item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName);
											}
										}); // forEach Macro.
									}

									else if (!parent.parent.macro_options[obj_key].item_macro_checked) {
										// only add one actor to list.
										if (parent.parent.actor_options[obj_key].item_count == 0) {
											add_actor(parent, actor.data.name);
										};

										// only add one item to list.
										if (parent.parent.macro_options[obj_key].macro_count == 0) {
											add_item(parent, item.data.name);
										};
									};
								};
							};
						};
					}); // forEach Item.
					break;
					
				case "actor_journals":
					parent.parent.journal_options[obj_key].journal_count = 0;

					// spin through journal list ...
					game.journal.contents.forEach((journal, j) => {
						if (game.journal.contents[j]) {

							var journal_match = false;
							var actor_name    = actor.data.name;
							var journal_name  = journal.data.name;
							var search_name   = escapeRegExp(parent.parent.journal_options[obj_key].journal_name_value);

							// lowercase for non-case-sensitive search.
							if ((search_name.length > 0) && !parent.parent.journal_options[obj_key].journal_case_sensitive_checked) {
								search_name  = search_name.toLowerCase();
								journal_name = journal_name.toLowerCase();
							};

							// do journals match?
							if ((!parent.parent.journal_options[obj_key].journal_exact_match_checked && (journal_name.search(search_name) > -1)) ||
								 (parent.parent.journal_options[obj_key].journal_exact_match_checked && (journal_name.search(search_name) > -1) && (search_name.length == escapeRegExp(journal_name).length)) ||
								 (search_name.length == 0)) {
								journal_match = true;
							};

							// journal matches.
							if (journal_match) {
								var selected = false;
								if      (no_journal_types_selected || !journal.data.flags['monks-enhanced-journal']) selected = true;
								else if (parent.parent.journal_options[obj_key].journal_base_checked     	 && journal.data.flags['monks-enhanced-journal'].type == 'base')     	 selected = true;
								else if (parent.parent.journal_options[obj_key].journal_checklist_checked  	 && journal.data.flags['monks-enhanced-journal'].type == 'checklist')    selected = true;
								else if (parent.parent.journal_options[obj_key].journal_encounter_checked 	 && journal.data.flags['monks-enhanced-journal'].type == 'encounter')    selected = true;
								else if (parent.parent.journal_options[obj_key].journal_loot_checked       	 && journal.data.flags['monks-enhanced-journal'].type == 'loot')         selected = true;
								else if (parent.parent.journal_options[obj_key].journal_organization_checked && journal.data.flags['monks-enhanced-journal'].type == 'organization') selected = true;
								else if (parent.parent.journal_options[obj_key].journal_person_checked       && journal.data.flags['monks-enhanced-journal'].type == 'person')       selected = true;
								else if (parent.parent.journal_options[obj_key].journal_place_checked        && journal.data.flags['monks-enhanced-journal'].type == 'place')        selected = true;
								else if (parent.parent.journal_options[obj_key].journal_poi_checked   		 && journal.data.flags['monks-enhanced-journal'].type == 'poi')   	     selected = true;
								else if (parent.parent.journal_options[obj_key].journal_quest_checked      	 && journal.data.flags['monks-enhanced-journal'].type == 'quest')        selected = true;
								else if (parent.parent.journal_options[obj_key].journal_shop_checked      	 && journal.data.flags['monks-enhanced-journal'].type == 'shop')         selected = true;

								if (selected) {
									
									// actor links?
									if (journal.data.content.search(new RegExp(`@Actor\\[.{16}\\]\\{` + escapeRegExp(actor_name) + `\\}`)) > -1) {

										if (parent.parent.journal_options[obj_key].journal_none_checked) {
											parent.parent.journal_options[obj_key].journal_count++;
										}
										else
										{
											// only add one actor and one journal to list.
											if (parent.parent.journal_options[obj_key].journal_count == 0) {
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
					if (parent.parent.journal_options[obj_key].journal_count == 0) {
						// looking for actors without journals.
						if (parent.parent.journal_options[obj_key].journal_none_checked) {
							add_actor(parent, actor.data.name);
						};
					};
					break;

				case "actor_scenes":
					parent.parent.scene_options[obj_key].scene_count = 0;
					
					// spin through scenes list ...
					game.scenes.contents.forEach((scene, j) => {
						if (game.scenes.contents[j]) {

							var scene_match = false;
							var actor_name  = actor.data.name;
							var scene_name  = scene.data.name;
							var search_name = escapeRegExp(parent.parent.scene_options[obj_key].scene_name_value);

							// lowercase for non-case-sensitive search.
							if ((search_name.length > 0) && !parent.parent.scene_options[obj_key].scene_case_sensitive_checked) {
								search_name = search_name.toLowerCase();
								scene_name  = scene_name.toLowerCase();
							};

							// do scenes match?
							if ((!parent.parent.scene_options[obj_key].scene_exact_match_checked && (scene_name.search(search_name) > -1)) ||
								 (parent.parent.scene_options[obj_key].scene_exact_match_checked && (scene_name.search(search_name) > -1) && (search_name.length == escapeRegExp(scene_name).length)) ||
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

										if (token.actor && (actor_name.search(token_name) > -1) && (actor_name.length == token_name.length)) {
											if (parent.parent.scene_options[obj_key].scene_none_checked) {
												parent.parent.scene_options[obj_key].scene_count++;
											}
											else
											{
												// only add one actor to list.
												if (parent.parent.scene_options[obj_key].scene_count == 0) {
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
					if (parent.parent.scene_options[obj_key].scene_count == 0) {
						// looking for actors without scenes.
						if (parent.parent.scene_options[obj_key].scene_none_checked) {
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
                var search_name = escapeRegExp(this.parent.actor_options[obj_key].actor_name_value);
				
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.parent.actor_options[obj_key].actor_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };

                // do actors match?
                if ((search_name.length == 0) ||
                    (!this.parent.actor_options[obj_key].actor_exact_match_checked && (actor_name.search(search_name) > -1)) ||
                     (this.parent.actor_options[obj_key].actor_exact_match_checked && (actor_name.search(search_name) > -1) && (search_name.length == escapeRegExp(actor_name).length))) {
                    name_match = true;
                };

                // actor matches.
                if (name_match) {
                    var selected = false;
                    if (no_actor_types_selected && no_creature_types_selected) selected = true;
                    else if (this.parent.actor_options[obj_key].actor_character_checked        && actor.type == 'character') selected = true;
                    else if (this.parent.actor_options[obj_key].actor_vehicle_checked          && actor.type == 'vehicle')   selected = true;
                    else if (this.parent.actor_options[obj_key].actor_npc_checked              && actor.type == 'npc') {
                        if (no_creature_types_selected) selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_aberration_checked  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_beast_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'beast')       selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_celestial_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_construct_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_dragon_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon')      selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_elemental_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_fey_checked         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey')         selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_fiend_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend')       selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_giant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'giant')       selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_humanoid_checked    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_monstrosity_checked && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_ooze_checked        && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze')        selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_plant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'plant')       selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_swarm_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm')       selected = true;
                        else if  (this.parent.actor_options[obj_key].actor_undead_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead')      selected = true;
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
