const gulp = require('gulp')
const browserSync = require('browser-sync') // Автоматическая перезагрузка браузера
const sass = require('gulp-sass')(require('sass')) // Компиляция SASS/SCSS в CSS
const cleanCSS = require('gulp-clean-css') // Минификация CSS файлов
const rename = require('gulp-rename') // Переименование файлов
const autoprefixer = require('gulp-autoprefixer') // Подключение gulp-autoprefixer
const rimraf = require('rimraf')

// Задача для очистки папки dist перед запуском gulp
gulp.task('clean', function (cb) {
	rimraf('dist/*', cb)
}) 

// Задача для копирования HTML файлов в dist
gulp.task('html', function () {
	return gulp.src('src/*.html').pipe(gulp.dest('dist'))
})

// Задача для копирования изображений в dist
gulp.task('images', function () {
	return gulp.src('src/img/**/*').pipe(gulp.dest('dist/img'))
})

// Задача для копирования JavaScript файлов в dist
gulp.task('scripts', function () {
    return gulp.src('src/js/**/*.js') // Укажите путь к вашим исходным JS файлам
        .pipe(gulp.dest('dist/js')); // Сохранение JS файлов в dist/js
});

// Задача 'styles' для обработки стилей
gulp.task('styles', function () {
	return gulp
		.src('src/sass/**/*.+(scss|sass)') // Выбор всех SASS/SCSS файлов
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError)) // Компиляция и минификация
		.pipe(autoprefixer({ cascade: false })) // Добавление вендорных префиксов
		.pipe(rename({ suffix: '.min', prefix: '' })) // Добавление суффикса .min к имени файла
		.pipe(cleanCSS({ compatibility: 'ie8' })) // Минификация CSS
		.pipe(gulp.dest('src/css')) // Сохранение обработанных файлов в src
		.pipe(gulp.dest('dist/css')) // Копир обработанных файлов в dist
		.pipe(browserSync.stream())
})

// Для запуска локального сервера
gulp.task('server', function () {
	browserSync.init({
		server: {
			baseDir: 'src', // Директория для сервера
		},
	})

	// Авто перезагрузка страницы при изменении HTML файлов
	gulp.watch('src/*.html').on('change', browserSync.reload)
})

// Для отслеживания изменений в файлах
gulp.task('watch', function () {
	// Отслеживание в SASS/SCSS файлах и запуск задачи 'styles'
	gulp.watch('src/sass/**/*.+(scss|sass)', gulp.parallel('styles'))
	// Отслеживание в HTML для автоматической перезагрузки
	gulp.watch('src/*.html').on('change', browserSync.reload)
	// Отслеживание в JS
	gulp.watch('src/js/**/*.js').on('change', browserSync.reload)
})


// Задача для сборки проекта
gulp.task(
	'build',
	gulp.series('clean', gulp.parallel('html', 'styles', 'images', 'scripts')) // Добавлено 'scripts'
)

// Запускающая 'watch', 'server', 'styles'
gulp.task('default', gulp.parallel('watch', 'server', 'styles'))
