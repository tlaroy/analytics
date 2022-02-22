/***
*
* module/analytics-cards.js
*
* version 0.0.10
*
*/

import * as ANALYTICS        from "./const.js";
import { AnalyticsForm }     from "./analytics.js";
import { CardOptions }       from "./analytics.js";

import { CompendiumOptions } from "./analytics.js";
import { JournalOptions }    from "./analytics.js";
import { TableOptions }      from "./analytics.js";

var i18n = key => {return game.i18n.localize(key);};

export class AnalyticsCards extends AnalyticsForm {

    constructor(parent, formData = {}, options = {}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards constructor(parent, formData, options)");

        super(formData, options);

        /* PRIMARY SORT */

        // card options for each tab.
        this.card_options = Object.assign(this.card_options, {
            "cards_in_compendiums": new CardOptions(),
            "cards_in_journals":    new CardOptions(),
            "cards_in_tables":      new CardOptions(),
        });

        /* SECONDARY SORT BY TAB */

        // (6) in compendium options.
        this.compendium_options = Object.assign(this.compendium_options, {
            "cards_in_compendiums": new CompendiumOptions(),
        });

        // (7) in journal options.
        this.journal_options = Object.assign(this.journal_options, {
            "cards_in_journals": new JournalOptions(),
        });

        // (8) in table options.
        this.table_options = Object.assign(this.table_options, {
            "cards_in_tables": new TableOptions(),
        });

        /* OUTPUT BY TAB */

        // card lists.
        this.card_lists = Object.assign(this.card_lists, {
            "cards_in_compendiums": [],
            "cards_in_journals":    [],
            "cards_in_tables":      [],
        });
    }

    static get defaultOptions() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards static get defaultOptions()");

