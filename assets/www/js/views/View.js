// Category View
// =============

// Includes file dependencies
define(["jquery", "backbone", "models/Model"], function($, Backbone, ModelModule) {

    var SymbolDetailView = Backbone.View.extend({
        initialize: function() {
        },
        render: function(id) {
            var self = this;
            var model = new ModelModule.SymbolDetail(id);

            var template = _.template($("#symboldetail").html());
            this.$el.find("#content-holder").html(template);

            var success = function() {
                self.renderTradeData(model);
            };
            var error = function() {

            };

            model.fetch({success: success, error: error});
            return this;
        },
        changeTab: function(id) {
            this.$el.find('.symbol-tabs').hide();
            this.$el.find(id).show();
        },
        renderTradeData: function(data) {
            console.log(data);
        },
        renderPerformance: function() {

        }
    });

    var SymbolView = Backbone.View.extend({
        initialize: function() {
        },
        render: function() {

        },
        refresh: function() {
            var self = this;
            var model = new ModelModule.Symbol();

            var success = function() {
                for (var i = 0; i < model.symbols.length; i++) {
                    var row = model.symbols[i];
                    var html = _.template($("script#symbol-lookup").html(), {"row": row});
                    self.$el.find('#sysbol-list').append(html);
                }
            };

            var error = function() {
                console.log('ajax error');
            };

            model.fetch({success: success, error: error});
            return this;
        }
    });

    var QuoteView = Backbone.View.extend({
        initialize: function() {
        },
        render: function() {
            var self = this;
            var model = new ModelModule.Quote();

            this.template = _.template($("#quote").html());
            this.$el.find("#content-holder").html(this.template);
            this.$el.find("#quote-tab").trigger("click");

            var success = function() {
                self.renderQuotes(model.quote);
                self.renderOrdinaryShares(model.ordinaryShares);
                self.renderPreferenceShares(model.preferenceShares);
                self.renderUsDenominatedShares(model.usDenominatedShares);
            };

            var error = function() {
                console.log('ajax error');
            };

            model.fetch({success: success, error: error});
            return this;
        },
        renderQuotes: function(data) {
            var html = _.template($("script#quote-main-tmp").html(), {"data": data});
            this.$el.find('#quote-main-table tbody:last').append(html);
        },
        renderOrdinaryShares: function(data) {
            for (var i = 0; i < data.length; i++) {
                row = data[i];
                html = _.template($("script#shares-tmp").html(), {"row": row});
                this.$el.find('#ordinary-tab-page .tab-content').append(html);
            }
        },
        renderPreferenceShares: function(data) {
            for (var i = 0; i < data.length; i++) {
                row = data[i];
                html = _.template($("script#shares-tmp").html(), {"row": row});
                this.$el.find('#preference-tab-page .tab-content').append(html);
            }
        },
        renderUsDenominatedShares: function(data) {
            for (var i = 0; i < data.length; i++) {
                row = data[i];
                html = _.template($("script#shares-tmp").html(), {"row": row});
                this.$el.find('#us-denom-tab-page .tab-content').append(html);
            }
        },
        changeTab: function(id) {
            this.$el.find('.quote-tabs').hide();
            this.$el.find(id).show();
        }
    });

    var NewsView = Backbone.View.extend({
        initialize: function() {
        },
        render: function() {
            var newsCount = 0;
            this.template = _.template($("#news").html());
            this.$el.find("#content-holder").html(this.template);

            for (var key in this.model.news) {
                console.log(this.model.news[key]);
                var news = this.model.news[key];
                var newsItems = _.template($("script#new-item").html(), {"news": news});

                var newDivider = '';
                if (newsCount === 0) {
                    newDivider = _.template($("script#new-divider-first").html(), {"date": key});
                } else {
                    newDivider = _.template($("script#new-divider").html(), {"date": key});
                }

                this.$el.find('#news-list').append(newDivider);
                this.$el.find('#news-list').append(newsItems);
                newsCount++;
            }


        }
    });

    var NewsItemView = Backbone.View.extend({
        initialize: function() {
        },
        render: function(id) {
            var self = this;
            var model = new ModelModule.NewsItem(id);

            var success = function() {
                console.log(model.newsItem);
                var template = _.template($("#viewnews").html());
                self.$el.find("#content-holder").html(template);

                self.$el.find('#news-item #news-heading h2').text(model.data['title']);
                self.$el.find('#news-item #news-content').text(model.data['desc']);
                self.$el.find('#news-item .pub-date').text(model.data['full_date']);
            };

            var error = function() {
                console.log('ajax error');
            };

            model.fetch({success: success, error: error});
            return this;
        }
    });

    var IndexDetailsView = Backbone.View.extend({
        // The View Constructor
        initialize: function() {
        },
        // Renders all of the Category models on the UI
        render: function() {
            var self = this;
            var model = new ModelModule.MarketIndexFull;

            var success = function() {
                self.renderStockPerformance(model.performance);
                self.renderStockInformation(model.information);
                self.renderStockHistory(model.history);
                self.renderStockComposition(model.composition);
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
            this.$el.find(id).show();
        },
        renderStockPerformance: function(performance) {
            this.$el.find('#performance-list #vol').text(toMoney((performance['volume_traded'] || '')));
            this.$el.find('#performance-list #wtd').text((performance['week_to_date'] || '') + '%');
            this.$el.find('#performance-list #mtd').text((performance['month_to_date'] || '') + '%');
            this.$el.find('#performance-list #qtd').text((performance['quarter_to_date'] || '') + '%');
            this.$el.find('#performance-list #ytd').text((performance['year_to_date'] || '') + '%');
            this.$el.find('#performance-list #change_name').text((performance['change_name'] || ''));
            this.$el.find('#performance-list #change_value').text((performance['change_value'] || '') + '%');

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

            this.$el.find('#information-list #change').addClass(information['change_dir']);
            this.$el.find('#information-list #change_perc').addClass(information['change_perc_dir']);
            this.$el.find('#information-list #wtd').addClass(information['wtd_direction']);
            this.$el.find('#information-list #mtd').addClass(information['mtd_direction']);
            this.$el.find('#information-list #qtd').addClass(information['qtd_direction']);
            this.$el.find('#information-list #ytd').addClass(information['ytd_direction']);
        },
        renderStockHistory: function(history) {
            var historyTmp = _.template($("script#index-history-tmp").html(), {"history": history});
            this.$el.find('#index-history-table tbody:last').append(historyTmp);
        },
        renderStockComposition: function(composition) {
            var compositionTmp = _.template($("script#index-composition-tmp").html(), {"composition": composition});
            this.$el.find('#index-composition-table tbody:last').append(compositionTmp);
            console.log(compositionTmp);
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
            summary["traded"] = tradedMatch[0] + ' firm';

            return summary;
        }
    });

    // Returns the View class
    return{
        HomeView: HomeView,
        IndexDetailsView: IndexDetailsView,
        QuoteView: QuoteView,
        NewsView: NewsView,
        NewsItemView: NewsItemView,
        SymbolView: SymbolView,
        SymbolDetailView: SymbolDetailView
    };

});