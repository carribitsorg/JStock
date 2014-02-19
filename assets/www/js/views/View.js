// Category View
// =============

// Includes file dependencies
define(["jquery", "backbone", "models/Model"], function($, Backbone, ModelModule) {

    // Extends Backbone.View
    var CategoryView = Backbone.View.extend({
        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on("added", this.render, this);
        },
        // Renders all of the Category models on the UI
        render: function() {

            // Sets the view's template property
            this.template = _.template($("script#categoryItems").html(), {"collection": this.collection});

            // Renders the view's template inside of the current listview element
            this.$el.find("ul").html(this.template);

            // Maintains chainability
            return this;
        }
    });


    var ReportView = Backbone.View.extend({
        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            this.collection.on("added", this.render, this);

        },
        // Renders all of the Category models on the UI
        render: function() {
            console.log("Re");
            // Sets the view's template property
            this.template = _.template($("script#categoryItems").html(), {"collection": this.collection});

            // Renders the view's template inside of the current listview element
            this.$el.find("#content-holder").html(this.template);

            // Maintains chainability
            return this;

        }

    });

    var IndexDetailsView = Backbone.View.extend({
        // The View Constructor
        initialize: function() {

            // The render method is called when Category Models are added to the Collection
            //this.collection.on("added", this.render, this);
            //this.showFirstTab();
            //console.log('cc');
        },
        // Renders all of the Category models on the UI
        render: function() {
            var self = this;
            var model = new ModelModule.MarketIndexFull;

            var success = function() {
                self.renderStockPerformance(model.performance);
                self.renderStockInformation(model.information);
            };

            var error = function() {
                console.log('ajax error');
            };

            this.template = _.template($("#indexdetails").html());
            this.$el.find("#content-holder").html(this.template);

            model.fetch({success: success, error: error});
            return this;
        },
        showFirstTab: function() {
            //this.$el.find('#info').addClass('ui-btn-active');
        },
        changeTab: function(id) {
            this.$el.find('.index-tabs').hide();
            console.log(id);
            this.$el.find(id).show();
        },
        renderStockPerformance: function(performance) {
            this.$el.find('#performance-list #vol').text(toMoney(performance['volume_traded']));
            this.$el.find('#performance-list #wtd').text(performance['week_to_date'] + '%');
            this.$el.find('#performance-list #mtd').text(performance['month_to_date'] + '%');
            this.$el.find('#performance-list #qtd').text(performance['quarter_to_date'] + '%');
            this.$el.find('#performance-list #ytd').text(performance['year_to_date'] + '%');
            this.$el.find('#performance-list #change_name').text(performance['change_name']);
            this.$el.find('#performance-list #change_value').text(performance['change_value'] + '%');

            this.$el.find("#info").trigger("click");
        },
        renderStockInformation: function(information) {
            this.$el.find('#information-list #value_date').text(information['value_date']);
            this.$el.find('#information-list #value').text(toMoney(information['value']));
            this.$el.find('#information-list #change').text(toMoney(information['change']));
            this.$el.find('#information-list #change_perc').text(information['change_perc'] + '%');
            this.$el.find('#information-list #volume').text(toMoney(information['vol']));
            this.$el.find('#information-list #market_capitalization').text(information['market_capitalization']);
            this.$el.find('#information-list #change_1969').text(information['change_1969']);
            
            this.$el.find('#information-list #wtd').text(information['wtd']);
            this.$el.find('#information-list #mtd').text(information['mtd']);
            this.$el.find('#information-list #qtd').text(information['qtd']);
            this.$el.find('#information-list #ytd').text(information['ytd']);
        },
        renderStockHistory: function() {

        },
        renderStockComposition: function() {

        }
    });

    var HomeView = Backbone.View.extend({
        initialize: function() {
        },
        // Renders all of the Category models on the UI
        render: function() {
            var advancing = _.template($("script#stocks").html(), {"stocks": this.model.advancing});
            var declining = _.template($("script#stocks").html(), {"stocks": this.model.declining});
            var tradingFirm = _.template($("script#stocks-trd").html(), {"stocks": this.model.tradingFirm});

            this.template = _.template($("#home").html());

            // Renders the view's template inside of the current listview element
            this.$el.find("#content-holder").html(this.template);

            this.$el.find('#stock-adv tbody:last').append(advancing);
            this.$el.find('#stock-dec tbody:last').append(declining);
            this.$el.find('#stock-trd tbody:last').append(tradingFirm);


            this.$el.find('#summary-date').append(parseDate(this.model.summarydate));
            this.$el.find('#graph-img').attr("src", Config.baseurl + '/mainmarket/onemonthgraph?date=' + this.model.summarydate +
                    '&index_name=' + options.indexName +
                    '&file=graph.png');


            var details = this.getSummary(this.model.summary1);
            var summary = _.template($("script#market-summary").html(), {"summary": details});
            this.$el.find('#market-summart1').append(summary);

            return this;
        },
        changeGraph: function() {
            this.$el.find('#graph-img').attr("src", Config.baseurl + '/mainmarket/onemonthgraph?date=' + this.model.summarydate +
                    '&index_name=' + options.indexName +
                    '&file=graph.png');
        },
        getMarketIndexDetails: function() {
            var self = this;
            var model = new ModelModule.MarketIndexDetails;

            var success = function(json) {

                var template = _.template($("script#market-details").html(), {"summary": json.data});
                self.$el.find(".market-details tr").remove();
                self.$el.find('.market-details tbody:last').append(template);
            };

            var error = function() {
                console.log('ajax error');
            };

            model.fetch({success: success, error: error});

        },
        getSummary: function(text) {
            var summary = {};
            var totalStocks = /(?:\d*)\s+stocks/;
            var advanceStocks = /(?:\d*)\s+advanced/;
            var declinedStocks = /(?:\d*)\s+declined/;
            var tradedStocks = /(?:\d*)\s+traded/;

            var totalMatch = totalStocks.exec(text);
            var advanceMatch = advanceStocks.exec(text);
            var declinedMatch = declinedStocks.exec(text);
            var tradedMatch = tradedStocks.exec(text);


            summary["total"] = totalMatch[0];
            summary["advanced"] = advanceMatch[0];
            summary["declined"] = declinedMatch[0];
            summary["traded"] = tradedMatch[0];

            return summary;
        }
    });

    // Returns the View class
    return{
        CategoryView: CategoryView,
        ReportView: ReportView,
        HomeView: HomeView,
        IndexDetailsView: IndexDetailsView
    };

});