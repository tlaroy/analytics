/***
*
* analytics.js
*
* version 0.0.11
*
*/

import * as ANALYTICS           from "./module/const.js";
import { AnalyticsActors }      from "./module/analytics-actors.js";
import { AnalyticsCards }       from "./module/analytics-cards.js";
import { AnalyticsCompendiums } from "./module/analytics-compendiums.js";
import { AnalyticsItems }       from "./module/analytics-items.js";
import { AnalyticsJournals }    from "./module/analytics-journals.js";
import { AnalyticsMacros }      from "./module/analytics-macros.js";
import { AnalyticsPlaylists }   from "./module/analytics-playlists.js";
import { AnalyticsScenes }      from "./module/analytics-scenes.js";
import { AnalyticsTables }      from "./module/analytics-tables.js";
import { AnalyticsTiles }       from "./module/analytics-tiles.js";

console.info(String(ANALYTICS.LABEL + "%c" + ANALYTICS.NAME + "%c v" + ANALYTICS.VERSION + "."), "color:" + ANALYTICS.CONSOLE_GREEN, "color:" + ANALYTICS.CONSOLE_DEFAULT);

var i18n = key => {return game.i18n.localize(key);};
var analytics  = null;
var first_time = false;

class AnalyticsWrapper {

    constructor() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper constructor()");

        var parent = this;

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
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_actors()");

        AnalyticsActors.isVisible ? this.analytics_actors.hide() : this.analytics_actors.show();
    }

    toggle_cards( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_cards");

        AnalyticsCards.isVisible ? this.analytics_cards.hide() : this.analytics_cards.show();
    }

    toggle_compendiums( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_compendiums");

        AnalyticsCompendiums.isVisible ? this.analytics_compendiums.hide() : this.analytics_compendiums.show();
    }

    toggle_items( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_items");

        AnalyticsItems.isVisible ? this.analytics_items.hide() : this.analytics_items.show();
    }

    toggle_journals( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_journals");

        AnalyticsJournals.isVisible ? this.analytics_journals.hide() : this.analytics_journals.show();
    }

    toggle_macros( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_macros");

        AnalyticsMacros.isVisible ? this.analytics_macros.hide() : this.analytics_macros.show();
    }

    toggle_playlists( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_playlists");

        AnalyticsPlaylists.isVisible ? this.analytics_playlists.hide() : this.analytics_playlists.show();
    }

    toggle_scenes( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_scenes");

        AnalyticsScenes.isVisible ? this.analytics_scenes.hide() : this.analytics_scenes.show();
    }

    toggle_tables( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_tables");

        AnalyticsTables.isVisible ? this.analytics_tables.hide() : this.analytics_tables.show();
    }

    toggle_tiles( ) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsWrapper toggle_tiles");

        AnalyticsTiles.isVisible ? this.analytics_tiles.hide() : this.analytics_tiles.show();
    }
}

/**
* versionCompare().
*
* Compares two software version numbers (e.g. "1.7.1" or "1.2b").
*
*      v1       {string} v1 The first version to be compared.
*      v2       {string} v2 The second version to be compared.
*      options {object} Optional flags that affect comparison behavior.
*           lexicographical: true
*               Compares each part of the version strings lexicographically instead of naturally;
*               this allows suffixes such as "b" or "dev" but will cause "1.10" to be considered smaller than "1.2".
*         zeroExtend: true
*               Changes the result if one version string has less parts than the other.
*               In this case the shorter string will be padded with "zero" parts instead of being considered smaller.
*       return  (number) 1 if v1 is greater than v2.
*                        0 if the versions are equal.
*                       -1 if v1 is less than v2.
*/

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}

/**
* checkRequirements().
*
* Check module dependencies, versions and settings.
*/

function checkRequirements() {
    // ----------------------------------------------------------
    // Foundry.

    // minimum Foundry version.
    if (versionCompare(game.version, ANALYTICS.MIN_FOUNDRY_VERSION) < 0) {
        ui.notifications.error(i18n("ANALYTICS.FailedToInitialize"));
        console.error(ANALYTICS.LABEL + "FAIL: Foundry v" + ANALYTICS.MIN_FOUNDRY_VERSION + " or newer required.");
        return false;
    };

    // ----------------------------------------------------------
    // System dnd5e.

    if (game.data.system.data.name != "dnd5e") {
        ui.notifications.error(i18n("ANALYTICS.FailedToInitialize"));
        console.error(ANALYTICS.LABEL + " | FAIL: DND5E system not found.");
        return false;
    };
    // minimum dnd5e version.
    if (versionCompare(game.data.system.data.version, ANALYTICS.MIN_DND5E_VERSION) < 0) {
        ui.notifications.error(i18n("ANALYTICS.FailedToInitialize"));
        console.error(ANALYTICS.LABEL + " | FAIL: DND5E v" + ANALYTICS.MIN_DND5E_VERSION + " or newer required.");
        return false;
    };

    return true;
};

/**
* configurationSettings().
*
* Module configuration settings.
*/

