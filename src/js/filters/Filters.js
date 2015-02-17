var PreferencesStore = require('../menu/PreferencesStore');

module.exports = {

    init: function() {
        console.log('init filters');
        this._applyFilters();
        PreferencesStore.addChangeListener(this._applyFilters.bind(this));
    },

    _applyFilters: function() {
        var filters = PreferencesStore.getHiddenElements();
        // "", "hide-trends", "hide-tweet", "hide-suggest"
        this._applyFilter(filters, '.module.trends', 'hide-trends');
        this._applyFilter(filters, '.promoted-trend,.promoted-tweet', 'hide-promoted');
    },

    _applyFilter: function(filters, selector, filterName) {
        var elements = document.querySelectorAll(selector);
        if(filters.indexOf(filterName) !== -1) {
            Array.prototype.forEach.call(elements, function(element) {element.style.display = 'none';});
        } else {
            Array.prototype.forEach.call(elements, function(element) {element.style.display = 'block';});
        }
    }
};