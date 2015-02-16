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
    }
};
module.exports = Actions;