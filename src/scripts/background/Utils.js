'use strict';

module.exports =  {
    updatePage: function() {
        this.execOnTwitterTabs(function (tab) {
            chrome.tabs.reload(tab.id);
        });
    },

    execOnTwitterTabs: function(cb) {
        chrome.tabs.query({url: '*://*.twitter.com'}, function(tabs) {
            tabs.forEach(function(tab) {
                cb(tab);
            });
        });
    }
};