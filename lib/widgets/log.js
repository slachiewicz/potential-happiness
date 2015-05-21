var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    riemann = require('../riemann/index');

function Log(options) {
    if (!(this instanceof blessed.Node)) {
        return new Log(options);
    }

    options = options || {};
    options.tags = options.tags || true;
    var self = this;
    options.on_message = options.on_message || function (data) {
        self.log ("{red-fg}" + data.service + "{/red-fg} " +
                  "from {yellow-fg}" + data.host + "{/yellow-fg} " +
                  "{cyan-fg}" + (data.state || data.metric) + "{/cyan-fg}");
    };
    this.options = options;

    this.source = new riemann.source (this.options.source);
    this.source.subscribe (options.on_message);

    contrib.log.call (this, options);
}

Log.prototype.__proto__ = contrib.log.prototype;
Log.prototype.type = 'ph-log';

module.exports = Log
