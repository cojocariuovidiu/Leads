'use strict';

/* -------------------------------------------------------------
Leads Development & Production Builds

 Three Modes:

 1) native development: (no gulp automation) references to native vendor & app files

 2) development: references to app.js & app.css - bundled but not minified
    --  npm run build:dev

 3) production: references app.js & app.css - bundled and minified
    --  npm run build:prod

 -------------------------------------------------------------- */

var gulp        = require('gulp')
  , gutil       = require('gulp-util')
  , gulpIf      = require('gulp-if')
  , install     = require('gulp-install')
  , clean       = require('gulp-clean')
  , jshint      = require('gulp-jshint')
  , concat      = require('gulp-concat')
  , uglify      = require('gulp-uglify')
  , cssmin      = require('gulp-cssmin')
  , stripDebug  = require('gulp-strip-debug')
  , htmlreplace = require('gulp-html-replace')
  , minifyhtml  = require('gulp-minify-html')
  , sourcemaps  = require('gulp-sourcemaps')
  , gzip        = require('gulp-gzip')
  , stylish     = require('jshint-stylish')
  , less        = require('gulp-less')
  , notify      = require('gulp-notify')
  , runSequence = require('run-sequence')
  , rename      = require('gulp-rename')
  , debug       = require('gulp-debug')
  , del         = require('del')
  , zip         = require('gulp-zip');

var project = 'leads'
  , verbose = true
  , environ = process.env.NODE_ENV || 'development'
  , useGzip  = false
  , useSourceMap = false;


// core directories
var dev = {
  base: 'client/development/',
  app:  'app/',
  libs: 'libs/',
  css:  'css/',
  archive: 'archives/'
};
var prod = {
  base: 'client/production/',
  app:  'app/'
};

// file paths - built off core directories
var paths = {
  clean: [
    prod.base
  ],
  hintJS: [
      // scripts for linting
      'gulpfile.js',
      dev.base + '**/*.js',
      '!' + dev.base + dev.libs + '**/*.js'], // exclude vendor files
  appJS: [
      // project angular app files
      // dependency ordered: modules first
      dev.base + dev.app + 'app-modules.js',  // core modules
      // and the rest of the app
      dev.base + dev.app + '**/*.js'
  ],
  libJS: [
      // support libraries
      dev.base + dev.libs + 'jquery/dist/jquery.js',
      dev.base + dev.libs + 'bootstrap/dist/js/bootstrap.js',
      dev.base + dev.libs + 'lodash/dist/lodash.js',
      // angular core libraries
      dev.base + dev.libs + 'angular/angular.js',
      dev.base + dev.libs + 'angular-resource/angular-resource.js',
      dev.base + dev.libs + 'angular-route/angular-route.js',
      dev.base + dev.libs + 'angular-messages/angular-messages.js',
      // 3rd party vendor libraries
      // angular-ui
      dev.base + dev.libs + 'angular-bootstrap/ui-bootstrap.js',
      dev.base + dev.libs + 'angular-ui-utils/ui-utils.js',
      dev.base + dev.libs + 'angular-ui-utils/ui-utils-ieshiv.js',
      dev.base + dev.libs + 'angular-ui-router/release/angular-ui-router.js',
      dev.base + dev.libs + 'angular-ui-select/dist/select.js',
      // others
      dev.base + dev.libs + 'toastr/toastr.min.js'
  ],
  libCSS: [
      dev.base + dev.libs + 'bootstrap/dist/css/bootstrap.css',
      dev.base + dev.libs + 'bootstrap/dist/css/bootstrap-theme.css',
      dev.base + dev.libs + 'font-awesome/css/font-awesome.css',
      dev.base + dev.libs + 'toastr/toastr.css',
      dev.base + dev.libs + 'angular-ui-select/dist/select.css'
  ],
  appLess: [
      dev.base + dev.css + 'styles.less'
  ],
  appCSS: [
    dev.base + dev.css + 'styles.css'
  ],
  fonts: [
    dev.base + dev.libs + 'bootstrap/dist/fonts/*.*',
    dev.base + dev.libs + 'fontawesome/fonts/*.*'
  ],
  html: {
    index: dev.base + 'index.html',
    files: [dev.base + '**/*.html', '!' + dev.base + 'index.html']
  },
  archive: [
    '!client/development/libs/**/*.*',
    'client/development/**/*.*',
    './**/*'
  ],
  excludes: [ // reusable ??
    '!.git/**/*',
    '!node_modules/**/*',
    '!vendor/**/*',
    '!libs/**/*',
    '!image/**/*',
    '!img/**/*',
    '!build/**/*',
    '!archives/**/*',
    '!temp/**/*',
    '!tmp/**/*',
    '!npm-debug.log',
    '!nohup.out',
    '!nohup.err'
  ],
  serverAll: [
    './leads-server.js',
    './server/**/*.js'
  ],
  styles:  [dev.base + 'css/*.css'],
  less:    [dev.base + 'css/*.less']

};


