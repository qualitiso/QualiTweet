/* jshint maxcomplexity: 8 */
/* jshint maxdepth: 3 */
/* jshint maxstatements: 16 */
'use strict';

var $ = require('jquery'),
    Promise = require('bluebird');

var FilterModel = require('./../filter/FilterModel'),
    msgTypes = require('../background/MessageService').types;

var sommeIdTweetsLast = null;

function getFilterValue(filterName) {
    return new Promise(function(resolve) {
        chrome.runtime.sendMessage({
            method: msgTypes.filter,
            filter: filterName
        }, function(response) {
            resolve({name: filterName, value: response.data});
        });
    });
}

function getOptionValue(optionName) {
    return new Promise(function(resolve) {
        chrome.runtime.sendMessage({
            method: msgTypes.option,
            filter: optionName
        }, function(response) {
            resolve({name: optionName, value: response.data});
        });
    });
}

function applyFilter(filter) {

    var typeDeCSS;

    switch(filter.name) {
        case FilterModel.filterNames.hidden:
            typeDeCSS = 'tweet-masque';
            break;
        case FilterModel.filterNames.highlighted:
            typeDeCSS = 'tweet-mis-en-evidence';
            break;
        case FilterModel.filterNames.muted:
            typeDeCSS = 'tweet-discret';
            break;
    }

    $('body').find('.content-main .tweet').each(function() {

        var pseudo = $(this).data('screen-name');
        var tweet = $.trim($(this).find('.js-tweet-text').text());
        var contexte = $.trim($(this).find('.context').text());

        var listeDesFiltres = filter.value;

        for (var i in listeDesFiltres) {

            if (listeDesFiltres[i].substr(0, 1) === '@') {

                if (pseudo.toLowerCase() === listeDesFiltres[i].replace('@', '').toLowerCase()) {
                    $(this).addClass(typeDeCSS);
                }
                else if (!$(this).hasClass(typeDeCSS)) {
                    $(this).removeClass(typeDeCSS);
                }

            } else {

                if (new RegExp('(^|\\W)#?' + listeDesFiltres[i] + '($|\\W)', 'gi').test(tweet) || new RegExp('(^|\\W)#?' + listeDesFiltres[i] + '($|\\W)', 'gi').test(contexte)) {
                    $(this).addClass(typeDeCSS);
                }
                else if(!$(this).hasClass(typeDeCSS)) {
                    $(this).removeClass(typeDeCSS);
                }
            }
        }
    });
}

function filtreLesTweets(majForcee) {

    // - sommeIdTweets utilisé pour détecter une maj des tweets
    var sommeIdTweets = 0;
    $('.content-main .tweet').each(function() {
        sommeIdTweets = sommeIdTweets + parseInt($(this).attr('data-tweet-id'));
    });

    // - En cas de nouveau tweet
    if (sommeIdTweetsLast !== sommeIdTweets || majForcee) {

        var filterName;
        for(filterName in FilterModel.filterNames) {
            getFilterValue(filterName)
                .then(applyFilter);
        }

        sommeIdTweetsLast = sommeIdTweets;
    }
}

function updateElementDisplay(selector, shallHide) {
    if (shallHide) {
        $(selector).css('display', 'none');
    }
    else {
        $(selector).css('display', 'block');
    }
}

function menageDansLaPageTwitter(majForcee) {

    getOptionValue(FilterModel.optionNames.hideTrends)
        .then(function(shallHide) {
            updateElementDisplay('.trends-inner', shallHide);
        });

    getOptionValue(FilterModel.optionNames.hideSuggest)
        .then(function(shallHide) {
            updateElementDisplay('.wtf-module.has-content', shallHide);
        });

    getOptionValue(FilterModel.optionNames.hideFooter)
        .then(function(shallHide) {
            updateElementDisplay('.Footer.module', shallHide);
        });

    getOptionValue(FilterModel.optionNames.hideTweetButton)
        .then(function(shallHide) {
            updateElementDisplay('#global-new-tweet-button', shallHide);
        });

    filtreLesTweets();
}


function majInterfaceTwitter(majForcee) {
    menageDansLaPageTwitter(majForcee);
}

// - Changement de la page HTML => maj de l' IHM
document.addEventListener('DOMNodeInserted', function() {
    majInterfaceTwitter();
}, false);