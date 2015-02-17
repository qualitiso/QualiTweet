var _ = require('lodash');
var BPromise = require('bluebird');

var HIDDEN_ELEMENTS_KEY = 'hidden-elements';

var HIDDEN_TERMS = 'hidden-terms';
var MUTED_WORDS = 'muted-terms';
var HIGHLIGHTED_TERMS = 'highlighted-terms';

var PreferencesStore = require('../menu/PreferencesStore');
var Actions = require('../Actions');

var hiddenElements = [];
var hiddenTerms = [];
var mutedWords = [];
var highlightedTerms = [];

module.exports = {

    init: function() {

        var that = this;

        return new BPromise(function(resolve) {
            try {
                chrome.storage.onChanged.addListener(that._onGoogleSyncChanged.bind(that));
                chrome.storage.sync.get(null, function(items) {
                    that._onHiddenElementsChanged(items[HIDDEN_ELEMENTS_KEY] || []);
                    that._onMutedWordsChanged(items[MUTED_WORDS] || []);
                    PreferencesStore.addChangeListener(that._onStoreChange.bind(that));
                    resolve();
                });
            } catch(e) {
                reject(e);
            }
        });
    },

    _onStoreChange: function() {
        this._saveHiddenElementsListIfNeeded(PreferencesStore.getHiddenElements());
        this._saveMutedWordsIfNeeded(PreferencesStore.getWordsForFilterCategory('muted'));
    },

    // Read

    getHiddenElements: function() {
        return this.hiddenElements;
    },

    // Write

    _saveMutedWordsIfNeeded: function(newMutedWords) {
        var that = this;
        return new BPromise(function(resolve) {
            if(_.difference(mutedWords, newMutedWords).length === 0 && _.difference(newMutedWords, mutedWords).length === 0) {
                resolve();
            } else {
                mutedWords = newMutedWords;
                var dataToSave = {};
                dataToSave[MUTED_WORDS] = mutedWords;
                that._saveInGoogleSync(dataToSave).then(resolve);
            }
        });
    },

    _onMutedWordsChanged: function(newMutedWords) {
        mutedWords = newMutedWords;
        Actions.newFilterWordsList('muted', mutedWords);
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
            } else if(changes.hasOwnProperty(MUTED_WORDS)) {
                this._onMutedWordsChanged(changes[MUTED_WORDS].newValue);
            }
        }
    },

    _onHiddenElementsChanged: function(hiddenElements) {
        hiddenElements = hiddenElements;
        Actions.hiddenElementsListChanged(hiddenElements);
    }


};