gutil.log('Gulp running in: ' + environ);

gulp
  // ------------------------------------------------
  // Clean Tasks
  //
  .task('clean', function(cb) {
    // clean production
    del(prod.base, function(){
      cb(null);
    });
  })

  // ------------------------------------------------
  // Install Tasks
  //
  .task('install:bower', function() {
    // install vendor libraries
    return gulp
      .src(['./bower.json'])
      .pipe(install());
  })


  // ------------------------------------------------
  // Test Tasks
  //
  .task('lint', function() {
    return gulp
      .src(paths.hintJS)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter('default'));
  })

  // ------------------------------------------------
  // JS Build Tasks
  //
  .task('js', function() {
    // concatenate vendor and app JS files
    logTask('js', paths.libJS.concat(paths.appJS), prod.base);

    return gulp
      .src(paths.libJS.concat(paths.appJS))
      .pipe(gulpIf(environ==='production' && useSourceMap===true, sourcemaps.init()))
      .pipe(concat('bundle.js'))
      .pipe(gulpIf(environ==='production', stripDebug()))
      .pipe(gulpIf(environ==='production', uglify({mangle:false})))
      .pipe(gulpIf(environ==='production' && useGzip===true, gzip()))
      .pipe(rename('app.js'))
      .pipe(gulpIf(environ==='production' && useSourceMap===true, sourcemaps.write()))
      .pipe(gulp.dest(prod.base));
  })

  // ------------------------------------------------
  // CSS Build Tasks
  //
  .task('less', function() {
    return gulp
      .src(paths.less)
      .pipe(less())
      .pipe(rename('app.css'))
      .pipe(gulp.dest(dev.css));
  })

  .task('css', function() {
    // concatenate & minify style CSS files
    logTask('css', paths.libCSS.concat(paths.appCSS), prod.base);

    gulp
      .src(paths.libCSS.concat(paths.appCSS))
      .pipe(concat('lib.concat.css'))
      .pipe(gulpIf(environ==='production', cssmin()))
      .pipe(gulpIf(environ==='production' && useGzip===true, gzip()))
      .pipe(rename('app.css'))
      .pipe(gulp.dest(prod.base));
  })

  .task('fonts', function() {
    // copy over all HTML besides index.html
    var stream = gulp
      .src(paths.fonts)
      .pipe(gulp.dest(prod.base + 'fonts/'));

    return stream;
  })

  // ------------------------------------------------
  // HTML Build Tasks
  //
  .task('html:copy', function() {
    // copy HTML besides index.html into production
    logTask('html:copy', paths.html.files , prod.base);

    return  gulp
      .src(paths.html.files, {
        src: dev.base
      })
      .pipe(gulpIf(environ==='production', minifyhtml()))
      .pipe(gulp.dest(prod.base));
  })
  .task('index:prep', function(){
    // index.html (replace script & css references)
    // minify & move into production
    logTask('index:prep', paths.html.index, prod.base);

    return gulp
      .src(paths.html.index)
      .pipe(htmlreplace({
        css: 'app.css',
        scripts: 'app.js'
      }))
      .pipe(gulpIf(environ==='production', minifyhtml()))
      .pipe(gulp.dest(prod.base));
  })
  .task('html', ['html:copy','index:prep'], function() {
    // combined html and index tasks
    if (verbose) gutil.log('Completed HTML Tasks');
  })

  // ------------------------------------------------
  // Archive Build Tasks
  //
  .task('archive:project', function() {
    var filename = project + '-' + getTodayAsString() + '.zip';
    logTask('archive', paths.excludes.concat(paths.archive), dev.archive + filename);
    return gulp
      .src(paths.excludes.concat(paths.archive))
      .pipe(zip(filename))
      .pipe(gulp.dest(dev.archive));
  })

  // ------------------------------------------------
  // Combined Tasks
  //
  .task('default', [
      'clean',
      'lint',
      'js',
      'css',
      'fonts',
      'html'
  ], function() {
    gutil.log(gutil.colors.cyan('Build process is complete'));
  })
  .task('build', function() {
    // build sequentially
    runSequence(
      'clean',
      'lint',
      'js',
      'css',
      'fonts',
      'html'
    );
  });

function logTask(task, inComing, outGoing ){
  if(verbose){
    gutil.log('Task: ', task);
    gutil.log('Read: ', inComing);
    gutil.log('Write: ', outGoing);
  }
}

function getTodayAsString(){
  var now = new Date();
  function padWithZero(item){
    return ('0' + item).slice(-2);
  }
  return now.getFullYear() + padWithZero(now.getMonth() + 1) + padWithZero(now.getDate());
}
