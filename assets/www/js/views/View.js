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

    var HomeView = Backbone.View.extend({
        initialize: function() {
            //this.model.on("change", this.render, this);
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
            return this;
        }
    });

    // Returns the View class
    return{
        CategoryView: CategoryView,
        ReportView: ReportView,
        HomeView: HomeView
    };

});