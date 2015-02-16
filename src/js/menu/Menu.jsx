/* jshint ignore:start */
var React = require('react');
var Header = require('./Header.jsx');
var Form = require('./Form.jsx');

var PreferencesStore = require('../menu/PreferencesStore');

var Menu = React.createClass({

    propTypes: {
    },

    getInitialState: function() {
        return this._getState();
    },

    componentDidMount: function() {
        PreferencesStore.addChangeListener(this._onStoreChange);
    },

    componentWillUnmount: function() {
        PreferencesStore.removeChangeListener(this._onStoreChange);
    },

    render: function() {

        return (
            <div>
                <Header/>
                <Form hiddenElements={this.state.hiddenElements} />
            </div>
        );
    },

    _onStoreChange: function() {
        this.setState(this._getState());
    },

    _getState: function() {
        return {
            hiddenElements: PreferencesStore.getHiddenElements()
        };
    }
});

module.exports = Menu;