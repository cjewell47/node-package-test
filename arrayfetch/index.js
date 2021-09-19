'use strict'

const https = require('https');

function createPromise(endpoint) {
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

function createPromiseArray(endpointArray) {
  return endpointArray.map(endpoint => createPromise(endpoint))
}


module.exports = {
  fetchData: async function(endpointArray) {
    const promiseArray = createPromiseArray(endpointArray);
    const values = await Promise.all(promiseArray);
    return values;
  }
}
