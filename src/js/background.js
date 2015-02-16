(function() {
    'use strict';
    require('./background/InstallServices').init();
    require('./services/PreferencesService')
        .init()
        .then(function() {
            require('./background/Background').init();
        });

})();