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
                    <select value={this.state.filterListDisplayed}name="listeTypesFiltres" id="listeTypesFiltres" className="form-control" onChange={this._onSelectedFilterChanged}>
                        <option value="highlighted">{chrome.i18n.getMessage('evidence')}</option>
                        <option value="muted">{chrome.i18n.getMessage('discret')}</option>
                        <option value="hidden">{chrome.i18n.getMessage('cache')}</option>
                    </select>
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

    _onSelectedFilterChanged: function(evt) {
        this.setState({
            filterListDisplayed: evt.target.value
        });
    }
});

module.exports = EditFilters;