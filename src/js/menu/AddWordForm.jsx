/* jshint ignore:start */
var React = require('react');
var Actions = require('../Actions');

var AddWordFrom = React.createClass({

    propTypes: {
        filterCategory: React.PropTypes.string.isRequired
    },

    render: function () {

        return (
            <div>
                <div>{chrome.i18n.getMessage('ajout_filtre')}</div>
                <form onSubmit={this._addWordToFilter} className="form-inline">
                    <div className="form-group">
                        <input ref="wordInput" className="form-control" type="text" placeholder="@name or #tag or text" />
                    </div>
                    <button className="btn btn-success" type="submit" data-translate="text">{chrome.i18n.getMessage('ajouter')}</button>
                </form>
            </div>);
    },

    _addWordToFilter: function (e) {
        // TODO
        e.preventDefault();
        var word = this.refs.wordInput.getDOMNode().value;
        this.refs.wordInput.getDOMNode().value = '';
        Actions.createFilterWord(this.props.filterCategory, word);
    }
});

module.exports = AddWordFrom;