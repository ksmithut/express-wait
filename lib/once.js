'use strict'

module.exports = function(cb, context) {
  var called = false
  var returnVal

  return function() {
    var args
    if (!called) {
      args = Array.prototype.slice.call(arguments)

      returnVal = cb.apply(context, args)
      called = true
    }
    return returnVal
  }
}
