'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('styles', function() {
  gulp.src('themes/carter-land/css/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('themes/carter-land/css/'));
});

gulp.task('default', ['styles']);
