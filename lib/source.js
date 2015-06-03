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

var riemann = require('./source/riemann'),
    es      = require('./source/es');

function Source (options) {
    options.method = options.method || "riemann";

    if (options.method == "elasticsearch") {
        return new es (options);
    } else {
        return new riemann (options);
    }
}

Source.prototype.subscribe = function (callback) {
    this.options.method.prototype.subscribe.call (this, callback);
}

Source.prototype.__proto__ = Object;
Source.prototype.type = "ph-source";

module.exports = Source;
