const gulp = require('gulp');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');
const rimraf = require('rimraf');
const path = require('path');
const ttypescript = require('ttypescript');
const { createMinifier } = require('dts-minify');
const tsMinifier = createMinifier(ttypescript);
const glob = require('glob');
const fs = require('fs');

gulp.task(
	'clean',
	() =>
		new Promise((resolve, reject) => {
			rimraf(path.resolve(__dirname, 'dist'), (e) =>
				e ? reject(e) : resolve()
			);
		})
);

gulp.task('build', () => {
	const tsc = typescript.createProject('tsconfig.json', {
		typescript: ttypescript,
	});

	return gulp.src('src/**/*.ts').pipe(tsc()).pipe(gulp.dest('dist'));
});

gulp.task('minify:js', () => {
	return gulp.src('dist/**/*.js').pipe(uglify()).pipe(gulp.dest('dist'));
});

gulp.task(
	'minify:dts',
	() =>
		new Promise((resolve, reject) => {
			glob('dist/**/*.d.ts', (err, files) => {
				if (err) return reject(err);

				files.forEach((file) => {
					const content = fs.readFileSync(file).toString();
					const minified = tsMinifier.minify(content);

					fs.writeFileSync(file, minified);
				});

				resolve();
			});
		})
);

gulp.task('default', gulp.series('clean', 'build', 'minify:js', 'minify:dts'));