        return foundry.utils.mergeObject(super.defaultOptions, {
            title:          i18n("ANALYTICS.Title") + " v" + ANALYTICS.VERSION,
            id:             "analytics-cards",
            template:       "modules/analytics/templates/analytics-cards-template.html",
            classes:       ["sheet", "scene-sheet", "analytics-cards"],
            width:          740,
            height:         690,
            resizable:      true,
            closeOnSubmit:  false,
            tabs:          [{navSelector: ".tabs", contentSelector: "form", initial: "analytics-cards-in-compendiums"}]
        });
    }

    // map tab to sort options.
    sortOptions() {
        var retval = { };
        switch (this._tabs[0].active) {
            case "analytics-cards-in-compendiums":
                retval = {
                    primary:   "cards_in_compendiums",
                    secondary: "cards_in_compendiums"
                };
                break;
            case "analytics-cards-in-journals":
                retval = {
                    primary:   "cards_in_journals",
                    secondary: "cards_in_journals"
                };
                break;
            case "analytics-cards-in-tables":
                retval = {
                    primary:   "cards_in_tables",
                    secondary: "cards_in_tables"
                };
                break;
        };
        return retval;
    };

    async activateListeners($html) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async activateListeners(html)");

        super.activateListeners($html);

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var card_option = this.card_options[primary];
        var card_list   = this.card_lists[primary];

        card_option.activateListeners();

        switch (secondary) {
            case "cards_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                compendium_option.activateListeners(secondary);
                break;
            case "cards_in_journals":
                var journal_option = this.journal_options[secondary];
                journal_option.activateListeners(secondary);
                break;
            case "cards_in_tables":
                var table_option = this.table_options[secondary];
                table_option.activateListeners(secondary);
                break;
        };

        // inject list into form.
        const html_list     = document.getElementById("analytics-cards-list");
        html_list.innerHTML = card_list.join("");
    }

    async _onChangeTab(event, tabs, active) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _onChangeTab()");

        super._onChangeTab(event, tabs, active);

        var output_list = "";
        var retval = false;
        switch (active) {
            case "analytics-cards-in-compendiums":
                output_list = this.card_lists["cards_in_compendiums"];
                retval = !this.compendium_options["cards_in_compendiums"].compendium_submitted;
                break;
            case "analytics-cards-in-journals":
                output_list = this.card_lists["cards_in_journals"];
                retval = !this.journal_options["cards_in_journals"].journal_submitted;
                break;
            case "analytics-cards-in-tables":
                output_list = this.card_lists["cards_in_tables"];
                retval = !this.table_options["cards_in_tables"].table_submitted;
                break;
        };

        // update with null formData if tab never submitted.
        if (retval) {
            await this._updateObject(event, null);
            return;
        }

        // update with saved list or submitted data.
        if (output_list.length > 0)
            await this._updateObject(event, null);
        else
            await this._updateObject(event, this._getSubmitData());
    }

    // get data for form.
    getData() {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards getData()");

        // get data for form.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var card_option = this.card_options[primary];

        var retval = card_option.getCardData();

        switch (secondary) {
            case "cards_in_compendiums":
                var compendium_option = this.compendium_options[secondary];
                retval = Object.assign(retval, compendium_option.getCompendiumData(secondary));
                break;
            case "cards_in_journals":
                var journal_option = this.journal_options[secondary];
                retval = Object.assign(retval, journal_option.getJournalData(secondary));
                break;
            case "cards_in_tables":
                var table_option = this.table_options[secondary];
                retval = Object.assign(retval, table_option.getTableData(secondary));
                break;
        };

        return retval;
    }

    // set data from form.
    setData(data) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards setData()");

        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var card_option = this.card_options[primary];

        for ( let [k, v] of Object.entries(data) ) {

            card_option.setCardData(k, v);

            switch (secondary) {
                case "cards_in_compendiums":
                    var compendium_option = this.compendium_options[secondary];
                    compendium_option.setCompendiumData(k, v, secondary);
                    break;
                case "cards_in_journals":
                    var journal_option = this.journal_options[secondary];
                    journal_option.setJournalData(k, v, secondary);
                    break;
                case "cards_in_tables":
                    var table_option = this.table_options[secondary];
                    table_option.setTableData(k, v, secondary);
                    break;
            };
        };
    }

    async _onSubmit(event, {updateData=null, preventClose=true, preventRender=false}={}) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _onSubmit(event)");

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
        var primary = this.sortOptions().primary;

        // set update flag when changing tabs if tab never submitted.
        switch (primary) {
            case "cards_in_compendiums":
                var compendium_option = this.compendium_options[primary];
                if (!compendium_option.compendium_submitted) compendium_option.compendium_submitted = true;
                break;
            case "cards_in_journals":
                var journal_option = this.journal_options[primary];
                if (!journal_option.journal_submitted) journal_option.journal_submitted = true;
                break;
            case "cards_in_tables":
                var table_option = this.table_options[primary];
                if (!table_option.table_options) table_option.table_options = true;
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

    // create card list.
    buildList(card) {

        // active tab.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var card_option = this.card_options[primary];
        var card_list   = this.card_lists[primary];
        var card_name   = card.data.name;

        // each tab.
        switch (secondary) {
            case "cards_in_compendiums":
                // reset counters.
                var compendium_option = this.compendium_options[secondary];
                compendium_option.compendium_count = 0;
                break;
            case "cards_in_journals":
                // reset counters.
                var journal_option = this.journal_options[secondary];
                journal_option.journal_count = 0;
                break;
            case "cards_in_tables":
                // reset counters.
                var table_option = this.table_options[secondary];
                table_option.table_count = 0;
                break;
        };
    }

    async _updateObject(event, formData) {
        if (ANALYTICS.DEBUG) console.info(ANALYTICS.LABEL + "AnalyticsCards async _updateObject(event, formData)");

        // null form data render and return.
        if (!formData) {
            this.render(true);
            return;
        };

        // active tab.
        var primary     = this.sortOptions().primary;
        var secondary   = this.sortOptions().secondary;
        var card_option = this.card_options[primary];
        var card_list   = this.card_lists[primary];

        // set data from form.
        this.setData(expandObject(formData));

        // reset counters and lists.
        card_option.card_count = 0;
        card_list.splice(0, card_list.length);

        // message not available, render and return.
        switch (secondary) {
            case "cards_in_compendiums":
                this.addMessage(card_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "cards_in_journals":
                this.addMessage(card_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
            case "cards_in_tables":
                this.addMessage(card_list, i18n("ANALYTICS.Phase3"));
                this.render(true);
                return;
                break;
        };

        // spin the submit button icon and disable.
        var button      = document.getElementById("analytics-cards-submit");
        button.disabled = true;
        const icon      = button.querySelector("i");
        icon.className  = "fas fa-spinner fa-pulse";
        const delay     = ms => new Promise(res => setTimeout(res, ms));
        await delay(20);

        // spin through card list ...
        game.cards.contents.forEach((card, i) => {
            if (game.cards.contents[i]) {
            };
        }); // forEach Card.

        // reset submit button icon and enable.
        icon.className  = "fas fa-search";
        button.disabled = false;
        await delay(10);

        // re-draw the updated form
        this.render(true);
    }
}
