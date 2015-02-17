/* jshint ignore:start */
var React = require('react');
var Menu = require('./menu/Menu.jsx');

window.React = React;

window.onload = function() {
    if(document.getElementById('qualitweet-root') !== null) {
        require('./services/PreferencesService')
            .init()
            .then(function() {
                React.render(
                    <Menu/>,
                    document.getElementById('qualitweet-root')
                );
            })
            .catch(function(e) {
                console.log('Can\'t init',e);
            });
    }
};