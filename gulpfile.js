var gulp = require('gulp'),
    prefix = require('./index.js');

gulp.task('prefix', function(){
  var prefixUrl = "http://mydomain.com/assets";

  return gulp.src('./spec/input1.html')
    .pipe(prefix(prefixUrl, null, true))
    .pipe(gulp.dest('./build'));
});

gulp.task('default', ['prefix']);