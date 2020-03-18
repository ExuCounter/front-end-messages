var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// Static server
gulp.task('default', function () {
   var files = [
      './**/*'
   ];

    gulp.watch("./scss/**/*.scss").on('change', function(){
       gulp.src('./scss/**/*.scss')
   		.pipe(sass().on('error', sass.logError))
   		.pipe(gulp.dest('./style/'))
    });

   browserSync.init(files, {
      server: {
         baseDir: './'
      }
   });
});
