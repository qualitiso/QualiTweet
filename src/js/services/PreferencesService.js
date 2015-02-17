var _ = require('lodash');
var BPromise = require('bluebird');

var HIDDEN_ELEMENTS_KEY = 'hidden-elements';

var PreferencesStore = require('../menu/PreferencesStore');
var Actions = require('../Actions');

var AVAILABLE_FILTERS = ['muted', 'highlighted', 'hidden'];

var hiddenElements = [];

var filters = [];
AVAILABLE_FILTERS.forEach(function(availableFilter) {
    filters[availableFilter] = [];
});

function getFilterKey(filter) {
    return filter+'-words';
}

module.exports = {

    init: function() {

        var that = this;

        return new BPromise(function(resolve) {
            try {
                chrome.storage.onChanged.addListener(that._onGoogleSyncChanged.bind(that));
                chrome.storage.sync.get(null, function(items) {
                    that._onHiddenElementsChanged(items[HIDDEN_ELEMENTS_KEY] || []);
                    AVAILABLE_FILTERS.forEach(function(filter) {
                        that._onFilterChanged(filter, items[getFilterKey(filter)] || []);
                    });
                    PreferencesStore.addChangeListener(that._onStoreChange.bind(that));
                    resolve();
                });
            } catch(e) {
                reject(e);
            }
        });
    },

    _onStoreChange: function() {
        var that = this;
        this._saveHiddenElementsListIfNeeded(PreferencesStore.getHiddenElements());
        AVAILABLE_FILTERS.forEach(function(filter) {
            that._saveFilterIfNeeded(filter,PreferencesStore.getWordsForFilterCategory(filter));
        });

    },

    // Read

    getHiddenElements: function() {
        return this.hiddenElements;
    },

    // Write

    _saveFilterIfNeeded: function(filterName, newValue) {
        var that = this;
        return new BPromise(function(resolve) {

            var filterKey = getFilterKey(filterName);

            if(_.difference(filters[filterKey], newValue).length === 0 && _.difference(newValue, filters[filterKey]).length === 0) {
                resolve();
            } else {
                filters[filterKey] = newValue;
                var dataToSave = {};
                dataToSave[filterKey] = newValue;
                that._saveInGoogleSync(dataToSave).then(resolve);
            }
        });
    },

    _onFilterChanged: function(filter, newValue) {
        filters[filter] = newValue;
        Actions.newFilterWordsList(filter, newValue);
    },

    _saveHiddenElementsListIfNeeded: function(newHiddenElements) {
        var that = this;
        return new BPromise(function(resolve) {
            if(_.difference(hiddenElements, newHiddenElements).length === 0 && _.difference(newHiddenElements, hiddenElements).length === 0) {
                resolve();
            } else {
                hiddenElements = newHiddenElements;
                var dataToSave = {};
                dataToSave[HIDDEN_ELEMENTS_KEY] = hiddenElements;
                that._saveInGoogleSync(dataToSave).then(resolve);
            }
        });
    },

    _saveInGoogleSync: function(data) {
        return new BPromise(function(resolve) {
            chrome.storage.sync.set(data, function() {
                resolve();
            });
        });
    },


    /**
     *
     * @param {object} changes
     * @param {string} areaName
     * @private
     */
    _onGoogleSyncChanged: function(changes, areaName) {
        if(areaName === 'sync') {
            if(changes.hasOwnProperty(HIDDEN_ELEMENTS_KEY)) {
                this._onHiddenElementsChanged(changes[HIDDEN_ELEMENTS_KEY].newValue);
            }
            var that = this;
            AVAILABLE_FILTERS.forEach(function(filterName) {
                var filterKey = getFilterKey(filterName);
                if(changes.hasOwnProperty(filterKey)) {
                    that._onFilterChanged(filterName, changes[filterKey].newValue);
                }
            });
        }
    },

    _onHiddenElementsChanged: function(hiddenElements) {
        hiddenElements = hiddenElements;
        Actions.hiddenElementsListChanged(hiddenElements);
    }


};