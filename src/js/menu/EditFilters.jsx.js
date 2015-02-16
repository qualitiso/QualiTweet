/* jshint ignore:start */
var React = require('react');

var EditFilters = React.createClass({

    propTypes: {},

    render: function () {
        return (<div>
            <h2>{chrome.i18n.getMessage('filtrer_tweets')}</h2>

            <div>
                <div>{chrome.i18n.getMessage('select_cat')}</div>
                <div className="form-group">
                    <select name="listeTypesFiltres" id="listeTypesFiltres" className="form-control">
                        <option value="highlighted">{chrome.i18n.getMessage('evidence')}</option>
                        <option value="muted" selected="selected">{chrome.i18n.getMessage('discret')}</option>
                        <option value="hidden">{chrome.i18n.getMessage('cache')}</option>
                    </select>
                </div>

                <div>{chrome.i18n.getMessage('lst_filtres')}</div>
                <div className="form-group">
                    <div className="input-group">
                        <div id="currentFilterValues"></div>
                    </div>
                </div>

                <div>{chrome.i18n.getMessage('ajout_filtre')}</div>
                <div id="add-word" className="form-group">
                    <div className="input-group">
                        <input className="form-control" type="text" id="add-word-input" placeholder="@name or #tag or text" />
                        <span className="input-group-btn">
                            <button className="btn btn-success" type="button" data-translate="text">{chrome.i18n.getMessage('ajouter')}</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
        );
    }
});

module.exports = EditFilters;