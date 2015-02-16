var objectAssign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var AppDispatcher = require('./../AppDispatcher');
var Constants = require('./../Constants');

var CHANGE_EVENT = 'change';

var hiddenElements = [];

var PreferencesStore = objectAssign(EventEmitter.prototype, {

    // Getters & Setters

    getHiddenElements: function() {
        return hiddenElements;
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

        switch (action.actionType) {
            case Constants.HIDDEN_ELEMENTS_LIST_CHANGED:
                hiddenElements = action.hiddenElements;
                PreferencesStore.emitChange();
                break;
            case Constants.FILTER_TERMS_CHANGED:
                PreferencesStore.emitChange();
                break;
        }
        return true;
    })
});

module.exports = PreferencesStore;