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
var less = require('gulp-less');
var merge = require('merge-stream');
var minifyCSS = require('gulp-minify-css');
var package = require('./package.json');
var revisioning = require('gulp-rev');
var rsync = require('rsyncwrapper').rsync;
var sourcemaps = require('gulp-sourcemaps');

var paths = {
  assets: 'dist/assets',
  css: 'app/css/*.css',
  dist: 'dist',
  favicon: 'app/images/favicon.ico',
  images: 'app/images/**/*.{png,jpg,gif}',
  jade: 'app/jade/**/*.jade',
  less: 'app/less/*.less',
  manifestNames: {
    adobeFlash: 'adobe-flash-manifest.json',
    images: 'images-manifest.json',
    stylesheets: 'stylesheets-manifest.json'
  },
  manifestPaths: {},
  rsync: {destination: gutil.env.destination},
  swf: 'app/swf/*.swf'
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
  return gulp.src(paths.favicon)
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

gulp.task('stylesheets', ['clean', 'images'], function() {
  return merge(
    gulp.src(paths.less)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write()) ,
    gulp.src(paths.css)
  )
    .pipe(concat(package.name + '.min.css'))
    .pipe(minifyCSS())
    .pipe(applyRevisioningManifest(paths.manifestPaths.images))
    .pipe(revisioning())
    .pipe(gulp.dest(paths.assets))
    .pipe(revisioning.manifest({path: paths.manifestNames.stylesheets}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('adobeFlash', ['clean'], function() {
  return gulp.src(paths.swf)
    .pipe(revisioning())
    .pipe(gulp.dest(paths.assets))
    .pipe(revisioning.manifest({path: paths.manifestNames.adobeFlash}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('jade', ['clean', 'images', 'stylesheets', 'adobeFlash'], function() {
  var myJadeLocals = {};

  return gulp.src([paths.jade, '!**/layouts/**/*'])
    .pipe(jade({
      locals: myJadeLocals
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(applyRevisioningManifest(paths.manifestPaths.images))
    .pipe(applyRevisioningManifest(paths.manifestPaths.stylesheets))
    .pipe(applyRevisioningManifest(paths.manifestPaths.adobeFlash))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('watch', function() {
  gulp.watch([
    paths.css,
    paths.favicon,
    paths.images,
    paths.jade,
    paths.less
  ], ['default']);
});

gulp.task('connect', ['watch', 'default'], function() {
  connect.server({
    root: paths.dist
  });
});

gulp.task(
  'rsync',
  ['clean', 'jade', 'favicon', 'images', 'stylesheets', 'adobeFlash'],
  function() {
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

gulp.task('default', ['clean', 'jade', 'favicon', 'images', 'stylesheets', 'adobeFlash']);
