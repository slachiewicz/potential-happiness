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

function findColor (index) {
    var colors = ["red", "yellow", "green", "blue", "cyan", "white"];
    return colors[index % colors.length];
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
