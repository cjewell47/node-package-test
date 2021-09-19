'use strict';

const assert = require('assert');

const arrayfetch = require('../index');

const endpoints = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

describe('use fetcharray on array of endpoints', () => {
  it('fetchData returns array equal in length to endpoints array', async () => {
    arrayfetch.fetchData(endpoints).then(function (items) {
      assert.equal(items.length, endpoints.length)
      done();
    })
  });

});
