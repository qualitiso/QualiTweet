/* jshint ignore:start */
var React = require('react');
var Actions = require('../Actions');
var _ = require('lodash');

var HideElementsCommands = React.createClass({

    propTypes: {
        hiddenElements: React.PropTypes.array.isRequired
    },

    render: function () {
        return (<div>
            <h2>{chrome.i18n.getMessage('masquer_elements_page')}</h2>
            {this._renderCheckbox('hide-tweet', 'btn_twt')}
            {this._renderCheckbox('hide-suggest', 'suggestions')}
            {this._renderCheckbox('hide-trends', 'tendances')}
            {this._renderCheckbox('hide-promoted', 'promoted')}
            {this._renderCheckbox('hide-footer', 'footer')}
        </div>
        );
    },

    _renderCheckbox: function(id, i18nKey) {
        var checked = this.props.hiddenElements.indexOf(id) !== -1;

        return (
            <div className="checkbox">
                <label>
                    <input ref={id} type="checkbox" onChange={this._onChange.bind(this, id)} checked={checked}/>
                    <span>{chrome.i18n.getMessage(i18nKey)}</span>
                </label>
            </div>
        );
    },

    _onChange: function(id) {
        var newHiddenElements = this.props.hiddenElements.slice();
        if(newHiddenElements.indexOf(id) === -1) {
            newHiddenElements.push(id);
        } else {
            _.pull(newHiddenElements, id);
        }
        Actions.hiddenElementsListChanged(newHiddenElements)
    }
});

module.exports = HideElementsCommands;