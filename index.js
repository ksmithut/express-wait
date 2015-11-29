'use strict';

var Promise = require('bluebird');
var once = require('./lib/once');

module.exports = function(app) {
  var initCb;
  var init = Promise.fromCallback(function(cb) { initCb = once(cb); });

  app.use(function(req, res, next) {
    init.then(function() { next(); }).catch(next);
  });

  return initCb;
};
