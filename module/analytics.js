/***
*
* module/analytics.js
*
* version 0.0.12
*
*/

import * as ANALYTICS from "./analytics-const.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsOptions constructor(parent)");
    }

    // escape conflicting characters for regexp searches.
    escapeRegExp(text) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsOptions  escapeRegExp(text)");

        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
}

export class ActorOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "ActorOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;

        this._npc            = false;
        this._character      = false;
        this._vehicle        = false;

        this._aberration     = false;
        this._beast          = false;
        this._celestial      = false;
        this._construct      = false;
        this._dragon         = false;
        this._elemental      = false;
        this._fey            = false;
        this._fiend          = false;
        this._giant          = false;
        this._humanoid       = false;
        this._monstrosity    = false;
        this._ooze           = false;
        this._plant          = false;
        this._swarm          = false;
        this._undead         = false;
    }
	
	get actorCount()     { return this._count };
	get actorShow()      { return this._show };
	get actorShowID()    { return this._show_id };
	get actorSubmitted() { return this._submitted };
	get actorNone()      { return this._none };
	get actorNameRadio() { return this._name_radio };

	set actorCount(count)      { this._count = count };
	set actorSubmitted(submit) { this._submitted = submit };

    // no actor options?
    noActorTypesSelected() {
        return (!this._npc       &&
                !this._character &&
                !this._vehicle);
    }

    // no creature options?
    noCreatureTypesSelected() {
        return (!this._aberration  &&
                !this._beast       &&
                !this._celestial   &&
                !this._construct   &&
                !this._dragon      &&
                !this._elemental   &&
                !this._fey         &&
                !this._fiend       &&
                !this._giant       &&
                !this._humanoid    &&
                !this._monstrosity &&
                !this._ooze        &&
                !this._plant       &&
                !this._swarm       &&
                !this._undead);
    }

    // form element prefixes.
    prefixSecondary(secondary = "") {
        var prefix = "";
        switch(secondary) {
            case "compendiums_with_actors":
                prefix = "analytics-compendiums-with-actor-";
                break;
            case "items_in_actors":
                prefix = "analytics-items-in-actor-";
                break;
            case "journals_with_actors":
                prefix = "analytics-journals-with-actor-";
                break;
            case "scenes_with_actors_as_tokens":
                prefix = "analytics-scenes-with-actor-as-token-";
                break;
            case "tables_with_actors":
                prefix = "analytics-tables-with-actor-";
                break;
            default:
                prefix = "analytics-actors-";
                break;
        };
        return prefix;
    }

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;

        // enable/disable npc creature types.
        document.getElementById(prefix + "aberration").disabled  = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "beast").disabled       = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "celestial").disabled   = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "construct").disabled   = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "dragon").disabled      = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "elemental").disabled   = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "fey").disabled         = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "fiend").disabled       = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "giant").disabled       = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "humanoid").disabled    = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "monstrosity").disabled = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "ooze").disabled        = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "plant").disabled       = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "swarm").disabled       = !document.getElementById(prefix + "npc").checked;
        document.getElementById(prefix + "undead").disabled      = !document.getElementById(prefix + "npc").checked;
    }

    // get data for form.
    getActorData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-actors"]       = game.actors.size;
        retval[prefix + "actor-count"]            = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        retval[prefix + "npc-checked"]            = this._npc            ? "checked" : "";
        retval[prefix + "character-checked"]      = this._character      ? "checked" : "";
        retval[prefix + "vehicle-checked"]        = this._vehicle        ? "checked" : "";

        retval[prefix + "aberration-checked"]     = this._aberration     ? "checked" : "";
        retval[prefix + "beast-checked"]          = this._beast          ? "checked" : "";
        retval[prefix + "celestial-checked"]      = this._celestial      ? "checked" : "";
        retval[prefix + "construct-checked"]      = this._construct      ? "checked" : "";
        retval[prefix + "dragon-checked"]         = this._dragon         ? "checked" : "";
        retval[prefix + "elemental-checked"]      = this._elemental      ? "checked" : "";
        retval[prefix + "fey-checked"]            = this._fey            ? "checked" : "";
        retval[prefix + "fiend-checked"]          = this._fiend          ? "checked" : "";
        retval[prefix + "giant-checked"]          = this._giant          ? "checked" : "";
        retval[prefix + "humanoid-checked"]       = this._humanoid       ? "checked" : "";
        retval[prefix + "monstrosity-checked"]    = this._monstrosity    ? "checked" : "";
        retval[prefix + "ooze-checked"]           = this._ooze           ? "checked" : "";
        retval[prefix + "plant-checked"]          = this._plant          ? "checked" : "";
        retval[prefix + "swarm-checked"]          = this._swarm          ? "checked" : "";
        retval[prefix + "undead-checked"]         = this._undead         ? "checked" : "";

        return retval;
    }

    // set data from form.
    setActorData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "npc")            { this._npc            = v; }
        if (k == prefix + "character")      { this._character      = v; }
        if (k == prefix + "vehicle")        { this._vehicle        = v; }
        if (k == prefix + "aberration")     { this._aberration     = v; }
        if (k == prefix + "beast")          { this._beast          = v; }
        if (k == prefix + "celestial")      { this._celestial      = v; }
        if (k == prefix + "construct")      { this._construct      = v; }
        if (k == prefix + "dragon")         { this._dragon         = v; }
        if (k == prefix + "elemental")      { this._elemental      = v; }
        if (k == prefix + "fey")            { this._fey            = v; }
        if (k == prefix + "fiend")          { this._fiend          = v; }
        if (k == prefix + "giant")          { this._giant          = v; }
        if (k == prefix + "humanoid")       { this._humanoid       = v; }
        if (k == prefix + "monstrosity")    { this._monstrosity    = v; }
        if (k == prefix + "ooze")           { this._ooze           = v; }
        if (k == prefix + "plant")          { this._plant          = v; }
        if (k == prefix + "swarm")          { this._swarm          = v; }
        if (k == prefix + "undead")         { this._undead         = v; }
    };

    // SEARCH for matching actors.
    searchActors(actors) {

        var matching_actors = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through actor list ...
        actors.contents.forEach((actor, i) => {

            var match_found = false;
            var actor_name  = actor.data.name;
            var actor_id    = actor.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (actor_name.search(search_name) > -1)) ||
                     (this._exact_match && (actor_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(actor_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
                if ((search_id == "") || (search_id == actor_id)) {
                    match_found = true;
                };
            };

            // actor matches.
            if (match_found) {
                var selected = false;

                if (this.noActorTypesSelected() && this.noCreatureTypesSelected()) selected = true;
                else if (this._character        && actor.type == 'character') selected = true;
                else if (this._vehicle          && actor.type == 'vehicle')   selected = true;
                else if (this._npc              && actor.type == 'npc') {

                    if (this.noCreatureTypesSelected()) selected = true;
                    else if  (this._aberration  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
                    else if  (this._beast       && actor.data.data.details.type && actor.data.data.details.type.value == 'beast')       selected = true;
                    else if  (this._celestial   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
                    else if  (this._construct   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
                    else if  (this._dragon      && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon')      selected = true;
                    else if  (this._elemental   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
                    else if  (this._fey         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey')         selected = true;
                    else if  (this._fiend       && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend')       selected = true;
                    else if  (this._giant       && actor.data.data.details.type && actor.data.data.details.type.value == 'giant')       selected = true;
                    else if  (this._humanoid    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
                    else if  (this._monstrosity && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
                    else if  (this._ooze        && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze')        selected = true;
                    else if  (this._plant       && actor.data.data.details.type && actor.data.data.details.type.value == 'plant')       selected = true;
                    else if  (this._swarm       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm')       selected = true;
                    else if  (this._undead      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead')      selected = true;
                }

                // add selected matching actor to list.
                if (selected) {
                    matching_actors.push(actor);
                };
            };
        }); // forEach Actor.
		
		return matching_actors;
    }
}

export class CardOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "CardOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get cardCount()     { return this._count };
	get cardShow()      { return this._show };
	get cardShowID()    { return this._show_id };
	get cardSubmitted() { return this._submitted };
	get cardNone()      { return this._none };
	get cardNameRadio() { return this._name_radio };

	set cardCount(count)      { this._count = count };
	set cardSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "compendiums_with_cards":
                prefix = "analytics-compendiums-with-card-";
                break;
            case "journals_with_cards":
                prefix = "analytics-journals-with-card-";
                break;
            case "tables_with_cards":
                prefix = "analytics-tables-with-card-";
                break;
            default:
                prefix = "analytics-cards-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getCardData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-cards"]        = game.cards.size;
        retval[prefix + "card-count"]             = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setCardData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;
    }

    // SEARCH for matching cards.
    searchCards(cards) {

        var matching_cards = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through card list ...
        cards.contents.forEach((card, i) => {

            var match_found = false;
            var card_name   = card.data.name;
			var card_id     = card.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    card_name  = card_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (card_name.search(search_name) > -1)) ||
                     (this._exact_match && (card_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(card_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
                if ((search_id == "") || (search_id == card_id)) {
                    match_found = true;
                };
            };

            // card matches.
            if (match_found) {
                matching_cards.push(card);
            };
        }); // forEach Card.
		
		return matching_cards;
    };
}

export class CompendiumOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "CompendiumOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get compendiumCount()     { return this._count };
	get compendiumShow()      { return this._show };
	get compendiumShowID()    { return this._show_id };
	get compendiumSubmitted() { return this._submitted };
	get compendiumNone()      { return this._none };
	get compendiumNameRadio() { return this._name_radio };

	set compendiumCount(count)      { this._count = count };
	set compendiumSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "actors_in_compendiums":
                prefix = "analytics-actors-in-compendium-";
                break;
            case "cards_in_compendiums":
                prefix = "analytics-cards-in-compendium-";
                break;
            case "items_in_compendiums":
                prefix = "analytics-items-in-compendium-";
                break;
            case "journals_in_compendiums":
                prefix = "analytics-journals-in-compendium-";
                break;
            case "macros_in_compendiums":
                prefix = "analytics-macros-in-compendium-";
                break;
            case "playlists_in_compendiums":
                prefix = "analytics-playlists-in-compendium-";
                break;
            case "scenes_in_compendiums":
                prefix = "analytics-scenes-in-compendium-";
                break;
            case "tables_in_compendiums":
                prefix = "analytics-tables-in-compendium-";
                break;
            case "tables_with_compendiums":
                prefix = "analytics-tables-with-compendium-";
                break;
            default:
                prefix = "analytics-compendiums-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
    };

    // get data for form.
    getCompendiumData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-compendiums"]  = game.packs.size;
        retval[prefix + "compendium-count"]       = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        return retval;
    }

    // set data from form.
    setCompendiumData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }
    }

    // SEARCH for matching entities.
    searchCompendium(compendium, entity, by_name) {

        var matching_entities = [ ];
		var search_name = entity.name.trim(); // this.escapeRegExp(entity.name.trim());
		//var search_id   = entity.id;

        // spin through entity ...
        compendium.index.forEach((item, i) => {

            var match_found = false;
            var item_name   = this.escapeRegExp(item.name); // item.name;
			//var item_id     = item._id;

            // search by name
            if (by_name) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    item_name = item_name.toLowerCase();
                };
                // do names match?
                if ((item_name.length == 0) ||
                    (!this._exact_match && (search_name.search(item_name) > -1)) ||
                     (this._exact_match && (search_name.search(item_name) > -1) && (item_name.length == search_name.length))) {
					match_found = true;
                };
/*
                if ((search_name.length == 0) ||
                    (!this._exact_match && (item_name.search(search_name) > -1)) ||
                     (this._exact_match && (item_name.search(search_name) > -1) && (search_name.length == item_name.length))) {
					match_found = true;
                };
*/
            };
/*
            // search by id
            if (!by_name) {
                // do ids match?
                if ((search_id == "") || (search_id == item_id)) {
                    match_found = true;
                };
            };
*/
            // item matches.
            if (match_found) {
                matching_entities.push(item);
            };
        }); // forEach Entity.
		
		return matching_entities;
    };

    // SEARCH for matching compendiums by compendium type.
    searchCompendiums(compendiums, type) {

        var matching_compendiums = [ ];
		var search_name = this.escapeRegExp(this._name.trim());

        // spin through compendium list ...
        compendiums.contents.forEach((compendium, i) => {

            var match_found     = false;
            var compendium_name = compendium.metadata.label;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    compendium_name  = compendium_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (compendium_name.search(search_name) > -1)) ||
                     (this._exact_match && (compendium_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(compendium_name).length))) {
                    match_found = true;
                };
            };

            // compendium matches.
            if (match_found) {
                var selected = false;
				if (compendium.metadata.type.toLowerCase() == type.toLowerCase()) selected = true;

                if (selected) {
					matching_compendiums.push(compendium);
                };
			};
        }); // forEach Compendium.
		
		return matching_compendiums;
    };
}

