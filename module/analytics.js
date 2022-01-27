/***
*
* module/analytics.js
*
* version 0.0.4
*
*/

import * as ANALYTICS           from "./const.js";
import { AnalyticsActors }      from "./analytics-actors.js";
import { AnalyticsCards }       from "./analytics-cards.js";
import { AnalyticsCompendiums } from "./analytics-compendiums.js";
import { AnalyticsItems }       from "./analytics-items.js";
import { AnalyticsJournals }    from "./analytics-journals.js";
import { AnalyticsMacros }      from "./analytics-macros.js";
import { AnalyticsPlaylists }   from "./analytics-playlists.js";
import { AnalyticsRolltables }  from "./analytics-rolltables.js";
import { AnalyticsScenes }      from "./analytics-scenes.js";

var i18n = key => {return game.i18n.localize(key);};

export class Analytics {

    /**
    * Analytics.constructor().
    */

    constructor(dialogData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics constructor()");

        var parent = this;

        this.actor_item_options     = { };
        this.analytics_actors       = new AnalyticsActors(parent);
        this.analytics_cards        = new AnalyticsCards();
        this.analytics_compendiums  = new AnalyticsCompendiums();
        this.analytics_items        = new AnalyticsItems();
        this.analytics_journals     = new AnalyticsJournals();
        this.analytics_macros       = new AnalyticsMacros();
        this.analytics_playlists    = new AnalyticsPlaylists();
        this.analytics_rolltables   = new AnalyticsRolltables();
        this.analytics_scenes       = new AnalyticsScenes();
    }

    toggle_actors( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_actors()");

        AnalyticsActors.isVisible ? this.analytics_actors.hide() : this.analytics_actors.show();
    }

    toggle_cards( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_cards");

        AnalyticsCards.isVisible ? AnalyticsCards.hide() : AnalyticsCards.show();
    }

    toggle_compendiums( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_compendiums");

        AnalyticsCompendiums.isVisible ? AnalyticsCompendiums.hide() : AnalyticsCompendiums.show();
    }

    toggle_items( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_items");

        AnalyticsItems.isVisible ? AnalyticsItems.hide() : AnalyticsItems.show();
    }

    toggle_journals( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_journals");

        AnalyticsJournals.isVisible ? AnalyticsJournals.hide() : AnalyticsJournals.show();
    }

    toggle_macros( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_macros");

        AnalyticsMacros.isVisible ? AnalyticsMacros.hide() : AnalyticsMacros.show();
    }

    toggle_playlists( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_playlists");

        AnalyticsPlaylists.isVisible ? AnalyticsPlaylists.hide() : AnalyticsPlaylists.show();
    }

    toggle_rolltables( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_rolltables");

        AnalyticsRolltables.isVisible ? AnalyticsRolltables.hide() : AnalyticsRolltables.show();
    }

    toggle_scenes( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_scenes");

        AnalyticsScenes.isVisible ? AnalyticsScenes.hide() : AnalyticsScenes.show();
    }
}
