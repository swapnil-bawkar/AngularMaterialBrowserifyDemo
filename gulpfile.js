/**
 * Created by sbawkar on 8/7/2015.
 */
var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ngHtml2Js = require('browserify-ng-html2js');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');
var myHint = require('./gulp/jshint.js');
var eslint = require('gulp-eslint');

var production = false;
gulp.task('eslint', function() {
    return gulp.src(['./app/**/*.js', '!./app/shared/jsonxml/*'])
            // eslint() attaches the lint output to the eslint property
            // of the file object so it can be used by other modules.
            .pipe(eslint())
            // eslint.format() outputs the lint results to the console.
            // Alternatively use eslint.formatEach() (see Docs).
            .pipe(eslint.format())
            // To have the process exit with an error code (1) on
            // lint error, return the stream and pipe to failOnError last.
            .pipe(eslint.failOnError());
});

gulp.task('browserify', ['eslint'], function() {
    // Grabs the app.js file
    return browserify('./app/app.js',{debug: !production, insertGlobals: true})
        .transform(ngHtml2Js({
            module: 'templates' // optional module name
        }))
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source(production ? 'bundle.js' : 'bundle-min.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js/'));
});
gulp.task('uglify', function() {
   return gulp.src('./dist/js/bundle.js')
       .pipe(uglify())
       .pipe(rename('bundle-min.js'))
       .pipe(gulp.dest('./dist/js/'));
});
gulp.task('material-css', function() {
    return gulp.src('./node_modules/angular-material/angular-material.min.css')
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('sass', function() {
    return sass('./app/sass/style.scss',{compass: true, sourcemap: true, style: production ? 'compressed' : 'expanded'})
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src('./app/images/**/*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('reload', function() {
    console.log('reload');
    return browserSync.reload();
});
gulp.task('watch', function() {
    gulp.watch(['app/**/*.js', 'app/**/*.html'], function() {
        runSequence('browserify', 'reload');
    });
    // Watches for changes in style.scss and runs the sass task
    gulp.watch('app/sass/style.scss', function() {
        runSequence('sass', 'reload');
    });
});

gulp.task('server', function () {
    // Static server
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('clean', function () {
    return gulp.src('dist', {read: false})
        .pipe(clean());
});

gulp.task('connect', function(){
    production = false;
    runSequence('clean','browserify', 'material-css', 'sass','images', 'server', 'watch');
});

gulp.task('production', function() {
    production = true;
    runSequence('clean','browserify', 'uglify', 'material-css', 'sass','images');
});

gulp.task('default', function() {
    production = false;
    runSequence('clean','browserify','material-css', 'sass','images');
});