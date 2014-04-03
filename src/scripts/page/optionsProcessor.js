'use strict';

var $ = require('jquery'),
    Promise = require('bluebird');

var FilterModel = require('./../filter/FilterModel'),
    msgTypes = require('../background/MessageService').types,
    utils = require('./utils');

module.exports = {
    applyAll: function() {
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
};



function getOptionValue(optionName) {
    return utils.getValue(msgTypes.option, optionName);
}

function applyOption(selector, shallHide) {
    if (shallHide) {
        $(selector).css('display', 'none');
    }
    else {
        $(selector).css('display', 'block');
    }
}
