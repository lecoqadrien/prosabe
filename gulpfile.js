const { series, parallel, src, dest, watch } = require('gulp');
const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const gulpif = require('gulp-if');
const pxtorem = require('gulp-pxtorem');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');



const server = browserSync.create();
const prod = process.env.NODE_ENV === 'prod';

function html() {
  return src('src/*.pug')
    .pipe(pug())
    .pipe(dest('dist'));
}

function css() {
  return src('src/scss/styles.scss')
  .pipe(sass())
  .pipe(gulpif(prod, cssnano()))
  .pipe(pxtorem({ replace: false }))
  .pipe(dest('dist/css'));
}

function js() {
  return src('src/js/*.js')
    .pipe(concat('all.js'))
    .pipe(dest('dist'));
}

function images() {
  return src('src/img/*')
    .pipe(gulpif(prod, imagemin()))
    .pipe(dest('dist/img'));
}



function reload(done) {
  server.reload();
  done();
}

function serve(done) {
  server.init({
    server: {
      baseDir: './dist',
    },
  });
  done();
}





exports.dev = series(parallel(html, css, js, images), serve, () =>
  watch(['src/scss/*.scss','src/**/*.pug','src/js/*.js'],
  series(parallel(html, css, js, images), reload))
);
exports.build = parallel(html,css, js,images);