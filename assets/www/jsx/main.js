var Workspace = Backbone.Router.extend({
    routes: {
        "": "main",
        "post/list": "postList",
        "post/add": "postAdd",
        "post/details/:id": "postDetails",
        "post/delete/:id": "postDelete",
        "settings": "settings",
        "about": "about",
    },
    main: function() {
        console.log('begin');
        this.changePage(new MainPageView());
    },
    changePage: function(page) {
        //$(page.el).attr('data-role', 'page');

        page.render();

        $('#content').append($(page.el));
    },
    historyCount: 0
});

$(document).ready(function() {
    window.workspace = new Workspace();
    Backbone.history.start();
});
