var prefixer = require('../index.js');
var File = require('vinyl');
var fs = require('fs');

describe("Functional Tests", function(){
  var input, output;
  var prefix = "http://mydomain.com/assets";
  var f;

  beforeEach(function(){
    input = new File({ 'contents': fs.readFileSync(__dirname + '/input.html') });
    output = fs.readFileSync(__dirname + '/output.html').toString();

    var stream = prefixer(prefix, null, true);
    stream.on('data', function(newFile){
      f = newFile.contents.toString();      
    });

    runs(function(){
      stream.write(input);
      stream.end();
    });

    waitsFor(function(){
      return f;
    });
  });
    
  it("should replace the paths", function(){
    expect(f).toBe(output);
  });
});