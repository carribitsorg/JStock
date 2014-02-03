var PostDeleteDialogView = Backbone.View.extend({
  events: {
    "click #delete-post": "deletePost",
    "click #cancel": "cancel",
  },

  initialize: function () {
    this.template = $.tpl['post-delete-dialog'];
  },

  render: function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },

  deletePost: function() {
    this.model.destroy({success: function() {
      window.workspace.navigate('#post/list', { trigger: true });
    }});
  },

  cancel: function() {
    window.history.back();
  }
});
