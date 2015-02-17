var AppDispatcher = require('./AppDispatcher');
var Constants = require('./Constants');
var Actions = {
    hiddenElementsListChanged: function (hiddenElements) {
        AppDispatcher.handleViewAction({
            actionType: Constants.HIDDEN_ELEMENTS_LIST_CHANGED,
            hiddenElements: hiddenElements
        });
    },
    filterTermsChanged: function (category, terms) {
        AppDispatcher.handleViewAction({
            actionType: Constants.FILTER_TERMS_CHANGED,
            category: category,
            terms: terms
        });
    },
    createFilterWord: function(category, word) {
        AppDispatcher.handleViewAction({
            actionType: Constants.CREATE_FILTER_WORD,
            category: category,
            word: word
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