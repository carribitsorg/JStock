define([

    './models/FirstModel',
    './models/SecondModel',
    './views/FirstView',
    './views/SecondView',
    'txt!./templates/template.tpl'

], function(FirstModel, SecondModel, FirstView, SecondView, template) {

    return {
        FirstModel: FirstModel,
        SecondModel: SecondModel,
        FirstView: FirstView,
        SecondView: SecondView,
        template: template
    }

});


//usage
define(['./Module'], function(Module) {

    var AView = Module.FirstView.extend({

        model: Module.FirstModel,

        render: function() {

            this.html(_.template(Module.template)(this.model.attributes));

            if (something) {

                this.$el.append(new Module.SecondView().render().el);
            }
        }
    })

    return AView;
});