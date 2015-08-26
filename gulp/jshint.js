/**
 * Created by sbawkar on 8/12/2015.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
module.exports = function() {
    return gulp.src('./app/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
};
