var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var del = require('del');
var exec = require('child_process').execSync;
var path = require('path');
var gutil = require('gulp-util');


// Based on: https://github.com/jbrodriguez/hugulp/blob/master/gulp/hugo.js
function hugo(drafts) {

    var cmd = 'hugo --config=config.toml ';
    if (drafts) {
        cmd += ' --buildDrafts=true --verbose=true" ';
    }

    var result = exec(cmd, { encoding: 'utf-8' });
    gutil.log('hugo: \n' + result);
}

gulp.task('hugo', function () {
    hugo(false);
});

gulp.task('ghpages', function () {
    return gulp.src('./dist/**/*')
        .pipe(ghPages());
});

gulp.task('clean:dist', function () {
    return del([
        './dist/**/*'
    ]);
});


gulp.task('deploy', ['clean:dist', 'hugo', 'ghpages']);