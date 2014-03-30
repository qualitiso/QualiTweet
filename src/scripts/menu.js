'use strict';

window.onload = function() {
    var MenuPresenter = require('./menu/MenuPresenter');
    new MenuPresenter().init();

    require('./i18nService').init();
};