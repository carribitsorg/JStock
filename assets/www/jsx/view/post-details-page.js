var PostDetailsView = Backbone.View.extend({
  initialize: function() {
    this.model.bind('change', this.render, this);
    this.template = $.tpl['post-details'];
  },

  render: function() {
    $(this.el).html(this.template(this.model.toJSON())).trigger('create');
    return this;
  },
});


var PostDetailsPageView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['post-details-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    this.postDetailsView = new PostDetailsView({ el: $('.post-details', this.el), model: this.model });
    return this;
  }
});
