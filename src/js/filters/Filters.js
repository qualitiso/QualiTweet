var PreferencesStore = require('../menu/PreferencesStore');
var _ = require('lodash');

var hiddableElements = {
    'hide-tweet': '.js-global-new-tweet',
    'hide-trends' : '.module.trends',
    'hide-promoted' : '.promoted-trend,.promoted-tweet',
    'hide-suggest' : '.wtf-module',
    'hide-footer' : '.Footer'
};

NodeList.prototype.forEach = Array.prototype.forEach;
NodeList.prototype.map = Array.prototype.map;

module.exports = {

    init: function() {
        PreferencesStore.addChangeListener(this.applyFilters.bind(this));
    },

    applyFilters: function() {
        this.applyHideElementsFilters();
        this._applyTweetFilters();
    },

    applyWordFilterOnTweet: function(tweet) {
        this._applyOnTweets([tweet]);
    },

    // ----- Tweet filters ----- //

    _applyTweetFilters: function() {
        var allTweets = document.querySelectorAll('.js-tweet,.original-tweet');
        this._applyOnTweets(allTweets);
    },

    _applyOnTweets: function(tweets) {

        var highlightedWords = PreferencesStore.getWordsForFilterCategory('highlighted');
        var mutedWords = PreferencesStore.getWordsForFilterCategory('muted');
        var hiddenWords = PreferencesStore.getWordsForFilterCategory('hidden');

        if(highlightedWords.length > 0 || mutedWords.length > 0 || hiddenWords.length > 0) {

            var regExpHighlighted = new RegExp(highlightedWords.join("|"), 'i');
            var regExpMuted = new RegExp(mutedWords.join("|"), 'i');
            var regExpExpHidden = new RegExp(hiddenWords.join("|"), 'i');

            Array.prototype.forEach.call(tweets, function(tweet) {
                var screenname = '@'+tweet.dataset.screenName;

                var text = tweet.querySelector('.js-tweet-text').childNodes.map(function(childNode) {
                    return childNode.textContent.trim();
                }).join(' ').trim();

                var $retweet = tweet.querySelector('.js-retweet-text .js-user-profile-link');
                var retweet = $retweet !== null ? ('@'+$retweet.getAttribute('href').substring(1)) : '';

                tweet.classList.remove('qualitweet-highlighted');
                tweet.classList.remove('qualitweet-muted');
                tweet.classList.remove('qualitweet-hidden');

                var textToAnalyse = screenname+' '+text+' '+retweet;

                if(highlightedWords.length > 0 && regExpHighlighted.test(textToAnalyse)) {
                    tweet.classList.add('qualitweet-highlighted');
                } else if(mutedWords.length > 0 && regExpMuted.test(textToAnalyse)) {
                    tweet.classList.add('qualitweet-muted');
                } else if(hiddenWords.length > 0 && regExpExpHidden.test(textToAnalyse)) {
                    tweet.classList.add('qualitweet-hidden');
                }
            });
        }
    },

    // ----- Hidden elements ----- //

    applyHideElementsFilters: function() {
        var appliedFilters = PreferencesStore.getHiddenElements();
        var nonAppliedFilters = _.difference(_.keys(hiddableElements), appliedFilters);

        this._hideElements(this._getElementsMatchingFilters(appliedFilters));
        this._showElements(this._getElementsMatchingFilters(nonAppliedFilters));
    },

    _getElementsMatchingFilters: function(filters) {
        if(filters.length > 0) {
            var selectorToHide = filters.map(function(filter) {
                return hiddableElements[filter];
            }).reduce(function(previous, current) {
                return previous+','+current;
            });
            return document.querySelectorAll(selectorToHide);
        } else {
            return [];
        }
    },

    _hideElements: function(elements) {
        elements.forEach(function(element) {element.style.display = 'none';});
    },

    _showElements: function(elements) {
        elements.forEach(function(element) {element.style.display = 'block';});
    }
};