'use strict';

var FilterStore = require('../filter/FilterStore'),
    Utils = require('./Utils');

module.exports = {
    init: function() {

        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
            switch(request.method ) {
            case 'rafraichiToi':
                window.alert(chrome.i18n.getMessage('alerte_changements'));
                Utils.updatePage();
                sendResponse({});
                break;
            case 'filter':
                sendResponse({data: FilterStore.getFilter(request.filter)});
                break;
            case 'option':
                sendResponse({data: FilterStore.getOption(request.option)});
                break;
            default:
                sendResponse({});
            }
        });
    }
};
