var PostAddPageView = Backbone.View.extend({
  events: {
    "click #add-post": "addPost",
  },

  initialize: function () {
    this.template = $.tpl['post-add-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template());
    this.title = $("#post-title", this.el);
    this.body = $("#post-body", this.el);
    return this;
  },

  addPost: function() {
    if (!this.title.val() || !this.body.val()) {
      return false;
    }

    var post = new Post({
      title: this.title.val(),
      body: this.body.val(),
    });

    post.save({}, {success: function() {
      window.workspace.navigate('#post/list', { trigger: true });
      return true;
    }});

    return false;
  }
});
