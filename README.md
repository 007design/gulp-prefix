gulp-prefix
=========

A gulp plugin for html-prefixer.

```
var gulp = require('gulp'),
    prefix = require('gulp-prefix');

gulp.task('prefix', function(){
  var context = { 'prefix': "123456" };

  gulp.src('index.html')
    .pipe(prefix( context ))
    .pipe(gulp.dest('build'));
});
```


License
----

MIT
    