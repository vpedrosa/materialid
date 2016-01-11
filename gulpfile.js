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
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('scripts', function () {
    return gulp.src('./js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('materialid.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('styles', function () {
    gulp.src('sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('materialid.min.css'))
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['production'], function () {
});

gulp.task('production', ['scripts', 'styles'], function () {
});

gulp.task('watch', function () {
    gulp.watch('./js/**/*.js', ['scripts']);
    gulp.watch('sass/main.scss', ['styles']);
});
