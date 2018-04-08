const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      scss = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      pngquant = require('imagemin-pngquant');


    gulp.task('server', ['styles'], function() {
        browserSync.init({
            server: { baseDir: './app/'}
        });
        gulp.watch('./app/scss/**/*.scss',['styles']);
        gulp.watch('./app/*.html').on('change', browserSync.reload);
    });


    gulp.task('styles', function() {
      return gulp.src('./app/scss/**/*.scss')
            .pipe(plumber({
                errorHandler : notify.onError(function(err){
                    return {
                        title : 'Styles',
                        message : err.message
                    }
                })     
            }))
            .pipe(sourcemaps.init())
            .pipe(scss())
            .pipe(autoprefixer({
                browsers : ['last 4 versions'],
                cascade : false
            }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./app/css'))
            .pipe(browserSync.stream());
    });


    gulp.task('img:dist', function () {
        return gulp.src('./app/img/**/*.*')
          .pipe(imagemin({
            progressive: true,
            // optimizationLevel: 5,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
          }))
          .pipe(gulp.dest('./app/images'));
      });

      gulp.task('default',['server']);