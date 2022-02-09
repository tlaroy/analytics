/***
*
* module/analytics.js
*
* version 0.0.8
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
import { AnalyticsScenes }      from "./analytics-scenes.js";
import { AnalyticsTables }      from "./analytics-tables.js";
import { AnalyticsTiles }       from "./analytics-tiles.js";

var i18n = key => {return game.i18n.localize(key);};

export class Analytics {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics constructor()");

        var parent = this;

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

        // form classes.
        this.analytics_actors      = new AnalyticsActors(parent);
        this.analytics_cards       = new AnalyticsCards(parent);
        this.analytics_compendiums = new AnalyticsCompendiums(parent);
        this.analytics_items       = new AnalyticsItems(parent);
        this.analytics_journals    = new AnalyticsJournals(parent);
        this.analytics_macros      = new AnalyticsMacros(parent);
        this.analytics_playlists   = new AnalyticsPlaylists(parent);
        this.analytics_scenes      = new AnalyticsScenes(parent);
        this.analytics_tables      = new AnalyticsTables(parent);
        this.analytics_tiles       = new AnalyticsTiles(parent);
    }

    toggle_actors( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_actors()");

        AnalyticsActors.isVisible ? this.analytics_actors.hide() : this.analytics_actors.show();
    }

    toggle_cards( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_cards");

        AnalyticsCards.isVisible ? this.analytics_cards.hide() : this.analytics_cards.show();
    }

    toggle_compendiums( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_compendiums");

        AnalyticsCompendiums.isVisible ? this.analytics_compendiums.hide() : this.analytics_compendiums.show();
    }

    toggle_items( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_items");

        AnalyticsItems.isVisible ? this.analytics_items.hide() : this.analytics_items.show();
    }

    toggle_journals( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_journals");

        AnalyticsJournals.isVisible ? this.analytics_journals.hide() : this.analytics_journals.show();
    }

    toggle_macros( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_macros");

        AnalyticsMacros.isVisible ? this.analytics_macros.hide() : this.analytics_macros.show();
    }

    toggle_playlists( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_playlists");

        AnalyticsPlaylists.isVisible ? this.analytics_playlists.hide() : this.analytics_playlists.show();
    }

    toggle_scenes( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_scenes");

        AnalyticsScenes.isVisible ? this.analytics_scenes.hide() : this.analytics_scenes.show();
    }

    toggle_tables( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_tables");

        AnalyticsTables.isVisible ? this.analytics_tables.hide() : this.analytics_tables.show();
    }

    toggle_tiles( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Analytics toggle_tiles");

        AnalyticsTiles.isVisible ? this.analytics_tiles.hide() : this.analytics_tiles.show();
    }
}
