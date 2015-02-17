/* jshint ignore:start */
var React = require('react');
var Actions = require('../Actions');

var AddWordFrom = React.createClass({

    propTypes: {
        filterCategory: React.PropTypes.string.isRequired
    },

    render: function() {

        return (
            <div>
                <div>{chrome.i18n.getMessage('ajout_filtre')}</div>
                <div id="add-word" className="form-group">
                    <div className="input-group">
                        <form onSubmit={this._addWordToFilter}>
                            <input ref="wordInput" className="form-control" type="text" id="add-word-input" placeholder="@name or #tag or text" />
                            <span className="input-group-btn">
                                <button className="btn btn-success" type="submit" data-translate="text">{chrome.i18n.getMessage('ajouter')}</button>
                            </span>
                        </form>
                    </div>
                </div>
            </div>);
    },

    _addWordToFilter: function(e) {
        // TODO
        e.preventDefault();
        var word = this.refs.wordInput.getDOMNode().value;
        this.refs.wordInput.getDOMNode().value = '';
        Actions.createFilterWord(this.props.filterCategory, word);
    }
});

module.exports = AddWordFrom;