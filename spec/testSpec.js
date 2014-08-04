var prefixer = require('../index.js');
var File = require('vinyl');
var fs = require('fs');

describe("Functional Tests", function(){
  var input, output;
  var prefix = "http://mydomain.com/assets";
  var f;
    
  it("should replace the paths", function(){
    input = new File({ 'contents': fs.readFileSync(__dirname + '/input1.html') });
    output = fs.readFileSync(__dirname + '/output1.html').toString();

    var stream = prefixer(prefix);
    stream.on('data', function(newFile){
      f = newFile.contents.toString();      
    });
    stream.write(input);
    stream.end();

    expect(f).toBe(output);
  });
    
  it("should not care about white space", function(){
    input = new File({ 'contents': fs.readFileSync(__dirname + '/input2.html') });
    output = fs.readFileSync(__dirname + '/output2.html').toString();

    var stream = prefixer(prefix);
    stream.on('data', function(newFile){
      f = newFile.contents.toString();      
    });
    stream.write(input);
    stream.end();

    expect(f).toBe(output);
  });
});