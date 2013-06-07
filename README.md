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

    webmake(inputPath, { ext: ['less', 'otherext'] }, cb);

The generated module contains a `src` property which contains the resulting CSS from the file and an `element` property 
that references the injected style tag.

    var less = require('./path/to/lessfile'); // injects the resulting CSS automatically into the current page
    console.log(less.src); // writes the source of the CSS file to the console
