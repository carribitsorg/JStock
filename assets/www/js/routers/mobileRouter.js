// Mobile Router
// =============
var Config = null;
var Storage = null;

var MarketIndex = {
    MAIN_INDEX: 'MAIN_INDEX',
    JSE_SELECT: 'JSE_SELECT',
    ALL_JAMAICAN: 'ALL_JAMAICAN',
    CROSS_LISTED: 'CROSS_LISTED'
};
var MarketIndexTab = {
    INFO: 'INFO',
    PERFORMANCE: 'PERFORMANCE',
    HISTORY: 'HISTORY',
    COMPOSITION: 'COMPOSITION'
};

var options = {
    indexName: MarketIndex.MAIN_INDEX,
    indexTab: MarketIndexTab
};

// Includes file dependencies
define(["jquery", "backbone", "indexjs", "AppModules"],
        function($, Backbone, indexjs, AppModules) {
            Config = AppModules.Config;
            Storage = AppModules.Storage;
            
            var CategoryRouter = Backbone.Router.extend({
                // The Router constructor
                initialize: function() {
                    Config = AppModules.Config;
                    this.indexDetailsView = new AppModules.Views.IndexDetailsView({el: "#appview", model: new AppModules.Models.MarketIndexFull()});
                    this.homeView = new AppModules.Views.HomeView({el: "#appview", model: new AppModules.Models.DailyMainMarketSummary()});

                    this.quoteView = new AppModules.Views.QuoteView({el: "#appview", model: new AppModules.Models.Quote()});
                    this.newsView = new AppModules.Views.NewsView({el: "#appview", model: new AppModules.Models.News()});

                    $('.market-date').text('Feb 15, 2014');
                    Backbone.history.start();
                },
                // Backbone.js Routes
                routes: {
                    // When there is no hash bang on the url, the home method is called
                    "": "home",
                    "home": "home",
                    "report": "report",
                    "calendar": "calendar",
                    "news?:id": "viewnews",
                    "news": "news",
                    "quote": "quote",
                    "indexdetails": "indexdetails"
                },
                route: function(route, name, callback) {
                    var router = this;
                    if (!callback)
                        callback = this[name];

                    var f = function() {
                        $("#index-navbar").hide();
                        $("#index-details-navbar").hide();
                        console.log('route before', route);
                        callback.apply(router, arguments);
                        console.log('route after', route);
                    };
                    return Backbone.Router.prototype.route.call(this, route, name, f);
                },
                // Home method
                home: function() {
                    $("#index-navbar").show();
                    var self = this;

                    var success = function() {
                        self.homeView.render();
                        $.mobile.changePage("#", {reverse: false, changeHash: false});
                        self.homeView.getMarketIndexDetails();
                    };

                    var error = function() {
                        console.log('ajax error');
                    };

                    this.homeView.model.fetch({success: success, error: error});

                    $('div[data-role="navbar"] ul li a#main_index, a#jse_select, a#all_jamaican, a#cross_listed').on('click', function(e) {
                        e.preventDefault();
                        var el = e.target.id;
                        switch (el)
                        {
                            case 'main_index':
                                options.indexName = MarketIndex.MAIN_INDEX;
                                break;
                            case 'jse_select':
                                options.indexName = MarketIndex.JSE_SELECT;
                                break;
                            case 'all_jamaican':
                                options.indexName = MarketIndex.ALL_JAMAICAN;
                                break;
                            case 'cross_listed':
                                options.indexName = MarketIndex.CROSS_LISTED;
                                break;
                        }

                        $('.act-index-name').text($(e.target).text());
                        self.homeView.changeGraph();
                        self.homeView.getMarketIndexDetails();
                    });
                },
                indexdetails: function() {
                    var self = this;
                    $("#index-details-navbar").show();

                    this.indexDetailsView.showFirstTab();

                    var success = function() {
                        self.indexDetailsView.render();
                        console.log('indexdetails success');
                    };

                    var error = function() {
                        console.log('ajax error');
                    };

                    $('#index-details-navbar ul li a').on('click', function(e) {
                        e.preventDefault();
                        var el = e.target.id;
                        var divId = '';
                        switch (el)
                        {
                            case 'info':
                                options.indexTab = MarketIndexTab.INFO;
                                divId = '#index-information-tab';
                                break;
                            case 'performance':
                                options.indexTab = MarketIndexTab.PERFORMANCE;
                                divId = '#index-performance-tab';
                                break;
                            case 'history':
                                options.indexTab = MarketIndexTab.HISTORY;
                                divId = '#index-history-tab';
                                break;
                            case 'composition':
                                options.indexTab = MarketIndexTab.COMPOSITION;
                                divId = '#index-composition-tab';
                                break;
                        }
                        self.indexDetailsView.changeTab(divId);

                    });

                    this.indexDetailsView.model.fetch({success: success, error: error});

                },
                news: function() {
                    var self = this;
                    var success = function() {
                        self.newsView.render();
                    };
                    var error = function() {

                    };

                    this.newsView.model.fetch({success: success, error: error});
                },
                viewnews: function(id) {
                    console.log('ZZZZZZZZZZZZQQ');
                    //this.newsView.render();
                    this.newsView.viewNewsItem(id);
                },
                quote: function() {
                    var self = this;
                    var success = function() {
                        self.quoteView.render();
                    };
                    var error = function() {

                    };
                    this.quoteView.model.fetch({success: success, error: error});
                }

            });

            // Returns the Router class
            return CategoryRouter;

        });

