gulp-prefix
=========

A gulp plugin inspired by [html-prefixer](https://github.com/tivac/node-html-prefixer).

Will prefix relative urls in &lt;link&gt;, &lt;script&gt; and &lt;img&gt; tags

You can optionally pass a second argument along with the prefix string to override the default selection statements.
The default config looks like this:

```
[
  { match: "script[src]", attr: "src" },
  { match: "link[href]", attr: "href"},
  { match: "img[src]", attr: "src"},
  { match: "input[src]", attr: "src"},
  { match: "img[data-ng-src]", attr: "data-ng-src"}
]
```


_Disclaimer:_
This plugin uses trumpet which takes in a stream of files. Gulp plugins take a stream of vinyl file objects. To interface the two I use `fs.createReadStream(file.path)`  I'm not sure if there's a better way to do this

###HTML
```html
<html>
  <head>
    <link href="http://cdnjs.com/some-library.css">
    <link href="css/stylesheets.js">
  </head>
  <body>
    <img src="/images/myImage.jpg"/>
    <script src="//cdnjs.com/some-library.js"></script>
    <script src="js/scripts.js"></script>
  </body>
</html>
```



###Usage
```javascript
var gulp = require('gulp'),
    prefix = require('gulp-prefix');

gulp.task('prefix', function(){
  var prefix = "http://mydomain.com/assets";

  gulp.src('index.html')
    .pipe(prefix( prefix ))
    .pipe(gulp.dest('build'));
});
```

###Output
```html
<html>
  <head>
    <link href="http://cdnjs.com/some-library.css">
    <link href="http://mydomain.com/assets/css/stylesheets.js">
  </head>
  <body>
    <img src="http://mydomain.com/assets/images/myImage.jpg"/>
    <script src="//cdnjs.com/some-library.js"></script>
    <script src="http://mydomain.com/assets/js/scripts.js"></script>
  </body>
</html>
```

License
----

MIT
    
