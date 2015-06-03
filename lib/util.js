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

var _ph_colors = {};
var _colors = ["red", "green", "yellow", "blue", "magenta", "cyan", "white"];

function findColor (key) {
    if (_ph_colors[key] == undefined) {
        _ph_colors[key] = _colors[(Object.keys (_ph_colors).length + 1) % _colors.length];
    }
    return _ph_colors[key];
}

function syslog_to_log (self, data) {
    var lines = [];
    for (var i in data) {
        var item = data[i]._source;
        lines.push("{red-fg}[" + item["@timestamp"] + "]{/red-fg} " +
                   "{yellow-fg}" + item.HOST + "{/yellow-fg} " +
                   "{cyan-fg}" + item.PROGRAM + "{/cyan-fg}[" +
                   item.PID + "]: " +
                   "{green-fg}" + item["@message"] + "{/green-fg}");
    }
    self.setItems (lines);
    self.scrollTo (lines.length);
}

exports.findColor = findColor;
exports.syslog_to_log = syslog_to_log;
