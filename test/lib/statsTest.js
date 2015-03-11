var stats = require('./../../lib/stats'),
    utils = require('./../../lib/utils');

describe("lib/stats", function () {

    describe("func Mean", function () {
        it('should throw error if one of passed arguments contain non-numeric value', function () {
            (function () {
                stats.Mean([1, 2, 'a', 3]);
            }).should.throw();
        })

        it('should return the Mean value from sets', function () {
            stats.Mean(utils.arrSort([1, 2, 3, 4, 5])).should.eql(3);
            stats.Mean(utils.arrSort([3, 7, 7, 19])).should.eql(9);
        });
    });

    describe('func Median', function () {
        it('should throw an error if params cannot be calculated due to invalid values', function () {
            (function () {
                stats.Median(utils.arrSort([1, 'a', '@', 3]));
            }).should.throw();
        });

        it('should return correct median', function () {
            stats.Median(utils.arrSort([9, 3, 44, 17, 15])).should.be.eql(15);
            stats.Median(utils.arrSort([8, 3, 44, 17, 12, 6])).should.be.eql(10);
        })
    });

    describe('func Mode', function () {
        it('should throw an error if params cannot be calculated due to invalid values', function () {
            (function () {
                stats.Mode(utils.arrSort([1, 'a', '@', 3]));
            }).should.throw();
        });

        it('should return correct mode value from sets', function () {
            stats.Mode(utils.arrSort([9, 3, 3, 44, 17, 17, 44, 15, 15, 15, 27, 40, 8])).should.be.eql(15);
            stats.Mode(utils.arrSort([9, 3, 3, 44, 17, 17, 17, 17, 44, 15, 15, 15, 27, 40, 8])).should.be.eql(17);
            stats.Mode(utils.arrSort([9, 3, 3, 3, 3, 3])).should.be.eql(3);
        })
    });

    describe('func Variance', function () {
        it('should throw an error if params cannot be calculated due to invalid values', function () {
            (function () {
                stats.Variance(utils.arrSort([1, 'a', '@', 3]));
            }).should.throw();
        });

        it('should return correct variance value from sets', function () {
            var data = utils.arrSort([3, 7, 7, 19]);
            stats.Variance(data).should.be.eql([36, 4, 4, 100]);
        });

        it('should return correct variance if second arg `mean` is specified', function () {
            var data = utils.arrSort([3, 7, 7, 19]),
                mean = stats.Mean(data);

            stats.Variance(data, mean).should.eql([36, 4, 4, 100]);
        })
    });

    describe('func Standard Deviation', function () {
        it('should throw an error if params cannot be calculated due to invalid values', function () {
            (function () {
                stats.StandardDeviation(utils.arrSort([1, 'a', '@', 3]));
            }).should.throw();
        });

        it('should return correct variance value from sets', function () {
            Math.round(stats.StandardDeviation(utils.arrSort([3, 7, 7, 19]))).should.eql(6);
        })
    });
});