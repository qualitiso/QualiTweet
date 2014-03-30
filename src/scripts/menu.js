'use strict';

window.onload = function() {
    var MenuPresenter = require('./menu/menuPresenter');
    new MenuPresenter().init();

    require('./menu/i18nService').init();
};