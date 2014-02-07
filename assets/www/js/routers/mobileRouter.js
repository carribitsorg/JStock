// Mobile Router
// =============

// Includes file dependencies
define(["jquery", "backbone", "indexjs", "AppModules"],
        function($, Backbone, indexjs, AppModules) {

            // Extends Backbone.Router
            var CategoryRouter = Backbone.Router.extend({
                // The Router constructor
                initialize: function() {

                    // Instantiates a new Animal Category View
                    this.animalsView = new AppModules.Views.CategoryView({el: "#animals", collection: new AppModules.Collection.CategoriesCollection([], {type: "animals"})});

                    // Instantiates a new Colors Category View
                    this.colorsView = new AppModules.Views.CategoryView({el: "#colors", collection: new AppModules.Collection.CategoriesCollection([], {type: "colors"})});

                    // Instantiates a new Vehicles Category View
                    this.vehiclesView = new AppModules.Views.CategoryView({el: "#vehicles", collection: new AppModules.Collection.CategoriesCollection([], {type: "vehicles"})});



                    this.reportView = new AppModules.Views.ReportView({el: "#appview", collection: new AppModules.Collection.CategoriesCollection([], {type: "vehicles"})});

                    // Tells Backbone to start watching for hashchange events
                    Backbone.history.start();

                },
                // Backbone.js Routes
                routes: {
                    // When there is no hash bang on the url, the home method is called
                    "": "home",
                    "report": "report",
                    "calendar": "calendar",
                    "news": "news",
                    "quote": "quote",
                    // When #category? is on the url, the category method is called
                    "category?:type": "category"

                },
                // Home method
                home: function() {

                    // Programatically changes to the categories page
                    $.mobile.changePage("#", {reverse: false, changeHash: false});

                },
                // Category method that passes in the type that is appended to the url hash
                category: function(type) {

                    // Stores the current Category View  inside of the currentView variable
                    var currentView = this[ type + "View" ];
                    console.log(currentView);

                    // If there are no collections in the current Category View
                    if (!currentView.collection.length) {

                        // Show's the jQuery Mobile loading icon
                        $.mobile.loading("show");

                        // Fetches the Collection of Category Models for the current Category View
                        currentView.collection.fetch().done(function() {

                            // Programatically changes to the current categories page
                            $.mobile.changePage("#" + type, {reverse: false, changeHash: false});

                        });

                    }

                    // If there already collections in the current Category View
                    else {

                        // Programatically changes to the current categories page
                        $.mobile.changePage("#" + type, {reverse: false, changeHash: false});

                    }

                },
                report: function() {
                    this.reportView.collection.fetch().done(function() {
                        // Programatically changes to the current categories page
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