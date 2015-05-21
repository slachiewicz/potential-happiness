/* potential-happiness -- Riemann dashboard for the TTY
 * Copyright (C) 2015  Gergely Nagy <algernon@madhouse-project.org>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

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
