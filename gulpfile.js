/**
 * Handcrafted with ♥ Beebit Solutions
 * Real coffee was used in this project development
 * Licensed under MIT License
 * contacto@beebit.es
 */

var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('scripts', function () {
    return gulp.src(['./js/**/*.js','./language/*.js'])
        .pipe(sourcemaps.init())
        .pipe(concat('materialid.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./maps/'))
        .pipe(gulp.dest('./dist/'));
});
gulp.task('styles', function () {
    gulp.src('sass/*.scss')
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
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('js/*.js', ['scripts']);
    gulp.watch('sass/*.scss', ['styles']);
});
