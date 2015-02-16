var PreferencesStore = require('../menu/PreferencesStore');

module.exports = {
    init: function() {
        PreferencesStore.addChangeListener(this._onStoreChange);
    },

    _onStoreChange: function() {
        console.log('hidden elements',PreferencesStore.getHiddenElements());
    }
};