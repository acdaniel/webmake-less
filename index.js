var less = require('less'),
    path = require('path'),
    deferred = require('deferred');

exports.extension = ['less'];
exports.type = 'css';
exports.noDependencies = true;

function compileLess(src, info) {
  var def = deferred();
  less.render(src, {compress: true, paths: [path.dirname(info.filename)]}, function (err, css) {
    if (err) {
      return def.reject(new Error(err));
    }
    return def.resolve(css);
  });
  return def.promise;
}

exports.compile = function (src, info) {
  return { code: compileLess(src, info) };
};
