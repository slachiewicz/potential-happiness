var blessed = require('blessed'),
    contrib = require('blessed-contrib'),
    ph = require('../lib/index'),
    path = require('path');

if (process.argv[2][0] == "/") {
    var cfg = process.argv[2];
} else {
    var cfg = path.join (process.cwd(), process.argv[2]);
}

var layout = require (cfg);

var screen = blessed.screen()

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

ph.grid (screen, layout);

screen.render();
