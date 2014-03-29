'use strict';

module.exports = {

    optionActivated: function(name) {
        return this.getOption(name) === 'yes';
    },

    toggleOption: function(name) {
        localStorage[name] = !this.getOption(name);
    },

    getOption: function(name) {
        var val = localStorage.getItem(name);
        return (val && val === 'true') || false;
    },

    addFilter: function (name, filter) {
        var currentList = this.getFilter(name);
        var added = false;
        if(currentList.indexOf(filter) === -1) {
            currentList.push(filter);
            localStorage[name] = JSON.stringify(currentList);
            added = true;
        }

        return added;
    },

    getFilter: function (name) {
        var currentListJson = localStorage.getItem(name) || '[]';
        return JSON.parse(currentListJson);
    },

    deleteFilter: function (name, filter) {
        var deleted = false;
        var currentListJson = localStorage.getItem(name);

        if(currentListJson) {
            var currentList = JSON.parse(currentListJson);

            var idx = currentList.indexOf(filter);

            if(idx !== -1) {
                currentList.splice(idx, 1);
                localStorage[name] = JSON.stringify(currentList);
                deleted = true;
            }
        }

        return deleted;
    }
};