var _ = require('lodash');
var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('./../AppDispatcher');
var Constants = require('./../Constants');

var CHANGE_EVENT = 'change';

var hiddenElements = [];

var filterWords = {
    'highlighted': [],
    'muted': [],
    'hidden': []
};

function indexInCategory(category, word) {
    return _.findIndex(filterWords[category], function(filter) { return word.toLowerCase() === filter.toLowerCase(); });
}

function addFilterWord(category, word) {
    if(indexInCategory(category, word) === -1) {
        filterWords[category].push(word);
        _.difference(_.keys(filterWords), [category]).forEach(function(cat) { removeFilterWord(cat, word); });
    }
}

function removeFilterWord(category, word) {
    var wordIdx = indexInCategory(category, word);
    if(wordIdx !== -1) {
        filterWords[category].splice(wordIdx, 1);
    }
}

var PreferencesStore = objectAssign(EventEmitter.prototype, {

    // Getters & Setters

    getHiddenElements: function() {
        return hiddenElements;
    },

    getWordsForFilterCategory: function(category) {
        return filterWords[category];
    },

    // Event listener

    emitChange: function () {
        this.emit(CHANGE_EVENT);
    },
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    // On Action

    dispatcherIndex: AppDispatcher.register(function (payload) {
        var action = payload.action;

        var word = action.word;
        var category = action.category;

        switch (action.actionType) {
            case Constants.HIDDEN_ELEMENTS_LIST_CHANGED:
                hiddenElements = action.hiddenElements;
                PreferencesStore.emitChange();
                break;
            case Constants.CREATE_FILTER_WORD:
                addFilterWord(category,word);
                PreferencesStore.emitChange();
                break;
            case Constants.DELETE_FILTER_WORD:
                removeFilterWord(category,word);
                PreferencesStore.emitChange();
                break;
        }
        return true;
    })
});

module.exports = PreferencesStore;