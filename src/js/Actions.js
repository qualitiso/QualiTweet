var AppDispatcher = require('./AppDispatcher');
var Constants = require('./Constants');
var Actions = {
    hiddenElementsListChanged: function (hiddenElements) {
        AppDispatcher.handleViewAction({
            actionType: Constants.HIDDEN_ELEMENTS_LIST_CHANGED,
            hiddenElements: hiddenElements
        });
    },
    newFilterWordsList: function(category, words) {
        AppDispatcher.handleViewAction({
            actionType: Constants.NEW_FILTER_WORDS_LIST,
            category: category,
            words: words
        });
    },
    createFilterWord: function(category, word) {
        AppDispatcher.handleViewAction({
            actionType: Constants.CREATE_FILTER_WORD,
            category: category,
            word: word.trim()
        });
    },
    deleteFilterWord: function(category, word) {
        AppDispatcher.handleViewAction({
            actionType: Constants.DELETE_FILTER_WORD,
            category: category,
            word: word
        });
    }
};
module.exports = Actions;