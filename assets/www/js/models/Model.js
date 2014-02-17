// Category Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function($, Backbone) {

    // The Model constructor
    var Category = Backbone.Model.extend({
    });

    DailyMainMarketSummary = Backbone.Model.extend({
        initialize: function(options) {
        },
        urlRoot: function() {
            return  Config.baseurl + "/mainmarket/dailySummary?date=" + Config.stockDate;
        },
        parse: function(response) {
            this.advancing = response.stocks.ADVANCING;
            this.declining = response.stocks.DECLINING;
            this.tradingFirm = response.stocks.TRADING_FIRM;
            this.summary1 = response.details.summary1;
            this.summarydate = response.details.summary_date;

            return this;
        }
    });

    MarketIndexDetails = Backbone.Model.extend({
        initialize: function() {

        },
        urlRoot: function() {
            return  Config.baseurl + "/mainmarket/marketindexdetails?date=" + Config.stockDate
                    + '&index_name=' + options.indexName;
        },
        parse: function(response) {
            if (response['change_dir'].indexOf("mov_down") !== -1) {
                response['change_dir'] = 'mov_down';
            } else if (response['change_dir'].indexOf("mov_up") !== -1) {
                response['change_dir'] = 'mov_up';
            }
            else {
                response['change_dir'] = 'one_pixel';
            }

            if (response['change_perc_dir'].indexOf("mov_down") !== -1) {
                response['change_perc_dir'] = 'mov_down';
            } else if (response['change_perc_dir'].indexOf("mov_up") !== -1) {
                response['change_perc_dir'] = 'mov_up';
            }
            else {
                response['change_perc_dir'] = 'one_pixel';
            }

            this.data = response;
            return this;
        }
    });

    MarketIndexModel = Backbone.Model.extend({
        initialize: function(options) {
        },
        urlRoot: function() {
            return  Config.baseurl + "/mainmarket/dailySummary?date=" + Config.stockDate;
        },
        parse: function(response) {


            return this;
        }
    });

    // Returns the Model class
    return {
        CategoryModel: Category,
        DailyMainMarketSummary: DailyMainMarketSummary,
        MarketIndexDetails: MarketIndexDetails,
        MarketIndexModel: MarketIndexModel
    };

});