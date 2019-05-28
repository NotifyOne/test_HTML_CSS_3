var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', async function(){
	gulp.src('./scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		// .pipe(sourcemaps.init())
		.pipe(cleanCSS())
		// .pipe(sourcemaps.write())
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function(){
	gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
	browserSync.init(["./css/**/*.*", "./**/*.html"], {
		server: {
			baseDir: "."
		}
		// proxy: "drupal.loc"
	})
});

gulp.task('watch', gulp.series('sass', gulp.parallel('browser-sync', 'sass:watch')));

gulp.task('default', gulp.series('watch'));