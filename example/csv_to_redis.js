var fs = require('fs');
var stream = require('stream');
var _ = require('lodash');
var CSVLine = require('../lib/CSVLine');
var RedisPublisher = require('../lib/RedisPublisher');

var file_stream = fs.createReadStream('./people.csv');
var csv_parser = new CSVLine();
var publisher = new RedisPublisher({
  channel: 'test_channel'
});

var FIELDS = [
  'firstname',
  'lastname',
  'age',
  'city',
  'mood'
];

var array_to_obj = new stream.Transform({
  encoding: 'utf8',
  readableObjectMode: true,
});
array_to_obj._transform = function(array, encoding, callback){
  var obj = {};
  _.each(FIELDS, function(key, i){
    obj[key] = array[i];
  });
  this.push(obj);
  callback();
};

//read from file line by line
//then transform line string to array
//then transform array into obj
//then send it in redis
file_stream.pipe(csv_parser).pipe(array_to_obj).pipe(publisher);

