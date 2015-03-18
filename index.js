'use strict';
var through = require('through2'),
    fs = require('fs'),
    url = require("url"),
    urljoin = require("url-join"),
    trumpet = require("trumpet"),
    concat  = require("concat-stream"),
    _prefixer;

_prefixer = function(prefix, attr, invalid) {
  return function(node) {
    node.getAttribute(attr, function(uri) {
      var output;

      uri = url.parse(uri, false, true);

      if(uri.host || !uri.path)
        return;
      
      if (!/^[!#$&-;=?-\[\]_a-z~\.\/\{\}]+$/.test(uri.path)) {
        return;
      }

      if (invalid && new RegExp(invalid).test(uri.path)){
        return;
      }

      var file_prefix = (typeof prefix === 'function') ? prefix(uri) : prefix;

      node.setAttribute(attr, urljoin(file_prefix, uri.path));
    });
  };
};

module.exports = function(prefix, selectors, ignore) {

  return through.obj(function(file, enc, cb) {

    if (!selectors) {
      selectors = [
      { match: "script[src]", attr: "src" },
      { match: "link[href]", attr: "href"},
      { match: "img[src]", attr: "src"},
      { match: "input[src]", attr: "src"},
      { match: "img[data-ng-src]", attr: "data-ng-src"}
      ];
    }
    
    if(!prefix)
      cb(null, file);

    else {
      var tr = trumpet();
      
      for (var a in selectors)
        tr.selectAll(selectors[a].match, _prefixer(prefix, selectors[a].attr, ignore))

      var stream = fs.createReadStream(file.path);

      tr.pipe(concat(function concatDone(data) {
        if (Array.isArray(data) && data.length === 0) data = null;
        file.contents = data;
        stream.close();
        cb(null, file);
      }));

      stream.pipe(tr);   
    } 
  });
};
