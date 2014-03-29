'use strict';

var FilterModel = require('../FilterModel'),
    filterStore = require('../filterStore');

function MenuView(presenter) {
    this.presenter = presenter;
}

MenuView.prototype.render = function() {

    this._initOptions();
    this._initFilters();

    this.displayCurrentFilterValues();
};

MenuView.prototype.optionChanged = function(option) {
    this.$options[option].checked = filterStore.getOption(option);
};

MenuView.prototype._initOptions = function() {
    this.$options = {};

    for(var optionName in FilterModel.optionNames) {
        this.$options[optionName] = document.querySelector('.'+optionName);
        this.$options[optionName].checked = filterStore.getOption(optionName);
        this.$options[optionName].addEventListener('change', this._userChangedOption.bind(this));
    }
};

MenuView.prototype._initFilters = function() {
    this.$filterTypeSelect = document.getElementById('listeTypesFiltres');
    this.$filterTypeSelect.addEventListener('change', this._userChangedFilterSelection.bind(this));
    this.currentFilter = this.$filterTypeSelect.value;

    this.$currentFilterValues = document.getElementById('currentFilterValues');
    this.$currentFilterValues.addEventListener('click', this._onCurrentFilterValuesClick.bind(this));
};

MenuView.prototype._userChangedOption = function(event) {
    var option = event.srcElement.className;
    this.presenter.onOptionToggle(option);
};

MenuView.prototype.displayCurrentFilterValues = function() {
    var child;
    while((child = this.$currentFilterValues.firstChild)) {
        this.$currentFilterValues.removeChild(child);
    }

    filterStore.getFilter(this.currentFilter).forEach(function(value) {
        var $el = document.createElement('div');
        $el.classList.add('word');
        $el.innerHTML = value + '<div class=\'delete\'></div>';
        this.$currentFilterValues.appendChild($el);
    }.bind(this));
};

MenuView.prototype._onCurrentFilterValuesClick = function(e) {
    var target = e.target;
    if(target.classList.contains('delete')) {
        var value = target.parentNode.textContent;
        this.presenter.onFilterDelete(this.currentFilter, value);
    }
};

MenuView.prototype._userChangedFilterSelection = function(event) {
    this.currentFilter = event.srcElement.value;
    this.displayCurrentFilterValues();
};

module.exports = MenuView;
