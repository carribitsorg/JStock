// Category Model
// ==============

// Includes file dependencies
define(["jquery", "backbone"], function($, Backbone) {

    // The Model constructor
    var Category = Backbone.Model.extend({
    });

    DailyMainMarketSummary = Backbone.Model.extend({
        urlRoot: function() {
            return  "http://192.168.0.4/jstock/trigger/dailymainmarketsummary?date=02/07/2014";
        }
    });

    // Returns the Model class
    return {
        CategoryModel: Category,
        DailyMainMarketSummary: DailyMainMarketSummary
    };

});