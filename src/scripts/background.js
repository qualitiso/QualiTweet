(function() {
    'use strict';

    var filterStore = require('./filterStore'),
        FilterModel = require('./FilterModel');

    chrome.runtime.onInstalled.addListener(function() {
        var menuItems = [
            {
                'title': chrome.i18n.getMessage( 'mettre_en_evidence'),
                'contexts': ['selection'],
                'id': FilterModel.filterNames.highlighted,
                'onclick': addFilter
            },
            {
                'title': chrome.i18n.getMessage( 'rendre_discret'),
                'contexts': ['selection'],
                'id': FilterModel.filterNames.muted,
                'onclick': addFilter
            },
            {
                'title': chrome.i18n.getMessage( 'masquer'),
                'contexts': ['selection'],
                'id': FilterModel.filterNames.hidden,
                'onclick': addFilter
            },
            {
                'title': 'Séparateur',
                'contexts': ['selection'],
                'type': 'separator'
            },
            {
                'title': chrome.i18n.getMessage( 'reglages'),
                'contexts': ['all'],
                'onclick': displaySettingsMenu
            },
            {
                'title': 'Séparateur',
                'contexts': ['selection'],
                'type': 'separator'
            },
            {
                'title': chrome.i18n.getMessage( 'recherche_twitter'),
                'contexts': ['selection'],
                'onclick': searchOnTwitter
            }
        ];

        menuItems.forEach(function(menuItem) {
            chrome.contextMenus.create(menuItem);
        });

        execOnTwitterTabs(function (tab) {
            chrome.tabs.executeScript(tab.id, {
                file: 'scripts/filters.js'
            });
        });
    });

    function execOnTwitterTabs(cb) {
        chrome.tabs.query({url: '*://*.twitter.com'}, function(tabs) {
            tabs.forEach(function(tab) {
                cb(tab);
            });
        });
    }

    function displaySettingsMenu() {
        window.open('html/menu.html', 'QualiTweet', 'height=600, width=290, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    }

    function searchOnTwitter(info) {
        window.open('http://twitter.com/search?q='+info.selectionText);
    }

    function addFilter(info) {
        var filter = info.selectionText.trim();
        var filterType = info.menuItemId;

        console.log('add filter', filterType, filter);

        if(filterStore.addFilter(filterType, filter)) {
            updatePage();
        }
    }

    function updatePage() {
        execOnTwitterTabs(function (tab) {
            chrome.tabs.reload(tab.id);
        });
    }
}());
