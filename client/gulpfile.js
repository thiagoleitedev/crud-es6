var gulp = require('gulp');
var runSequence = require('run-sequence');
var webpack = require('webpack-stream');
var watch = require('gulp-watch');
var browserSync = require('browser-sync').create();
var historyApiFallback = require('connect-history-api-fallback');
var reload = browserSync.reload;

function handleError(err) {
  console.log(err.toString());
  this.emit('end');
}

gulp.task('js', function() {
	return gulp.src('src/**/*.js')
		.pipe(webpack({
			entry: './src/app.js',
			output: {
				filename: 'app.js'
			},
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loaders: ["babel"]
					}
				]
			}
		}))
		.on('error', handleError)
		.pipe(gulp.dest('build/js/'))
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: ["./", "build"],
			middleware: [ historyApiFallback() ]
		}
	});
});

gulp.task('watch', function() {
	watch('./src/**/*.js', function() { runSequence('js', reload); });
	watch('./*.html', reload );
});

gulp.task('serve', function() {
	runSequence('js', 'server', 'watch');
});