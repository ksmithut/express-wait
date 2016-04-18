'use strict'

var Promise = require('bluebird')
var supertest = require('supertest-as-promised')
var express = require('express')
var init = require('../')

describe('init', function() {

  it('waits for the init callback to be called', function() {
    var app = express()
    var initCb = init(app)
    var request = supertest(app)

    Promise.delay(500).then(function() {
      app.use(function(req, res) { res.send('hello world') })
      initCb()
    })

    return request.get('/')
      .expect(200)
      .expect('hello world')
  })

  it('should handle errors being passed into it', function() {
    var app = express()
    var initCb = init(app)
    var request = supertest(app)

    Promise.delay(500).then(function() {
      app.use(function(err, req, res, next) {
        res.status(500).send(err.message)
        next()
      })
      initCb(new Error('some error happened'))
    })

    return request.get('/')
      .expect(500)
      .expect('some error happened')
  })

})
