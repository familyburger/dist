var gulp = require('gulp');
var fontmin = require('gulp-fontmin');
var text = 'АаБбВвГгДдЕеЄєЖжЗзИиIіЇїЙйКкЛлМмНнОоПпРрСсТтУуФфХхЦцЧчШшЩщЬьЮюЯя1234567890';
gulp.task('default', function () {
    return gulp.src('./oldFonts/notes.ttf')
        .pipe(fontmin({
            text: text,
        }))
        .pipe(gulp.dest('dist/fonts'));
});