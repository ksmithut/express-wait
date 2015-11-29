'use strict';

var chai = require('chai');
var once = require('../lib/once');
var expect = chai.expect;
var spy = chai.spy;

describe('lib/once', function() {

  it('should only call a method once', function() {
    var func = spy(function() { return 5; });
    var funcOnce = once(func);

    expect(funcOnce()).to.be.equal(5);
    expect(funcOnce()).to.be.equal(5);
    expect(func).to.have.been.called.exactly(1);
  });

  it('should maintain context', function() {
    var func = spy(function() { return this.foo + ' world'; });
    var funcOnce = once(func, { foo: 'hello' });

    expect(funcOnce()).to.be.equal('hello world');
    expect(funcOnce()).to.be.equal('hello world');
    expect(func).to.have.been.called.exactly(1);
  });

  it('should accept arguments', function() {
    var func = spy(function(num) { return num + 5; });
    var funcOnce = once(func);

    expect(funcOnce(10)).to.be.equal(15);
    expect(funcOnce(5)).to.be.equal(15);
    expect(func).to.have.been.called.exactly(1);
  });

});

