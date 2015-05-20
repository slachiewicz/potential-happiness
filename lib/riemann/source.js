var WebSocket = require('ws');

function Source(options) {
    options = options || {};

    options.host = options.host || "localhost";
    options.port = options.port || 5556;
    options.base_url = options.base_url || "/";

    this.options = options;

    this.url = "ws://" + options.host + ":" + options.port +
        options.base_url + "index?subscribe=true&query=" +
        encodeURI(options.query);
}

Source.prototype.subscribe = function (callback) {
    WebSocket.call (this, this.url);
    this.on ('message', function (message) {
        data = JSON.parse (message);
        callback (data);
    });
}

Source.prototype.__proto__ = WebSocket.prototype;
Source.prototype.type = "riemann-source";

module.exports = Source;
