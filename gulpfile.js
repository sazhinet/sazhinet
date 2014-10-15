// var del = require('del');
var concat = require('gulp-concat');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var paths = {
  css: './app/css/*.css',
  dist: './dist',
  images: './app/images',
  jade: './app/jade/*.jade',
  js: './app/js/*.js'
};

gulp.task('images', function() {
  gulp.src(paths.images + '/favicon.ico')
    .pipe(gulp.dest(paths.dist));

  gulp.src(paths.images + '/*.{png,jpg,gif}')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/images'));

  gulp.src(paths.images + '/top_menu/*.jpg')
    .pipe(imagemin())
    .pipe(gulp.dest(paths.dist + '/modules/mod_mljoostinamenu/menuimages'));
});

gulp.task('css', function() {
  gulp.src(paths.css)
    .pipe(minifyCSS({keepBreaks:true})) //keepBreaks until start using bootstrap
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(paths.dist + '/assets/'));
});

gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.dist + '/assets/'));
});

gulp.task('jade', function() {
  var myJadeLocals = {};

  gulp.src(paths.jade)
    .pipe(jade({
      locals: myJadeLocals
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('default', ['jade', 'images', 'css', 'js']);
