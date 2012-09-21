var randword = require('../index.js');

randword(function(err, word) {
  if (err) {
    console.log('Test failed :(\n', err);
  } else {
    console.log(word + '!');
  }
});
