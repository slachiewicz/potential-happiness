var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    riemann = require('../riemann/index'),
    util = require('../util');

function LineChart(options) {
    var self = this;

    if (!(this instanceof blessed.Node)) {
        return new LineChart(options);
    }

    options = options || {}
    options.width = options.width || 10;
    options.showLegend = options.showLegend || true;
    this.state = {};
    options.on_message = options.on_message || function (data) {
        //var d = new Date (Date.parse (data.time)).toLocaleTimeString();
        var d = data.time;
        if (self.state[data.host]) {
            if (self.state[data.host].x.length > self.options.width) {
                self.state[data.host].x.shift();
                self.state[data.host].y.shift();
            }
            self.state[data.host].x.push(d);
            self.state[data.host].y.push(data.metric);
        } else {
            self.state[data.host] = {x: [d],
                                     y: [data.metric],
                                     title: data.host,
                                     style: {
                                         line: util.findColor(Object.keys(self.state).length)
                                     }
                                    };
        }

        var newdata = Object.keys (self.state).map (function (v) { return self.state[v]; });
        self.setData (newdata);
        self.screen.render();
    };
    this.options = options;

    this.source = new riemann.source (this.options.source);
    this.source.subscribe (this.options.on_message);
    contrib.line.call (this, options);
};

LineChart.prototype.__proto__ = contrib.line.prototype;
LineChart.prototype.type = 'ph-line-chart';

module.exports = LineChart;
