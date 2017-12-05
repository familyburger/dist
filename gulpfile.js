const gulp = require('gulp');
const fontmin = require('gulp-fontmin');
let text = 'АаБбВвГгҐґДдЕеЄєЖжЗзИиІіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя';
gulp.task('default', function () {
    return gulp.src('./fonts/alegreya-sans-v5-latin_cyrillic-ext_cyrillic-900italic.ttf')
        .pipe(fontmin({
            text: text,
        }))
        .pipe(gulp.dest('dist/fonts'));
});