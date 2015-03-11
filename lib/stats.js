var utils = require("./utils"),
    _ = require('lodash');

var Stats = function () {
    var self = this instanceof Stats ? this : Object.create(Stats.prototype);

    return self;
}

Stats.prototype.Mean = function () {
    arguments = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments);

    var total = _.reduce(arguments, function (sum, n) {
        if (isNaN(n)) throw new Error('Invalid arguments');
        return sum + n;
    });

    return total / arguments.length;
}

Stats.prototype.Median = function () {
    arguments = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments);

    //arguments = utils.arrSort(arguments);
    var v = 0,
        len = arguments.length,
        i;

    if (utils.checkSetType(arguments) === 'odd') {
        i = Math.floor(len / 2);
        v = arguments[i];
    } else {
        i = Math.floor((len - 1) / 2);
        v = (arguments[i] + arguments[i + 1]) / 2;
    }

    return v;
}

Stats.prototype.Mode = function () {
    arguments = arguments[0] instanceof Array ? arguments[0] :Array.prototype.slice.call(arguments);

    var map = {},
        i = 0,
        occurence = arguments[i], count = 1;

    for (i; i < arguments.length; i++) {
        var current = arguments[i];
        if (map[current] == null)
            map[current] = 1;
        else
            map[current]++;

        if (map[current] > count) {
            occurence = current;
            count = map[current];
        }
    }

    return occurence;
}

Stats.prototype.Variance = function () {
    var sets = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments);


    var mean = arguments[1] || this.Mean(sets);


    return _.map(sets, function (n) {
        return Math.pow((n - mean), 2);
    });

}

Stats.prototype.StandardDeviation = function () {
    arguments = arguments[0] instanceof Array ? arguments[0] : Array.prototype.slice.call(arguments);

    var variance = this.Variance(arguments),
        mean = this.Mean(variance);

    return Math.sqrt(mean);

}

module.exports = Stats();