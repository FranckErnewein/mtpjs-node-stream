var stream = require('stream');
var util = require('util');

util.inherits(CSVLine, stream.Transform);

function CSVLine(options) {
  this.separator = options && options.separator ? options.separator : ';';
  stream.Transform.call(this, {
    objectMode: true,
  });
}

CSVLine.prototype._transform = function(chunk, encoding, callback) {
  var data = chunk.toString()
	if (this._lastLineData) data = this._lastLineData + data 

	var lines = data.split('\n')
	this._lastLineData = lines.splice(lines.length-1,1)[0]

	lines
		.forEach(function(line) {
			this.push(line.split(this.separator))
		}.bind(this)) 
	callback()
};

module.exports = CSVLine;
