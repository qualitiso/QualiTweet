var PreferencesStore = require('../menu/PreferencesStore');

module.exports = {

    $trends: null,

    init: function() {
        console.log('init filters');
        this._applyFilters();
        PreferencesStore.addChangeListener(this._applyFilters.bind(this));
    },

    _applyFilters: function() {
        var filters = PreferencesStore.getHiddenElements();
        // "", "hide-trends", "hide-tweet", "hide-suggest"
        this.$trends =  this.$trends || document.querySelector('.module.trends');
        if(filters.indexOf('hide-trends') !== -1) {
            this.$trends.style.display = 'none';
        } else {
            this.$trends.style.display = 'block';
        }
    }
};