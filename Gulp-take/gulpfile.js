const rename = require('gulp-rename');

let gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    renames = require('gulp-rename'),
    pug = require('gulp-pug');

gulp.task('scss', function() {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' })) //for compressed css usage { outputStyle: 'compressed' }
        .pipe(renames({ suffix: '.min' }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});
gulp.task('html', function() {
    return gulp.src('app/*html')
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('script', function() {
    return gulp.src('app/*js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src(['node_modules/slick-carousel/slick/slick.js', 'node_modules/magnific-popup/dist/jquery.magnific-popup.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('pug', function() {
    return gulp.src('app/pug/active_page/**/*.pug')
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest('app/'))
        .pipe(browserSync.reload({ stream: true }))
});
gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/pug/active_page/**/*.pug', gulp.parallel('pug'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', "js", 'pug', 'browser-sync', 'watch'))