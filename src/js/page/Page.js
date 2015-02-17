var Filters = require('../filters/Filters');
var PreferencesService = require('../services/PreferencesService');

module.exports = {
    init: function() {
        var that = this;
        Filters.init();
        PreferencesService.init().then(function() {
            document.addEventListener('DOMNodeInserted', that._onDOMContentLoaded.bind(that));
        });

    },

    _onDOMContentLoaded: function() {
        Filters.applyFilters();
    }
};
