/*
 * A dashboard for Riemann stats
 */

var ph = require ('../lib/index');

module.exports = {
    grid: {rows: 9, cols: 18},
    defaults: {
        source: {host: process.env.RIEMANN_HOST || "127.0.0.1"}
    },
    widgets: [
        {widget: ph.widgets.text,
         options: {label: "# Streams latency 0.999",
                   source: {query: 'service = "riemann streams latency 0.999"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Streams latency 0.99",
                   source: {query: 'service = "riemann streams latency 0.99"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Streams latency 0.95",
                   source: {query: 'service = "riemann streams latency 0.95"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Streams latency 0.5",
                   source: {query: 'service = "riemann streams latency 0.5"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Streams latency 0.0",
                   source: {query: 'service = "riemann streams latency 0.0"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Streams rate",
                   source: {query: 'service = "riemann streams rate"',
                            transform: ph.transform.trim_to_fixed (2)}},
         width: 3,
         height: 1},

        {widget: ph.widgets.line_chart,
         options: {label: "Streams latencies",
                   width: 100,
                   source: {query: 'service =~ "riemann streams latency %"',
                            transform: function (data) {
                                d = new Date (Date.parse (data.time));
                                data.host = data.service.substr (24);
                                data.time = d.toLocaleTimeString ();
                                return data;
                            }}},
         width: 18,
         height: 4},

        {widget: ph.widgets.line_chart,
         options: {label: "Servers in rate",
                   width: 100,
                   legend: {width: 24},
                   source: {query: 'service =~ "riemann server % in rate"',
                            transform: function (data) {
                                d = new Date (Date.parse (data.time));
                                data.host = data.service.substr (15).slice (0, -8);
                                data.time = d.toLocaleTimeString ();
                                return data;
                            }}},
         width: 18,
         height: 4}
    ]
};
