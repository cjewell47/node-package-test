'use strict';

const express = require('express');
const https = require('https');

const handlebars = require('express-handlebars');

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

function getData(endpoint) {
  return new Promise((resolve, reject) => {
    https
      .get(
        endpoint,
        (res) => {
          let data = '';

          // A chunk of data has been received.
          res.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Resolve the result
          res.on('end', () => {
            const jsonData = JSON.parse(data);
            console.log(jsonData.data)
            return resolve(jsonData.data);
          });
        }
      )
      .on('error', (err) => {
        console.error('Error: ' + err.message);
        return reject(err);
      });
  });
}

function getAllData() {
  return Promise.all([getData(endpoints[0]), getData(endpoints[1]), getData(endpoints[2])]).then(values => {
    console.log('promise.all', values)
  })

}

server.get('/', (req, res) => {
  getAllData()
  res.render('main', { layout: 'index' })
});