export class ItemOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "ItemOptions  constructor()");

        super();

        this._count                       = 0;
        this._on_use_macro_count          = 0;
        this._show                        = true;
        this._show_id                     = false;
        this._submitted                   = false;

        this._name                        = "";
        this._id                          = "";
        this._case_sensitive              = false;
        this._exact_match                 = false;
        this._none                        = false;

        this._name_radio                  = true;
        this._id_radio                    = false;

        this._weapon                      = false;
        this._equipment                   = false;
        this._consumable                  = false;
        this._tool                        = false;
        this._loot                        = false;
        this._class                       = false;
        this._feat                        = false;
        this._backpack                    = false;
        this._spell                       = false;

        this._item_macro                  = false;

        this._on_use_macro                = false;
        this._on_use_macro_name           = "";
        this._on_use_macro_id             = "";
        this._on_use_macro_radio_name     = true;
        this._on_use_macro_radio_id       = false;
        this._on_use_macro_case_sensitive = false;
        this._on_use_macro_exact_match    = false;
    }

	get itemCount()           { return this._count };
	get itemShow()            { return this._show };
	get itemShowID()          { return this._show_id };
	get itemSubmitted()       { return this._submitted };
	get itemNone()            { return this._none };
	get itemNameRadio()       { return this._name_radio };

	get itemOnUseMacroCount() { return this._on_use_macro_count };
	get itemMacro()           { return this._item_macro };
	get itemOnUseMacro()      { return this._on_use_macro };

	set itemCount(count)           { this._count = count };
	set itemOnUseMacroCount(count) { this._on_use_macro_count = count };
	set itemSubmitted(submit)      { this._submitted = submit };

    // no item options?
    noItemTypesSelected() {
        return (!this._weapon     &&
                !this._equipment  &&
                !this._consumable &&
                !this._tool       &&
                !this._loot       &&
                !this._class      &&
                !this._feat       &&
                !this._backpack   &&
                !this._spell);
    }

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "actors_with_items":
                prefix = "analytics-actors-with-item-";
                break;
            case "compendiums_with_items":
                prefix = "analytics-compendiums-with-item-";
                break;
            case "items_within_items_16":
                prefix = "analytics-items-within-item-";
                break;
            case "journals_with_items":
                prefix = "analytics-journals-with-item-";
                break;
            case "macros_in_items":
                prefix = "analytics-macros-in-item-";
                break;
            case "tables_with_items":
                prefix = "analytics-tables-with-item-";
                break;
            default:
                prefix = "analytics-items-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;

        // disable item macros if itemacro not installed or not active.
        if (!game.modules.get("itemacro") || !game.modules.get("itemacro").active) {
            document.getElementById(prefix + "macro").style.display                = "none";
            document.getElementById(prefix + "macro-label").style.display          = "none";
            document.getElementById(prefix + "macro-thematic-break").style.display = "none";
        }

        // enable/disable on use macro fields.
        document.getElementById(prefix + "on-use-macro-name").disabled           = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-case-sensitive").disabled = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-exact-match").disabled    = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-id").disabled             = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-name-radio").disabled     = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-id-radio").disabled       = !document.getElementById(prefix + "on-use-macro").checked;

        if (document.getElementById(prefix + "on-use-macro").checked) {
            document.getElementById(prefix + "on-use-macro-name").disabled           = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-case-sensitive").disabled = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-exact-match").disabled    = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-id").disabled             = !document.getElementById(prefix + "on-use-macro-id-radio").checked;
        };

        // disable on use macros if midi-qol not installed or not active.
        if (!game.modules.get("midi-qol") || !game.modules.get("midi-qol").active) {
            document.getElementById(prefix + "on-use-macro").style.display                      = "none";
            document.getElementById(prefix + "on-use-macro-label").style.display                = "none";
            document.getElementById(prefix + "on-use-macro-name-input").style.display           = "none";
            document.getElementById(prefix + "on-use-macro-case-sensitive-label").style.display = "none";
            document.getElementById(prefix + "on-use-macro-exact-match-label").style.display    = "none";
            document.getElementById(prefix + "on-use-macro-thematic-break").style.display       = "none";
            document.getElementById(prefix + "on-use-macro-id").style.display                   = "none";
            document.getElementById(prefix + "on-use-macro-name-radio").style.display           = "none";
            document.getElementById(prefix + "on-use-macro-id-radio").style.display             = "none";
        }

        // enable/disable on use macro fields.
        document.getElementById(prefix + "on-use-macro-name").disabled           = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-case-sensitive").disabled = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-exact-match").disabled    = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-id").disabled             = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-name-radio").disabled     = !document.getElementById(prefix + "on-use-macro").checked;
        document.getElementById(prefix + "on-use-macro-id-radio").disabled       = !document.getElementById(prefix + "on-use-macro").checked;

        if (document.getElementById(prefix + "on-use-macro").checked) {
            document.getElementById(prefix + "on-use-macro-name").disabled           = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-case-sensitive").disabled = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-exact-match").disabled    = !document.getElementById(prefix + "on-use-macro-name-radio").checked;
            document.getElementById(prefix + "on-use-macro-id").disabled             = !document.getElementById(prefix + "on-use-macro-id-radio").checked;
        };
    }

    // get data for form.
    getItemData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-items"]              = game.items.size;
        retval[prefix + "item-count"]                   = this._count;
        retval[prefix + "show-checked"]                 = this._show                 ? "checked" : "";
        retval[prefix + "show-id-checked"]              = this._show_id              ? "checked" : "";

        retval[prefix + "name-value"]                   = this._name,
        retval[prefix + "id-value"]                     = this._id,
        retval[prefix + "case-sensitive-checked"]       = this._case_sensitive       ? "checked" : "";
        retval[prefix + "exact-match-checked"]          = this._exact_match          ? "checked" : "";
        retval[prefix + "none-checked"]                 = this._none                 ? "checked" : "";

        retval[prefix + "name-radio-checked"]           = this._name_radio           ? "checked" : "";
        retval[prefix + "id-radio-checked"]             = this._id_radio             ? "checked" : "";

        retval[prefix + "weapon-checked"]               = this._weapon               ? "checked" : "";
        retval[prefix + "equipment-checked"]            = this._equipment            ? "checked" : "";
        retval[prefix + "consumable-checked"]           = this._consumable           ? "checked" : "";
        retval[prefix + "tool-checked"]                 = this._tool                 ? "checked" : "";
        retval[prefix + "loot-checked"]                 = this._loot                 ? "checked" : "";
        retval[prefix + "class-checked"]                = this._class                ? "checked" : "";
        retval[prefix + "feat-checked"]                 = this._feat                 ? "checked" : "";
        retval[prefix + "backpack-checked"]             = this._backpack             ? "checked" : "";
        retval[prefix + "spell-checked"]                = this._spell                ? "checked" : "";

        retval[prefix + "macro-checked"]                = this._item_macro           ? "checked" : "";

        retval[prefix + "on-use-macro-checked"]                = this._on_use_macro                ? "checked" : "";
        retval[prefix + "on-use-macro-name-value"]             = this._on_use_macro_name;
        retval[prefix + "on-use-macro-name-id"]                = this._on_use_macro_id;
        retval[prefix + "on-use-macro-case-sensitive-checked"] = this._on_use_macro_case_sensitive ? "checked" : "";
        retval[prefix + "on-use-macro-exact-match-checked"]    = this._on_use_macro_exact_match    ? "checked" : "";

        retval[prefix + "on-use-macro-name-radio-checked"]     = this._on_use_macro_radio_name     ? "checked" : "";
        retval[prefix + "on-use-macro-id-radio-checked"]       = this._on_use_macro_radio_id       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setItemData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")                 { this._show                 = v; }
        if (k == prefix + "show-id")              { this._show_id              = v; }

        if (k == prefix + "name")                 { this._name                 = v ? v : ""; }
        if (k == prefix + "id")                   { this._id                   = v ? v : ""; }
        if (k == prefix + "case-sensitive")       { this._case_sensitive       = v; }
        if (k == prefix + "exact-match")          { this._exact_match          = v; }
        if (k == prefix + "none")                 { this._none                 = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "weapon")               { this._weapon               = v; }
        if (k == prefix + "equipment")            { this._equipment            = v; }
        if (k == prefix + "consumable")           { this._consumable           = v; }
        if (k == prefix + "tool")                 { this._tool                 = v; }
        if (k == prefix + "loot")                 { this._loot                 = v; }
        if (k == prefix + "class")                { this._class                = v; }
        if (k == prefix + "feat")                 { this._feat                 = v; }
        if (k == prefix + "backpack")             { this._backpack             = v; }
        if (k == prefix + "spell")                { this._spell                = v; }

        if (k == prefix + "macro")                { this._item_macro           = v; }

        if (k == prefix + "on-use-macro")                { this._on_use_macro                = v; }
        if (k == prefix + "on-use-macro-name")           { this._on_use_macro_name           = v ? v : ""; }
        if (k == prefix + "on-use-macro-id")             { this._on_use_macro_id             = v ? v : ""; }
        if (k == prefix + "on-use-macro-case-sensitive") { this._on_use_macro_case_sensitive = v; }
        if (k == prefix + "on-use-macro-exact-match")    { this._on_use_macro_exact_match    = v; }

        this._on_use_macro_radio_name = document.getElementById(prefix + "on-use-macro-name-radio").checked;
        this._on_use_macro_radio_id   = document.getElementById(prefix + "on-use-macro-id-radio").checked;
    }

    // SEARCH for matching item macro.
    searchItemMacros(item) {

        var matching_macros = [ ];

        // any item macros?
        if (this._item_macro &&
            item.data.flags['itemacro'] &&
            item.data.flags['itemacro'].macro.data.command) {

            var command = item.data.flags['itemacro'].macro.data.command;
            name = command.substr(0, 120);

            matching_macros.push(name);
        }
		
		return matching_macros;
    }

    // SEARCH for matching on use macros.
    searchOnUseMacros(item) {

        var matching_on_use_macros = [ ];

        // any on use macros?
        if (this._on_use_macro &&
            item.data.flags['midi-qol'] &&
            item.data.flags['midi-qol'].onUseMacroParts &&
            (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

			var search_name = this.escapeRegExp(this._on_use_macro_name);
            var search_id   = item._on_use_macro_id;
			
            // spin through item's on use macro list ...
            item.data.flags['midi-qol'].onUseMacroParts.items.forEach((macro, k) => {

                var match_found = false;
                var macro_name  = item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName.trim();
				var macro_id    = item.data.flags['midi-qol'].onUseMacroParts.items[k].id;  // macro.data._id ??
              //var search_id   = item.data.flags['midi-qol'].onUseMacroParts.items[k].id;

                // search by name
                if (this._on_use_macro_radio_name) {
                    // lowercase for non-case-sensitive search.
                    if ((search_name.length > 0) && !this._on_use_macro_case_sensitive) {
                        search_name = search_name.toLowerCase();
                        macro_name  = macro_name.toLowerCase();
                    };

                    // do macros match?
                    if ((!this._on_use_macro_exact_match && (macro_name.search(search_name) > -1)) ||
                         (this._on_use_macro_exact_match && (macro_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(macro_name).length)) ||
                         (search_name.length == 0)) {
                        match_found = true;
                    };
                };

                // search by id
                if (this._on_use_macro_radio_id) {
                    // do ids match?
					if ((search_id == "") || (search_id == macro_id)) {
                        match_found = true;
                    };
                };

                // macro matches.
                if (match_found) {
                    matching_on_use_macros.push(macro);
                };
            }); // forEach Macro.
        };
		
		return matching_on_use_macros;
    }

    // SEARCH for matching items.
    searchItems(items) {

        var matching_items = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through item contents ...
        items.contents.forEach((item, j) => {

            var match_found = false;
            var item_name   = item.data.name;
			var item_id     = item.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    item_name   = item_name.toLowerCase();
                };

                // do items match?
                if ((!this._exact_match && (item_name.search(search_name) > -1)) ||
                     (this._exact_match && (item_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(item_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == item_id)) {
                    match_found = true;
                };
            };

            // item matches.
            if (match_found) {
                var selected = false;

                if      (this.noItemTypesSelected()) selected = true;
                else if (this._weapon     && item.type == 'weapon')     selected = true;
                else if (this._equipment  && item.type == 'equipment')  selected = true;
                else if (this._consumable && item.type == 'consumable') selected = true;
                else if (this._tool       && item.type == 'tool')       selected = true;
                else if (this._loot       && item.type == 'loot')       selected = true;
                else if (this._class      && item.type == 'class')      selected = true;
                else if (this._feat       && item.type == 'feat')       selected = true;
                else if (this._backpack   && item.type == 'backpack')   selected = true;
                else if (this._spell      && item.type == 'spell')      selected = true;

                if (selected) {
                    matching_items.push(item);
                };
            };
        }); // forEach Item.
		
		return matching_items;
    }
}

