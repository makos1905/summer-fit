const project_folder = "dist";
const source_folder = "_src";

const path = {
  build: {
    html: project_folder + "/",
    css: project_folder + "/css/",
    js: project_folder + "/js/",
    img: project_folder + "/img/",
    fonts: project_folder + "/fonts/",
  },
  src: {
    html: source_folder + "/*.html",
    css: source_folder + "/css/style.css",
    js: source_folder + "/js/script.js",
    img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    fonts: source_folder + "/fonts/*.ttf",
  },
  clean: "./" + project_folder + "/"
};

const { src, dest, series, parallel } = require('gulp'),
  gulp = require('gulp'),
  del = require('del'),
  cleanCSS = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  minify = require('gulp-minify'),
  imagemin = require('gulp-imagemin'),
  webp = require('gulp-webp'),
  webphtml = require('gulp-webp-html'),
  webpcss = require('gulp-webpcss'),
  ttf2woff = require('gulp-ttf2woff'),
  ttf2woff2 = require('gulp-ttf2woff2'),
  fonter = require('gulp-fonter');

function html() {
  return src(path.src.html)
    .pipe(webphtml())                           //добавление webP-изображений в разметку
    .pipe(dest(path.build.html))
}

function css() {
  return src(path.src.css)
    .pipe(webpcss())                            //добавление webP-изображений в style.css
    .pipe(dest(path.build.css))
    .pipe(cleanCSS({                            //сжатие style.css
      compatibility: 'ie8'
    }))
    .pipe(rename({                              // переименование style.css => style.min.css
      extname: ".min.css"
    }))
    .pipe(dest(path.build.css))
}

function js() {
  return src(path.src.js)
    .pipe(dest(path.build.js))
    .pipe(minify({                              //сжатие script.js
      noSource: true,
      ext: {
        min: '.js'
      },
      ignoreFiles: ['*.min.js']
    }))
    .pipe(rename({                              //переименование script.css => script.min.css
      extname: ".min.js"
    }))
    .pipe(dest(path.build.js))
}

function images() {
  return src(path.src.img)
    .pipe(webp({                                // конвертация изображений в webP
      quality: 70
    }))
    .pipe(dest(path.build.img))
    .pipe(src(path.src.img))
    .pipe(imagemin({                            // оптимизация изображений
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      interlaced: true,
      optimizationLevel: 3
    }))
    .pipe(dest(path.build.img))
}

function otf2ttf() {                            // otf => ttf
  return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
      formats: ['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'))
}

function fonts2woff() {
  src(path.src.fonts)
    .pipe(ttf2woff())                           // ttf => woff
    .pipe(dest(source_folder + '/fonts/'))
  return src(path.src.fonts)
    .pipe(ttf2woff2())                          // ttf => woff2
    .pipe(dest(source_folder + '/fonts/'))
}

function fontsBuild() {
  return src(source_folder + '/fonts/*.{woff,woff2}')
    .pipe(dest(path.build.fonts))
}


function clean(params) {
  return del(path.clean)
}

exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.otf2ttf = otf2ttf;
exports.fonts2woff = fonts2woff;
exports.fontsBuild = fontsBuild;
exports.clean = clean;

exports.fonts = series(otf2ttf, fonts2woff);    // конвертация шрифтов в #src
exports.build = series(clean, parallel(html, css, js, images, fontsBuild));   // сборка проекта