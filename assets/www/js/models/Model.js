// Category Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function($, Backbone) {

    // The Model constructor
    var Category = Backbone.Model.extend({
    });

    DailyMainMarketSummary = Backbone.Model.extend({
        urlRoot: function() {
            return  Config.baseurl + "/mainmarket/dailySummary?date=" + Config.stockDate;
        },
        parse: function(response) {
            this.advancing = response.stocks.ADVANCING;
            this.declining = response.stocks.DECLINING;
            this.tradingFirm = response.stocks.TRADING_FIRM;
            this.summary1 = response.details.summary1;
            this.summarydate = response.details.summary_date;

            //return models
            return this;

        }
    });

    // Returns the Model class
    return {
        CategoryModel: Category,
        DailyMainMarketSummary: DailyMainMarketSummary
    };

});