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
                <Form
                    hiddenElements={this.state.hiddenElements}
                    highlightedWords={this.state.highlightedWords}
                    mutedWords={this.state.mutedWords}
                    hiddenWords={this.state.hiddenWords}
                />
            </div>
        );
    },

    _onStoreChange: function() {
        this.setState(this._getState());
    },

    _getState: function() {
        return {
            hiddenElements: PreferencesStore.getHiddenElements(),
            highlightedWords: PreferencesStore.getWordsForFilterCategory('highlighted'),
            mutedWords: PreferencesStore.getWordsForFilterCategory('muted'),
            hiddenWords:PreferencesStore.getWordsForFilterCategory('hidden')
        };
    }
});

module.exports = Menu;