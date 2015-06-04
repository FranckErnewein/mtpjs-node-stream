var stream = require('stream');
var _ = require('lodash');

var GEEK_LETTERS_MAP = {
  a: 4,
  e: 3,
  i: 1,
  o: 0,
  t: 7,
};

var geekorifier = new stream.Transform();

geekorifier._transform = function(chunk, encoding, callback) {

  var letters = chunk.toString().split('');

  //replace chars with a numbers
  var transformed = _.map(letters, function(c){
    if(GEEK_LETTERS_MAP[c.toLowerCase()] !== undefined){
      return GEEK_LETTERS_MAP[c.toLowerCase()];
    }else{
      return c;
    }
  });

  var result = '-> ' + transformed.join('');

  this.push(result);
  callback();
};

process.stdin.pipe(geekorifier).pipe(process.stdout);
