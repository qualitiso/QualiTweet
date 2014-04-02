(function() {
    'use strict';

    var FilterStore = require('./../filter/FilterStore'),
        FilterModel = require('./../filter/FilterModel'),
        MessageService = require('./MessageService').service,
        Utils = require('./Utils');

    MessageService.init();

    chrome.runtime.onInstalled.addListener(function () {
        var menuItems = [
            {
                'title': chrome.i18n.getMessage('mettre_en_evidence'),
                'contexts': ['selection'],
                'id': FilterModel.filterNames.highlighted,
                'onclick': addFilter
            },
            {
                'title': chrome.i18n.getMessage('rendre_discret'),
                'contexts': ['selection'],
                'id': FilterModel.filterNames.muted,
                'onclick': addFilter
            },
            {
                'title': chrome.i18n.getMessage('masquer'),
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
                'title': chrome.i18n.getMessage('reglages'),
                'contexts': ['all'],
                'onclick': displaySettingsMenu
            },
            {
                'title': 'Séparateur',
                'contexts': ['selection'],
                'type': 'separator'
            },
            {
                'title': chrome.i18n.getMessage('recherche_twitter'),
                'contexts': ['selection'],
                'onclick': searchOnTwitter
            }
        ];

        menuItems.forEach(function (menuItem) {
            chrome.contextMenus.create(menuItem);
        });

        Utils.execOnTwitterTabs(function (tab) {
            chrome.tabs.executeScript(tab.id, {
                file: 'scripts/filters.js'
            });
        });
    });

    function displaySettingsMenu() {
        window.open('html/menu.html', 'QualiTweet', 'height=650, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
    }

    function searchOnTwitter(info) {
        window.open('http://twitter.com/search?q=' + info.selectionText);
    }

    function addFilter(info) {
        var filter = info.selectionText.trim();
        var filterType = info.menuItemId;

        if (FilterStore.addFilter(filterType, filter)) {
            Utils.updatePage();
        }
    }
})();