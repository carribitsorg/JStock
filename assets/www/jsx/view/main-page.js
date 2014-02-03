var MainPageView = Backbone.View.extend({
  initialize: function () {
    this.template = $.tpl['test'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    return this;
  },
});
