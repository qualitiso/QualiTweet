var Filters = require('../filters/Filters');
var PreferencesService = require('../services/PreferencesService');

module.exports = {
    init: function() {
        var that = this;
        Filters.init();
        PreferencesService.init().then(function() {
            Filters.applyFilters();
            document.addEventListener('DOMNodeInserted', that._onDOMNodeInserted.bind(that));
        });

    },

    _onDOMNodeInserted: function(ev) {
        if(ev.path[0].querySelector) {
            var tweet = ev.path[0].querySelector('.original-tweet');
            if(tweet !== null) {
                Filters.applyWordFilterOnTweet(tweet);
            }
            Filters.applyHideElementsFilters();
        }
    }
};
