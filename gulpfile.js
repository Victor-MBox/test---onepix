// Подключаем необходимые модули
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')(require('sass'))
const cleanCSS = require('gulp-clean-css')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const rimraf = require('rimraf')
const fileInclude = require('gulp-file-include')

// Задача для очистки папки dist
gulp.task('clean', function (cb) {
	rimraf('dist/*', cb)
})

// Задача для обработки HTML файлов с использованием gulp-file-include
gulp.task('html', function () {
	return gulp
		.src('src/*.html')
		.pipe(
			fileInclude({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.stream())
})

// Задача для обработки изображений
gulp.task('images', function () {
	return gulp
		.src('src/img/**/*')
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.stream())
})

// Задача для копирования JavaScript файлов
gulp.task('scripts', function () {
	return gulp
		.src('src/js/**/*.js')
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.stream())
})

// Задача для обработки SASS/SCSS файлов
gulp.task('styles', function () {
	return gulp
		.src('src/sass/**/*.+(scss|sass)')
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(
			autoprefixer({
				cascade: false,
			})
		)
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(cleanCSS({ compatibility: 'ie8' }))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream())
})

// Задача для запуска сервера и автообновления страницы
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: 'dist',
		},
	})
})

// Задача для отслеживания изменений в файлах
gulp.task('watch', function () {
	gulp.watch('src/sass/**/*.+(scss|sass)', gulp.series('styles'))
	gulp.watch('src/*.html', gulp.series('html'))
	gulp.watch('src/templates/*.html', gulp.series('html'))
	gulp.watch('src/js/**/*.js', gulp.series('scripts'))
	gulp.watch('src/img/**/*', gulp.series('images'))
})

// Задача для сборки проекта
gulp.task(
	'build',
	gulp.series('clean', gulp.parallel('html', 'styles', 'scripts', 'images'))
)

// Задача по умолчанию, которая запускает сервер и отслеживание изменений
gulp.task('default', gulp.parallel('watch', 'server', 'build'))
