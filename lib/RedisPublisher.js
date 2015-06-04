var stream = require('stream');
var util = require('util');
var redis = require('redis');

util.inherits(RedisPublisher, stream.Writable);

function RedisPublisher(options) {
  this.client = redis.createClient();
  this.channel = options.channel;
  stream.Writable.call(this, {
    objectMode: true
  });
  //TODO: kill redis client on end
}

RedisPublisher.prototype._write = function(data, encoding, callback) {
  this.client.publish(this.channel, data, function(err){
    if(err){
      this.emit('error', err);
    }else{
      //callback is called asynchronously
      callback();
    }
  }.bind(this));
};

module.exports = RedisPublisher;
