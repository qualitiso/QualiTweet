/* jshint ignore:start */
var React = require('react');

var Header = React.createClass({

    propTypes: {
    },

    render: function() {
        return (<div>
            <h1>QualiTweet
                <a href="https://twitter.com/share?text=Filter Your Twitter Stream !&url=http://goo.gl/K8ENYl&hashtags=twitter,chrome,extension,&via=Qualitiso_"
                    target="_blank"
                    className="pull-right">
                    <img alt="Tweet" src="/images/btnTweet.png"/>
                </a>
            </h1>
        </div>);
    }
});

module.exports = Header;