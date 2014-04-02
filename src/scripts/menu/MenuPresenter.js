'use strict';

var MenuView = require('./MenuView'),
    messageTypes = require('../background/MessageService').types,
    FilterStore = require('../filter/FilterStore');

function MenuPresenter() {
    this.menuView = new MenuView(this);
}

MenuPresenter.prototype.init = function() {
    this.menuView.render();
};

MenuPresenter.prototype.onOptionToggle = function (optionName) {
    FilterStore.toggleOption(optionName);
    this.menuView.optionChanged(optionName, FilterStore.getOption(optionName));
};

MenuPresenter.prototype.onFilterAdd = function(filter, value) {
    if(FilterStore.addFilter(filter, value)) {
        this.menuView.displayCurrentFilterValues();
    }
};

MenuPresenter.prototype.onSave = function() {
    chrome.runtime.sendMessage({method: messageTypes.refreshPage});
    window.close();
};

MenuPresenter.prototype.onFilterDelete = function (filter, value) {
    if(FilterStore.deleteFilter(filter, value)) {
        this.menuView.displayCurrentFilterValues();
    }
};

module.exports = MenuPresenter;