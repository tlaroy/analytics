/***
*
* module/analytics.js
*
* version 0.0.11
*
*/

import * as ANALYTICS from "./const.js";

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

    constructor(parent) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "ActorOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_actors = [ ];

        this.actor_count                  = 0;
        this.actor_name_value             = "";
        this.actor_id_value               = "";
        this.actor_radio_name_checked     = true;
        this.actor_radio_id_checked       = false;
        this.actor_case_sensitive_checked = false;
        this.actor_exact_match_checked    = false;

        this.actor_npc_checked            = false;
        this.actor_character_checked      = false;
        this.actor_vehicle_checked        = false;

        this.actor_aberration_checked     = false;
        this.actor_beast_checked          = false;
        this.actor_celestial_checked      = false;
        this.actor_construct_checked      = false;
        this.actor_dragon_checked         = false;
        this.actor_elemental_checked      = false;
        this.actor_fey_checked            = false;
        this.actor_fiend_checked          = false;
        this.actor_giant_checked          = false;
        this.actor_humanoid_checked       = false;
        this.actor_monstrosity_checked    = false;
        this.actor_ooze_checked           = false;
        this.actor_plant_checked          = false;
        this.actor_swarm_checked          = false;
        this.actor_undead_checked         = false;

        this.actor_none_checked           = false;
        this.actor_show_checked           = false;
        this.actor_show_id_checked        = false;
    }

    // no actor options?
    noActorTypesSelected() {
        return (!this.actor_npc_checked       &&
                !this.actor_character_checked &&
                !this.actor_vehicle_checked);
    }

    // no creature options?
    noCreatureTypesSelected() {
        return (!this.actor_aberration_checked  &&
                !this.actor_beast_checked       &&
                !this.actor_celestial_checked   &&
                !this.actor_construct_checked   &&
                !this.actor_dragon_checked      &&
                !this.actor_elemental_checked   &&
                !this.actor_fey_checked         &&
                !this.actor_fiend_checked       &&
                !this.actor_giant_checked       &&
                !this.actor_humanoid_checked    &&
                !this.actor_monstrosity_checked &&
                !this.actor_ooze_checked        &&
                !this.actor_plant_checked       &&
                !this.actor_swarm_checked       &&
                !this.actor_undead_checked);
    }

    // form element prefixea.
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
        retval[prefix + "actor-count"]            = this.actor_count;

        retval[prefix + "name-value"]             = this.actor_name_value;
        retval[prefix + "id-value"]               = this.actor_id_value;
        retval[prefix + "name-radio-checked"]     = this.actor_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.actor_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.actor_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.actor_exact_match_checked    ? "checked" : "";

        retval[prefix + "npc-checked"]            = this.actor_npc_checked            ? "checked" : "";
        retval[prefix + "character-checked"]      = this.actor_character_checked      ? "checked" : "";
        retval[prefix + "vehicle-checked"]        = this.actor_vehicle_checked        ? "checked" : "";

        retval[prefix + "aberration-checked"]     = this.actor_aberration_checked     ? "checked" : "";
        retval[prefix + "beast-checked"]          = this.actor_beast_checked          ? "checked" : "";
        retval[prefix + "celestial-checked"]      = this.actor_celestial_checked      ? "checked" : "";
        retval[prefix + "construct-checked"]      = this.actor_construct_checked      ? "checked" : "";
        retval[prefix + "dragon-checked"]         = this.actor_dragon_checked         ? "checked" : "";
        retval[prefix + "elemental-checked"]      = this.actor_elemental_checked      ? "checked" : "";
        retval[prefix + "fey-checked"]            = this.actor_fey_checked            ? "checked" : "";
        retval[prefix + "fiend-checked"]          = this.actor_fiend_checked          ? "checked" : "";
        retval[prefix + "giant-checked"]          = this.actor_giant_checked          ? "checked" : "";
        retval[prefix + "humanoid-checked"]       = this.actor_humanoid_checked       ? "checked" : "";
        retval[prefix + "monstrosity-checked"]    = this.actor_monstrosity_checked    ? "checked" : "";
        retval[prefix + "ooze-checked"]           = this.actor_ooze_checked           ? "checked" : "";
        retval[prefix + "plant-checked"]          = this.actor_plant_checked          ? "checked" : "";
        retval[prefix + "swarm-checked"]          = this.actor_swarm_checked          ? "checked" : "";
        retval[prefix + "undead-checked"]         = this.actor_undead_checked         ? "checked" : "";

        retval[prefix + "none-checked"]           = this.actor_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.actor_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.actor_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setActorData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.actor_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.actor_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.actor_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.actor_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.actor_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.actor_exact_match_checked    = v; }

        if (k == prefix + "npc")            { this.actor_npc_checked            = v; }
        if (k == prefix + "character")      { this.actor_character_checked      = v; }
        if (k == prefix + "vehicle")        { this.actor_vehicle_checked        = v; }
        if (k == prefix + "aberration")     { this.actor_aberration_checked     = v; }
        if (k == prefix + "beast")          { this.actor_beast_checked          = v; }
        if (k == prefix + "celestial")      { this.actor_celestial_checked      = v; }
        if (k == prefix + "construct")      { this.actor_construct_checked      = v; }
        if (k == prefix + "dragon")         { this.actor_dragon_checked         = v; }
        if (k == prefix + "elemental")      { this.actor_elemental_checked      = v; }
        if (k == prefix + "fey")            { this.actor_fey_checked            = v; }
        if (k == prefix + "fiend")          { this.actor_fiend_checked          = v; }
        if (k == prefix + "giant")          { this.actor_giant_checked          = v; }
        if (k == prefix + "humanoid")       { this.actor_humanoid_checked       = v; }
        if (k == prefix + "monstrosity")    { this.actor_monstrosity_checked    = v; }
        if (k == prefix + "ooze")           { this.actor_ooze_checked           = v; }
        if (k == prefix + "plant")          { this.actor_plant_checked          = v; }
        if (k == prefix + "swarm")          { this.actor_swarm_checked          = v; }
        if (k == prefix + "undead")         { this.actor_undead_checked         = v; }

        if (k == prefix + "none")           { this.actor_none_checked           = v; }
        if (k == prefix + "show")           { this.actor_show_checked           = v; }
        if (k == prefix + "show-id")        { this.actor_show_id_checked        = v; }
    };

    // search for matching actors.
    searchActors(actors) {

        this.matching_actors = [ ];

        // spin through actor list ...
        actors.contents.forEach((actor, i) => {

            var match_found = false;
            var actor_name  = actor.data.name;
            var search_name = this.escapeRegExp(this.actor_name_value);
            var search_id   = this.actor_id_value;

            // search by name
            if (this.actor_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.actor_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    actor_name  = actor_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.actor_exact_match_checked && (actor_name.search(search_name) > -1)) ||
                     (this.actor_exact_match_checked && (actor_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(actor_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.actor_radio_id_checked) {
                // do ids match?
                if (search_id == actor.data._id) {
                    match_found = true;
                };
            };

            // actor matches.
            if (match_found) {
                var selected = false;

                if (this.noActorTypesSelected() && this.noCreatureTypesSelected()) selected = true;
                else if (this.actor_character_checked        && actor.type == 'character') selected = true;
                else if (this.actor_vehicle_checked          && actor.type == 'vehicle')   selected = true;
                else if (this.actor_npc_checked              && actor.type == 'npc') {

                    if (actor_option.noCreatureTypesSelected()) selected = true;
                    else if  (this.actor_aberration_checked  && actor.data.data.details.type && actor.data.data.details.type.value == 'aberration')  selected = true;
                    else if  (this.actor_beast_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'beast')       selected = true;
                    else if  (this.actor_celestial_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'celestial')   selected = true;
                    else if  (this.actor_construct_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'construct')   selected = true;
                    else if  (this.actor_dragon_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'dragon')      selected = true;
                    else if  (this.actor_elemental_checked   && actor.data.data.details.type && actor.data.data.details.type.value == 'elemental')   selected = true;
                    else if  (this.actor_fey_checked         && actor.data.data.details.type && actor.data.data.details.type.value == 'fey')         selected = true;
                    else if  (this.actor_fiend_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'fiend')       selected = true;
                    else if  (this.actor_giant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'giant')       selected = true;
                    else if  (this.actor_humanoid_checked    && actor.data.data.details.type && actor.data.data.details.type.value == 'humanoid')    selected = true;
                    else if  (this.actor_monstrosity_checked && actor.data.data.details.type && actor.data.data.details.type.value == 'monstrosity') selected = true;
                    else if  (this.actor_ooze_checked        && actor.data.data.details.type && actor.data.data.details.type.value == 'ooze')        selected = true;
                    else if  (this.actor_plant_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'plant')       selected = true;
                    else if  (this.actor_swarm_checked       && actor.data.data.details.type && actor.data.data.details.type.value == 'swarm')       selected = true;
                    else if  (this.actor_undead_checked      && actor.data.data.details.type && actor.data.data.details.type.value == 'undead')      selected = true;
                }

                // add selected matching actor to list.
                if (selected) {
                    this.matching_actors.push(actor);
                };
            };
        }); // forEach Actor.
    };
}

export class CardOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "CardOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_cards = [ ];

        this.card_count                  = 0;
        this.card_name_value             = "";
        this.card_id_value               = "";
        this.card_radio_name_checked     = true;
        this.card_radio_id_checked       = false;
        this.card_case_sensitive_checked = false;
        this.card_exact_match_checked    = false;

        this.card_none_checked           = false;
        this.card_show_checked           = false;
        this.card_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "card-count"]             = this.card_count;

        retval[prefix + "name-value"]             = this.card_name_value;
        retval[prefix + "id-value"]               = this.card_id_value;
        retval[prefix + "name-radio-checked"]     = this.card_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.card_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.card_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.card_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.card_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.card_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.card_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setCardData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.card_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.card_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.card_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.card_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.card_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.card_exact_match_checked    = v; }

        if (k == prefix + "none")           { this.card_none_checked           = v; }
        if (k == prefix + "show")           { this.card_show_checked           = v; }
        if (k == prefix + "show-id")        { this.card_show_id_checked        = v; }
    }

    // search for matching cards.
    searchCards(cards) {

        this.matching_cards = [ ];

        // spin through card list ...
        cards.contents.forEach((card, i) => {

            var match_found = false;
            var card_name   = card.data.name;
            var search_name = this.escapeRegExp(this.card_name_value);
            var search_id   = this.card_id_value;

            // search by name
            if (this.card_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.card_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    card_name  = card_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.card_exact_match_checked && (card_name.search(search_name) > -1)) ||
                     (this.card_exact_match_checked && (card_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(card_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.card_radio_id_checked) {
                // do ids match?
                if (search_id == card.data._id) {
                    match_found = true;
                };
            };

            // card matches.
            if (match_found) {
                this.matching_cards.push(card);
            };
        }); // forEach Card.
    };
}

export class CompendiumOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "CompendiumOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_compendiums = [ ];

        this.compendium_submitted              = false;
        this.compendium_count                  = 0;
        this.compendium_name_value             = "";
        this.compendium_id_value               = "";
        this.compendium_radio_name_checked     = true;
        this.compendium_radio_id_checked       = false;
        this.compendium_case_sensitive_checked = false;
        this.compendium_exact_match_checked    = false;

        this.compendium_none_checked           = false;
        this.compendium_show_checked           = false;
        this.compendium_show_id_checked        = false;
    }

    // form element prefixea.
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

        // enable/disable by name or id.
        document.getElementById(prefix + "name").disabled           = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "case-sensitive").disabled = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "exact-match").disabled    = !document.getElementById(prefix + "name-radio").checked;
        document.getElementById(prefix + "id").disabled             = !document.getElementById(prefix + "id-radio").checked;
    };

    // get data for form.
    getCompendiumData(secondary = "") {
        var prefix = this.prefixSecondary(secondary);
        var retval = { };

        retval[prefix + "number-of-compendiums"]  = game.packs.size;
        retval[prefix + "compendium-count"]       = this.compendium_count;

        retval[prefix + "name-value"]             = this.compendium_name_value;
        retval[prefix + "id-value"]               = this.compendium_id_value;
        retval[prefix + "name-radio-checked"]     = this.compendium_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.compendium_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.compendium_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.compendium_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.compendium_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.compendium_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.compendium_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setCompendiumData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.compendium_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.compendium_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.compendium_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.compendium_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.compendium_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.compendium_exact_match_checked    = v; }

        if (k == prefix + "none")           { this.compendium_none_checked           = v; }
        if (k == prefix + "show")           { this.compendium_show_checked           = v; }
        if (k == prefix + "show-id")        { this.compendium_show_id_checked        = v; }
    }

    // search for matching compendiums.
    searchCompendiums(compendiums) {

        this.matching_compendiums = [ ];

        // spin through compendium list ...
        compendiums.contents.forEach((compendium, i) => {

            var match_found     = false;
            var compendium_name = compendium.documentName;
            var search_name     = this.escapeRegExp(this.compendium_name_value);
            var search_id       = this.compendium_id_value;

            // search by name
            if (this.compendium_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.compendium_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    compendium_name  = compendium_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.compendium_exact_match_checked && (compendium_name.search(search_name) > -1)) ||
                     (this.compendium_exact_match_checked && (compendium_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(compendium_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.compendium_radio_id_checked) {
                // do ids match?
                if (search_id == compendium.data._id) {
                    match_found = true;
                };
            };

            // compendium matches.
            if (match_found) {
                this.matching_compendiums.push(compendium);
            };
        }); // forEach Compendium.
    };
}

export class ItemOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "ItemOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_items = [ ];
        this.matching_on_use_macros = [ ];

        this.item_submitted                           = false;
        this.item_count                               = 0;
        this.item_name_value                          = "";
        this.item_id_value                            = "";
        this.item_radio_name_checked                  = true;
        this.item_radio_id_checked                    = false;
        this.item_case_sensitive_checked              = false;
        this.item_exact_match_checked                 = false;

        this.item_weapon_checked                      = false;
        this.item_equipment_checked                   = false;
        this.item_consumable_checked                  = false;
        this.item_tool_checked                        = false;
        this.item_loot_checked                        = false;
        this.item_class_checked                       = false;
        this.item_feat_checked                        = false;
        this.item_backpack_checked                    = false;
        this.item_spell_checked                       = false;

        this.item_macro_checked                       = false;
/*
        this.item_macro_count                         = 0;
        this.item_macro_name_value                    = "";
        this.item_macro_id_value                      = "";
        this.item_macro_radio_name_checked            = true;
        this.item_macro_radio_id_checked              = false;
        this.item_macro_case_sensitive_checked        = false;
        this.item_macro_exact_match_checked           = false;
*/
        this.item_on_use_macro_checked                = false;
        this.item_on_use_macro_count                  = 0;
        this.item_on_use_macro_name_value             = "";
        this.item_on_use_macro_id_value               = "";
        this.item_on_use_macro_radio_name_checked     = true;
        this.item_on_use_macro_radio_id_checked       = false;
        this.item_on_use_macro_case_sensitive_checked = false;
        this.item_on_use_macro_exact_match_checked    = false;

        this.item_none_checked                        = false;
        this.item_show_checked                        = false;
        this.item_show_id_checked                     = false;
    }

    // no item options?
    noItemTypesSelected() {
        return (!this.item_weapon_checked     &&
                !this.item_equipment_checked  &&
                !this.item_consumable_checked &&
                !this.item_tool_checked       &&
                !this.item_loot_checked       &&
                !this.item_class_checked      &&
                !this.item_feat_checked       &&
                !this.item_backpack_checked   &&
                !this.item_spell_checked);
    }

    // form element prefixea.
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
        retval[prefix + "item-count"]                   = this.item_count;

        retval[prefix + "name-value"]                   = this.item_name_value,
        retval[prefix + "id-value"]                     = this.item_id_value,
        retval[prefix + "name-radio-checked"]           = this.item_radio_name_checked           ? "checked" : "";
        retval[prefix + "id-radio-checked"]             = this.item_radio_id_checked             ? "checked" : "";
        retval[prefix + "case-sensitive-checked"]       = this.item_case_sensitive_checked       ? "checked" : "";
        retval[prefix + "exact-match-checked"]          = this.item_exact_match_checked          ? "checked" : "";

        retval[prefix + "weapon-checked"]               = this.item_weapon_checked               ? "checked" : "";
        retval[prefix + "equipment-checked"]            = this.item_equipment_checked            ? "checked" : "";
        retval[prefix + "consumable-checked"]           = this.item_consumable_checked           ? "checked" : "";
        retval[prefix + "tool-checked"]                 = this.item_tool_checked                 ? "checked" : "";
        retval[prefix + "loot-checked"]                 = this.item_loot_checked                 ? "checked" : "";
        retval[prefix + "class-checked"]                = this.item_class_checked                ? "checked" : "";
        retval[prefix + "feat-checked"]                 = this.item_feat_checked                 ? "checked" : "";
        retval[prefix + "backpack-checked"]             = this.item_backpack_checked             ? "checked" : "";
        retval[prefix + "spell-checked"]                = this.item_spell_checked                ? "checked" : "";

        retval[prefix + "macro-checked"]                = this.item_macro_checked                ? "checked" : "";
        retval[prefix + "macro-name-value"]             = this.item_macro_name_value;
        retval[prefix + "macro-name-id"]                = this.item_macro_id_value;
        retval[prefix + "macro-name-radio-checked"]     = this.item_macro_radio_name_checked     ? "checked" : "";
        retval[prefix + "macro-id-radio-checked"]       = this.item_macro_radio_id_checked       ? "checked" : "";
        retval[prefix + "macro-case-sensitive-checked"] = this.item_macro_case_sensitive_checked ? "checked" : "";
        retval[prefix + "macro-exact-match-checked"]    = this.item_macro_exact_match_checked    ? "checked" : "";

        retval[prefix + "on-use-macro-checked"]                = this.item_on_use_macro_checked                ? "checked" : "";
        retval[prefix + "on-use-macro-name-value"]             = this.item_on_use_macro_name_value;
        retval[prefix + "on-use-macro-name-id"]                = this.item_on_use_macro_id_value;
        retval[prefix + "on-use-macro-name-radio-checked"]     = this.item_on_use_macro_radio_name_checked     ? "checked" : "";
        retval[prefix + "on-use-macro-id-radio-checked"]       = this.item_on_use_macro_radio_id_checked       ? "checked" : "";
        retval[prefix + "on-use-macro-case-sensitive-checked"] = this.item_on_use_macro_case_sensitive_checked ? "checked" : "";
        retval[prefix + "on-use-macro-exact-match-checked"]    = this.item_on_use_macro_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]                 = this.item_none_checked                 ? "checked" : "";
        retval[prefix + "show-checked"]                 = this.item_show_checked                 ? "checked" : "";
        retval[prefix + "show-id-checked"]              = this.item_show_id_checked              ? "checked" : "";

        return retval;
    }

    // set data from form.
    setItemData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.item_radio_name_checked       = document.getElementById(prefix + "name-radio").checked;
        this.item_radio_id_checked         = document.getElementById(prefix + "id-radio").checked;
        this.item_on_use_macro_radio_name_checked = document.getElementById(prefix + "on-use-macro-name-radio").checked;
        this.item_on_use_macro_radio_id_checked   = document.getElementById(prefix + "on-use-macro-id-radio").checked;

        if (k == prefix + "name")                 { this.item_name_value                   = v ? v : ""; }
        if (k == prefix + "id")                   { this.item_id_value                     = v ? v : ""; }
        if (k == prefix + "case-sensitive")       { this.item_case_sensitive_checked       = v; }
        if (k == prefix + "exact-match")          { this.item_exact_match_checked          = v; }

        if (k == prefix + "weapon")               { this.item_weapon_checked               = v; }
        if (k == prefix + "equipment")            { this.item_equipment_checked            = v; }
        if (k == prefix + "consumable")           { this.item_consumable_checked           = v; }
        if (k == prefix + "tool")                 { this.item_tool_checked                 = v; }
        if (k == prefix + "loot")                 { this.item_loot_checked                 = v; }
        if (k == prefix + "class")                { this.item_class_checked                = v; }
        if (k == prefix + "feat")                 { this.item_feat_checked                 = v; }
        if (k == prefix + "backpack")             { this.item_backpack_checked             = v; }
        if (k == prefix + "spell")                { this.item_spell_checked                = v; }

        if (k == prefix + "macro")                { this.item_macro_checked                = v; }
        if (k == prefix + "macro-name")           { this.item_macro_name_value             = v ? v : ""; }
        if (k == prefix + "macro-id")             { this.item_macro_id_value               = v ? v : ""; }
        if (k == prefix + "macro-case-sensitive") { this.item_macro_case_sensitive_checked = v; }
        if (k == prefix + "macro-exact-match")    { this.item_macro_exact_match_checked    = v; }

        if (k == prefix + "on-use-macro")                { this.item_on_use_macro_checked                = v; }
        if (k == prefix + "on-use-macro-name")           { this.item_on_use_macro_name_value             = v ? v : ""; }
        if (k == prefix + "on-use-macro-id")             { this.item_on_use_macro_id_value               = v ? v : ""; }
        if (k == prefix + "on-use-macro-case-sensitive") { this.item_on_use_macro_case_sensitive_checked = v; }
        if (k == prefix + "on-use-macro-exact-match")    { this.item_on_use_macro_exact_match_checked    = v; }

        if (k == prefix + "none")                 { this.item_none_checked                 = v; }
        if (k == prefix + "show")                 { this.item_show_checked                 = v; }
        if (k == prefix + "show-id")              { this.item_show_id_checked              = v; }
    }

    // search for matching items.
    searchItems(items) {

        this.matching_items = [ ];

        // spin through item contents ...
        items.contents.forEach((item, j) => {

            var match_found = false;
            var item_name   = item.data.name;
            var search_name = this.escapeRegExp(this.item_name_value);
            var search_id   = this.item_id_value;

            // search by name
            if (this.item_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.item_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    item_name   = item_name.toLowerCase();
                };

                // do items match?
                if ((!this.item_exact_match_checked && (item_name.search(search_name) > -1)) ||
                     (this.item_exact_match_checked && (item_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(item_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this.item_radio_id_checked) {
                // do ids match?
                if (search_id == item.data._id) {
                    match_found = true;
                };
            };

            // item matches.
            if (match_found) {
                var selected = false;

                if      (this.noItemTypesSelected()) selected = true;
                else if (this.item_weapon_checked     && item.type == 'weapon')     selected = true;
                else if (this.item_equipment_checked  && item.type == 'equipment')  selected = true;
                else if (this.item_consumable_checked && item.type == 'consumable') selected = true;
                else if (this.item_tool_checked       && item.type == 'tool')       selected = true;
                else if (this.item_loot_checked       && item.type == 'loot')       selected = true;
                else if (this.item_class_checked      && item.type == 'class')      selected = true;
                else if (this.item_feat_checked       && item.type == 'feat')       selected = true;
                else if (this.item_backpack_checked   && item.type == 'backpack')   selected = true;
                else if (this.item_spell_checked      && item.type == 'spell')      selected = true;

                if (selected) {
                    this.matching_items.push(item);
                };
            };
        }); // forEach Item.
    }

    // search for matching item macro.
    searchItemMacros(item) {

        this.matching_macros = [ ];

        // any item macros?
        if (this.item_macro_checked &&
            item.data.flags['itemacro'] &&
            item.data.flags['itemacro'].macro.data.command) {

            var command = item.data.flags['itemacro'].macro.data.command;
            name = command.length > 120 ? command.substr(0, 120) : command;

            this.matching_macros.push(name);
        }
    }

    // search for matching on use macros.
    searchOnUseMacros(item) {

        this.matching_on_use_macros = [ ];

        // any on use macros?
        if (this.item_on_use_macro_checked &&
            item.data.flags['midi-qol'] &&
            item.data.flags['midi-qol'].onUseMacroParts &&
            (item.data.flags['midi-qol'].onUseMacroParts.items.length > 0)) {

            // spin through item's on use macro list ...
            item.data.flags['midi-qol'].onUseMacroParts.items.forEach((macro, k) => {

                var match_found = false;
                var macro_name  = item.data.flags['midi-qol'].onUseMacroParts.items[k].macroName;
                var search_name = this.escapeRegExp(this.item_on_use_macro_name_value);
                var search_id   = item.data.flags['midi-qol'].onUseMacroParts.items[k].id;

                // search by name
                if (this.item_on_use_macro_radio_name_checked) {
                    // lowercase for non-case-sensitive search.
                    if ((search_name.length > 0) && !this.item_on_use_macro_case_sensitive_checked) {
                        search_name = search_name.toLowerCase();
                        macro_name  = macro_name.toLowerCase();
                    };

                    // do macros match?
                    if ((!this.item_on_use_macro_exact_match_checked && (macro_name.search(search_name) > -1)) ||
                         (this.item_on_use_macro_exact_match_checked && (macro_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(macro_name).length)) ||
                         (search_name.length == 0)) {
                        match_found = true;
                    };
                };

                // search by id
                if (this.item_on_use_macro_radio_id_checked) {
                    // do ids match?
                    if (search_id == macro.data._id) {
                        match_found = true;
                    };
                };

                // macro matches.
                if (match_found) {
                    this.matching_on_use_macros.push(macro);
                };
            }); // forEach Macro.
        };
    }
}

export class JournalOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "JournalOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_journals = [ ];

        this.journal_submitted              = false;
        this.journal_count                  = 0;
        this.journal_name_value             = "";
        this.journal_id_value               = "";
        this.journal_radio_name_checked     = true;
        this.journal_radio_id_checked       = false;
        this.journal_case_sensitive_checked = false;
        this.journal_exact_match_checked    = false;

        this.journal_base_checked           = false;
        this.journal_checklist_checked      = false;
        this.journal_encounter_checked      = false;
        this.journal_loot_checked           = false;
        this.journal_organization_checked   = false;
        this.journal_person_checked         = false;
        this.journal_place_checked          = false;
        this.journal_poi_checked            = false;
        this.journal_quest_checked          = false;
        this.journal_shop_checked           = false;

        this.journal_none_checked           = false;
        this.journal_show_checked           = false;
        this.journal_show_id_checked        = false;
    }

    // no journal options?
    noJournalTypesSelected() {
        return (!this.journal_base_checked         &&
                !this.journal_checklist_checked    &&
                !this.journal_encounter_checked    &&
                !this.journal_organization_checked &&
                !this.journal_person_checked       &&
                !this.journal_place_checked        &&
                !this.journal_poi_checked          &&
                !this.journal_quest_checked        &&
                !this.journal_shop_checked);
    }

    // form element prefixea.
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
        retval[prefix + "journal-count"]          = this.journal_count;

        retval[prefix + "name-value"]             = this.journal_name_value;
        retval[prefix + "id-value"]               = this.journal_id_value;
        retval[prefix + "name-radio-checked"]     = this.journal_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.journal_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.journal_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.journal_exact_match_checked    ? "checked" : "";

        retval[prefix + "base-checked"]           = this.journal_base_checked           ? "checked" : "";
        retval[prefix + "checklist-checked"]      = this.journal_checklist_checked      ? "checked" : "";
        retval[prefix + "encounter-checked"]      = this.journal_encounter_checked      ? "checked" : "";
        retval[prefix + "loot-checked"]           = this.journal_loot_checked           ? "checked" : "";
        retval[prefix + "organization-checked"]   = this.journal_organization_checked   ? "checked" : "";
        retval[prefix + "person-checked"]         = this.journal_person_checked         ? "checked" : "";
        retval[prefix + "place-checked"]          = this.journal_place_checked          ? "checked" : "";
        retval[prefix + "poi-checked"]            = this.journal_poi_checked            ? "checked" : "";
        retval[prefix + "quest-checked"]          = this.journal_quest_checked          ? "checked" : "";
        retval[prefix + "shop-checked"]           = this.journal_shop_checked           ? "checked" : "";

        retval[prefix + "none-checked"]           = this.journal_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.journal_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.journal_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setJournalData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.journal_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.journal_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.journal_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.journal_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.journal_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.journal_exact_match_checked    = v; }

        if (k == prefix + "base")           { this.journal_base_checked           = v; }
        if (k == prefix + "checklist")      { this.journal_checklist_checked      = v; }
        if (k == prefix + "encounter")      { this.journal_encounter_checked      = v; }
        if (k == prefix + "loot")           { this.journal_loot_checked           = v; }
        if (k == prefix + "organization")   { this.journal_organization_checked   = v; }
        if (k == prefix + "person")         { this.journal_person_checked         = v; }
        if (k == prefix + "place")          { this.journal_place_checked          = v; }
        if (k == prefix + "poi")            { this.journal_poi_checked            = v; }
        if (k == prefix + "quest")          { this.journal_quest_checked          = v; }
        if (k == prefix + "shop")           { this.journal_shop_checked           = v; }

        if (k == prefix + "none")           { this.journal_none_checked           = v; }
        if (k == prefix + "show")           { this.journal_show_checked           = v; }
        if (k == prefix + "show-id")        { this.journal_show_id_checked        = v; }
    }

    // search for matching journals.
    searchJournals(journals, search_str = "") {

        this.matching_journals = [ ];

        var search_exp = "";
        if (search_str.length > 0) {
            if (this.journal_radio_name_checked)
                search_exp = new RegExp(`@Actor\\[.{16}\\]\\{` + this.escapeRegExp(search_str) + `\\}`)
            else
                search_exp = new RegExp(`@Actor\\[.{` + this.escapeRegExp(search_str) + `}\\]`)
        };

        // spin through journal contents ...
        journals.contents.forEach((journal, j) => {
            var match_found  = false;
            var journal_name = journal.data.name;
            var search_name  = this.escapeRegExp(this.journal_name_value);
            var search_id    = this.journal_id_value;

            // search by name
            if (this.journal_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.journal_case_sensitive_checked) {
                    search_name  = search_name.toLowerCase();
                    journal_name = journal_name.toLowerCase();
                };

                // do journals match?
                if ((!this.journal_exact_match_checked && (journal_name.search(search_name) > -1)) ||
                     (this.journal_exact_match_checked && (journal_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(journal_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this.journal_radio_id_checked) {
                // do ids match?
                if (search_id == journal.data._id) {
                    match_found = true;
                };
            };

            // journal matches.
            if (match_found) {
                var selected = false;
                if      (this.noJournalTypesSelected() || !journal.data.flags['monks-enhanced-journal']) selected = true;
                else if (this.journal_base_checked         && journal.data.flags['monks-enhanced-journal'].type == 'base')         selected = true;
                else if (this.journal_checklist_checked    && journal.data.flags['monks-enhanced-journal'].type == 'checklist')    selected = true;
                else if (this.journal_encounter_checked    && journal.data.flags['monks-enhanced-journal'].type == 'encounter')    selected = true;
                else if (this.journal_loot_checked         && journal.data.flags['monks-enhanced-journal'].type == 'loot')         selected = true;
                else if (this.journal_organization_checked && journal.data.flags['monks-enhanced-journal'].type == 'organization') selected = true;
                else if (this.journal_person_checked       && journal.data.flags['monks-enhanced-journal'].type == 'person')       selected = true;
                else if (this.journal_place_checked        && journal.data.flags['monks-enhanced-journal'].type == 'place')        selected = true;
                else if (this.journal_poi_checked          && journal.data.flags['monks-enhanced-journal'].type == 'poi')          selected = true;
                else if (this.journal_quest_checked        && journal.data.flags['monks-enhanced-journal'].type == 'quest')        selected = true;
                else if (this.journal_shop_checked         && journal.data.flags['monks-enhanced-journal'].type == 'shop')         selected = true;

                if (selected) {

                    if (search_str.length > 0) {
                        // regexp search.
                        if (journal.data.content.search(search_exp) > -1) {
                            this.matching_journals.push(journal);
                        };
                    }
                    else
                    {
                        this.matching_journals.push(journal);
                    }
                };
            };
        }); // forEach Journal.
    }
}

export class MacroOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "MacroOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_macros = [ ];

        this.macro_count                  = 0;
        this.macro_name_value             = "";
        this.macro_id_value               = "";
        this.macro_radio_name_checked     = true;
        this.macro_radio_id_checked       = false;
        this.macro_case_sensitive_checked = false;
        this.macro_exact_match_checked    = false;

        this.macro_none_checked           = false;
        this.macro_show_checked           = false;
        this.macro_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "macro-count"]            = this.macro_count;

        retval[prefix + "name-value"]             = this.macro_name_value;
        retval[prefix + "id-value"]               = this.macro_id_value;
        retval[prefix + "name-radio-checked"]     = this.macro_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.macro_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.macro_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.macro_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.macro_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.macro_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.macro_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setMacroData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.macro_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.macro_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.macro_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.macro_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.macro_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.macro_exact_match_checked    = v; }

        if (k == prefix + "none")           { this.macro_none_checked           = v; }
        if (k == prefix + "show")           { this.macro_show_checked           = v; }
        if (k == prefix + "show-id")        { this.macro_show_id_checked        = v; }
    }

    // search for matching macros.
    searchMacros(macros) {

        this.matching_macros = [ ];

        // spin through macro list ...
        macros.contents.forEach((macro, i) => {

            var match_found = false;
            var macro_name   = macro.data.name;
            var search_name = this.escapeRegExp(this.macro_name_value);
            var search_id   = this.macro_id_value;

            // search by name
            if (this.macro_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.macro_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    macro_name  = macro_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.macro_exact_match_checked && (macro_name.search(search_name) > -1)) ||
                     (this.macro_exact_match_checked && (macro_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(macro_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.macro_radio_id_checked) {
                // do ids match?
                if (search_id == macro.data._id) {
                    match_found = true;
                };
            };

            // macro matches.
            if (match_found) {
                this.matching_macros.push(macro);
            };
        }); // forEach Macro.
    };
}

export class PlaylistOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "PlaylistOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_playlists = [ ];

        this.playlist_count                  = 0;
        this.playlist_name_value             = "";
        this.playlist_id_value               = "";
        this.playlist_radio_name_checked     = true;
        this.playlist_radio_id_checked       = false;
        this.playlist_case_sensitive_checked = false;
        this.playlist_exact_match_checked    = false;

        this.playlist_none_checked           = false;
        this.playlist_show_checked           = false;
        this.playlist_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "playlist-count"]         = this.playlist_count;

        retval[prefix + "name-value"]             = this.playlists_name_value;
        retval[prefix + "id-value"]               = this.playlists_id_value;
        retval[prefix + "name-radio-checked"]     = this.playlist_radio_name_checked      ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.playlist_radio_id_checked        ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.playlists_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.playlists_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.playlists_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.playlists_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.playlists_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setPlaylistData(k, v, secondary = "") {
        var retval = { };
        var prefix = this.prefixSecondary(secondary);

        this.playlist_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.playlist_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k ==  prefix + "name")           { this.playlist_name_value             = v ? v : ""; }
        if (k ==  prefix + "id")             { this.playlist_id_value               = v ? v : ""; }
        if (k ==  prefix + "case-sensitive") { this.playlist_case_sensitive_checked = v; }
        if (k ==  prefix + "exact-match")    { this.playlist_exact_match_checked    = v; }

        if (k ==  prefix + "none")           { this.playlist_none_checked           = v; }
        if (k ==  prefix + "show")           { this.playlist_show_checked           = v; }
        if (k ==  prefix + "show-id")        { this.playlist_show_id_checked        = v; }
    }

    // search for matching playlists.
    searchPlaylists(playlists) {

        this.matching_playlists = [ ];

        // spin through playlist list ...
        playlists.contents.forEach((playlist, i) => {

            var match_found = false;
            var playlist_name   = playlist.data.name;
            var search_name = this.escapeRegExp(this.playlist_name_value);
            var search_id   = this.playlist_id_value;

            // search by name
            if (this.playlist_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.playlist_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    playlist_name  = playlist_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.playlist_exact_match_checked && (playlist_name.search(search_name) > -1)) ||
                     (this.playlist_exact_match_checked && (playlist_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(playlist_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.playlist_radio_id_checked) {
                // do ids match?
                if (search_id == playlist.data._id) {
                    match_found = true;
                };
            };

            // playlist matches.
            if (match_found) {
                this.matching_playlists.push(playlist);
            };
        }); // forEach Playlist.
    };
}

export class SceneOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "SceneOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_scenes = [ ];
        this.matching_scene_tokens = [ ];

        this.scene_submitted              = false;
        this.scene_count                  = 0;
        this.scene_name_value             = "";
        this.scene_id_value               = "";
        this.scene_radio_name_checked     = true;
        this.scene_radio_id_checked       = false;
        this.scene_case_sensitive_checked = false;
        this.scene_exact_match_checked    = false;
        this.scene_token_count            = 0;

        this.scene_none_checked           = false;
        this.scene_show_checked           = false;
        this.scene_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "scene-count"]            = this.scene_count;

        retval[prefix + "name-value"]             = this.scene_name_value;
        retval[prefix + "id-value"]               = this.scene_id_value;
        retval[prefix + "name-radio-checked"]     = this.scene_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.scene_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.scene_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.scene_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.scene_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.scene_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.scene_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setSceneData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.scene_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.scene_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k ==  prefix + "name")             { this.scene_name_value             = v ? v : ""; }
        if (k ==  prefix + "id")               { this.scene_id_value               = v ? v : ""; }
        if (k ==  prefix + "case-sensitive")   { this.scene_case_sensitive_checked = v; }
        if (k ==  prefix + "exact-match")      { this.scene_exact_match_checked    = v; }

        if (k ==  prefix + "none")             { this.scene_none_checked           = v; }
        if (k ==  prefix + "show")             { this.scene_show_checked           = v; }
        if (k ==  prefix + "show-id")          { this.scene_show_id_checked        = v; }
    };

    // search for matching tokens.
    searchSceneTokens(scene, search_str = "") {

        this.matching_scene_tokens = [ ];

        // spin through tokens ...
        scene.tokens.contents.forEach((token, k) => {

            var match_found = false;

            // search by name
            if (this.scene_radio_name_checked) {
                // token without a "represented actor" match token name else match actor name.
                var token_name = "";
                token.actor ? token_name = this.escapeRegExp(token.actor.name) : token_name = this.escapeRegExp(token.name);

                // do tokens match?
                if (search_str.search(token_name) > -1) {
                    match_found = true;
                };
            };

            // search by id
            if (this.scene_radio_id_checked) {
                // token without a "represented actor" match token id else match actor id.
                var token_id = "";
                token.actor ? token_id = token.actor._id : token_id = token._id;

                // do tokens match?
                if (token_id == search_str) {
                    match_found = true;
                };
            };

            // token matches.
            if (match_found) {
                this.matching_scene_tokens.push(token);
            };
        }); // forEach Token.
    }

    // search for matching scenes.
    searchScenes(scenes) {

        this.matching_scenes = [ ];

        // spin through scene contents ...
        scenes.contents.forEach((scene, j) => {

            var match_found = false;
            var scene_name  = scene.data.name;
            var search_name = this.escapeRegExp(this.scene_name_value);
            var search_id   = this.scene_id_value;

            // search by name
            if (this.scene_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.scene_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    scene_name  = scene_name.toLowerCase();
                };

                // do scenes match?
                if ((!this.scene_exact_match_checked && (scene_name.search(search_name) > -1)) ||
                     (this.scene_exact_match_checked && (scene_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(scene_name).length)) ||
                     (search_name.length == 0)) {
                    match_found = true;
                };
            };

            // search by id
            if (this.scene_radio_id_checked) {
                // do ids match?
                if (search_id == scene.data._id) {
                    match_found = true;
                };
            };

            // scene matches.
            if (match_found) {
                this.matching_scenes.push(scene);
            };
        }); // forEach Scene.
    }
}

