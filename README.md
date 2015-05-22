potential-happiness
===================

A [riemann](http://riemann.io/) dashboard for the terminal.

Demo
----

**Riemann server statistics**
<img src="./docs/screenshots/screenshot-1.png" alt="Screenshot" width="800">

([source code][demo:1:source])

**System health & network monitoring**
<img src="./docs/screenshots/screenshot-2.png" alt="Screenshot" width="800">

([source code][demo:2:source])

 [demo:2:source]: https://raw.githubusercontent.com/algernon/potential-happiness/master/examples/madhouse-project.org.js
 [demo:1:source]: https://raw.githubusercontent.com/algernon/potential-happiness/master/examples/local-log.js

Installation
------------

```shell
git clone https://github.com/algernon/potential-happiness.git
cd potential-happiness
npm install
src/dashboard.js examples/local-riemann-stats.js
```

License
-------

Copyright (C) 2015 Gergely Nagy <algernon@madhouse-project.org>,
released under the terms of the
[GNU General Public License][gpl], version 3+.

 [gpl]: http://www.gnu.org/licenses/gpl.html
