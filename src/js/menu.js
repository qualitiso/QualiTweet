/* jshint ignore:start */
var React = require('react');
var Menu = require('./menu/Menu.jsx');

window.React = React;

window.onload = function() {
    require('./services/PreferencesService')
        .init()
        .then(function() {
            React.render(
                <Menu/>,
                document.getElementById('root')
            );
        })
        .catch(function(e) {
            console.log('Can\'t init',e);
        });

};