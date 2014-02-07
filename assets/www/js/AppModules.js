define([
    "../js/views/CategoryView",
    "../js/models/CategoryModel",
    "../js/collections/CategoriesCollection"
], function(
        Views,
        Models,
        Collection)
{
    return {
        Views: Views,
        Models: Models,
        Collection: Collection
    }
});
/*
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
 
 */