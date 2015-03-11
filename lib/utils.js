var _ = require("lodash");

module.exports = {
    checkSetType: function (arr) {
        if (!arr) throw new Error('Required param not found');

        if (arr instanceof Array === false) throw new Error('Param should be an array');

        if (arr.length % 2 > 0) {
            return "odd";
        } else {
            return "even";
        }
    },

    arrSort: function (arr, order) {

        var o = order || 'asc';

        if (['asc', 'desc'].indexOf(o) == -1) throw new Error('Invalid sort type');

        if (!arr) throw new Error('Required param not found');

        if (arr instanceof Array === false) throw new Error('Param should be an array');

        return arr.sort(function (a, b) {
            if (isNaN(a) || isNaN(b)) throw new Error('Invalid arguments');

            return o === 'desc' ? b - a : a - b;
        });
    }
}