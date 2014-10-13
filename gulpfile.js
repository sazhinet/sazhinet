// var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

gulp.task('images', function() {
  gulp.src('./app/images/favicon.ico')
    .pipe(gulp.dest('./dist/'));

  gulp.src('./app/images/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));

  gulp.src('./app/images/top_menu/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/modules/mod_mljoostinamenu/menuimages'));
});

gulp.task('css', function() {
  gulp.src('./app/css/*.css')
    .pipe(gulp.dest('./dist/assets/'));
});

gulp.task('jade', function() {
  var myJadeLocals = {};

  gulp.src('./app/jade/*.jade')
    .pipe(jade({
      locals: myJadeLocals
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['jade', 'images', 'css']);
