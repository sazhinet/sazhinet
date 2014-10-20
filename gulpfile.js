var concat = require('gulp-concat');
var connect = require('gulp-connect');
var del = require('del');
var es = require('event-stream');
var flatten = require('gulp-flatten');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var jade = require('gulp-jade');
var minifyCSS = require('gulp-minify-css');
var package = require('./package.json');
var revisioning = require('gulp-rev');
var rsync = require('rsyncwrapper').rsync;
var uglify = require('gulp-uglify');

var paths = {
  assets: 'dist/assets',
  css: 'app/css/*.css',
  dist: 'dist',
  favicon: 'app/images/favicon.ico',
  images: 'app/images/**/*.{png,jpg,gif}',
  jade: 'app/jade/**/*.jade',
  js: 'app/js/*.js',
  manifestNames: {
    css: 'css-manifest.json',
    images: 'images-manifest.json'
  },
  manifestPaths: {},
  rsync: {destination: gutil.env.destination}
};

var manifestsDir = __dirname + '/' + paths.dist + '/';
Object.getOwnPropertyNames(paths.manifestNames).map(function(property) {
  paths.manifestPaths[property] = manifestsDir + paths.manifestNames[property];
});

function applyRevisioningManifest(manifestPath) {
  var manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  var doReplace = function(file, callback) {
    if (file.contents instanceof Buffer) {
      Object.getOwnPropertyNames(manifest)
        .forEach(function(property) {
          var search = property;
          var replace = manifest[property];
          file.contents = new Buffer(
            String(file.contents).split(search).join(replace)
          );
        });
    }
    callback(null, file);
  };

  return es.map(doReplace);
};

gulp.task('clean', function(callback) {
  del([paths.dist], callback);
});

gulp.task('favicon', ['clean'], function() {
  gulp.src(paths.favicon)
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', ['clean'], function() {
  return gulp.src(paths.images)
    .pipe(flatten())
    .pipe(imagemin())
    .pipe(revisioning())
    .pipe(gulp.dest(paths.assets))
    .pipe(revisioning.manifest({path: paths.manifestNames.images}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('css', ['clean', 'images'], function() {
  return gulp.src(paths.css)
    .pipe(minifyCSS({keepBreaks:true})) //keepBreaks until start using bootstrap
    .pipe(concat(package.name + '.min.css'))
    .pipe(applyRevisioningManifest(paths.manifestPaths.images))
    .pipe(revisioning())
    .pipe(gulp.dest(paths.assets))
    .pipe(revisioning.manifest({path: paths.manifestNames.css}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('js', ['clean', 'images'], function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat(package.name + '.min.js'))
    .pipe(applyRevisioningManifest(paths.manifestPaths.images))
    .pipe(gulp.dest(paths.assets));
});

gulp.task('jade', ['clean', 'images', 'css'], function() {
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
    .pipe(applyRevisioningManifest(paths.manifestPaths.images))
    .pipe(applyRevisioningManifest(paths.manifestPaths.css))
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

gulp.task('rsync', ['default'], function() {
  rsync({
    src: paths.dist + '/*',
    dest: paths.rsync.destination,
    args: [
      '--archive',
      '--checksum',
      '--compress',
      '--delete',
      '--human-readable',
      '--partial',
      '--progress',
      '--skip-compress=jpg,gif,png,ico',
      '--stats',
      '--verbose',
    ]
  }, function (error, stdout, stderr, cmd) {
    console.log(cmd);
    if (error) {
      console.log(error);
      console.log(stderr);
    }
    console.log(stdout);
  });
});

gulp.task('test', ['default']);

gulp.task('default', ['jade', 'favicon', 'images', 'css', 'js']);
