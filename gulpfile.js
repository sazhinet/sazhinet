// var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('copy', function() {
  gulp.src('./app/images/logo_main.png')
    .pipe(gulp.dest("./dist/images"));
});

gulp.task('jade', function() {
  var myJadeLocals = {};

  gulp.src('./app/jade/*.jade')
    .pipe(jade({
      locals: myJadeLocals
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['jade', 'copy']);
