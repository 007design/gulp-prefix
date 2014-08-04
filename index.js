'use strict';
var through = require('through2'),
    fs = require('fs'),
    url = require("url"),
    urljoin = require("url-join"),
    cheerio = require("cheerio");

module.exports = function(prefix, selectors, parseComments) {

  return through.obj(function(file, enc, cb) {
    if (!selectors) {
      selectors = [
      { match: "script[src]", attr: "src" },
      { match: "link[href]", attr: "href"},
      { match: "img[src]", attr: "src"},
      { match: "input[src]", attr: "src"}
      ];
    }
    
    var opts = {
      normalizeWhitespace: false,
      xmlMode: false,
      decodeEntities: false
    };

    if(!prefix)
      cb(null, file);

    else {
      var $ = cheerio.load(file.contents.toString(), opts);
    	
    	for (var a in selectors) {
        $(selectors[a].match).each(function(){
          var attrValue = this.attribs[selectors[a].attr];
          var uri = url.parse(attrValue, false, true);
          if (uri.host || !uri.path || !/^[!#$&-;=?-\[\]_a-z~\.\/]+$/.test(uri.path)) return;
          this.attribs[selectors[a].attr] = urljoin(prefix, attrValue);
        });
      }

      // if (parseComments){
      //   $('*').contents().filter(function(){ return this.type == 'comment'; }).each(function(){
      //     var $$ = cheerio.load(this.data, opts);
      //     for (var a in selectors) {
      //       $$(selectors[a].match).each(function(){
      //         var attrValue = this.attribs[selectors[a].attr];
      //         var uri = url.parse(attrValue, false, true);
      //         if (uri.host || !uri.path || !/^[!#$&-;=?-\[\]_a-z~\.\/]+$/.test(uri.path)) return;
      //         this.attribs[selectors[a].attr] = urljoin(prefix, attrValue);
      //       });
      //     }
      //     this.data = $$.html();
      //   });
      // }

      file.contents = new Buffer($.html());
      cb(null, file);
    } 
  });
};