require('./services/PreferencesService')
    .init()
    .then(function() {
        require('./filters/Filters').init();
    });

