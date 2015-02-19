/* jshint ignore:start */
var React = require('react');
var Menu = require('./menu/Menu.jsx');

window.React = React;

window.onload = function() {
    if(document.getElementById('qualitweet-root') !== null) {
        require('./services/PreferencesService')
            .init(function(error) {
                if(error) {
                    console.error('Can\'t initialize Qualitweet',e);
                } else {
                    React.render(
                        <Menu/>,
                        document.getElementById('qualitweet-root')
                    );
                }
            });
    }
};