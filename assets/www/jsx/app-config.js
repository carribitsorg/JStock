// Enable cross site scripting
jQuery.support.cors = true;

// Disable ajax cache
jQuery.ajaxSetup({ cache: false });

// Add support of MongoDB Extended JSON
_.extend(Backbone.Model.prototype, Backbone.MongoModel.mixin);

// Add REST service URL
var appConfig = {
  baseURL: 'https://api.mongolab.com/api/1/databases/social-mobile-app/collections/',
  addURL: '?apiKey=yGobEjzhT76Pjo9RaOLGfA89xCJXegpl'
}
