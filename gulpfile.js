// var del = require('del');
var gulp = require('gulp');
var jade = require('gulp-jade');
var rename = require('gulp-rename');

// gulp.task('clean', function (cb) {
//   // Delete files and folders
//   // <https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md>.
//   del(['./dist'], cb);
// });

gulp.task('copy', function() {
  gulp.src('./app/images/kutkevich-org.png')
    .pipe(rename("favicon.ico"))
    .pipe(gulp.dest("./dist"));

  gulp.src('./data/gentoo/overlays.xml')
    .pipe(gulp.dest("./dist/gentoo"));
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
