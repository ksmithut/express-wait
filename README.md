# express-wait

[![NPM version](http://img.shields.io/npm/v/express-wait.svg?style=flat)](https://www.npmjs.org/package/express-wait)
[![Dependency Status](http://img.shields.io/david/ksmithut/express-wait.svg?style=flat)](https://david-dm.org/ksmithut/express-wait)
[![Dev Dependency Status](http://img.shields.io/david/dev/ksmithut/express-wait.svg?style=flat)](https://david-dm.org/ksmithut/express-wait#info=devDependencies&view=table)
[![Code Climate](http://img.shields.io/codeclimate/github/ksmithut/express-wait.svg?style=flat)](https://codeclimate.com/github/ksmithut/express-wait)
[![Build Status](http://img.shields.io/travis/ksmithut/express-wait/master.svg?style=flat)](https://travis-ci.org/ksmithut/express-wait)
[![Coverage Status](http://img.shields.io/codeclimate/coverage/github/ksmithut/express-wait.svg?style=flat)](https://codeclimate.com/github/ksmithut/express-wait)

`express-wait` is a module to allow your express app to beginning accepting
requests as soon as the server can start listing.

# Motivation

When reading through [The Twelve Factor App](http://12factor.net/) I noticed a
piece on [disposibility](http://12factor.net/disposability), specifically the
part that says:

> Processes should strive to minimize startup time. Ideally, a process takes a
> few seconds from the time the launch command is executed until the process is
> up and ready to receive requests or jobs. Short startup time provides more
> agility for the release process and scaling up; and it aids robustness,
> because the process manager can more easily move processes to new physical
> machines when warranted.

The app that I was working on at the time had to set up it's middleware
asynchronously, which meant that the app couldn't start receiving requests until
all of the middleware and database connections had been initialized.

This module provides you a way to do all those things asynchronously and start
your server listening for requests immediately.

# Usage

```js
var http = require('http');
var express = require('express');
var wait = require('express-wait');
var app = express();
var server = http.createServer(app);

var PORT = process.env.PORT || 8000;
var init = wait(app);

// Insert more applicable asynchronous task here:
setTimeout(function() {
  app.use(function(req, res) {
    res.send('success');
  });

  init();
}, 10000);

server.listen(PORT, function() {
  console.log('Server is ready to accept requests on port ', PORT);
});
```

If there is some error that happened in your initialization, pass the error as
the first parameter. The error will be passed through express' error handler,
so be sure you have error handling middleware to catch those errors.

# Questions/Issues

Pull requests and issues welcome.
