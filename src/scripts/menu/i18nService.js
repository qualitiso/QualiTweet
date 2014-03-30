'use strict';

function translate(selector) {
    var nodes = document.querySelectorAll(selector);
    Array.prototype.forEach.call(nodes, function(node) {
        var key = node.attributes['data-locale'].value;
        var value = chrome.i18n.getMessage(key);
        node.innerHTML = value;
    });
}

module.exports = {
    init: function() {
        translate('*[data-translate=text]');
        translate('*[data-translate=value]');
    }
};