export class JournalOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "JournalOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;

        this._base           = false;
        this._checklist      = false;
        this._encounter      = false;
        this._loot           = false;
        this._organization   = false;
        this._person         = false;
        this._place          = false;
        this._poi            = false;
        this._quest          = false;
        this._shop           = false;
    }

	get journalCount()     { return this._count };
	get journalShow()      { return this._show };
	get journalShowID()    { return this._show_id };
	get journalSubmitted() { return this._submitted };
	get journalNone() 	   { return this._none };
	get journalNameRadio() { return this._name_radio };

	set journalCount(count)      { this._count = count };
	set journalSubmitted(submit) { this._submitted = submit };

    // no journal options?
    noJournalTypesSelected() {
        return (!this._base         &&
                !this._checklist    &&
                !this._encounter    &&
                !this._organization &&
                !this._person       &&
                !this._place        &&
                !this._poi          &&
                !this._quest        &&
                !this._shop);
    }

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "actors_in_journals":
                prefix = "analytics-actors-in-journal-";
                break;
            case "cards_in_journals":
                prefix = "analytics-cards-in-journal-";
                break;
            case "compendiums_with_journals":
                prefix = "analytics-compendiums-with-journal-";
                break;
            case "items_in_journals":
                prefix = "analytics-items-in-journal-";
                break;
            case "journals_within_journals_20":
                prefix = "analytics-journals-within-journal-";
                break;
            case "macros_in_journals":
                prefix = "analytics-macros-in-journal-";
                break;
            case "playlists_in_journals":
                prefix = "analytics-playlists-in-journal-";
                break;
            case "scenes_in_journals":
                prefix = "analytics-scenes-in-journal-";
                break;
            case "scenes_with_journals":
                prefix = "analytics-scenes-with-journal-";
                break;
            case "scenes_with_journals_as_pins":
                prefix = "analytics-scenes-with-journal-as-pin-";
                break;
            case "tables_in_journals":
                prefix = "analytics-tables-in-journal-";
                break;
            case "tables_with_journals":
                prefix = "analytics-tables-with-journal-";
                break;
            default:
                prefix = "analytics-journals-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;

        // disable journal subtypes if monk's enhanced journal not installed or not active.
        if (!game.modules.get("monks-enhanced-journal") || !game.modules.get("monks-enhanced-journal").active) {
            document.getElementById(prefix + "monks-base").style.display         = "none";
            document.getElementById(prefix + "monks-checklist").style.display    = "none";
            document.getElementById(prefix + "monks-encounter").style.display    = "none";
            document.getElementById(prefix + "monks-loot").style.display         = "none";
            document.getElementById(prefix + "monks-organization").style.display = "none";
            document.getElementById(prefix + "monks-person").style.display       = "none";
            document.getElementById(prefix + "monks-place").style.display        = "none";
            document.getElementById(prefix + "monks-poi").style.display          = "none";
            document.getElementById(prefix + "monks-quest").style.display        = "none";
            document.getElementById(prefix + "monks-shop").style.display         = "none";
        };
    }

    // get data for form.
    getJournalData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-journals"]     = game.journal.size;
        retval[prefix + "journal-count"]          = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        retval[prefix + "base-checked"]           = this._base           ? "checked" : "";
        retval[prefix + "checklist-checked"]      = this._checklist      ? "checked" : "";
        retval[prefix + "encounter-checked"]      = this._encounter      ? "checked" : "";
        retval[prefix + "loot-checked"]           = this._loot           ? "checked" : "";
        retval[prefix + "organization-checked"]   = this._organization   ? "checked" : "";
        retval[prefix + "person-checked"]         = this._person         ? "checked" : "";
        retval[prefix + "place-checked"]          = this._place          ? "checked" : "";
        retval[prefix + "poi-checked"]            = this._poi            ? "checked" : "";
        retval[prefix + "quest-checked"]          = this._quest          ? "checked" : "";
        retval[prefix + "shop-checked"]           = this._shop           ? "checked" : "";

        return retval;
    }

    // set data from form.
    setJournalData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "base")           { this._base           = v; }
        if (k == prefix + "checklist")      { this._checklist      = v; }
        if (k == prefix + "encounter")      { this._encounter      = v; }
        if (k == prefix + "loot")           { this._loot           = v; }
        if (k == prefix + "organization")   { this._organization   = v; }
        if (k == prefix + "person")         { this._person         = v; }
        if (k == prefix + "place")          { this._place          = v; }
        if (k == prefix + "poi")            { this._poi            = v; }
        if (k == prefix + "quest")          { this._quest          = v; }
        if (k == prefix + "shop")           { this._shop           = v; }
    }

    // SEARCH for matching journals.
    searchJournals(journals, search_str = "") {

        var matching_journals = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        var search_exp = "";
        if (search_str.length > 0) {
            if (this._name_radio)
                search_exp = new RegExp(`@Actor\\[.{16}\\]\\{` + this.escapeRegExp(search_str) + `\\}`)
            else
                search_exp = new RegExp(`@Actor\\[.{` + this.escapeRegExp(search_str) + `}\\]`)
        };

        // spin through journal contents ...
        journals.contents.forEach((journal, j) => {
            var match_found  = false;
            var journal_name = journal.data.name;
			var journal_id   = journal.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name  = search_name.toLowerCase();
                    journal_name = journal_name.toLowerCase();
                };

                // do journals match?
                if ((!this._exact_match && (journal_name.search(search_name) > -1)) ||
                     (this._exact_match && (journal_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(journal_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == journal_id)) {
                    match_found = true;
                };
            };

            // journal matches.
            if (match_found) {
                var selected = false;
                if      (this.noJournalTypesSelected() || !journal.data.flags['monks-enhanced-journal']) selected = true;
                else if (this._base         && journal.data.flags['monks-enhanced-journal'].type == 'base')         selected = true;
                else if (this._checklist    && journal.data.flags['monks-enhanced-journal'].type == 'checklist')    selected = true;
                else if (this._encounter    && journal.data.flags['monks-enhanced-journal'].type == 'encounter')    selected = true;
                else if (this._loot         && journal.data.flags['monks-enhanced-journal'].type == 'loot')         selected = true;
                else if (this._organization && journal.data.flags['monks-enhanced-journal'].type == 'organization') selected = true;
                else if (this._person       && journal.data.flags['monks-enhanced-journal'].type == 'person')       selected = true;
                else if (this._place        && journal.data.flags['monks-enhanced-journal'].type == 'place')        selected = true;
                else if (this._poi          && journal.data.flags['monks-enhanced-journal'].type == 'poi')          selected = true;
                else if (this._quest        && journal.data.flags['monks-enhanced-journal'].type == 'quest')        selected = true;
                else if (this._shop         && journal.data.flags['monks-enhanced-journal'].type == 'shop')         selected = true;

                if (selected) {

                    if (search_str.length > 0) {
                        // regexp search.
                        if (journal.data.content.search(search_exp) > -1) {
                            matching_journals.push(journal);
                        };
                    }
                    else
                    {
                        matching_journals.push(journal);
                    }
                };
            };
        }); // forEach Journal.
		
		return matching_journals;
    }
}

