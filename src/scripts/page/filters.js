/* jshint maxcomplexity: 8 */
/* jshint maxdepth: 3 */
/* jshint maxstatements: 16 */
'use strict';

var $ = require('jquery'),
    Promise = require('bluebird');

var FilterModel = require('./../filter/FilterModel'),
    msgTypes = require('../background/MessageService').types;

var sommeIdTweetsLast = null;

document.addEventListener('DOMNodeInserted', function() {
    applyAllOptions();
    applyAllFilters();
}, false);

// --- Misc ---- //

function getValue(method, name) {
    return new Promise(function(resolve) {
        chrome.runtime.sendMessage({
            method: method,
            name: name
        }, function(response) {
            resolve({name: name, value: response.data});
        });
    });
}

// ---- Filters ---- //


function applyAllFilters() {

    // - sommeIdTweets utilisé pour détecter une maj des tweets
    var sommeIdTweets = 0;
    $('.content-main .tweet').each(function() {
        sommeIdTweets = sommeIdTweets + parseInt($(this).attr('data-tweet-id'));
    });

    // - En cas de nouveau tweet
    if (sommeIdTweetsLast !== sommeIdTweets) {

        var filterName;
        for(filterName in FilterModel.filterNames) {
            getFilterValue(filterName)
                .then(applyFilter);
        }

        sommeIdTweetsLast = sommeIdTweets;
    }
}

function getFilterValue(filterName) {
    return getValue(msgTypes.filter, filterName);
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


// ---- Options ---- //

function applyAllOptions() {

    getOptionValue(FilterModel.optionNames.hideTrends)
        .then(function(option) {
            applyOption('.trends-inner', option.value);
        });

    getOptionValue(FilterModel.optionNames.hideSuggest)
        .then(function(option) {
            applyOption('.wtf-module.has-content', option.value);
        });

    getOptionValue(FilterModel.optionNames.hideFooter)
        .then(function(option) {
            applyOption('.Footer.module', option.value);
        });

    getOptionValue(FilterModel.optionNames.hideTweetButton)
        .then(function(option) {
            applyOption('#global-new-tweet-button', option.value);
        });
}

function getOptionValue(optionName) {
    return getValue(msgTypes.option, optionName);
}

function applyOption(selector, shallHide) {
    if (shallHide) {
        $(selector).css('display', 'none');
    }
    else {
        $(selector).css('display', 'block');
    }
}

