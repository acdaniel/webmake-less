var less = require('less'),
    path = require('path'),
    deferred = require('deferred');

exports.extension = ['less'];
exports.noDependencies = true;

function buildCode(css, info) {
  var formattedCss = css.replace(/\"/g, '\\"').trim().replace(/\n/g, '\\n" + \n"'),
      file = info.localFilename,
      code =
        'var element, src = "/* begin: ' + file + ' */\\n" +\n"' + formattedCss + '\\n" + \n"/* end: ' + file + ' */";\n' +
        'var style, styles = document.getElementsByTagName("style");\n' +
        'if (styles.length > 0) {\n' +
        '  style = styles[styles.length-1];\n' +
        '} else {\n' +
        '  style = document.createElement("style");\n' +
        '  style.type="text/css";\n' +
        '  document.getElementsByTagName("head")[0].appendChild(style);\n' +
        '}\n' +
        'style.appendChild(document.createTextNode(src));\n' +
        'module.exports = {src: src, element: element, file: "' + file + '"};';
  return code;
}

function compileLess(src, info) {
  var def = deferred();
  less.render(src, {compress: true, paths: [path.dirname(info.filename)], dumpLineNumbers: 'mediaquery'}, function (err, css) {
    if (err) {
      return def.reject(new Error(err));
    }
    return def.resolve(buildCode(css, info));
  });
  return def.promise;
}

exports.compile = function (src, info) {
  return { code: compileLess(src, info) };
};
