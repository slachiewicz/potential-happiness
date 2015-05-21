/*
 * This is the configuration used by the author.
 */

var ph = require ('../lib/index');

module.exports = {
    grid: {rows: 12, cols: 12},
    defaults: {
        source: {host: "10.243.42.34"}
    },
    widgets: [
        {widget: ph.widgets.line_chart,
         options: {label: "Memory usage %",
                   source: {query: 'service = "memory/percent-used"'}},
         width: 12,
         height: 5},

        {widget: ph.widgets.sparkline,
         options: {label: "CPU usage %",
                   source: {query: 'service = "cpu-average/cpu-used" and not tagged "summary"'},
                   width: 200},
         width: 11,
         height: 3},
        {widget: ph.widgets.text,
         options: {label: "Total load",
                   source: {query: 'tagged "summary" and service = "load/load/shortterm"'}},
         width: 1,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Mem (gb)",
                   source: {query: 'tagged "summary" and service = "memory/memory-used"'}},
         pos_x: 11,
         width: 1,
         height: 1},
        {widget: ph.widgets.text,
         options: {label: "# Net kbps",
                   source: {query: 'service = "total network traffic"'}},
         pos_x: 11,
         pos_y: 7,
         width: 1,
         height: 1},

        {widget: ph.widgets.log,
         options: {label: "Events @ morgoth",
                   source: {query: 'host = "morgoth"'}
                  },
         width: 4,
         height: 3},
        {widget: ph.widgets.log,
         options: {label: "Events @ beleg",
                   source: {query: 'host = "beleg"'}
                  },
         width: 4,
         height: 3},
        {widget: ph.widgets.log,
         options: {label: "Events @ eowyn",
                   source: {query: 'host = "eowyn"'}
                  },
         width: 4,
         height: 3},
    ]
};
