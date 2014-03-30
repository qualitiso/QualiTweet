'use strict';

window.onload = function() {
    var MenuPresenter = require('./MenuPresenter');
    new MenuPresenter().init();

    require('./i18nService').init();
};