var _ = require('lodash');
var BPromise = require('bluebird');

var HIDDEN_ELEMENTS_KEY = 'hidden-elements';

var HIDDEN_TERMS = 'hidden-terms';
var MUTED_TERMS = 'muted-terms';
var HIGHLIGHTED_TERMS = 'highlighted-terms';

var PreferencesStore = require('../menu/PreferencesStore');
var Actions = require('../Actions');

module.exports = {

    hiddenElements: [],

    hiddenTerms: [],
    mutedTerms: [],
    highlightedTerms: [],

    init: function() {

        var that = this;

        return new BPromise(function(resolve) {
            try {
                chrome.storage.onChanged.addListener(that._onGoogleSyncChanged.bind(that));
                chrome.storage.sync.get(null, function(items) {
                    that._onHiddenElementsChanged(items[HIDDEN_ELEMENTS_KEY] || []);
                    PreferencesStore.addChangeListener(that._onStoreChange.bind(that));
                    /*that.hiddenTerms = items[HIDDEN_TERMS] || [];
                    that.mutedTerms = items[MUTED_TERMS] || [];
                    that.highlightedTerms = items[HIGHLIGHTED_TERMS] || [];
                    */
                    resolve();
                });
            } catch(e) {
                reject(e);
            }
        });
    },

    _onStoreChange: function() {
        this._saveHiddenElementsListIfNeeded(PreferencesStore.getHiddenElements());
    },

    // Read

    getHiddenElements: function() {
        return this.hiddenElements;
    },

    // Write

    _saveHiddenElementsListIfNeeded: function(newHiddenElements) {
        var that = this;
        return new BPromise(function(resolve) {
            if(_.difference(that.hiddenElements, newHiddenElements).length === 0 && _.difference(newHiddenElements, that.hiddenElements).length === 0) {
                resolve();
            } else {
                that.hiddenElements = newHiddenElements;
                var dataToSave = {};
                dataToSave[HIDDEN_ELEMENTS_KEY] = that.hiddenElements;
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
        // TODO Send action
    },

    _onHiddenElementsChanged: function(hiddenElements) {
        Actions.hiddenElementsListChanged(hiddenElements);
    }


};