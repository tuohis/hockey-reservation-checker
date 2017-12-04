/* Copyright Mikko Tuohimaa 2017 */

class Cache {
  constructor() {
    this._createClient();
  }

  _createClient() {
    try {
      console.log("Creating Redis client..");
      this._client = require('redis').createClient(
        process.env.REDIS_URL,
        {retry_strategy: (attempt, total_retry_time, error, times_connected) => false},
      );
      this._client.on('error', (err) => {
        console.log(err);
        this._useMock();
      });
      console.log("Redis client created");
    }
    catch (err) {
      console.error("Couldn't setup Redis connection, using a mock", err);
      this._useMock();
    }
  }

  get client() {
    return this._client;
  }

  _useMock() {
    const _mockFunc = (callback) => { if (typeof callback == 'function') callback(undefined, null); };    
    this._client = {
      get: (key, callback) => _mockFunc(callback),
      set: (key, val, foo, bar, callback) => _mockFunc(callback),
    };
    // Try reconnecting in an hour
    setTimeout(this._createClient.bind(this), 1000*60*60);
  }
}

module.exports = {
  Cache: Cache,
};
