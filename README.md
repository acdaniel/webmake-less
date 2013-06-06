# webmake-css

## Require CSS and LESS files with [Webmake](https://github.com/medikoo/modules-webmake)

To use this extension, install it aside of Webmake:

    $ npm install webmake-css

If you use global installation of Webmake, then extension also needs to be installed globally:

    $ npm install -g webmake-css

When running Webmake, ask webmake to use it:

    $ webmake --ext=css program.js bundle.js

Same way when Webmake is used programmatically:

    webmake(inputPath, { ext: 'css' }, cb);

webmake-css can be used with any other Webmake extension, e.g.:

    $ webmake --ext=css --ext=otherext program.js bundle.js

Programmatically:

    webmake(inputPath, { ext: ['css', 'otherext'] }, cb);

The generated module contains a `src` property which contains the original CSS from the file and an `element` property 
that references the injected style tag.

    var css = require('./path/to/cssfile'); // injects the css automatically into the current page
    console.log(css.src); // writes the source of the CSS file to the console

Less files (http://lesscss.org) are also supported and will be compiled before being added to the bundle.
