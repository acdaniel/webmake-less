var path = require('path'),
    less = require('less'),
    deferred = require('deferred');

exports.extension = ['css', 'less'];
exports.noDependencies = true;

function buildCode(css) {
  var formattedCss = css.replace(/\"/g, '\\"').trim().replace(/\n/g, '\\n" + \n"');
  var code =
    'var src = "' + formattedCss + '";\n' +
    'var style = document.createElement("style"); style.type="text/css"; style.appendChild(document.createTextNode(src)); document.getElementsByTagName("head")[0].appendChild(style);\n' +
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
  var ext = path.extname(info.filename),
      code = null;
  if (ext === '.less') {
    code = compileLess(info.filename, src);
  } else {
    code = buildCode(src);
  }
  return { code: code };
};
