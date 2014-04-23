'use strict';
var through = require('through2'),
    fs = require('fs'),
    url = require("url"),
    trumpet = require("trumpet"),
    concat  = require("concat-stream"),
    _prefixer;

_prefixer = function(options, attr) {
    return function(node) {
        node.getAttribute(attr, function(uri) {
            var output;

            uri = url.parse(uri, false, true);

            // No sense in trying to work with these monsters
            if(uri.host || !uri.path) {
                return;
            }

            node.setAttribute(attr, url.resolve(options.prefix, uri.path));
        });
    };
};

module.exports = function(options) {
  
  return through.obj(function(file, enc, cb) {
    var tr = trumpet();

    tr.selectAll("script[src]", 			_prefixer(options, "src"));
    tr.selectAll("link[href]",  			_prefixer(options, "href"));
    tr.selectAll("img[src]",    			_prefixer(options, "src"));
    tr.selectAll("input[src]",    		_prefixer(options, "src"));
    tr.selectAll("img[data-ng-src]",	_prefixer(options, "data-ng-src"));

    var stream = fs.createReadStream(file.path);
    
    // No prefix
    if(!options.prefix)
        cb(null, file);
    
    tr.pipe(concat(function concatDone(data) {
      file.contents = data;
      stream.close();
      cb(null, file);
    }));

    stream.pipe(tr);    
  });
};