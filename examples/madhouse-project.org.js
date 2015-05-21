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
        {widget: ph.widgets.log,
         options: {label: "Events @ morgoth",
                   source: {query: 'host = "morgoth"'}
                  },
         width: 6,
         height: 6},
        {widget: ph.widgets.log,
         options: {label: "Events @ eowyn",
                   source: {query: 'host = "eowyn"'}
                  },
         width: 6,
         height: 6},
        {widget: ph.widgets.line_chart,
         options: {label: "Memory usage %",
                   source: {query: 'service = "memory/percent-used"'}},
         width: 12,
         height: 6}
    ]
};
