var stream = require('stream');
var util = require('util');

util.inherits(CSVLine, stream.Transform);

function CSVLine(options) {
  this.separator = options && options.separator ? options.separator : ';';
  stream.Transform.call(this, {
    encoding: 'utf8',
    readableObjectMode: true,
  });
}

CSVLine.prototype._transform = function(chunk, encoding, callback) {
  this.push(chunk.toString().split(this.separator));
  callback();
};

module.exports = CSVLine;
