var prefixer = require('../index.js');
var fs = require('fs');
var gulp = require('gulp');
var i = 1;

describe("Functional Tests", function(){
  var output;
  var prefix = "http://mydomain.com/assets";
  var f;
  var ignore = '{{';

  beforeEach(function(){
    output = fs.readFileSync(__dirname + '/output'+i+'.html').toString();

    gulp.src(__dirname + '/input'+i+'.html')
      .pipe(prefixer(prefix, '', ignore))
      .on('data', function(file){
        f = file.contents.toString();       
      });

    waitsFor(function(){
      return f;
    }, 'f to equal something', 1000000);
  });

  afterEach(function(){
    i++;
    f = null;
  });
    
  it("should replace the paths", function(){
    expect(f).toBe(output);
  });
    
  it("should not care about white space", function(){
    expect(f).toBe(output);
  });
    
  it("should ignore ruby", function(){
    expect(f).toBe(output);
  });

  it("should ignore paths with invalid characters", function(){
    expect(f).toBe(output);
  });
});