var Post = Backbone.Model.extend({
  defaults: {
    title: "",
    body: "",
    created: new Date().toString(),
  },

  url: function() {
    if (_.isUndefined(this.attributes.id)) {
      return appConfig.baseURL + 'posts' + appConfig.addURL;
    }
    else {
      return appConfig.baseURL + 'posts/' + encodeURIComponent(this.attributes.id) + appConfig.addURL;
    }
  },
});


var PostList = Backbone.Collection.extend({
  model: Post,
  url: function() {
    return appConfig.baseURL + 'posts' + appConfig.addURL;
  }
});
