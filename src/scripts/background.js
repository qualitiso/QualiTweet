chrome.runtime.onInstalled.addListener(function() {

    'use strict';

    var menuItems = [
        {
            'title': 'Gérer les filtres',
            'contexts': ['all'],
            'id': 'menuReglages'
        },
        {
            'title': 'Mettre en évidence',
            'contexts': ['selection'],
            'id': 'menuAjoutFiltreEvidence'
        },
        {
            'title': 'Rendre discret',
            'contexts': ['selection'],
            'id': 'menuAjoutFiltreDiscret'
        },
        {
            'title': 'Masquer',
            'contexts': ['selection'],
            'id': 'menuAjoutFiltreCache'
        },
        {
            'title': 'Rechercher sur twitter',
            'contexts': ['selection'],
            'id': 'menuRechercherSurTwitter'
        }
    ];

    menuItems.forEach(function(menuItem) {
        chrome.contextMenus.create(menuItem);
    });

    //Charge les scripts uniquement sur twitter
    chrome.tabs.getAllInWindow(null, function(tabs) {
        tabs.forEach(function(tab) {

            if (tab.url.indexOf('twitter.com') > -1) {

                chrome.tabs.executeScript(tab.id, {
                    file: 'filters.js'
                });
            }

        });
    });
});