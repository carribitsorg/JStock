// Mobile Router
// =============
var Config = null;
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