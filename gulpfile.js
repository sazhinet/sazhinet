// var del = require('del');
var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');

var paths = {
  css: './app/css/*.css',
  dist: './dist',
  images: './app/images',
  jade: './app/jade/*.jade'
};

gulp.task('images', function() {
  gulp.src(paths.image + '/favicon.ico')
    .pipe(gulp.dest(paths.dist));

  gulp.src(paths.image + '/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/images'));

  gulp.src(paths.image + '/top_menu/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/modules/mod_mljoostinamenu/menuimages'));
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(gulp.dest(paths.dist + '/assets/'));
});

gulp.task('jade', function() {
  var myJadeLocals = {};

  gulp.src(paths.jade)
    .pipe(jade({
      locals: myJadeLocals
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['jade', 'images', 'css']);
