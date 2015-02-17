var PreferencesStore = require('../menu/PreferencesStore');
var _ = require('lodash');

var hiddableElements = {
    'hide-trends' : '.module.trends',
    'hide-promoted' : '.promoted-trend,.promoted-tweet',
    'hide-suggest' : '.wtf-module',
    'hide-footer' : '.Footer'
};

module.exports = {

    init: function() {
        console.log('init filters');
        PreferencesStore.addChangeListener(this.applyFilters.bind(this));
    },

    applyFilters: function() {
        var appliedFilters = PreferencesStore.getHiddenElements();
        var nonAppliedFilters = _.difference(_.keys(hiddableElements), appliedFilters);

        this._hideElements(this._getElementsMatchingFilters(appliedFilters));
        this._showElements(this._getElementsMatchingFilters(nonAppliedFilters));
    },

    _getElementsMatchingFilters: function(filters) {
        var selectorToHide = filters.map(function(filter) {
            return hiddableElements[filter];
        }).reduce(function(previous, current) {
            return previous+','+current;
        });
        return document.querySelectorAll(selectorToHide);
    },

    _hideElements: function(elements) {
        Array.prototype.forEach.call(elements, function(element) {element.style.display = 'none';});
    },

    _showElements: function(elements) {
        Array.prototype.forEach.call(elements, function(element) {element.style.display = 'block';});
    }
};