/* jshint ignore:start */
var React = require('react');
var HideElementsCommands = require('./HideElementsCommands.jsx');
var EditFilters = require('./EditFilters.jsx');

var Form = React.createClass({

    propTypes: {
        hiddenElements: React.PropTypes.array.isRequired
    },

    render: function() {
        return (<div>
            <HideElementsCommands hiddenElements={this.props.hiddenElements}/>
            <EditFilters/>
        </div>);
    }
});

module.exports = Form;