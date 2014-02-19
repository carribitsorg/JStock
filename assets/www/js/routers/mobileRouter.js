// Mobile Router
// =============
var Config = null;
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
            //initNavbar();
            // Extends Backbone.Router
            var CategoryRouter = Backbone.Router.extend({
                // The Router constructor
                initialize: function() {
                    Config = AppModules.Config;
                    this.reportView = new AppModules.Views.ReportView({el: "#appview", collection: new AppModules.Collection.CategoriesCollection([], {type: "vehicles"})});
                    this.indexDetailsView = new AppModules.Views.IndexDetailsView({el: "#appview", model: new AppModules.Models.MarketIndexFull()});
                    this.homeView = new AppModules.Views.HomeView({el: "#appview", model: new AppModules.Models.DailyMainMarketSummary()});
                    Backbone.history.start();
                },
                // Backbone.js Routes
                routes: {
                    // When there is no hash bang on the url, the home method is called
                    "": "home",
                    "home": "home",
                    "report": "report",
                    "calendar": "calendar",
                    "news": "news",
                    "quote": "quote",
                    "indexdetails": "indexdetails",
                    "category?:type": "category"
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
                report: function() {
                    this.reportView.collection.fetch().done(function() {
                        $.mobile.changePage("#", {reverse: false, changeHash: false});
                    });
                },
                news: function() {

                },
                quote: function() {

                }

            });

            // Returns the Router class
            return CategoryRouter;

        });

function initNavbar() {
    $(document).on("pageinit", function() {
        $("[data-role='navbar']").navbar();
        $("[data-role='header'], [data-role='footer']").toolbar();
    });

    // Update the contents of the toolbars
    $(document).on("pageshow", "[data-role='page']", function() {
        // Each of the four pages in this demo has a data-title attribute
        // which value is equal to the text of the nav button
        // For example, on first page: <div data-role="page" data-title="Info">
        var current = $(this).jqmData("title");
        // Change the heading
        $("[data-role='header'] h1").text(current);
        // Remove active class from nav buttons
        $("[data-role='navbar'] a.ui-btn-active").removeClass("ui-btn-active");
        // Add active class to current nav button
        $("[data-role='navbar'] a").each(function() {
            if ($(this).text() === current) {
                $(this).addClass("ui-btn-active");
            }
        });
    });
}