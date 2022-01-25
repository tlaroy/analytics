import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends FormApplication {

    constructor(parent, dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors constructor(dialogData, options)");

        super(dialogData, options);

        this.parent = parent;
        this.parent.actor_item_options = {
            "actor_name_value":    			"",
            "actor_case_sensitive_checked": false,
            "actor_exact_match_checked":    false,
            "actor_npc_checked":            false,
            "actor_character_checked":      false,
            "actor_vehicle_checked":        false,
            "actor_aberration_checked":     false,
            "actor_beast_checked":          false,
            "actor_celestial_checked":      false,
            "actor_construct_checked":      false,
            "actor_dragon_checked":         false,
            "actor_elemental_checked":      false,
            "actor_fey_checked":            false,
            "actor_fiend_checked":          false,
            "actor_giant_checked":          false,
            "actor_humanoid_checked":       false,
            "actor_monstrosity_checked":    false,
            "actor_ooze_checked":           false,
            "actor_plant_checked":          false,
            "actor_swarm_checked":          false,
            "actor_undead_checked":         false,
            "item_name_value":     		    "",
            "item_case_sensitive_checked":  false,
            "item_exact_match_checked":     false,
            "item_none_checked":            false,
            "item_weapon_checked":          false,
            "item_equipment_checked":       false,
            "item_consumable_checked":      false,
            "item_tool_checked":            false,
            "item_loot_checked":            false,
            "item_class_checked":           false,
            "item_feat_checked":            false,
            "item_backpack_checked":        false,
            "item_spell_checked":           false,
            "item_show_checked":            false,
        };

        this.item_count  = 0;
        this.actor_count = 0;
        this.actor_list  = [];
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
            title:          i18n("ANALYTICS.title"),
            id:             "analytics-actors",
            template:       "modules/analytics/templates/analytics-actors-template.html",
            classes:        ["dialog"],
            width:          700,
            height:         760,
            resizable:      true,
            closeOnSubmit:  false,
            dragDrop:       [{ dragselectedor: null, dropselectedor: null }],
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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors.activateListeners()");

        super.activateListeners($html);

        // tools
        if(canvas.background._active) canvas.foreground.activate();

        // inject actor_list into form.
        const html_list     = document.getElementById("analytics-list");
        html_list.innerHTML = this.actor_list.join("");

		// toggle npc creature types.
		document.getElementById("actor-aberration").disabled 	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-beast").disabled 		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-celestial").disabled 	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-construct").disabled 	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-dragon").disabled 		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-elemental").disabled 	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-fey").disabled 			= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-fiend").disabled 		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-giant").disabled  		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-humanoid").disabled  	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-monstrosity").disabled  	= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-ooze").disabled  		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-plant").disabled  		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-swarm").disabled  		= !this.parent.actor_item_options.actor_npc_checked;
		document.getElementById("actor-undead").disabled  		= !this.parent.actor_item_options.actor_npc_checked;
    }

    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors getData()");

        return {
            "number-of-actors": 			game.actors.size,
            "actor-count":      			this.actor_count,
            "actor-name-value":             this.parent.actor_item_options.actor_name_value,
            "actor-case-sensitive-checked": this.parent.actor_item_options.actor_case_sensitive_checked ? "checked" : "",
            "actor-exact-match-checked":    this.parent.actor_item_options.actor_exact_match_checked 	? "checked" : "",
            "actor-npc-checked":            this.parent.actor_item_options.actor_npc_checked            ? "checked" : "",
            "actor-character-checked":      this.parent.actor_item_options.actor_character_checked      ? "checked" : "",
            "actor-vehicle-checked":        this.parent.actor_item_options.actor_vehicle_checked        ? "checked" : "",
            "actor-aberration-checked":     this.parent.actor_item_options.actor_aberration_checked     ? "checked" : "",
            "actor-beast-checked":          this.parent.actor_item_options.actor_beast_checked          ? "checked" : "",
            "actor-celestial-checked":      this.parent.actor_item_options.actor_celestial_checked      ? "checked" : "",
            "actor-construct-checked":      this.parent.actor_item_options.actor_construct_checked      ? "checked" : "",
            "actor-dragon-checked":         this.parent.actor_item_options.actor_dragon_checked         ? "checked" : "",
            "actor-elemental-checked":      this.parent.actor_item_options.actor_elemental_checked      ? "checked" : "",
            "actor-fey-checked":            this.parent.actor_item_options.actor_fey_checked            ? "checked" : "",
            "actor-fiend-checked":          this.parent.actor_item_options.actor_fiend_checked          ? "checked" : "",
            "actor-giant-checked":          this.parent.actor_item_options.actor_giant_checked          ? "checked" : "",
            "actor-humanoid-checked":       this.parent.actor_item_options.actor_humanoid_checked       ? "checked" : "",
            "actor-monstrosity-checked":    this.parent.actor_item_options.actor_monstrosity_checked    ? "checked" : "",
            "actor-ooze-checked":           this.parent.actor_item_options.actor_ooze_checked           ? "checked" : "",
            "actor-plant-checked":          this.parent.actor_item_options.actor_plant_checked          ? "checked" : "",
            "actor-swarm-checked":          this.parent.actor_item_options.actor_swarm_checked          ? "checked" : "",
            "actor-undead-checked":         this.parent.actor_item_options.actor_undead_checked         ? "checked" : "",
            "item-name-value":              this.parent.actor_item_options.item_name_value,
            "item-case-sensitive-checked":  this.parent.actor_item_options.item_case_sensitive_checked 	? "checked" : "",
            "item-exact-match-checked":     this.parent.actor_item_options.item_exact_match_checked  	? "checked" : "",
            "item-none-checked":     	    this.parent.actor_item_options.item_none_checked  			? "checked" : "",
            "item-weapon-checked":          this.parent.actor_item_options.item_weapon_checked          ? "checked" : "",
            "item-equipment-checked":       this.parent.actor_item_options.item_equipment_checked       ? "checked" : "",
            "item-consumable-checked":      this.parent.actor_item_options.item_consumable_checked      ? "checked" : "",
            "item-tool-checked":            this.parent.actor_item_options.item_tool_checked            ? "checked" : "",
            "item-loot-checked":            this.parent.actor_item_options.item_loot_checked            ? "checked" : "",
            "item-class-checked":           this.parent.actor_item_options.item_class_checked           ? "checked" : "",
            "item-feat-checked":            this.parent.actor_item_options.item_feat_checked            ? "checked" : "",
            "item-backpack-checked":        this.parent.actor_item_options.item_backpack_checked        ? "checked" : "",
            "item-spell-checked":           this.parent.actor_item_options.item_spell_checked           ? "checked" : "",
            "item-show-checked":            this.parent.actor_item_options.item_show_checked            ? "checked" : "",
        };
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onSubmit(event)");

        event.preventDefault();

        // prevent double submission
        const states = this.constructor.RENDER_STATES;
        if ( (this._state === states.NONE) || !this.isEditable || this._submitting ) return false;
        this._submitting = true;

        // handle form state prior to submission
        let closeForm = this.options.closeOnSubmit && !preventClose;
        const priorState = this._state;
        if ( preventRender ) this._state = states.RENDERING;
        if ( closeForm ) this._state = states.CLOSING;

        // get form data
        const formData = this._getSubmitData();

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
        if ( preventRender ) this._state = priorState;
        if ( closeForm ) await this.close({submit: false, force: true});
        return formData;
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _updateObject(event, formData)");

        const data = expandObject(formData);

        var list_counter = 0;
        this.item_count  = 0;
        this.actor_count = 0;
        this.actor_list.splice(0, this.actor_list.length);

        for ( let [k, v] of Object.entries(data) ) {
            if (k == "actor-name")           { this.parent.actor_item_options.actor_name_value             = v ? v : ""; }
            if (k == "actor-case-sensitive") { this.parent.actor_item_options.actor_case_sensitive_checked = v; }
            if (k == "actor-exact-match")    { this.parent.actor_item_options.actor_exact_match_checked    = v; }
            if (k == "actor-npc")            { this.parent.actor_item_options.actor_npc_checked            = v; }
            if (k == "actor-character")      { this.parent.actor_item_options.actor_character_checked      = v; }
            if (k == "actor-vehicle")        { this.parent.actor_item_options.actor_vehicle_checked        = v; }
            if (k == "actor-aberration")     { this.parent.actor_item_options.actor_aberration_checked     = v; }
            if (k == "actor-beast")          { this.parent.actor_item_options.actor_beast_checked          = v; }
            if (k == "actor-celestial")      { this.parent.actor_item_options.actor_celestial_checked      = v; }
            if (k == "actor-construct")      { this.parent.actor_item_options.actor_construct_checked      = v; }
            if (k == "actor-dragon")         { this.parent.actor_item_options.actor_dragon_checked         = v; }
            if (k == "actor-elemental")      { this.parent.actor_item_options.actor_elemental_checked      = v; }
            if (k == "actor-fey")            { this.parent.actor_item_options.actor_fey_checked            = v; }
            if (k == "actor-fiend")          { this.parent.actor_item_options.actor_fiend_checked          = v; }
            if (k == "actor-giant")          { this.parent.actor_item_options.actor_giant_checked          = v; }
            if (k == "actor-humanoid")       { this.parent.actor_item_options.actor_humanoid_checked       = v; }
            if (k == "actor-monstrosity")    { this.parent.actor_item_options.actor_monstrosity_checked    = v; }
            if (k == "actor-ooze")           { this.parent.actor_item_options.actor_ooze_checked           = v; }
            if (k == "actor-plant")          { this.parent.actor_item_options.actor_plant_checked          = v; }
            if (k == "actor-swarm")          { this.parent.actor_item_options.actor_swarm_checked          = v; }
            if (k == "actor-undead")         { this.parent.actor_item_options.actor_undead_checked         = v; }
            if (k == "item-name")            { this.parent.actor_item_options.item_name_value              = v ? v : ""; }
            if (k == "item-case-sensitive")  { this.parent.actor_item_options.item_case_sensitive_checked  = v; }
            if (k == "item-exact-match")     { this.parent.actor_item_options.item_exact_match_checked     = v; }
            if (k == "item-none")            { this.parent.actor_item_options.item_none_checked     	   = v; }
            if (k == "item-weapon")          { this.parent.actor_item_options.item_weapon_checked          = v; }
            if (k == "item-equipment")       { this.parent.actor_item_options.item_equipment_checked       = v; }
            if (k == "item-consumable")      { this.parent.actor_item_options.item_consumable_checked      = v; }
            if (k == "item-tool")            { this.parent.actor_item_options.item_tool_checked            = v; }
            if (k == "item-loot")            { this.parent.actor_item_options.item_loot_checked            = v; }
            if (k == "item-class")           { this.parent.actor_item_options.item_class_checked           = v; }
            if (k == "item-feat")            { this.parent.actor_item_options.item_feat_checked            = v; }
            if (k == "item-backpack")        { this.parent.actor_item_options.item_backpack_checked        = v; }
            if (k == "item-spell")           { this.parent.actor_item_options.item_spell_checked           = v; }
            if (k == "item-show")            { this.parent.actor_item_options.item_show_checked     	   = v; }
        };

		function build_actor(parent, actor) {
			(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-actor-name-even">` + actor.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-actor-name-odd">` + actor.data.name + `</p>`;
			parent.actor_count++;
			list_counter++;
		}

		function build_item(parent, item) {
			if (parent.parent.actor_item_options.item_show_checked) {
				(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
				list_counter++;
			}
			parent.item_count++;
		}

        function build_list(parent, actor) {
			parent.item_count = 0;
			
			// actors without items.
			if (actor.items.size == 0) {
				// add actor to list if no filters.
			    if (!parent.parent.actor_item_options.item_none_checked  		&&
					!parent.parent.actor_item_options.item_weapon_checked  		&&
					!parent.parent.actor_item_options.item_equipment_checked 	&& 
					!parent.parent.actor_item_options.item_consumable_checked 	&&
					!parent.parent.actor_item_options.item_tool_checked 		&& 
					!parent.parent.actor_item_options.item_loot_checked 		&&
					!parent.parent.actor_item_options.item_class_checked 		&&
					!parent.parent.actor_item_options.item_feat_checked 		&&
					!parent.parent.actor_item_options.item_backpack_checked 	&&
					!parent.parent.actor_item_options.item_spell_checked) build_actor(parent, actor);
				
				// add actor to list and return if only looking for actors without items.
				if (parent.parent.actor_item_options.item_none_checked) {
					build_actor(parent, actor);
					return;
				};
			};

			// spin through actor's item list ...
            actor.items.forEach((item, j) => {

				// lowercase for non-case-sensitive search.
                var item_name   = item.data.name;
                var search_name = parent.parent.actor_item_options.item_name_value;
                if ((search_name.length > 0) && !parent.parent.actor_item_options.item_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    item_name   = item_name.toLowerCase();
                }

				// do names match?
				var name_match = false;
                if ((!parent.parent.actor_item_options.item_exact_match_checked && (item_name.search(search_name) > -1)) ||
                     (parent.parent.actor_item_options.item_exact_match_checked && (item_name.search(search_name) > -1) && (search_name.length == item_name.length)) ||
                     (search_name.length == 0)) {
					name_match = true;
				};

				// names match.
				if (name_match) {
					var selected = false;
					if       (parent.parent.actor_item_options.item_weapon_checked 		&& item.type == 'weapon') 	  selected = true;
					else if  (parent.parent.actor_item_options.item_equipment_checked 	&& item.type == 'equipment')  selected = true;
					else if  (parent.parent.actor_item_options.item_consumable_checked 	&& item.type == 'consumable') selected = true;
					else if  (parent.parent.actor_item_options.item_tool_checked 		&& item.type == 'tool') 	  selected = true;
					else if  (parent.parent.actor_item_options.item_loot_checked 		&& item.type == 'loot') 	  selected = true; 
					else if  (parent.parent.actor_item_options.item_class_checked 		&& item.type == 'class') 	  selected = true;
					else if  (parent.parent.actor_item_options.item_feat_checked 		&& item.type == 'feat') 	  selected = true;
					else if  (parent.parent.actor_item_options.item_backpack_checked 	&& item.type == 'backpack')   selected = true;
					else if  (parent.parent.actor_item_options.item_spell_checked 		&& item.type == 'spell') 	  selected = true; 
					else if (!parent.parent.actor_item_options.item_none_checked		&&
							 !parent.parent.actor_item_options.item_weapon_checked  	&&
							 !parent.parent.actor_item_options.item_equipment_checked 	&& 
							 !parent.parent.actor_item_options.item_consumable_checked 	&&
							 !parent.parent.actor_item_options.item_tool_checked 		&& 
							 !parent.parent.actor_item_options.item_loot_checked 		&&
							 !parent.parent.actor_item_options.item_class_checked 		&&
							 !parent.parent.actor_item_options.item_feat_checked 		&&
							 !parent.parent.actor_item_options.item_backpack_checked 	&&
							 !parent.parent.actor_item_options.item_spell_checked) selected = true;
					
					// only add one actor to list. 
					if (selected) {
						if (parent.item_count == 0) {
							build_actor(parent, actor);
						}
						
						// add item to list.
						build_item(parent, item);
					};
                };
            });
        };

		// spin through actor list ...
        game.actors.contents.forEach((actor, i) => {
            if (game.actors.contents[i]) {

				// lowercase for non-case-sensitive search.
                var actor_name  = actor.data.name;
                var search_name = this.parent.actor_item_options.actor_name_value;
                if ((search_name.length > 0) && !this.parent.actor_item_options.actor_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };

				// do names match?
				var name_match = false;
                if ((search_name.length == 0) ||
					(!this.parent.actor_item_options.actor_exact_match_checked && (actor_name.search(search_name) > -1)) ||
                     (this.parent.actor_item_options.actor_exact_match_checked && (actor_name.search(search_name) > -1) && (search_name.length == actor_name.length))) {
					name_match = true;
				};
				
				// names match.
				if (name_match) {
					var selected = false;
                    if      (this.parent.actor_item_options.actor_character_checked    	   && actor.type == 'character') selected = true;
                    else if (this.parent.actor_item_options.actor_vehicle_checked          && actor.type == 'vehicle')   selected = true;
                    else if (this.parent.actor_item_options.actor_npc_checked 			   && actor.type == 'npc') {
						if  	 (this.parent.actor_item_options.actor_aberration_checked  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
						else if  (this.parent.actor_item_options.actor_beast_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'beast') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_celestial_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
						else if  (this.parent.actor_item_options.actor_construct_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
						else if  (this.parent.actor_item_options.actor_dragon_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_elemental_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
						else if  (this.parent.actor_item_options.actor_fey_checked         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey') 		   selected = true;
						else if  (this.parent.actor_item_options.actor_fiend_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_giant_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'giant') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_humanoid_checked    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
						else if  (this.parent.actor_item_options.actor_monstrosity_checked && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
						else if  (this.parent.actor_item_options.actor_ooze_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_plant_checked 	   && actor.data.data.details.type && actor.data.data.details.type.value == 'plant') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_swarm_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm') 	   selected = true;
						else if  (this.parent.actor_item_options.actor_undead_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead') 	   selected = true;
						else if (!this.parent.actor_item_options.actor_aberration_checked  &&
								 !this.parent.actor_item_options.actor_beast_checked 	   &&
								 !this.parent.actor_item_options.actor_celestial_checked   &&
								 !this.parent.actor_item_options.actor_construct_checked   &&
								 !this.parent.actor_item_options.actor_dragon_checked 	   &&
								 !this.parent.actor_item_options.actor_elemental_checked   &&
								 !this.parent.actor_item_options.actor_fey_checked 		   &&
								 !this.parent.actor_item_options.actor_fiend_checked 	   &&
								 !this.parent.actor_item_options.actor_giant_checked 	   &&
								 !this.parent.actor_item_options.actor_humanoid_checked    &&
								 !this.parent.actor_item_options.actor_monstrosity_checked &&
								 !this.parent.actor_item_options.actor_ooze_checked 	   &&
								 !this.parent.actor_item_options.actor_plant_checked 	   &&
								 !this.parent.actor_item_options.actor_swarm_checked       &&
								 !this.parent.actor_item_options.actor_undead_checked) selected = true;
					}
                    else if (!this.parent.actor_item_options.actor_npc_checked 		   	   &&
							 !this.parent.actor_item_options.actor_character_checked 	   &&
							 !this.parent.actor_item_options.actor_vehicle_checked 		   &&
							 !this.parent.actor_item_options.actor_aberration_checked 	   &&
							 !this.parent.actor_item_options.actor_beast_checked 		   &&
							 !this.parent.actor_item_options.actor_celestial_checked 	   &&
							 !this.parent.actor_item_options.actor_construct_checked 	   &&
							 !this.parent.actor_item_options.actor_dragon_checked 		   &&
							 !this.parent.actor_item_options.actor_elemental_checked 	   &&
							 !this.parent.actor_item_options.actor_fey_checked 			   &&
							 !this.parent.actor_item_options.actor_fiend_checked 		   &&
							 !this.parent.actor_item_options.actor_giant_checked 		   &&
							 !this.parent.actor_item_options.actor_humanoid_checked 	   &&
							 !this.parent.actor_item_options.actor_monstrosity_checked 	   &&
							 !this.parent.actor_item_options.actor_ooze_checked			   &&
							 !this.parent.actor_item_options.actor_plant_checked 		   &&
							 !this.parent.actor_item_options.actor_swarm_checked 		   &&
							 !this.parent.actor_item_options.actor_undead_checked) selected = true;

					// add actor to list.
					if (selected) {
						build_list(this, actor);
					};
                };
            };
        });

        // re-draw the updated form
        this.render(true);
    }
}