export class MacroOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "MacroOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get macroCount()     { return this._count };
	get macroShow()      { return this._show };
	get macroShowID()    { return this._show_id };
	get macroSubmitted() { return this._submitted };
	get macroNone()      { return this._none };
	get macroNameRadio() { return this._name_radio };

	set macroCount(count)      { this._count = count };
	set macroSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "compendiums_with_macros":
                prefix = "analytics-compendiums-with-macro-";
                break;
            case "items_with_macros":
                prefix = "analytics-items-with-macro-";
                break;
            case "journals_with_macros":
                prefix = "analytics-journals-with-macro-";
                break;
            case "tables_with_macros":
                prefix = "analytics-tables-with-macro-";
                break;
            case "tiles_with_macros":
                prefix = "analytics-tiles-with-macro-";
                break;
            default:
                prefix = "analytics-macros-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getMacroData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-macros"]       = game.macros.size;
        retval[prefix + "macro-count"]            = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setMacroData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;
    }

    // SEARCH for matching macros.
    searchMacros(macros) {

        var matching_macros = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through macro list ...
        macros.contents.forEach((macro, i) => {

            var match_found = false;
            var macro_name  = macro.data.name;
			var macro_id    = macro.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    macro_name  = macro_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (macro_name.search(search_name) > -1)) ||
                     (this._exact_match && (macro_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(macro_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == macro_id)) {
                    match_found = true;
                };
            };

            // macro matches.
            if (match_found) {
                matching_macros.push(macro);
            };
        }); // forEach Macro.
		
		return matching_macros;
    };
}

