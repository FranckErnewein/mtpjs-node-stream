var stream = require('stream');
var fs = require('fs');
var _ = require('lodash');

var generator = new stream.Readable();

generator._read = function() {
  var data = [
    _.sample(['John', 'Emily', 'Bill', 'Max', 'Arnold', 'Willy', 'Martine', 'Amelie', 'Gaston']),
    _.sample(['Doe', 'Smith', 'Clinton', 'Chirac', 'Norton', 'Dupont', 'Dupond', 'Poulain', 'Lagaffe']),
    _.sample(_.range(99)),
    _.sample(['New york', 'Tokyo', 'Paris', 'Montpellier', 'Carnon Plage']),
    _.sample(['happy', 'angry']),
  ];
  var line = data.join(';');
  // console.log(line);
  line += '\r\n';
  this.push(line);
};

var file_writer = fs.createWriteStream('./people.csv');

generator.pipe(file_writer);
