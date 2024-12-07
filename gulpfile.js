const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
  return gulp.src('src/styles/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/styles')); // Changed from 'public/css' to 'src/styles'
});

gulp.task('watch', function() {
  gulp.watch('src/styles/**/*.scss', gulp.series('sass'));
});

gulp.task('default', gulp.series('sass', 'watch'));