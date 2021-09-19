'use strict';

const express = require('express');
const handlebars = require('express-handlebars');


const server = express();

server.listen(3000);
server.set('view engine', 'handlebars');

server.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  }));

server.get('/', (req, res) => {
  res.render('main', {layout : 'index'})
});