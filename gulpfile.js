const gulp = require('gulp');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const path = require('path');

gulp.task('clean', () => {
	return new Promise((resolve, reject) => {
		rimraf(path.resolve(__dirname, 'dist'), (e) =>
			e ? reject(e) : resolve()
		);
	});
});

gulp.task('build', () => {
	const tsc = typescript.createProject('tsconfig.json', {
		typescript: require('ttypescript'),
	});

	return gulp.src('src/**/*.ts').pipe(tsc()).pipe(gulp.dest('dist'));
});

gulp.task('minify', () => {
	return gulp.src('dist/**/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
});

gulp.task('default', gulp.series('clean', 'build', 'minify'));
