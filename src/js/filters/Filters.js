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

        var allTweets = document.querySelectorAll('.content-main .tweet');
        var that = this;
        ['muted', 'highlighted', 'hidden'].forEach(function(category) {
            that._applyTweetFiltersForCategory(allTweets, category);
        });
    },

    _applyTweetFiltersForCategory: function(allTweets, category) {
        var words = PreferencesStore.getWordsForFilterCategory(category);
        var regExp = new RegExp(words.join("|"), 'i');

        Array.prototype.forEach.call(allTweets, function(tweet) {
            //var screenname = tweet.dataset.screenName;
            var text = tweet.querySelector('.js-tweet-text').firstChild.textContent;
            //var context = tweet.querySelector('.context').firstChild;
            if(words.length > 0 && regExp.test(text)) {
                tweet.classList.add('qualitweet-'+category);
            } else {
                tweet.classList.remove('qualitweet-'+category);
            }
        });
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