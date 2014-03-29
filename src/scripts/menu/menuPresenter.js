'use strict';

var MenuView = require('./menuView'),
    filterStore = require('../filterStore');

function MenuPresenter() {
    this.menuView = new MenuView(this);
}

MenuPresenter.prototype.init = function() {
    this.menuView.render();
};

MenuPresenter.prototype.onOptionToggle = function (optionName) {
    filterStore.toggleOption(optionName);
    this.menuView.optionChanged(optionName, filterStore.getOption(optionName));
};

MenuPresenter.prototype.onFilterDelete = function (filter, value) {
    if(filterStore.deleteFilter(filter, value)) {
        this.menuView.displayCurrentFilterValues();
    }
};

module.exports = MenuPresenter;