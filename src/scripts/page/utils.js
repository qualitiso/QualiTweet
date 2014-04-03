'use strict';

var Promise = require('bluebird');

module.exports = {
    getValue: function(method, name) {
        return new Promise(function(resolve) {
            chrome.runtime.sendMessage({
                method: method,
                name: name
            }, function(response) {
                resolve({name: name, value: response.data});
            });
        });
    }
};