export class PlaylistOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "PlaylistOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get playlistCount()     { return this._count };
	get playlistShow()      { return this._show };
	get playlistShowID()    { return this._show_id };
	get playlistSubmitted() { return this._submitted };
	get playlistNone()      { return this._none };
	get playlistNameRadio() { return this._name_radio };

	set playlistCount(count)      { this._count = count };
	set playlistSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "compendiums_with_playlists":
                prefix = "analytics-compendiums-with-playlist-";
                break;
            case "journals_with_playlists":
                prefix = "analytics-journals-with-playlist-";
                break;
            case "scenes_with_playlists":
                prefix = "analytics-scenes-with-playlist-";
                break;
            case "tables_with_playlists":
                prefix = "analytics-tables-with-playlist-";
                break;
            default:
                prefix = "analytics-playlists-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getPlaylistData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-playlists"]    = game.playlists.size;
        retval[prefix + "playlist-count"]         = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setPlaylistData(k, v, secondary = "") {
        var retval = { };
        var prefix = this.prefixSecondary(secondary);

        if (k ==  prefix + "show")           { this._show           = v; }
        if (k ==  prefix + "show-id")        { this._show_id        = v; }

        if (k ==  prefix + "name")           { this._name           =  v ? v : ""; }
        if (k ==  prefix + "id")             { this._id             = v ? v : ""; }
        if (k ==  prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k ==  prefix + "exact-match")    { this._exact_match    = v; }
        if (k ==  prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;
    }

    // SEARCH for matching playlists.
    searchPlaylists(playlists) {

        var matching_playlists = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through playlist list ...
        playlists.contents.forEach((playlist, i) => {

            var match_found   = false;
            var playlist_name = playlist.data.name;
			var playlist_id   = playlist.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    playlist_name  = playlist_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (playlist_name.search(search_name) > -1)) ||
                     (this._exact_match && (playlist_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(playlist_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == playlist_id)) {
                    match_found = true;
                };
            };

            // playlist matches.
            if (match_found) {
                matching_playlists.push(playlist);
            };
        }); // forEach Playlist.
		
		return matching_playlists;
    };
}

