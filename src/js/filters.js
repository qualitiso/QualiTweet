require('./services/PreferencesService')
    .init(function() {
        require('./filters/Filters').init();
    });

