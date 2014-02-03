var AboutPageView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['about-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  },
});
