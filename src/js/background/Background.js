var Actions = require('../Actions');
var PreferencesService = require('../services/PreferencesService');

module.exports = {
    init: function () {
        PreferencesService.init().then(function() {
            chrome.runtime.onInstalled.addListener(function () {
                var menuItems = [
                    {
                        'title': chrome.i18n.getMessage('mettre_en_evidence'),
                        'contexts': ['selection'],
                        'id': 'highlighted',
                        'onclick': addFilter
                    },
                    {
                        'title': chrome.i18n.getMessage('rendre_discret'),
                        'contexts': ['selection'],
                        'id': 'muted',
                        'onclick': addFilter
                    },
                    {
                        'title': chrome.i18n.getMessage('masquer'),
                        'contexts': ['selection'],
                        'id': 'hidden',
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

                execOnTwitterTabs(function (tab) {
                    chrome.tabs.executeScript(tab.id, {
                        file: 'js/filters-bundle.js'
                    });
                });
            });
        });
    }
};

function execOnTwitterTabs(cb) {
    chrome.tabs.query({url: '*://twitter.com/'}, function(tabs) {
        tabs.forEach(function(tab) {
            cb(tab);
        });
    });
}

function displaySettingsMenu() {
    window.open('html/menu.html', 'QualiTweet', 'height=650, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no');
}

function searchOnTwitter(info) {
    window.open('http://twitter.com/search?q=' + info.selectionText);
}

function addFilter(info) {
    var word = info.selectionText.trim();
    var category = info.menuItemId;
    Actions.createFilterWord(category,word);
}