export class SceneOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "SceneOptions  constructor()");

        super();

        this._count          = 0;
        this._token_count    = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get sceneCount()      { return this._count };
	get sceneShow()       { return this._show };
	get sceneShowID()     { return this._show_id };
	get sceneSubmitted()  { return this._submitted };
	get sceneNone()       { return this._none };
	get sceneNameRadio()  { return this._name_radio };

	get sceneTokenCount() { return this._token_count };

	set sceneCount(count)      { this._count = count };
	set sceneTokenCount(count) { this._token_count = count };
	set sceneSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "actors_in_scenes_as_tokens":
                prefix = "analytics-actors-in-scene-as-token-";
                break;
            case "compendiums_with_scenes":
                prefix = "analytics-compendiums-with-scene-";
                break;
            case "journals_with_scenes":
                prefix = "analytics-journals-with-scene-";
                break;
            case "journals_in_scenes":
                prefix = "analytics-journals-in-scene-";
                break;
            case "journals_in_scenes_as_pins":
                prefix = "analytics-journals-in-scene-as-pin-";
                break;
            case "playlists_in_scenes":
                prefix = "analytics-playlists-in-scene-";
                break;
            case "tables_with_scenes":
                prefix = "analytics-tables-with-scene-";
                break;
            case "tiles_in_scenes":
                prefix = "analytics-tiles-in-scene-";
                break;
            default:
                prefix = "analytics-scenes-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getSceneData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-scenes"]       = game.scenes.size;
        retval[prefix + "scene-count"]            = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setSceneData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k ==  prefix + "show")             { this._show           = v; }
        if (k ==  prefix + "show-id")          { this._show_id        = v; }

        if (k ==  prefix + "name")             { this._name           = v ? v : ""; }
        if (k ==  prefix + "id")               { this._id             = v ? v : ""; }
        if (k ==  prefix + "case-sensitive")   { this._case_sensitive = v; }
        if (k ==  prefix + "exact-match")      { this._exact_match    = v; }
        if (k ==  prefix + "none")             { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;
    };

    // SEARCH for matching tokens.
    searchSceneTokens(scene, token) {

        var matching_tokens = [ ];

        // spin through tokens ...
        scene.tokens.contents.forEach((item, i) => {

            var match_found = false;

            // search by name
            if (this._name_radio) {
                // item without a "represented actor" match item name else match actor name.
                var item_name = "";
                item.actor ? item_name = this.escapeRegExp(item.actor.name) : item_name = this.escapeRegExp(item.name);

                // do items match?
                if (token.search(item_name) > -1) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // item without a "represented actor" match item id else match actor id.
                var item_id = "";
                item.actor ? item_id = item.actor._id : item_id = item._id;

                // do items match?
				if ((item_id == "") || (item_id == token)) {
                    match_found = true;
                };
            };

            // item matches.
            if (match_found) {
                matching_tokens.push(item);
            };
        }); // forEach Token.
		
		return matching_tokens;
    }

    // SEARCH for matching scenes.
    searchScenes(scenes) {

        var matching_scenes = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        // spin through scene contents ...
        scenes.contents.forEach((scene, j) => {

            var match_found = false;
            var scene_name  = scene.data.name;
			var scene_id	= scene.data._id

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    scene_name  = scene_name.toLowerCase();
                };

                // do scenes match?
                if ((!this._exact_match && (scene_name.search(search_name) > -1)) ||
                     (this._exact_match && (scene_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(scene_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == scene_id)) {
                    match_found = true;
                };
            };

            // scene matches.
            if (match_found) {
                matching_scenes.push(scene);
            };
        }); // forEach Scene.
		
		return matching_scenes;
    }
}

export class TableOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "TableOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get tableCount()     { return this._count };
	get tableShow()      { return this._show };
	get tableShowID()    { return this._show_id };
	get tableSubmitted() { return this._submitted };
	get tableNone()      { return this._none };
	get tableNameRadio() { return this._name_radio };

	set tableCount(count)      { this._count = count };
	set tableSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "actors_in_tables":
                prefix = "analytics-actors-in-table-";
                break;
            case "cards_in_tables":
                prefix = "analytics-cards-in-table-";
                break;
            case "compendiums_with_tables":
                prefix = "analytics-compendiums-with-table-";
                break;
            case "compendiums_in_tables":
                prefix = "analytics-compendiums-in-table-";
                break;
            case "items_in_tables":
                prefix = "analytics-items-in-table-";
                break;
            case "journals_in_tables":
                prefix = "analytics-journals-in-table-";
                break;
            case "journals_with_tables":
                prefix = "analytics-journals-with-table-";
                break;
            case "macros_in_tables":
                prefix = "analytics-macros-in-table-";
                break;
            case "playlists_in_tables":
                prefix = "analytics-playlists-in-table-";
                break;
            case "scenes_in_tables":
                prefix = "analytics-scenes-in-table-";
                break;
            case "tables_within_tables_34":
                prefix = "analytics-tables-within-table-";
                break;
            default:
                prefix = "analytics-tables-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getTableData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-tables"]       = game.tables.size;
        retval[prefix + "table-count"]            = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setTableData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;
    }

    // SEARCH for matching tables.
    searchTables(tables, search_str = "") {

        var matching_tables = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

        var search_exp = "";
        if (search_str.length > 0) {
            if (this._name_radio)
                search_exp = new RegExp(`@Actor\\[.{16}\\]\\{` + this.escapeRegExp(search_str) + `\\}`)
            else
                search_exp = new RegExp(`@Actor\\[.{` + this.escapeRegExp(search_str) + `}\\]`)
        };

        // spin through table list ...
        tables.contents.forEach((table, i) => {

            var match_found = false;
            var table_name  = table.data.name;
			var table_id    = table.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    table_name  = table_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (table_name.search(search_name) > -1)) ||
                     (this._exact_match && (table_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(table_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == table_id)) {
                    match_found = true;
                };
            };

            // table matches.
            if (match_found) {
                    if (search_str.length > 0) {
                        // regexp search.
                        if (table.link.search(search_exp) > -1) {
                            matching_tables.push(table);
                        };
                    }
                    else
                    {
						matching_tables.push(table);
                    }
            };
        }); // forEach Table.
		
		return matching_tables;
    };
}

