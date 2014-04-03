/* jshint maxcomplexity: 8 */
/* jshint maxdepth: 3 */
/* jshint maxstatements: 12 */
'use strict';

var $ = require('jquery'),
    Promise = require('bluebird');

var FilterModel = require('./../filter/FilterModel'),
    msgTypes = require('../background/MessageService').types,
    utils = require('./utils');

var sommeIdTweetsLast = null;

module.exports = {
    applyAll: function () {

        // - sommeIdTweets utilisé pour détecter une maj des tweets
        var sommeIdTweets = 0;
        $('.content-main .tweet').each(function () {
            sommeIdTweets = sommeIdTweets + parseInt($(this).attr('data-tweet-id'));
        });

        // - En cas de nouveau tweet
        if (sommeIdTweetsLast !== sommeIdTweets) {

            var filterName;
            for (filterName in FilterModel.filterNames) {
                getFilterValue(filterName)
                    .then(applyFilter);
            }

            sommeIdTweetsLast = sommeIdTweets;
        }
    }
};

function getFilterValue(filterName) {
    return utils.getValue(msgTypes.filter, filterName);
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
