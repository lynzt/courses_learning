'use strict';
const chai = require('chai');
const expect = chai.expect;
const dates = require('../../week1/dates');

describe('test date fcns', function() {
  describe('test is_older', function() {
    it('should return formatted durations', function() {
      expect(dates.is_older([1,2,3], [2,3,4])).to.be.true;
      expect(dates.is_older([1,2,3], [1,3,4])).to.be.true;
      expect(dates.is_older([1,2,3], [1,2,4])).to.be.true;

      expect(dates.is_older([5,6,7], [2,3,4])).to.be.false;
      expect(dates.is_older([2,6,7], [2,3,4])).to.be.false;
      expect(dates.is_older([2,3,7], [2,3,4])).to.be.false;

      expect(dates.is_older([1,2,3], [1,2,3])).to.be.false;
    });
  });

  describe('test number_in_month', function() {
    it('should return formatted durations', function() {
      expect(dates.number_in_month([[2017,2,28], [2018,1,2]], 2)).to.equal(1);
      expect(dates.number_in_month([[2017,2,28], [2018,1,2], [2018,2,2]], 2)).to.equal(2);
      expect(dates.number_in_month([[2016,2,28], [2017,2,2], [2018,2,2]], 2)).to.equal(3);
      expect(dates.number_in_month([[2016,3,28], [2017,4,2], [2018,12,2]], 2)).to.equal(0);
    });
  });

  describe('test number_in_months', function() {
    it('should return formatted durations', function() {
      expect(dates.number_in_months([[2017,2,28], [2018,12,1], [2018,3,31],[2011,4,28]], [2,3,4])).to.equal(3);
      expect(dates.number_in_months([[2017,2,28], [2018,2,1], [2018,2,13],[2011,2,5]], [2,3,4])).to.equal(4);
      expect(dates.number_in_months([[2017,2,28], [2018,2,1], [2018,2,13],[2011,12,5]], [2,5,4])).to.equal(3);
      expect(dates.number_in_months([[2017,2,28], [2018,12,1], [2018,3,31],[2011,4,28]], [2])).to.equal(1);
      expect(dates.number_in_months([[2017,2,28], [2018,12,1], [2018,3,31],[2011,4,28]], [5,6])).to.equal(0);
    });
  });

  describe('test dates_in_month', function() {
    it('should return formatted durations', function() {
      expect(dates.dates_in_month([[2017,2,28]], 2)).to.eql([[2017,2,28]]);
      expect(dates.dates_in_month([[2017,2,28], [2018,2,1], [2018,3,31],[2011,4,28]], 2)).to.eql([[2017,2,28],[2018,2,1]]);
    });
  });

  describe('test get_nth', function() {
    it('should return formatted durations', function() {
      expect(dates.get_nth (["hi", "there", "how", "are", "you"], 2)).to.equal("there");
      expect(dates.get_nth (["hi", "there", "how", "are", "you"], 1)).to.equal("hi");
      expect(dates.get_nth (["hi", "there", "how", "are", "you"], 5)).to.equal("you");
    });
  });

  describe('test date_to_string', function() {
    it('should return formatted durations', function() {
      expect(dates.date_to_string ([2017, 1, 15])).to.equal("January 15, 2017");
      expect(dates.date_to_string ([2017, 2, 2])).to.equal("February 2, 2017");
      expect(dates.date_to_string ([2016, 12, 5])).to.equal("December 5, 2016");
    });
  });

  describe('test number_before_reaching_sum', function() {
    it('should return formatted durations', function() {
      expect(dates.number_before_reaching_sum(10, [1,2,3,4,5])).to.equal(3);
      expect(dates.number_before_reaching_sum(3, [1,2,3,4,5])).to.equal(1);
      expect(dates.number_before_reaching_sum(15, [1,2,3,4,5])).to.equal(4);
    });
  });

  describe('test what_month', function() {
    it('should return formatted durations', function() {
      expect(dates.what_month(70)).to.equal(3);
      // expect(dates.what_month(3, [1,2,3,4,5])).to.equal(1);
      // expect(dates.what_month(15, [1,2,3,4,5])).to.equal(4);
    });
  });

});