export class TileOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "TileOptions  constructor()");

        super();

        this._count          = 0;
        this._show           = true;
        this._show_id        = false;
        this._submitted      = false;

        this._name           = "";
        this._id             = "";
        this._case_sensitive = false;
        this._exact_match    = false;
        this._none           = false;

        this._name_radio     = true;
        this._id_radio       = false;
    }

	get tileCount()     { return this._count };
	get tileShow()      { return this._show };
	get tileShowID()    { return this._show_id };
	get tileSubmitted() { return this._submitted };
	get tileNone()      { return this._none };
	get tileNameRadio() { return this._name_radio };

	set tileCount(count)      { this._count = count };
	set tileSubmitted(submit) { this._submitted = submit };

    // form element prefixes.
    prefixSecondary(secondary) {
        var prefix = "";
        switch(secondary) {
            case "macros_in_tiles":
                prefix = "analytics-macros-in-tile-";
                break;
            case "scenes_with_tiles":
                prefix = "analytics-scenes-with-tile-";
                break;
            default:
                prefix = "analytics-tiles-";
                break;
        };
        return prefix;
    };

    // initialize form settings.
    activateListeners(secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    }

    // get data for form.
    getTileData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-tiles"]        = 0;
        retval[prefix + "tile-count"]             = this._count;
        retval[prefix + "show-checked"]           = this._show           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this._show_id        ? "checked" : "";

        retval[prefix + "name-value"]             = this._name;
        retval[prefix + "id-value"]               = this._id;
        retval[prefix + "case-sensitive-checked"] = this._case_sensitive ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this._exact_match    ? "checked" : "";
        retval[prefix + "none-checked"]           = this._none           ? "checked" : "";

        retval[prefix + "name-radio-checked"]     = this._name_radio     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this._id_radio       ? "checked" : "";

        return retval;
    }

    // set data from form.
    setTileData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        if (k == prefix + "show")           { this._show           = v; }
        if (k == prefix + "show-id")        { this._show_id        = v; }

        if (k == prefix + "name")           { this._name           = v ? v : ""; }
        if (k == prefix + "id")             { this._id             = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this._case_sensitive = v; }
        if (k == prefix + "exact-match")    { this._exact_match    = v; }
        if (k == prefix + "none")           { this._none           = v; }

        this._name_radio = document.getElementById(prefix + "name-radio").checked;
        this._id_radio   = document.getElementById(prefix + "id-radio").checked;

    }

    // SEARCH for matching tiles.
    searchTiles(tiles) {

        var matching_tiles = [ ];
		var search_name = this.escapeRegExp(this._name.trim());
		var search_id   = this._id;

/*
        // spin through tile list ...
        tiles.contents.forEach((tile, i) => {

            var match_found = false;
            var tile_name   = tile.data.name;
			var tile_id     = tile.data._id;

            // search by name
            if (this._name_radio) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this._case_sensitive) {
                    search_name = search_name.toLowerCase();
                    tile_name  = tile_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this._exact_match && (tile_name.search(search_name) > -1)) ||
                     (this._exact_match && (tile_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(tile_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this._id_radio) {
                // do ids match?
				if ((search_id == "") || (search_id == tile_id)) {
                    match_found = true;
                };
            };

            // tile matches.
            if (match_found) {
                matching_tiles.push(tile);
            };
        }); // forEach Tile.
*/
		return matching_tiles;
    };
}

export class AnalyticsForm extends FormApplication {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsForm  constructor(parent, formData, options)");

        super(formData, options);

        this.parent = parent;

        // inputs.
        this.actor_options      = { };
        this.card_options       = { };
        this.compendium_options = { };
        this.item_options       = { };
        this.journal_options    = { };
        this.macro_options      = { };
        this.playlist_options   = { };
        this.scene_options      = { };
        this.table_options      = { };
        this.tile_options       = { };

        // outputs.
        this.actor_lists        = { };
        this.card_lists         = { };
        this.compendium_lists   = { };
        this.item_lists         = { };
        this.journal_lists      = { };
        this.macro_lists        = { };
        this.playlist_lists     = { };
        this.scene_lists        = { };
        this.table_lists        = { };
        this.tile_lists         = { };

