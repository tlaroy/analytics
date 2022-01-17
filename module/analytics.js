/**
 * Analytics.
 *
 *      ./module/analytics.js
 *      v0.0.1
 */

import * as CM_CONST 			from "./const.js";
import { AnalyticsActors } 		from "./analytics-actors.js";
import { AnalyticsCards } 		from "./analytics-cards.js";
import { AnalyticsCompendiums } from "./analytics-compendiums.js";
import { AnalyticsItems } 		from "./analytics-items.js";
import { AnalyticsJournals } 	from "./analytics-journals.js";
import { AnalyticsMacros } 		from "./analytics-macros.js";
import { AnalyticsPlaylists } 	from "./analytics-playlists.js";
import { AnalyticsRolltables } 	from "./analytics-rolltables.js";
import { AnalyticsScenes } 		from "./analytics-scenes.js";

var i18n = key => {return game.i18n.localize(key);};

export class Analytics {

    /**
    * Analytics.constructor().
    */

    constructor(dialogData = {}, options = {}) {
        console.info(CM_CONST.CM_LABEL + "Analytics.constructor()");
		
		this.analytics_actors 		= new AnalyticsActors();
		this.analytics_cards 		= new AnalyticsCards();
		this.analytics_compendiums 	= new AnalyticsCompendiums();
		this.analytics_items 		= new AnalyticsItems();
		this.analytics_journals 	= new AnalyticsJournals();
		this.analytics_macros 		= new AnalyticsMacros();
		this.analytics_playlists 	= new AnalyticsPlaylists();
		this.analytics_rolltables 	= new AnalyticsRolltables();
		this.analytics_scenes 		= new AnalyticsScenes();
    }

	toggle_actors( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-actors"); 
	
		if (AnalyticsActors.isVisible) AnalyticsActors.hide(); else AnalyticsActors.show();
	}

	toggle_cards( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-cards"); 
		
		if (AnalyticsCards.isVisible) AnalyticsCards.hide(); else AnalyticsCards.show();
	}

	toggle_compendiums( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-compendiums"); 
		
		if (AnalyticsCompendiums.isVisible) AnalyticsCompendiums.hide(); else AnalyticsCompendiums.show();
	}

	toggle_items( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-items"); 
		
		if (AnalyticsItems.isVisible) AnalyticsItems.hide(); else AnalyticsItems.show();
	}

	toggle_journals( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-journals"); 
		
		if (AnalyticsJournals.isVisible) AnalyticsJournals.hide(); else AnalyticsJournals.show();
	}

	toggle_macros( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-macros"); 
		
		if (AnalyticsMacros.isVisible) AnalyticsMacros.hide(); else AnalyticsMacros.show();
	}

	toggle_playlists( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-playlists"); 
		
		if (AnalyticsPlaylists.isVisible) AnalyticsPlaylists.hide(); AnalyticsPlaylists.show();
	}

	toggle_rolltables( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-rolltables"); 
		
		if (AnalyticsRolltables.isVisible) AnalyticsRolltables.hide(); else AnalyticsRolltables.show();
	}

	toggle_scenes( ) {
		console.info(CM_CONST.CM_LABEL + "analytics-scenes"); 
		
		if (AnalyticsScenes.isVisible) AnalyticsScenes.hide(); else AnalyticsScenes.show();
	}
}
