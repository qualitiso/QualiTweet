var Dispatcher = require('flux').Dispatcher;
var objectAssign = require('object-assign');

module.exports = objectAssign(new Dispatcher(), {

    handleViewAction: function(action) {
        this.dispatch({source: 'VIEW_ACTION', action: action});
    }
});