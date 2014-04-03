'use strict';

var filtersProcessor = require('./filtersProcessor'),
    optionsProcessor = require('./optionsProcessor');

document.addEventListener('DOMNodeInserted', function() {
    filtersProcessor.applyAll();
    optionsProcessor.applyAll();
}, false);

