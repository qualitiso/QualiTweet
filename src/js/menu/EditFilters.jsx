/* jshint ignore:start */
var React = require('react');
var FilterList = require('./FilterList.jsx');
var AddWordForm = require('./AddWordForm.jsx');

var EditFilters = React.createClass({

    propTypes: {
        highlightedWords: React.PropTypes.array.isRequired,
        mutedWords: React.PropTypes.array.isRequired,
        hiddenWords: React.PropTypes.array.isRequired
    },

    getInitialState: function() {
        return {
            filterListDisplayed: 'muted'
        };
    },

    render: function () {
        return (<div>
            <h2>{chrome.i18n.getMessage('filtrer_tweets')}</h2>

            <div>
                <div>{chrome.i18n.getMessage('select_cat')}</div>
                <div className="form-group">
                    <form>
                        <select value={this.state.filterListDisplayed}name="listeTypesFiltres" id="listeTypesFiltres" className="form-control" onChange={this._onSelectedFilterChanged}>
                            {this._selectOption('highlighted', 'evidence')}
                            {this._selectOption('muted', 'discret')}
                            {this._selectOption('hidden', 'cache')}
                        </select>
                    </form>
                </div>

                <FilterList
                    filters={this.props[this.state.filterListDisplayed+'Words']}
                    filterCategory={this.state.filterListDisplayed}
                    />

                <AddWordForm filterCategory={this.state.filterListDisplayed}/>
            </div>
        </div>
        );
    },

    _selectOption: function(category, i18nKey) {
        var text = chrome.i18n.getMessage(i18nKey) + ' ('+this.props[category+'Words'].length+')';
        return (<option value={category}>{text}</option>);
    },

    _onSelectedFilterChanged: function(evt) {
        this.setState({
            filterListDisplayed: evt.target.value
        });
    }
});

module.exports = EditFilters;