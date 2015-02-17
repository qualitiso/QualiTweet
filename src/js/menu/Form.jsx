/* jshint ignore:start */
var React = require('react');
var HideElementsCommands = require('./HideElementsCommands.jsx');
var EditFilters = require('./EditFilters.jsx');

var Form = React.createClass({

    propTypes: {
        hiddenElements: React.PropTypes.array.isRequired,
        highlightedWords: React.PropTypes.array.isRequired,
        mutedWords: React.PropTypes.array.isRequired,
        hiddenWords: React.PropTypes.array.isRequired
    },

    render: function() {
        return (<div>
            <HideElementsCommands hiddenElements={this.props.hiddenElements}/>
            <EditFilters
                highlightedWords={this.props.highlightedWords}
                mutedWords={this.props.mutedWords}
                hiddenWords={this.props.hiddenWords}/>
        </div>);
    }
});

module.exports = Form;