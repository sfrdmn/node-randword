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

## Note

This module uses a text file dictionary as its word base. It's a little over a meg in size.
So you'll have that sitting in your `node_modules`. One positive side effect of this is that the module
(theoretically) works on Windows.

The text file is from the depths of the Internet somewhere. Not sure about the nature of its copyright.
