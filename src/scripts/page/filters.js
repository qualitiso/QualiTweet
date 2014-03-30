/* jshint maxcomplexity: 8 */
/* jshint maxdepth: 3 */
/* jshint maxstatements: 16 */
'use strict';

var FilterModel = require('./../filter/FilterModel');
var sommeIdTweetsLast = null;

function appliqueUnFiltre(filterName) {

    var typeDeCSS;

    switch(filterName) {
    case FilterModel.filterNames.hidden:
        typeDeCSS = 'tweet_masque';
        break;
    case FilterModel.filterNames.highlighted:
        typeDeCSS = 'tweet_mis_en_evidence';
        break;
    case FilterModel.filterNames.muted:
        typeDeCSS = 'tweet_discret';
        break;
    }

    chrome.runtime.sendMessage({
        method: 'filter',
        filter: filterName
    }, function(response) {

        var listeDesFiltres = response.data;

        if (!listeDesFiltres || listeDesFiltres.length === 0) {
            listeDesFiltres = [];
        }
        else {
            listeDesFiltres = JSON.parse(listeDesFiltres);
        }

        $('body').find('.content-main .tweet').each(function() {

            var pseudo = $(this).data('screen-name');
            var tweet = $.trim($(this).find('.js-tweet-text').text());
            var contexte = $.trim($(this).find('.context').text());


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

        appliqueUnFiltre('filtreDiscret');
        appliqueUnFiltre('filtreEvidence');
        appliqueUnFiltre('filtreCache');

        sommeIdTweetsLast = sommeIdTweets;
    }
}

function menageDansLaPageTwitter(majForcee) {

    // - Regarde si l'on vire ou non
    //La lecture des états déconne, des fois le truc à virer est affiché très brièvement
    chrome.runtime.sendMessage({
        method: 'getVireTendanceState'
    }, function(response) {
        var vireTendanceState = response.data; //'oui' ou 'non'
        if (vireTendanceState !== 'oui') {
            vireTendanceState = 'non';
        }


        chrome.runtime.sendMessage({
            method: 'getVireSuggestionState'
        }, function(response) {
            var vireSuggestionState = response.data;
            if (vireSuggestionState !== 'oui') {
                vireSuggestionState = 'non';
            }


            chrome.runtime.sendMessage({
                method: 'getVireFooterState'
            }, function(response) {
                var vireFooterState = response.data;
                if (vireFooterState !== 'oui') {
                    vireFooterState = 'non';
                }


                chrome.runtime.sendMessage({
                    method: 'getVireBoutonTweeterState'
                }, function(response) {
                    var vireBoutonTweeterState = response.data;
                    if (vireBoutonTweeterState !== 'oui') {
                        vireBoutonTweeterState = 'non';
                    }

                    // - Vire les TENDANCES
                    if (vireTendanceState === 'oui') {
                        $('.trends-inner').css('display', 'none');
                    }
                    else {
                        $('.trends-inner').css('display', 'block');
                    }

                    // - Vire les suggestions
                    if (vireSuggestionState === 'oui') {
                        $('.wtf-module.has-content').css('display', 'none');
                    }
                    else {
                        $('.wtf-module.has-content').css('display', 'block');
                    }

                    // - Vire le footer de twitter
                    if (vireFooterState === 'oui') {
                        $('.Footer.module').css('display', 'none');
                    }
                    else {
                        $('.wtf-module.has-content').css('display', 'block');
                    }

                    // - Vire le bouton pour twitter
                    if (vireBoutonTweeterState === 'oui') {
                        $('#global-new-tweet-button').css('display', 'none');
                    }
                    else {
                        $('.wtf-module.has-content').css('display', 'block');
                    }


                    filtreLesTweets(majForcee);
                });
            });
        });
    });
}


function majInterfaceTwitter(majForcee) {
    menageDansLaPageTwitter(majForcee);
}

// - Changement de la page HTML => maj de l' IHM
document.addEventListener('DOMNodeInserted', function() {
    majInterfaceTwitter();
}, false);