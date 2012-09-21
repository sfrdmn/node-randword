var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('./config.js');


var dictPath = path.resolve(config.dict);
var bufferSize = 256;

module.exports = function(fn) {
  async.auto({
    get_stats: function(callback) {
      fs.stat(dictPath, function(err, stats) {
        if (err) {
          callback(err);
        } else if (!stats.isFile()) {
          callback(new Error('Specified dictionary `' + config.dict + '` is not a file!'));
        }
        callback(null, stats.size);
      });
    },
    open_file: function(callback) {
      fs.open(dictPath, 'r', function(err, fd) {
        callback(err, fd);
      });
    },
    read_buffer_to_string: ['get_stats', 'open_file', function(callback, results) {
      var size = results['get_stats'];
      var fd = results['open_file'];
      var bufferPos = getRandomBufferPos(size);
      var buffer = new Buffer(bufferSize);
      fs.read(fd, buffer, 0, bufferSize, bufferPos, function(err, bytesRead, buffer) {
        var bufferString = buffer.toString(config.encoding, 0, bufferSize);
        callback(err, bufferString);
      });
    }],
    get_single_word: ['read_buffer_to_string', function(callback, results) {
      var bufferString = results['read_buffer_to_string'];
      var wordArray = bufferString.split(config.delimiter);
      // Trim off the first and last words, since we might have only buffered part of them.
      var word = wordArray[getRandomInt(1, wordArray.length - 2)];
      callback(null, word);
    }]
  }, function(err, results) {
    if (err) {
      fn(err);
    } else {
      fn(null, results['get_single_word']);
    }
  });

}

function getRandomBufferPos(fileSize) {
  var pos = getRandomInt(0, fileSize);
  if (pos + bufferSize > fileSize) {
    pos = fileSize - bufferSize;
  }
  return pos;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
