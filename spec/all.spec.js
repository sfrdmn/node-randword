var should = require('should')
var randword = require('../index.js')
var es = require('event-stream')
var through = es.through

describe('randword', function() {

  it('should get a random word', function(done) {
    randword(function(err, word) {
      should.not.exist(err)
      should.exist(word)
      word.should.have.property('length')
      word.length.should.be.ok
      done()
    })
  })

  it('should get a few random words', function(done) {
    var errors = 0
    var num = 10
    var i = 0
    var called = 0
    for (i; i < num; i++) {
      randword(function(err, word) {
        called++
        should.not.exist(err)
        should.exist(word)
        word.should.have.property('length')
        word.length.should.be.ok
        if (called === num)
          done()
      })
    }
  })

  it('should get a ton of random words', function(done) {
    var errors = 0
    var num = 1000
    var i = 0
    var called = 0
    for (i; i < num; i++) {
      randword(function(err, word) {
        called++
        should.not.exist(err)
        should.exist(word)
        word.should.have.property('length')
        word.length.should.be.ok
        if (called === num)
          done()
      })
    }
  })

  it('should be streamable', function(done) {
    var errors = 0
    var word
    var stream = randword().pipe(through(function(data) {
      word = data
    }, function() {
      errors.should.equal(0)
      should.exist(word)
      word.should.have.property('length')
      word.length.should.be.ok
      done()
    })).on('error', function() {
      errors++
    })
  })

  it('should be streamable at later time', function(done) {
    var errors = 0
    var word
    var stream = randword()
    setTimeout(function() {
      stream.pipe(through(function(data) {
        word = data
      }, function() {
        errors.should.equal(0)
        should.exist(word)
        word.should.have.property('length')
        word.length.should.be.ok
        done()
      })).on('error', function() {
        errors++
      })
    }, 500)
  })

})
