/**
 * Copyright © 2016 Beebit Solutions
 * All rights reserved
 * Licensed under MIT License
 * Author: Valentín Pedrosa
 * contacto@beebit.es
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');

gulp.task('scripts', function() {
    return gulp.src('./js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('materialid.js'))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('styles', function() {
    gulp.src('sass/main.scss')
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
        .pipe(concat('materialid.css'))
	.pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', function() {
    gulp.watch('sass/main.scss',['styles']);
    gulp.watch('./js/**/*.js',['scripts']);
});

gulp.task('production', ['scripts','styles'], function() {
});
