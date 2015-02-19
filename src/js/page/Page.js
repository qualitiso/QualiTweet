var Filters = require('../filters/Filters');
var PreferencesService = require('../services/PreferencesService');

module.exports = {
    init: function() {
        var that = this;
        Filters.init();
        PreferencesService.init(function(error) {
            if(error) {
                console.error('Can\'t initialize Qualitweet page script', e);
            } else {
                Filters.applyFilters();
                document.addEventListener('DOMNodeInserted', that._onDOMNodeInserted.bind(that));
            }
        });

    },

    _onDOMNodeInserted: function(ev) {
        if(ev.path[0].querySelector) {
            Filters.applyFilters();
            /*var tweet = ev.path[0].querySelector('.original-tweet');
            if(tweet !== null) {
                Filters.applyWordFilterOnTweet(tweet);
            }
            Filters.applyHideElementsFilters();*/
        }
    }
};
