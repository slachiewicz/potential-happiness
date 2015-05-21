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
