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
    source  = require('../source/index');

function BarChart(options) {
    if (!(this instanceof blessed.Node)) {
        return new BarChart(options);
    }

    options = options || {}
    options.width = options.width || 10;
    options.showLegend = options.showLegend || true;
    this.state = {};
    options.on_message = options.on_message || function (self, data) {
        var d = data.time;
        self.state[data.host] = data.metric || 0;

        var newdata = Object.keys (self.state).map (function (v) { return self.state[v]; });
        self.setData ({titles: Object.keys (self.state),
                       data: newdata});
        self.screen.render();
    };
    this.options = options;

    this.source = new source (this.options.source);
    this.source.subscribe (this);
    contrib.bar.call (this, options);
};

BarChart.prototype.__proto__ = contrib.bar.prototype;
BarChart.prototype.type = 'ph-bar-chart';

module.exports = BarChart;
