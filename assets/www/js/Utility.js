define([], function() {
    var Storage = function() {

    };

    Storage.prototype = {
    };

    Storage.write = function(key, value) {
        window.localStorage.setItem(key, value);

        console.log(Storage);
    };

    Storage.writeJson = function(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    Storage.read = function(key) {
        return window.localStorage.getItem(key);
    };

    Storage.readJson = function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    };


    var LiveData = function() {

    };

    LiveData.prototype = {
    };
    LiveData.data = null;
    LiveData.index = 0;
    LiveData.update = function() {
        //update every 3 minutes
        var update = function() {
            $.ajax({
                type: "POST",
                url: Config.baseurl + '/livestock',
                data: {},
                dataType: "json",
                success: function(data) {
                    LiveData.data = data;
                }
            });
        };
        update();
        setInterval(function() {
            update();
        }, 180000);
    };

    LiveData.getNextUpdate = function() {
        if (LiveData.data !== null) {
            var html = '';

            if ((LiveData.index) >= LiveData.data.length) {
                LiveData.index = 0;
            }

            var lines = LiveData.data[LiveData.index].lines;
            var link = LiveData.data[LiveData.index].link;

            for (var i = 0; i < lines.length; i++) {
                if (link && link.indexOf("#symboldetail?") !== -1) {
                    $('.live-ui-btn').attr("href", link);
                } else {
                    $('.live-ui-btn').attr("href", '#');
                }
                if (lines[i].indexOf("mov_") !== -1) {
                    html += _.template($("script#live-img-tmp").html(), {"text": 'images/' + lines[i]});
                }
                else {
                    html += _.template($("script#live-data-tmp").html(), {"text": lines[i]});
                }
            }
            LiveData.index++;
            return html;
        }
    };

    LiveData.start = function() {
        LiveData.update();
        setInterval(function()
        {
            $('.live-text').slideUp("medium").promise().done(
                    function() {
                        var text = LiveData.getNextUpdate();
                        $('.live-text').html(text);
                        $('.live-text').slideDown("slow");
                    });
        }, 4000);
        if(navigator.notification)
        navigator.notification.beep(2);
    };


    var Monitor = function() {

    };

    Monitor.prototype = {
    };

    Monitor.refresh = function() {
        var newFragment = Backbone.history.getFragment($(this).attr('href'));
        if (Backbone.history.fragment === newFragment) {
            // need to null out Backbone.history.fragement because 
            // navigate method will ignore when it is the same as newFragment
            Backbone.history.fragment = null;
            Backbone.history.navigate(newFragment, true);
        }
    };

    Monitor.checkMarketChange = function() {
        $.ajax({
            type: "POST",
            url: Config.baseurl + '/config',
            data: {},
            dataType: "json",
            success: function(data) {
                console.log('TEST > checking market date change...');
                if (Config.stockDate !== data.stock_date) {
                    Monitor.refresh();
                }
            }
        });
    };

    Monitor.start = function() {
        setInterval(function() {
            Monitor.checkMarketChange();
        }, 600000);
    };

    return {
        Storage: Storage,
        LiveData: LiveData,
        Monitor: Monitor
    };
});
