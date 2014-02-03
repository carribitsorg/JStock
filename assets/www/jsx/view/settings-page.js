var SettingsPageView = Backbone.View.extend({
  events: {
    "click #save-settings": "saveSettings",
  },

  initialize: function () {
    this.template = $.tpl['settings-page'];
  },

  render: function (eventName) {
    $(this.el).html(this.template(appConfig));
    this.base_url = $("#base-url", this.el);
    this.add_url = $("#add-url", this.el);
    return this;
  },

  saveSettings: function() {
    if (!this.base_url.val()) {
      return false;
    }

    if (!this.add_url.val()) {
      return false;
    }

    appConfig.baseURL = this.base_url.val();
    appConfig.addURL = this.add_url.val();

    window.history.back();
    return true;
  }
});
