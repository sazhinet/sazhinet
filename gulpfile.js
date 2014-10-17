var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

var paths = {
  assets: './dist/assets',
  css: './app/css/*.css',
  dist: './dist',
  images: './app/images',
  jade: './app/jade/*.jade',
  js: './app/js/*.js'
};

gulp.task('clean', function(cb) {
  del([paths.dist], cb);
});

gulp.task('favicon', ['clean'], function() {
  gulp.src(paths.images + '/favicon.ico')
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', ['clean'], function() {
  gulp.src([
    paths.images + '/*.{png,jpg,gif}',
    paths.images + '/menu/*.jpg'
  ])
    .pipe(imagemin())
    .pipe(gulp.dest(paths.assets));
});

gulp.task('css', ['clean'], function() {
  gulp.src(paths.css)
    .pipe(minifyCSS({keepBreaks:true})) //keepBreaks until start using bootstrap
    .pipe(concat('all.min.css'))
    .pipe(gulp.dest(paths.assets));
});

gulp.task('js', ['clean'], function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(gulp.dest(paths.assets));
});

gulp.task('jade', ['clean'], function() {
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

gulp.task('connect', ['default'], function() {
  connect.server({
    root: paths.dist
  });
});

gulp.task('default', ['jade', 'favicon', 'images', 'css', 'js']);
