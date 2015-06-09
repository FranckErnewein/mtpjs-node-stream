var fs = require('fs');
var stream = require('stream');
var _ = require('lodash');
var CSVLine = require('../lib/CSVLine');

var file_reader = fs.createReadStream('./people.csv');
var file_writer = fs.createWriteStream('./people.xml');
var line_parser = new CSVLine();

var FIELDS = [
  'firstname',
  'lastname',
  'age',
  'city',
  'mood'
];

var array_to_xml = new stream.Transform({
    encoding: 'utf8',
    objectMode: true,
});

array_to_xml._transform = function(array, encoding, callback){
  var xml_node = '';
  if(!this.first_item_done){
    this.first_item_done = true; 
    xml_node += '<people>\r\n';
  }
  xml_node += '\t<person>\r\n';
  _.each(FIELDS, function(key, i){
    xml_node += '\t\t<' + key + '>' + array[i] + '</' + key + '>\r\n';
  });
  xml_node += '\t</person>\r\n';
  this.push(xml_node);
  callback();
};

array_to_xml._flush = function(){
  this.push('</people>');
};



file_reader.pipe(line_parser).pipe(array_to_xml).pipe(file_writer);

