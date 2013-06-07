var less = require('less'),
    path = require('path'),
    deferred = require('deferred');

exports.extension = ['less'];
exports.noDependencies = true;

function buildCode(css) {
  var formattedCss = css.replace(/\"/g, '\\"').trim().replace(/\n/g, '\\n" + \n"');
  var code =
    'var src = "' + formattedCss + '";\n' +
    'var style = document.getElementsByTagName("style")[0] || document.createElement("style"); style.type="text/css"; style.appendChild(document.createTextNode(src)); document.getElementsByTagName("head")[0].appendChild(style);\n' +
    'module.exports = {src: src, element: style};';
  return code;
}

function compileLess(filename, src) {
  var def = deferred();
  less.render(src, {compress: true, paths: [path.dirname(filename)]}, function (err, css) {
    if (err) {
      return def.reject(new Error(err));
    }
    return def.resolve(buildCode(css));
  });
  return def.promise;
}

exports.compile = function (src, info) {
  return { code: compileLess(info.filename, src) };
};
