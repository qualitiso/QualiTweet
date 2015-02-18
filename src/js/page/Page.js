var Filters = require('../filters/Filters');
var PreferencesService = require('../services/PreferencesService');

module.exports = {
    init: function() {
        var that = this;
        Filters.init();
        PreferencesService.init().then(function() {
            document.addEventListener('DOMNodeInserted', that._onDOMNodeInserted.bind(that));
        });

    },
    _onDOMNodeInserted: function(ev) {
        if(ev.path[0].querySelector) {
            Filters.applyFilters();
        }
    }
};
