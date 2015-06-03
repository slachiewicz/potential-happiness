/* potential-happiness -- Dashboard for the TTY
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
    source = require('../source');

function Log(options) {
    if (!(this instanceof blessed.Node)) {
        return new Log(options);
    }

    options = options || {};
    options.tags = options.tags || true;
    options.on_message = options.on_message || function (self, data) {
        self.log ("{red-fg}" + data.service + "{/red-fg} " +
                  "from {yellow-fg}" + data.host + "{/yellow-fg} " +
                  "{cyan-fg}" + (data.state || data.metric) + "{/cyan-fg}");
    };
    this.options = options;

    this.source = new source (this.options.source);
    this.source.subscribe (this);

    contrib.log.call (this, options);
}

Log.prototype.__proto__ = contrib.log.prototype;
Log.prototype.type = 'ph-log';

module.exports = Log
