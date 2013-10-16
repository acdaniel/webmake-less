# webmake-less

## Require LESS files with [Webmake](https://github.com/medikoo/modules-webmake)

To use this extension, install it aside of Webmake:

    $ npm install webmake-less

If you use global installation of Webmake, then extension also needs to be installed globally:

    $ npm install -g webmake-less

When running Webmake, ask webmake to use it:

    $ webmake --ext=less program.js bundle.js

Same way when Webmake is used programmatically:

    webmake(inputPath, { ext: 'less' }, cb);

webmake-less can be used with any other Webmake extension, e.g.:

    $ webmake --ext=less --ext=otherext program.js bundle.js

Programmatically:

    require('./path/to/lessfile'); // injects the resulting CSS automatically into the current page
