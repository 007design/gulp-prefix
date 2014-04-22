'use strict';
var through = require('through2'),
    fs = require('fs'),
    prefixr = require("html-prefixer");

module.exports = function(options) {

  return through.obj(function(file, enc, cb) {

    var stream = fs.createReadStream(file.path);
    
    prefixr(stream, options, function(err, text) {
      if(err) {
          console.log(err)
      }

      file.contents = text;
      stream.close();
      cb(err, file);
    });

  });
}; 