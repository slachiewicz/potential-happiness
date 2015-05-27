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
    source  = require('../source/index');

function Text(options) {
    var self = this;

    if (!(this instanceof blessed.Node)) {
        return new Text (options);
    }

    options = options || {}
    options.tags = options.tags || true;
    options.align = options.align || "center";
    options.valign = options.valign || "middle";
    options.on_message = options.on_message || function (data) {
        if (data.metric) {
            self.setText (data.metric.toString())
            self.screen.render ();
        }
    };
    this.options = options;

    this.source = new source (this.options.source);
    this.source.subscribe (this.options.on_message);
    blessed.text.call (this, options);
};

Text.prototype.__proto__ = blessed.text.prototype;
Text.prototype.type = 'ph-text';

module.exports = Text;
