// Mobile Router
// =============
var Config = null;
var MarketIndex = {
    MAIN_INDEX: 'MAIN_INDEX',
    JSE_SELECT: 'JSE_SELECT',
    ALL_JAMAICAN: 'ALL_JAMAICAN',
    CROSS_LISTED: 'CROSS_LISTED'
};

var options = {
    indexName: MarketIndex.JSE_SELECT
};

// Includes file dependencies
define(["jquery", "backbone", "indexjs", "AppModules"],
        function($, Backbone, indexjs, AppModules) {

            // Extends Backbone.Router
            var CategoryRouter = Backbone.Router.extend({
                // The Router constructor
                initialize: function() {
                    Config = AppModules.Config;
                    this.reportView = new AppModules.Views.ReportView({el: "#appview", collection: new AppModules.Collection.CategoriesCollection([], {type: "vehicles"})});
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
                    "category?:type": "category"
                },
                // Home method
                home: function() {
                    console.log("home");
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
                        console.log(e);
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