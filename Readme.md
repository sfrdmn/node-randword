# Get a random English word!

[![Build Status](https://api.travis-ci.org/sfrdmn/node-randword.png)](https://travis-ci.org/sfrdmn/node-randword)

## Usage
```Javascript
var randword = require('randword');

randword(function(err, word) {
  console.log(word + '!');
});
```

Or you can stream it!

```Javascript
  randword().pipe(process.stdout)
```
