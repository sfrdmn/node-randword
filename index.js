var fs = require('graceful-fs')
var path = require('path')
var through = require('through')
var split = require('split')
var bun = require('bun')
var config = require('./config.json')

var dictPath = path.resolve(__dirname, config.dict)
var bufferSize = config.bufferSize

// read dictionary with stream
function textStream() {
  var start = randomInt(0, config.size - bufferSize)
  return fs.createReadStream(dictPath, {
    encoding: config.encoding,
    start: start,
    end: start + bufferSize
  })
}

// split text stream into words
function splitStream() {
  return split(config.delimiter)
}

// add all words to list, ditch first and last words in case they were
// sliced by start and end read positions
function concatStream() {
  var wordlist = []
  return through(function(word) {
    wordlist.push(word)
  }, function() {
    this.push(wordlist)
  })
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = function(callback) {
  callback = typeof callback === 'function' ? callback : function() {}

  return bun([
    textStream(),
    splitStream(),
    concatStream(),
    through(function(wordlist) {
      var word = ''
      if (wordlist.length < 3) {
        this.emit('error', new Error(
            'Unable to get random word. Buffer size too small? Delimiter set incorrectly?'))
      } else {
        wordlist = wordlist.slice(1, wordlist.length - 2)
        word = wordlist[randomInt(0, wordlist.length - 1)]
        callback(null, word)
        this.push(word)
      }
      this.emit('end')
    })
  ]).on('error', onError)

  function onError(err) {
    callback(err)
  }
}