        // output list.
        this.list_counter = 0;
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsForm static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, { });
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

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsForm async activateListeners(html)");

        super.activateListeners($html);

        // tools
        if (canvas.background._active) canvas.foreground.activate();
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsActors async _onChangeTab()");

        super._onChangeTab(event, tabs, active);
    }

    // escape conflicting characters for regexp searches.
    escapeRegExp(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }

    // add message to list.
    addMessage(list, message) {
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-even-message"><input type="text" class="analytics-even-message" data-dtype="String" value="` + message + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-odd-message" ><input type="text" class="analytics-odd-message"  data-dtype="String" value="` + message + `" readonly></p>`;
        this.list_counter++;
    }

    // add primaries to list.
    addActorPrimary(list, actor, show_id) {
        var name = actor.data ? actor.data.name : actor.name;
        var id   = actor.data ? actor.id : actor._id;
        id       = show_id ? id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-actor"><input type="text" class="analytics-primary-even-actor" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-actor" ><input type="text" class="analytics-primary-odd-actor"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addCardPrimary(list, card, show_id) {
        var name = card.data.name;
        var id   = show_id ? card.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-card"><input type="text" class="analytics-primary-even-card" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-card" ><input type="text" class="analytics-primary-odd-card"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addCompendiumPrimary(list, compendium, show_id) {
        var name = compendium.metadata.label;

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-compendium"><input type="text" class="analytics-secondary-even-card" data-dtype="String" value="` + name + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-compendium" ><input type="text" class="analytics-secondary-odd-card"  data-dtype="String" value="` + name + `" readonly></p>`;
        this.list_counter++;
    }
    addItemPrimary(list, item, show_id) {
        var name = item.data.name;
        var id   = show_id ? item.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-item"><input type="text" class="analytics-primary-even-item" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-item" ><input type="text" class="analytics-primary-odd-item"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addItemMacroPrimary(list, macro, show_id) {
        var name = macro;
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-item-macro"><input type="text" class="analytics-primary-even-item-macro" data-dtype="String" value="` + name + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-item-macro" ><input type="text" class="analytics-primary-odd-item-macro"  data-dtype="String" value="` + name + `" readonly></p>`;
        this.list_counter++;
    }
    addItemOnUseMacroPrimary(list, macro, show_id) {
        var name = macro.macroName;

        // does macro exist?
        if (game.macros.getName(name)) {
            var id = show_id ? game.macros.getName(name).id : "";
            if (id.length > 0) id = " [ " + id + " ]";

            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-on-use-macro"><input type="text" class="analytics-primary-even-on-use-macro" data-dtype="String" value="` + name + id + `" readonly></p>`
                                         : list[this.list_counter] = `<p class="analytics-primary-odd-on-use-macro" ><input type="text" class="analytics-primary-odd-on-use-macro"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        }
        else if (name.toLowerCase() == "itemmacro") {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-on-use-macro"><input type="text" class="analytics-secondary-even-on-use-macro" data-dtype="String" value="` + name + `" readonly></p>`
                                         : list[this.list_counter] = `<p class="analytics-primary-odd-on-use-macro" ><input type="text" class="analytics-secondary-odd-on-use-macro"  data-dtype="String" value="` + name + `" readonly></p>`;
        }
        else {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-on-use-macro-error"><input type="text" class="analytics-primary-even-on-use-macro-error" data-dtype="String" value="` + name + id + `" readonly></p>`
                                         : list[this.list_counter] = `<p class="analytics-primary-odd-on-use-macro-error" ><input type="text" class="analytics-primary-odd-on-use-macro-error"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        }
        this.list_counter++;
    }
    addJournalPrimary(list, journal, show_id) {
        var name = journal.data.name;
        var id   = show_id ? journal.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-journal"><input type="text" class="analytics-primary-even-journal" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-journal" ><input type="text" class="analytics-primary-odd-journal"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addMacroPrimary(list, macro, show_id) {
        var name = macro.data.name;
        var id   = show_id ? macro.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-macro"><input type="text" class="analytics-primary-even-macro" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-macro" ><input type="text" class="analytics-primary-odd-macro"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addPlaylistPrimary(list, playlist, show_id) {
        var name = playlist.data.name;
        var id   = show_id ? playlist.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-playlist"><input type="text" class="analytics-primary-even-playlist" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-playlist" ><input type="text" class="analytics-primary-odd-playlist"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addScenePrimary(list, scene, show_id) {
        var name = scene.data.name;
        var id   = show_id ? scene.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-scene"><input type="text" class="analytics-primary-even-scene" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-scene" ><input type="text" class="analytics-primary-odd-scene"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addTablePrimary(list, table, show_id) {
        var name = table.data.name;
        var id   = show_id ? table.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-table"><input type="text" class="analytics-primary-even-table" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-table" ><input type="text" class="analytics-primary-odd-table"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addTilePrimary(list, tile, show_id) {
        var name = tile.data.name;
        var id   = show_id ? tile.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-tile"><input type="text" class="analytics-primary-even-tile" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-tile" ><input type="text" class="analytics-primary-odd-tile"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }

    // add secondaries to list.
    addActorSecondary(list, actor, show_id) {
        var name = actor.data ? actor.data.name : actor.name;
        var id   = actor.data ? actor.id : actor._id;
        id       = show_id ? id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-actor"><input type="text" class="analytics-secondary-even-actor" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-actor" ><input type="text" class="analytics-secondary-odd-actor"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addCardSecondary(list, card, show_id) {
        var name = card.data.name;
        var id   = show_id ? card.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-card"><input type="text" class="analytics-secondary-even-card" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-card" ><input type="text" class="analytics-secondary-odd-card"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addCompendiumSecondary(list, compendium, show_id) {
        var name = compendium.metadata.label;

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-compendium"><input type="text" class="analytics-secondary-even-card" data-dtype="String" value="` + name + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-compendium" ><input type="text" class="analytics-secondary-odd-card"  data-dtype="String" value="` + name + `" readonly></p>`;
        this.list_counter++;
    }
    addItemSecondary(list, item, show_id) {
        var name = item.data.name;
        var id   = show_id ? item.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item"><input type="text" class="analytics-secondary-even-item" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-item" ><input type="text" class="analytics-secondary-odd-item"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addItemMacroSecondary(list, macro, show_id) {
        var name = macro;
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item-macro"><input type="text" class="analytics-secondary-even-item-macro" data-dtype="String" value="` + name + `" readonly>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-item-macro" ><input type="text" class="analytics-secondary-odd-item-macro"  data-dtype="String" value="` + name + `" readonly>`;
        this.list_counter++;
    }
    addItemOnUseMacroSecondary(list, macro, show_id) {
        var name = macro.macroName;

        // does macro exist?
        if (game.macros.getName(name)) {
            var id = show_id ? game.macros.getName(name).id : "";
            if (id.length > 0) id = " [ " + id + " ]";

            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-on-use-macro"><input type="text" class="analytics-secondary-even-on-use-macro" data-dtype="String" value="` + name + id + `" readonly></p>`
                                         : list[this.list_counter] = `<p class="analytics-secondary-odd-on-use-macro" ><input type="text" class="analytics-secondary-odd-on-use-macro"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        }
        else if (name.toLowerCase() == "itemmacro") {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-on-use-macro"><input type="text" class="analytics-secondary-even-on-use-macro" data-dtype="String" value="` + name + `" readonly></p>`
                                         : list[this.list_counter] = `<p class="analytics-secondary-odd-on-use-macro" ><input type="text" class="analytics-secondary-odd-on-use-macro"  data-dtype="String" value="` + name + `" readonly></p>`;
        }
        else {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-on-use-macro-error"><input type="text" class="analytics-secondary-even-on-use-macro-error" data-dtype="String" value=` + name + ` readonly>`
                                         : list[this.list_counter] = `<p class="analytics-secondary-odd-on-use-macro-error" ><input type="text" class="analytics-secondary-odd-on-use-macro-error"  data-dtype="String" value=`  + name + ` readonly>`;
        }
        this.list_counter++;
    }
    addJournalSecondary(list, journal, show_id) {
        var name = journal.data.name;
        var id   = show_id ? journal.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-journal"><input type="text" class="analytics-secondary-even-journal" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-journal" ><input type="text" class="analytics-secondary-odd-journal"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addMacroSecondary(list, macro, show_id) {
        var name = macro.data.name;
        var id   = show_id ? macro.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-macro"><input type="text" class="analytics-secondary-even-macro" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-macro" ><input type="text" class="analytics-secondary-odd-macro"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addPlaylistSecondary(list, playlist, show_id) {
        var name = playlist.data.name;
        var id   = show_id ? playlist.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-playlist"><input type="text" class="analytics-secondary-even-playlist" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-playlist" ><input type="text" class="analytics-secondary-odd-playlist"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addSceneSecondary(list, scene, show_id) {
        var name = scene.data.name;
        var id   = show_id ? scene.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-scene"><input type="text" class="analytics-secondary-even-scene" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-scene" ><input type="text" class="analytics-secondary-odd-scene"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addTableSecondary(list, table, show_id) {
        var name = table.data.name;
        var id   = show_id ? table.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-table"><input type="text" class="analytics-secondary-even-table" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-table" ><input type="text" class="analytics-secondary-odd-table"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
    addTileSecondary(list, tile, show_id) {
        var name = tile.data.name;
        var id   = show_id ? tile.id : "";
        if (id.length > 0) id = " [ " + id + " ]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-tile"><input type="text" class="analytics-secondary-even-tile" data-dtype="String" value="` + name + id + `" readonly></p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-tile" ><input type="text" class="analytics-secondary-odd-tile"  data-dtype="String" value="` + name + id + `" readonly></p>`;
        this.list_counter++;
    }
}
