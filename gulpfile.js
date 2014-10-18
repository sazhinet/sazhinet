var commander = require('commander');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var flatten = require('gulp-flatten');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var uglify = require('gulp-uglify');

commander
  .option('-p, --path [path]', 'Rsync destenation path', '/var/www/sazhinet')
  .parse(process.argv);

var paths = {
  assets: './dist/assets',
  css: './app/css/*.css',
  dist: './dist',
  favicon: './app/images/favicon.ico',
  images: './app/images/**/*.{png,jpg,gif}',
  jade: './app/jade/**/*.jade',
  js: './app/js/*.js'
};

gulp.task('clean', function(callback) {
  del([paths.dist], callback);
});

gulp.task('favicon', ['clean'], function() {
  gulp.src(paths.favicon)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', ['clean'], function() {
  gulp.src(paths.images)
    .pipe(flatten())
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

  gulp.src([paths.jade, '!**/layouts/**/*'])
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

gulp.task('watch', function() {
  gulp.watch([
    paths.jade,
    paths.favicon,
    paths.images,
    paths.css,
    paths.js
  ], ['default']);
});

gulp.task('connect', ['watch', 'default'], function() {
  connect.server({
    root: paths.dist
  });
});

gulp.task('test', ['default']);

gulp.task('default', ['jade', 'favicon', 'images', 'css', 'js']);
