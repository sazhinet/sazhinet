// var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');

gulp.task('copy', function() {
  gulp.src('./app/images/favicon.ico')
    .pipe(gulp.dest("./dist/"));
  gulp.src('./app/images/*.{png,jpg,gif}')
    .pipe(gulp.dest("./dist/images"));
  gulp.src('./app/css/*.css')
    .pipe(gulp.dest("./dist/assets/"));
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
