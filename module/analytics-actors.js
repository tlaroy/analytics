/**
 * Analytics.
 *
 *      ./module/analytics-actors.js
 *      v0.0.2
 */

import * as ANALYTICS from "./const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsActors extends FormApplication {

    constructor(parent, dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors constructor(dialogData, options)");

        super(dialogData, options);

		this.parent = parent;
		this.parent.actor_item_options = { 
			"actor_name_value":  	  "",
			"npc_checked": 		 	  false,
			"character_checked": 	  false,
			"vehicle_checked": 	 	  false,
			"item_name_value": 	 	  "",
			"weapon_checked": 	 	  false,
			"equipment_checked": 	  false,
			"consumable_checked": 	  false,
			"tool_checked": 		  false,
			"loot_checked": 		  false,
			"class_checked": 		  false,
			"feature_checked": 		  false,
			"backpack_checked": 	  false,
			"spell_checked": 		  false,
			"case_sensitive_checked": false,
		};
		
		this.actor_count = 0;
		this.actor_list = [];
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
			title: 			i18n("m.title-actors"),
			id: 			"analytics-actors",
            template: 		"modules/analytics/templates/analytics-actors-template.html",
            classes: 		["dialog"],
            width: 			500,
            height: 		570,
			resizable: 		true,
            closeOnSubmit: 	false,
			dragDrop: 		[{ dragSelector: null, dropSelector: null }],
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
	}

	getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors getData()");

		return { 
			"number-of-actors": 		game.actors.size,
			"actor-count": 				this.actor_count,
			"actor-name-value": 		this.parent.actor_item_options.actor_name_value,
			"actor-npc-checked": 		this.parent.actor_item_options.npc_checked 			 ? "checked" : "",
			"actor-character-checked": 	this.parent.actor_item_options.character_checked 	 ? "checked" : "",
			"actor-vehicle-checked": 	this.parent.actor_item_options.vehicle_checked 		 ? "checked" : "",
			"item-name-value": 			this.parent.actor_item_options.item_name_value,	     
			"item-weapon-checked": 		this.parent.actor_item_options.weapon_checked 		 ? "checked" : "",
			"item-equipment-checked": 	this.parent.actor_item_options.equipment_checked 	 ? "checked" : "",
			"item-consumable-checked": 	this.parent.actor_item_options.consumable_checked 	 ? "checked" : "",
			"item-tool-checked": 		this.parent.actor_item_options.tool_checked 			 ? "checked" : "",
			"item-loot-checked": 		this.parent.actor_item_options.loot_checked 			 ? "checked" : "",
			"item-class-checked": 		this.parent.actor_item_options.class_checked 		 ? "checked" : "",
			"item-feature-checked": 	this.parent.actor_item_options.feature_checked 		 ? "checked" : "",
			"item-backpack-checked": 	this.parent.actor_item_options.backpack_checked 		 ? "checked" : "",
			"item-spell-checked": 		this.parent.actor_item_options.spell_checked 		 ? "checked" : "",
			"case-sensitive-checked": 	this.parent.actor_item_options.case_sensitive_checked ? "checked" : "",
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
		this.actor_count = 0;
		this.actor_list.splice(0, this.actor_list.length);
		
		for ( let [k, v] of Object.entries(data) ) {
			// k is element 'name'.
			if (k == "actor-name") 	 	{ this.parent.actor_item_options.actor_name_value       = v? v : ""; }
			if (k == "actor-npc") 		{ this.parent.actor_item_options.npc_checked       		= v; }
			if (k == "actor-character") { this.parent.actor_item_options.character_checked 		= v; }
			if (k == "actor-vehicle") 	{ this.parent.actor_item_options.vehicle_checked   		= v; }
						
			if (k == "item-name")  	 	{ this.parent.actor_item_options.item_name_value        = v? v : ""; }
			if (k == "item-weapon") 	{ this.parent.actor_item_options.weapon_checked    		= v; }
			if (k == "item-equipment")  { this.parent.actor_item_options.equipment_checked 		= v; }
			if (k == "item-consumable")	{ this.parent.actor_item_options.consumable_checked		= v; }
			if (k == "item-tool") 		{ this.parent.actor_item_options.tool_checked 			= v; }
			if (k == "item-loot") 		{ this.parent.actor_item_options.loot_checked 			= v; }
			if (k == "item-class") 	    { this.parent.actor_item_options.class_checked 			= v; }
			if (k == "item-feature") 	{ this.parent.actor_item_options.feature_checked 		= v; }
			if (k == "item-backpack") 	{ this.parent.actor_item_options.backpack_checked 		= v; }
			if (k == "item-spell") 	 	{ this.parent.actor_item_options.spell_checked 			= v; }
			
			if (k == "case-sensitive")  { this.parent.actor_item_options.case_sensitive_checked = v; }
		}

		function build_item_list(parent, actor) {
			actor.items.forEach((item, j) => { 

				var data_name   = item.data.name;
				var search_name = parent.parent.actor_item_options.item_name_value;

				if ((search_name.length > 0) && !parent.parent.actor_item_options.case_sensitive_checked) {
					search_name = search_name.toLowerCase();
					data_name   = data_name.toLowerCase();
				}

				var row = ``;
				if ((search_name.length == 0) || (data_name.search(search_name) > -1)) {
					if (parent.parent.actor_item_options.weapon_checked && item.type == 'weapon') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.equipment_checked && item.type == 'equipment') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.consumable_checked && item.type == 'consumable') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.tool_checked && item.type == 'tool') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.loot_checked && item.type == 'loot') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.class_checked && item.type == 'class') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.feature_checked && item.type == 'feature') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.backpack_checked && item.type == 'backpack') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (parent.parent.actor_item_options.spell_checked && item.type == 'spell') {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					} else if (!parent.parent.actor_item_options.weapon_checked  && !parent.parent.actor_item_options.equipment_checked && !parent.parent.actor_item_options.consumable_checked && 
							   !parent.parent.actor_item_options.tool_checked    && !parent.parent.actor_item_options.loot_checked      && !parent.parent.actor_item_options.class_checked && 
							   !parent.parent.actor_item_options.feature_checked && !parent.parent.actor_item_options.backpack_checked  && !parent.parent.actor_item_options.spell_checked) {
						(list_counter % 2 == 0) ? parent.actor_list[list_counter] = `<p class="analytics-item-name-even">` + item.data.name + `</p>` : parent.actor_list[list_counter] = `<p class="analytics-item-name-odd">` + item.data.name + `</p>`;
						list_counter++;
					};
				};
			});
		};
		
		game.actors.contents.forEach((actor, i) => { 
			if (game.actors.contents[i]) {
				
				var data_name   = actor.data.name;
				var search_name = this.parent.actor_item_options.actor_name_value;
				
				if ((search_name.length > 0) && !this.parent.actor_item_options.case_sensitive_checked) {
					search_name = search_name.toLowerCase();
					data_name   = data_name.toLowerCase();
				}
				
				if ((search_name.length == 0) || (data_name.search(search_name) > -1)) {
					if (this.parent.actor_item_options.npc_checked && actor.type == 'npc') {
						(list_counter % 2 == 0) ? this.actor_list[list_counter] = `<p class="analytics-actor-name-even">` + actor.data.name + `</p>` : this.actor_list[list_counter] = `<p class="analytics-actor-name-odd">` + actor.data.name + `</p>`;
						list_counter++;
						this.actor_count++;
						build_item_list(this, actor);
					} else if (this.parent.actor_item_options.character_checked && actor.type == 'character') {
						(list_counter % 2 == 0) ? this.actor_list[list_counter] = `<p class="analytics-actor-name-even">` + actor.data.name + `</p>` : this.actor_list[list_counter] = `<p class="analytics-actor-name-odd">` + actor.data.name + `</p>`;
						list_counter++;
						this.actor_count++;
						build_item_list(this, actor);
					} else if (this.parent.actor_item_options.vehicle_checked && actor.type == 'vehicle') {
						(list_counter % 2 == 0) ? this.actor_list[list_counter] = `<p class="analytics-actor-name-even">` + actor.data.name + `</p>` : this.actor_list[list_counter] = `<p class="analytics-actor-name-odd">` + actor.data.name + `</p>`;
						list_counter++;
						this.actor_count++;
						build_item_list(this, actor);
					} else if (!this.parent.actor_item_options.npc_checked && !this.parent.actor_item_options.character_checked && !this.parent.actor_item_options.vehicle_checked) {
						(list_counter % 2 == 0) ? this.actor_list[list_counter] = `<p class="analytics-actor-name-even">` + actor.data.name + `</p>` : this.actor_list[list_counter] = `<p class="analytics-actor-name-odd">` + actor.data.name + `</p>`;
						list_counter++;
						this.actor_count++;
						build_item_list(this, actor);
					};
				};
			};
		});
        
		// Re-draw the updated form
		this.render(true);
    }
}
