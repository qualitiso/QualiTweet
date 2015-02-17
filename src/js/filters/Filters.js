var PreferencesStore = require('../menu/PreferencesStore');
var _ = require('lodash');

var hiddableElements = {
    'hide-trends' : '.module.trends',
    'hide-promoted' : '.promoted-trend,.promoted-tweet',
    'hide-suggest' : '.wtf-module',
    'hide-footer' : '.Footer'
};

module.exports = {

    init: function() {
        PreferencesStore.addChangeListener(this.applyFilters.bind(this));
    },

    applyFilters: function() {
        this._applyHideElementsFilters();
        this._applyTweetFilters();
    },

    // ----- Tweet filters ----- //

    _applyTweetFilters: function() {
        var mutedWords = PreferencesStore.getWordsForFilterCategory('muted');
        if(mutedWords.length > 0) {
            var mutedWordsRegExp = new RegExp(mutedWords.join("|"), 'i');

            Array.prototype.forEach.call(document.querySelectorAll('.content-main .tweet'), function(tweet) {
                //var screenname = tweet.dataset.screenName;
                var text = tweet.querySelector('.js-tweet-text').firstChild.textContent;
                //var context = tweet.querySelector('.context').firstChild;
                if(mutedWordsRegExp.test(text)) {
                    tweet.classList.add('qualitweet-muted');
                } else {
                    tweet.classList.remove('qualitweet-muted');
                }
            });
        }
    },



    // ----- Hidden elements ----- //

    _applyHideElementsFilters: function() {
        var appliedFilters = PreferencesStore.getHiddenElements();
        var nonAppliedFilters = _.difference(_.keys(hiddableElements), appliedFilters);

        this._hideElements(this._getElementsMatchingFilters(appliedFilters));
        this._showElements(this._getElementsMatchingFilters(nonAppliedFilters));
    },

    _getElementsMatchingFilters: function(filters) {
        var selectorToHide = filters.map(function(filter) {
            return hiddableElements[filter];
        }).reduce(function(previous, current) {
            return previous+','+current;
        });
        return document.querySelectorAll(selectorToHide);
    },

    _hideElements: function(elements) {
        Array.prototype.forEach.call(elements, function(element) {element.style.display = 'none';});
    },

    _showElements: function(elements) {
        Array.prototype.forEach.call(elements, function(element) {element.style.display = 'block';});
    }
};