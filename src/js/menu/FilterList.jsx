/* jshint ignore:start */
var React = require('react');
var Actions = require('../Actions');

var FilterList = React.createClass({

    propTypes: {
        filters: React.PropTypes.array.isRequired,
        filterCategory: React.PropTypes.string.isRequired
    },

    render: function() {

        var words = this.props.filters.map(function(word) {
            return(<div className="word">{word}<div className="delete" onClick={this._deleteFilter.bind(this,word)}></div></div>);
        }.bind(this));

        return (
        <div>
            <div>{chrome.i18n.getMessage('lst_filtres')}</div>
            <div className="form-group">
                <div className="input-group">
                    <div className="words">
                        {words}
                    </div>
                </div>
            </div>
        </div>);
    },

    _deleteFilter: function(word) {
        Actions.deleteFilterWord(this.props.filterCategory, word);
    }
});

module.exports = FilterList;