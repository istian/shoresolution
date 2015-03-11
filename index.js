var prompt = require("prompt"),
    _ = require('lodash'),
    fs = require('fs'),
    csvParse = require('csv-parse'),
    stats = require('./lib/stats'),
    statUtils = require('./lib/utils'),
    async = require('async'),
    util = require('util');


var parser = csvParse({delimeter: ',', columns: true}),
    data = [];

prompt.start();

var schema = [
    {
        name: "csv",
        description: "Enter the path of the csv file",
        type: "string",
        required: true,
        default: "src/Stats/data.csv"
    },
    {
        name: "column",
        description: "Enter column name to calculate (C1|C2|C3)",
        type: "string",
        required: true,
        pattern: /^C[1|2|3]$/i,
        message: "Column name can either be C1, C2 or C3"
    }
];

prompt.get(schema, function (err, result) {
    if (err) throw new Error(err);

    fs.createReadStream(__dirname + '/' + result['csv']).pipe(parser);

    parser.on('readable', function () {
        var record;
        while (record = parser.read()) {
            data.push(+record[result['column'].toUpperCase()]);
        }
    }).on('error', function (err) {
        throw new Error(err.message);
    }).on('finish', function () {

        async.parallel([
            function getMean(callback) {
                callback(false, stats.Mean(data));
            },
            function getMedian(callback) {
                callback(false, stats.Median(data));
            },
            function getMode(callback) {
                callback(false, stats.Mode(data));
            },
            function getStandardDeviation(callback) {
                callback(false, stats.StandardDeviation(data));
            }
        ], function(err, results) {
            if (err) throw new Error(err);

            var mean = results[0],
                median = results[1],
                mode = results[2],
                startdardDeviation = results[3];

            console.log(util.format("\nMean: %d\nMedium: %d \nMode: %d \nStandard Deviation: %d\n\n\n", mean, median, mode, startdardDeviation));
        })
    })
});