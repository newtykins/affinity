const gulp = require('gulp');
const typescript = require('gulp-typescript');

gulp.task('default', () => {
	const tsc = typescript.createProject('tsconfig.json', {
		typescript: require('ttypescript'),
	});

	return gulp.src('src/**/*.ts').pipe(tsc()).pipe(gulp.dest('dist'));
});
