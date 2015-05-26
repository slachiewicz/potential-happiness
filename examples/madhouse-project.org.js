/*
 * This is the configuration used by the author.
 */

var ph = require ('../lib/index');

module.exports = {
    grid: {rows: 11, cols: 16},
    defaults: {
        source: {host: "10.243.42.34"}
    },
    widgets: [
        {widget: ph.widgets.line_chart,
         options: {label: "Network RX (kbps)",
                   source: {query: 'service =~ "interface-%/if_octets/rx" and not service =~ "%docker%" and metric > 0'}},
         width: 8,
         height: 5},
        {widget: ph.widgets.line_chart,
         options: {label: "Network TX (kbps)",
                   source: {query: 'service =~ "interface-%/if_octets/tx" and not service =~ "%docker%" and metric > 0'}},
         width: 8,
         height: 5},

        {widget: ph.widgets.bar_chart,
         options: {label: "CPU used %",
                   maxHeight: 100,
                   source: {query: 'service = "cpu-average/cpu-used" and not tagged "summary"',
                            transform: ph.transform.trim_to_fixed (1)}},
         width: 3,
         height: 2},
        {widget: ph.widgets.bar_chart,
         options: {label: "Load/5",
                   maxHeight: 4,
                   source: {query: 'service = "load/load/midterm" and not tagged "summary"'}},
         width: 3,
         height: 2},
        {widget: ph.widgets.text,
         options: {label: "# Load/5",
                   source: {query: 'tagged "summary" and service = "load/load/midterm"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 2,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Mem (gb)",
                   source: {query: 'tagged "summary" and service = "memory/memory-used"',
                            transform: ph.transform.trim_to_fixed (2)}},
         pos_x: 6,
         pos_y: 6,
         width: 2,
         height: 1},

        {widget: ph.widgets.text,
         options: {label: "Logs",
                   source: {query: 'false'}},
         width: 8,
         height: 6},

        {widget: ph.widgets.bar_chart,
         options: {label: "Memory use %",
                   maxHeight: 100,
                   source: {query: 'service = "memory/percent-used" and not tagged "summary"',
                            transform: ph.transform.trim_to_fixed (1)}},
         pos_x: 0,
         pos_y: 7,
         width: 3,
         height: 2},
        {widget: ph.widgets.bar_chart,
         options: {label: "Disk / free %",
                   maxHeight: 100,
                   source: {query: 'service = "df-root/percent_bytes-free"',
                            transform: ph.transform.trim_to_fixed (1)}},
         pos_x: 3,
         pos_y: 7,
         width: 3,
         height: 2},
        {widget: ph.widgets.text,
         options: {label: "# Net kbps",
                   source: {query: 'service = "total network traffic"',
                            transform: ph.transform.trim_to_fixed (2)}},
         pos_x: 6,
         pos_y: 7,
         width: 2,
         height: 1},

        {widget: ph.widgets.sparkline,
         options: {label: "SSH invalid logins",
                   source: {query: 'service =~ "tail-auth/counter-sshd-invalid_user"'}},
         pos_x: 0,
         pos_y: 9,
         width: 8,
         height: 2},
    ]
};
