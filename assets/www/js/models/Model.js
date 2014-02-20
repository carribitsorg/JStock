// Category Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function($, Backbone) {

    // The Model constructor
    var Category = Backbone.Model.extend({
    });

    var BaseModel = Backbone.Model.extend({
        getImageDir: function(value) {
            var image = 'one_pixel';
            if (value.indexOf("mov_down") !== -1) {
                image = 'mov_down';
            } else if (value.indexOf("mov_up") !== -1) {
                image = 'mov_up';
            }
            return image;
        },
        getImageClass: function(value) {
            var ImgClass = '';
            if (value.indexOf("mov_down") !== -1) {
                ImgClass = 'value-dir-down';
            } else if (value.indexOf("mov_up") !== -1) {
                ImgClass = 'value-dir-up';
            }
            return ImgClass;
        }
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
            response['change_dir'] = BaseModel.prototype.getImageDir.call(this, response['change_dir']);
            response['change_perc_dir'] = BaseModel.prototype.getImageDir.call(this, response['change_dir']);

            this.data = response;
            return this;
        }
    });

    MarketIndexFull = Backbone.Model.extend({
        initialize: function(options) {
        },
        urlRoot: function() {
            return  Config.baseurl + "/mainmarket/marketindexfulldetails?date=" + Config.stockDate
                    + '&index_name=' + options.indexName;
        },
        parse: function(response) {
            this.composition = response['composition'];
            this.history = response['history'];
            this.information = response['information'];
            this.performance = response['performance'];

            this.information['change_dir'] = BaseModel.prototype.getImageClass.call(this, this.information['change_dir']);
            this.information['change_perc_dir'] = BaseModel.prototype.getImageClass.call(this, this.information['change_perc_dir']);

            this.information['wtd_direction'] = BaseModel.prototype.getImageClass.call(this, this.information['wtd_direction']);
            this.information['mtd_direction'] = BaseModel.prototype.getImageClass.call(this, this.information['mtd_direction']);
            this.information['qtd_direction'] = BaseModel.prototype.getImageClass.call(this, this.information['qtd_direction']);
            this.information['ytd_direction'] = BaseModel.prototype.getImageClass.call(this, this.information['ytd_direction']);
            return this;
        }
    });

    Quote = Backbone.Model.extend({
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



    News = Backbone.Model.extend({
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

    // Returns the Model class
    return {
        CategoryModel: Category,
        DailyMainMarketSummary: DailyMainMarketSummary,
        MarketIndexDetails: MarketIndexDetails,
        MarketIndexFull: MarketIndexFull,
        Quote: Quote,
        News: News
    };

});