export class TableOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "TableOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_tables = [ ];

        this.table_submitted              = false;
        this.table_count                  = 0;
        this.table_name_value             = "";
        this.table_id_value               = "";
        this.table_radio_name_checked     = true;
        this.table_radio_id_checked       = false;
        this.table_case_sensitive_checked = false;
        this.table_exact_match_checked    = false;

        this.table_none_checked           = false;
        this.table_show_checked           = false;
        this.table_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "table-count"]            = this.table_count;

        retval[prefix + "name-value"]             = this.table_name_value;
        retval[prefix + "id-value"]               = this.table_id_value;
        retval[prefix + "name-radio-checked"]     = this.table_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.table_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.table_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.table_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.table_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.table_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.table_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setTableData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.table_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.table_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.table_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.table_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.table_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.table_exact_match_checked    = v; }

        if (k == prefix + "none")           { this.table_none_checked           = v; }
        if (k == prefix + "show")           { this.table_show_checked           = v; }
        if (k == prefix + "show-id")        { this.table_show_id_checked        = v; }
    }

    // search for matching tables.
    searchTables(tables) {

        this.matching_tables = [ ];

        // spin through table list ...
        tables.contents.forEach((table, i) => {

            var match_found = false;
            var table_name   = table.data.name;
            var search_name = this.escapeRegExp(this.table_name_value);
            var search_id   = this.table_id_value;

            // search by name
            if (this.table_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.table_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    table_name  = table_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.table_exact_match_checked && (table_name.search(search_name) > -1)) ||
                     (this.table_exact_match_checked && (table_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(table_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.table_radio_id_checked) {
                // do ids match?
                if (search_id == table.data._id) {
                    match_found = true;
                };
            };

            // table matches.
            if (match_found) {
                this.matching_tables.push(table);
            };
        }); // forEach Table.
    };
}

export class TileOptions extends AnalyticsOptions {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "TileOptions  constructor()");

        super();

        this.parent = parent;

        this.matching_tiles = [ ];

        this.tile_count                  = 0;
        this.tile_name_value             = "";
        this.tile_id_value               = "";
        this.tile_radio_name_checked     = true;
        this.tile_radio_id_checked       = false;
        this.tile_case_sensitive_checked = false;
        this.tile_exact_match_checked    = false;

        this.tile_none_checked           = false;
        this.tile_show_checked           = false;
        this.tile_show_id_checked        = false;
    }

    // form element prefixea.
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
        retval[prefix + "tile-count"]             = this.tile_count;

        retval[prefix + "name-value"]             = this.tile_name_value;
        retval[prefix + "id-value"]               = this.tile_id_value;
        retval[prefix + "name-radio-checked"]     = this.tile_radio_name_checked     ? "checked" : "";
        retval[prefix + "id-radio-checked"]       = this.tile_radio_id_checked       ? "checked" : "";
        retval[prefix + "case-sensitive-checked"] = this.tile_case_sensitive_checked ? "checked" : "";
        retval[prefix + "exact-match-checked"]    = this.tile_exact_match_checked    ? "checked" : "";

        retval[prefix + "none-checked"]           = this.tile_none_checked           ? "checked" : "";
        retval[prefix + "show-checked"]           = this.tile_show_checked           ? "checked" : "";
        retval[prefix + "show-id-checked"]        = this.tile_show_id_checked        ? "checked" : "";

        return retval;
    }

    // set data from form.
    setTileData(k, v, secondary = "") {
        var prefix = this.prefixSecondary(secondary);

        this.tile_radio_name_checked = document.getElementById(prefix + "name-radio").checked;
        this.tile_radio_id_checked   = document.getElementById(prefix + "id-radio").checked;

        if (k == prefix + "name")           { this.tile_name_value             = v ? v : ""; }
        if (k == prefix + "id")             { this.tile_id_value               = v ? v : ""; }
        if (k == prefix + "case-sensitive") { this.tile_case_sensitive_checked = v; }
        if (k == prefix + "exact-match")    { this.tile_exact_match_checked    = v; }

        if (k == prefix + "none")           { this.tile_none_checked           = v; }
        if (k == prefix + "show")           { this.tile_show_checked           = v; }
        if (k == prefix + "show-id")        { this.tile_show_id_checked        = v; }
    }

    // search for matching tiles.
    searchTiles(tiles) {

        this.matching_tiles = [ ];

/*
        // spin through tile list ...
        tiles.contents.forEach((tile, i) => {

            var match_found = false;
            var tile_name   = tile.data.name;
            var search_name = this.escapeRegExp(this.tile_name_value);
            var search_id   = this.tile_id_value;

            // search by name
            if (this.tile_radio_name_checked) {
                // lowercase for non-case-sensitive search.
                if ((search_name.length > 0) && !this.tile_case_sensitive_checked) {
                    search_name = search_name.toLowerCase();
                    tile_name  = tile_name.toLowerCase();
                };
                // do names match?
                if ((search_name.length == 0) ||
                    (!this.tile_exact_match_checked && (tile_name.search(search_name) > -1)) ||
                     (this.tile_exact_match_checked && (tile_name.search(search_name) > -1) && (search_name.length == this.escapeRegExp(tile_name).length))) {
                    match_found = true;
                };
            };

            // search by id
            if (this.tile_radio_id_checked) {
                // do ids match?
                if (search_id == tile.data._id) {
                    match_found = true;
                };
            };

            // tile matches.
            if (match_found) {
                this.matching_tiles.push(tile);
            };
        }); // forEach Tile.
*/
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
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-message-even">` + message + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-message-odd">`  + message + `</p>`;
        this.list_counter++;
    }

    // add primaries to list.
    addActorPrimary(list, actor, show_id) {
        var name = actor.data.name;
        var id   = show_id ? actor.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-actor">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-actor">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addCardPrimary(list, card, show_id) {
        var name = card.data.name;
        var id   = show_id ? card.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-card">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-card">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addCompendiumPrimary(list, compendium, show_id) {
        var name = compendium.data.name;
        var id   = show_id ? compendium.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-compendium">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-compendium">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addItemPrimary(list, item, show_id) {
        var name = item.data.name;
        var id   = show_id ? item.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-item">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-item">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addItemMacroPrimary(list, macro, show_id) {
        var name = macro;
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item-macro">` + name + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-item-macro">`  + name + `</p>`;
        this.list_counter++;
    }
    addItemOnUseMacroPrimary(list, macro, show_id) {
        var name = macro.macroName;

        // does macro exist?
        if (game.macros.getName(name)) {
            var id = show_id ? game.macros.getName(name).id : "";
            if (id.length > 0) id = " [" + id + "]";

            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-item-macro">` + name + id + `</p>`
                                         : list[this.list_counter] = `<p class="analytics-primary-odd-item-macro">`  + name + id + `</p>`;
        }
        else
        {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-item-macro-error">` + name + `</p>`
                                         : list[this.list_counter] = `<p class="analytics-primary-odd-item-macro-error">`  + name + `</p>`;
        }
        this.list_counter++;
    }
    addJournalPrimary(list, journal, show_id) {
        var name = journal.data.name;
        var id   = show_id ? journal.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-journal">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-journal">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addMacroPrimary(list, macro, show_id) {
        var name = macro.data.name;
        var id   = show_id ? macro.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-macro">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-macro">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addPlaylistPrimary(list, playlist, show_id) {
        var name = playlist.data.name;
        var id   = show_id ? playlist.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-playlist">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-playlist">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addScenePrimary(list, scene, show_id) {
        var name = scene.data.name;
        var id   = show_id ? scene.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-scene">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-scene">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addTablePrimary(list, table, show_id) {
        var name = table.data.name;
        var id   = show_id ? table.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-table">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-table">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addTilePrimary(list, tile, show_id) {
        var name = tile.data.name;
        var id   = show_id ? tile.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-primary-even-tile">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-primary-odd-tile">`  + name + id + `</p>`;
        this.list_counter++;
    }

    // add secondaries to list.
    addActorSecondary(list, actor, show_id) {
        var name = actor.data.name;
        var id   = show_id ? actor.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-actor">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-actor">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addCardSecondary(list, card, show_id) {
        var name = card.data.name;
        var id   = show_id ? card.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-card">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-card">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addCompendiumSecondary(list, compendium, show_id) {
        var name = compendium.data.name;
        var id   = show_id ? compendium.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-compendium">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-compendium">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addItemSecondary(list, item, show_id) {
        var name = item.data.name;
        var id   = show_id ? item.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-item">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addItemMacroSecondary(list, macro, show_id) {
        var name = macro;
        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item-macro">` + name + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-item-macro">`  + name + `</p>`;
        this.list_counter++;
    }
    addItemOnUseMacroSecondary(list, macro, show_id) {
        var name = macro.macroName;

        // does macro exist?
        if (game.macros.getName(name)) {
            var id = show_id ? game.macros.getName(name).id : "";
            if (id.length > 0) id = " [" + id + "]";

            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item-macro">` + name + id + `</p>`
                                         : list[this.list_counter] = `<p class="analytics-secondary-odd-item-macro">`  + name + id + `</p>`;
        }
        else
        {
            (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-item-macro-error">` + name + `</p>`
                                         : list[this.list_counter] = `<p class="analytics-secondary-odd-item-macro-error">`  + name + `</p>`;
        }
        this.list_counter++;
    }
    addJournalSecondary(list, journal, show_id) {
        var name = journal.data.name;
        var id   = show_id ? journal.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-journal">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-journal">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addMacroSecondary(list, macro, show_id) {
        var name = macro.data.name;
        var id   = show_id ? macro.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-macro">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-macro">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addPlaylistSecondary(list, playlist, show_id) {
        var name = playlist.data.name;
        var id   = show_id ? playlist.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-playlist">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-playlist">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addSceneSecondary(list, scene, show_id) {
        var name = scene.data.name;
        var id   = show_id ? scene.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-scene">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-scene">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addTableSecondary(list, table, show_id) {
        var name = table.data.name;
        var id   = show_id ? table.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-table">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-table">`  + name + id + `</p>`;
        this.list_counter++;
    }
    addTileSecondary(list, tile, show_id) {
        var name = tile.data.name;
        var id   = show_id ? tile.id : "";
        if (id.length > 0) id = " [" + id + "]";

        (this.list_counter % 2 == 0) ? list[this.list_counter] = `<p class="analytics-secondary-even-tile">` + name + id + `</p>`
                                     : list[this.list_counter] = `<p class="analytics-secondary-odd-tile">`  + name + id + `</p>`;
        this.list_counter++;
    }
}
