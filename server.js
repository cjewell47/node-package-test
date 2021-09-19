'use strict';

const express = require('express');

const handlebars = require('express-handlebars');

/** custom package to fetch JSON data from array of urls */
const arrayfetch = require('./arrayfetch')

const server = express();

server.listen(3000);
server.set('view engine', 'handlebars');

server.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
}));

const endpoints = [
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/ftse-fsi.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-hkd.json',
  'https://ft-tech-test-example.s3-eu-west-1.amazonaws.com/gbp-usd.json'
];

server.get('/', (req, res) => {
  arrayfetch.fetchData(endpoints).then(data => {
    let items = data.map(item => item.items[0]);
    res.render('main', { layout: 'index', items: items })
  })
});