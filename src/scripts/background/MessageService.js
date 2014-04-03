'use strict';

var FilterStore = require('../filter/FilterStore'),
    Utils = require('./Utils');

var listener = {

    init: function() {

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch(request.method ) {
            case types.refreshPage:
                window.alert(chrome.i18n.getMessage('alerte_changements'));
                Utils.updatePage();
                sendResponse({});
                break;
            case types.filter:
                sendResponse({data: FilterStore.getFilter(request.name)});
                break;
            case types.option:
                sendResponse({data: FilterStore.getOption(request.name)});
                break;
            default:
                sendResponse({error: 'unknown method: '+request.method});
            }
        });
    }
};

var types = {
    refreshPage: 'refreshPage',
    filter: 'filter',
    option: 'option'
};

module.exports = {
    types: types,
    listener: listener
};
