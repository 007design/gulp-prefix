var prefixer = require('../index.js');
var fs = require('fs');
var i = 1;

describe("Functional Tests", function(){
  var input, output;
  var prefix = "http://mydomain.com/assets";
  var f;

  beforeEach(function(){
    input = fs.createReadStream(__dirname + '/input'+i+'.html');
    output = fs.readFileSync(__dirname + '/output'+i+'.html').toString();

    var stream = prefixer(prefix);
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
});