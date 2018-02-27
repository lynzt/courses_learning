'use strict';
const def = x => typeof x !== 'undefined';

exports.is_older = function([y1, m1, d1], [y2, m2, d2]) {
  return y1 < y2
    || (y1 == y2 && m1 < m2)
    || (y1 == y2 && m1 == m2 && d1 < d2)
    || false;
}

exports.number_in_month = function([d, ...ds], m) {
  if (!def(d)) return 0;
  return d[1] == m ? 1 + this.number_in_month(ds, m) : this.number_in_month(ds, m);
}

exports.number_in_months = function(ds, [m, ...ms]) {
  return def(m) ? this.number_in_month(ds, m) + this.number_in_months(ds, ms) : 0;
}

exports.dates_in_month = function([d, ...ds], m) {
  if (!def(d)) return [];
  return d[1] == m ? [d, ...this.dates_in_month(ds, m)] : [...this.dates_in_month(ds, m)];
}

exports.get_nth = function([s, ...sx], i) {
  if (i == 1) return s;
  else return this.get_nth(sx, i - 1);
}

exports.date_to_string = function([year, month, day]) {
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthName = this.get_nth(months, month);
  return `${monthName} ${day}, ${year}`;
}

const reduce = ([x, ...xs], fn, memo, i = 0) => def(x)
    ? reduce(xs, fn, fn(memo, x, i), i + 1) : memo

exports.number_before_reaching_sum = function(sum, ns) {
  const check = (sum, [n, ...nx], i) => {
    if (sum - n <= 0) return i;
    else return check(sum - n, nx, i + 1);
  }
  return check(sum, ns, 0);
}


// January - 31 days
// February - 28 days in a common year and 29 days in leap years
// March - 31 days
// April - 30 days
// May - 31 days
// June - 30 days
// July - 31 days
// August - 31 days
// September - 30 days
// October - 31 days
// November - 30 days
// December - 31 days
//
//
// // https://medium.com/dailyjs/functional-js-with-es6-recursive-patterns-b7d0813ef9e3