function configurationSettings() {
    try {
        game.settings.get(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED);
    }
    catch(err) {
        //-------------------------------------------------------
        // add to Foundry's Configure Game Settings / Module Settings dialog.
        first_time = true;
        game.settings.register(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED, {
            name:     i18n("ANALYTICS.SettingsEnableName"),
            hint:     i18n("ANALYTICS.SettingsEnableHint"),
            scope:   "world",
        //  scope:   "client",
            config:   true,
        //  default:  true,
            type:     Boolean,
            onChange: value => {
                if (game.settings.get(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED)) {
                    $('#controls li[data-control="Analytics"]').show();
                    if (canvas["analytics-tools"]) canvas["analytics-tools"].activate();
                } else {
                    $('#controls li[data-control="Analytics"]').hide();
                    if (canvas["analytics-tools"]) canvas["analytics-tools"].deactivate();
                }
            }
        });
    }
};

/**
* "getSceneControlButtons" hook.
*
* Add Analytics tools to Scene Control Buttons.
*/

Hooks.on("getSceneControlButtons", (controls) => {
    if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Hooks On: getSceneControlButtons()");

    if (!game.user.isGM) return;
    if (!game.Analytics.isEnabled()) return;

    let analytics_tools = [
        {
            name:    "analytics-actors",
            title:   i18n("DOCUMENT.Actors"),
            icon:    "fas fa-users",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_actors(); }
        },
        {
            name:    "analytics-cards",
            title:   i18n("CARDS.HeaderCards"),
            icon:    "fas fa-id-badge",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_cards(); }
        },
        {
            name:    "analytics-compendiums",
            title:   i18n("ANALYTICS.Compendiums"),
            icon:    "fas fa-atlas",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_compendiums(); }
        },
        {
            name:    "analytics-items",
            title:   i18n("DOCUMENT.Items"),
            icon:    "fas fa-suitcase",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_items(); }
        },
        {
            name:    "analytics-journals",
            title:   i18n("ANALYTICS.Journals"),
            icon:    "fas fa-book-open",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_journals(); }
        },
        {
            name:    "analytics-macros",
            title:   i18n("DOCUMENT.Macros"),
            icon:    "fas fa-folder",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_macros(); }
        },
        {
            name:    "analytics-playlists",
            title:   i18n("DOCUMENT.Playlists"),
            icon:    "fas fa-music",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_playlists(); }
        },
        {
            name:    "analytics-scenes",
            title:   i18n("DOCUMENT.Scenes"),
            icon:    "fas fa-map",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_scenes(); }
        },
        {
            name:    "analytics-tables",
            title:   i18n("ANALYTICS.Tables"),
            icon:    "fas fa-th-list",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_tables(); }
        },
        {
            name:    "analytics-tiles",
            title:   i18n("DOCUMENT.Tiles"),
            icon:    "fas fa-cubes",
            button:  true,
            visible: true,
            active:  true,
            onClick: () => { analytics.toggle_tiles(); }
        }
    ];

    let tools = {
        name:    ANALYTICS.NAME,
        title:   i18n("ANALYTICS.Title"),
        layer:   "analytics-tools",
        icon:    "fas fa-search",
        button:  true,
        tools:   analytics_tools,
        visible: true,
        active:  true,
    };

    controls.push(tools);
});

/**
* "renderSceneControls" hook.
*
* Render Analytics tool canvas.
*/

Hooks.on("renderSceneControls", () => {
    if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Hooks On: renderSceneControls()");

    if (canvas["analytics-tools"]) canvas["analytics-tools"].deactivate();
});

/**
* "init" hook.
*
* Hook once into Foundry's initialization sequence.
* Check dependencies and setup namespace.
*/

Hooks.once("init", function() {
    if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Hooks Once: \"init\".");

    // check dependencies.
    if (!checkRequirements()) return;

    // create configuration settings.
    configurationSettings();

    // create tool canvas.
    canvas["analytics-tools"] = new CanvasLayer();

    // create a namespace within game global to share functionality with macros.
    game.Analytics = {

        // is module enabled?
        isEnabled: function() {
            return game.settings.get(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED);
        },

        // enable hook.
        enable: function() {
            // check requirements.
            if (!checkRequirements()) return;

            // set hooks.
            console.info(ANALYTICS.LABEL + "Enabled.");

            // enable.
            game.settings.set(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED, true);
        },

        // disable hook.
        disable: function() {
            console.info(ANALYTICS.LABEL + "Disabled.");

            // unset hooks.
            var old_hook_id_1 = parseInt(hook_id);
            Hooks.off("renderChatMessage", old_hook_id_1);
            hook_id = 0;

            // disable.
            game.settings.set(ANALYTICS.MODULE_NAME, ANALYTICS.ENABLED, false);
        },

        // return Analytics object.
        getAnalytics: function() { return new AnalyticsWrapper(); }
    };

    // add constants to namespace.
    game.Analytics.ANALYTICS = ANALYTICS;

    console.info(ANALYTICS.LABEL + "Initialized.");
});

/**
* "ready" hook.
*
* Hook once into Foundry's ready sequence.
*/

Hooks.once("ready", function() {
    if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "Hooks Once: \"ready\".");

    // get Analytics.
    analytics = game.Analytics.getAnalytics();
    if (analytics == null) return;

    // will key off of settings value after first time.
    if (first_time) game.Analytics.enable();

    console.info(ANALYTICS.LABEL + "Ready.");
});
