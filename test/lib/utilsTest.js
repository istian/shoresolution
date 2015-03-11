var utils = require('./../../lib/utils');

describe("lib/utils", function () {

    describe('checkSetType', function () {
        it('should throw error if parameter is not found', function() {

            (function() {
                utils.checkSetType();
            }).should.throw(/.not found/i);
        });

        it('should throw error if parameter is not an array', function() {
            (function() {
                utils.checkSetType('a');
            }).should.throw(/.should be an array/i);
        });

        it('should be odd length', function() {
            utils.checkSetType([1,2,3]).should.be.eql('odd');
        })

        it('should be even', function() {
            utils.checkSetType([1,2,3,4]).should.be.eql('even');
        })
    });

    describe('arrSort', function() {

        it('should throw error if parameter is not found', function() {

            (function() {
                utils.arrSort();
            }).should.throw(/.not found/i);
        });

        it('should throw error if parameter is not an array', function() {
            (function() {
                utils.arrSort('a');
            }).should.throw(/.should be an array/i);
        });

        it('should throw error if sort type is invalid', function() {
            (function() {
                utils.arrSort([1,2,5,4,6], 'ascasc');
            }).should.throw(/.sort type/i);
        });

        it('should throw error if sets contains non-numeric values', function() {
            (function() {
                utils.arrSort([1,2,5,'a',6]);
            }).should.throw(/.arguments/i);
        });

        it('should sort in descending order', function() {
           utils.arrSort([1,2,3,4], 'desc').should.be.eql([4,3,2,1]);
        });

        it('should sort in ascending order', function() {
            utils.arrSort([1,4,3,2]).should.be.eql([1,2,3,4]);
        });
    });
});