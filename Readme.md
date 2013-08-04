# Get a random English word!

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
