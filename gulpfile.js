/**
 * Created by igbopie on 1/30/15.
 */
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var del = require('del');
var uglify = require('gulp-uglify');

var buffer = require('vinyl-buffer');
var exec = require('child_process').exec;
require('gulp-grunt')(gulp);


gulp.task('default', ['clean', 'browserify', 'files:server', 'files:static', 'files:frontend', 'files:components:fa', 'files:components:bs'], function() {
    require('./build/app');
});

gulp.task('clean', function() {
    return del(['build']);
});

gulp.task('files:server', ['clean'], function () {
    return gulp.src('./src/server/**/*')
        .pipe(gulp.dest('./build/'));
});

gulp.task('files:components:fa', ['clean'], function () {
    return gulp.src(['./node_modules/font-awesome/**/*'])
        .pipe(gulp.dest('./build/public/lib/font-awesome'));
});

gulp.task('files:components:bs', ['clean'], function () {
    return gulp.src(['./node_modules/bootstrap/dist/**/*'])
        .pipe(gulp.dest('./build/public/lib/bootstrap'));
});

gulp.task('files:static', ['clean'], function () {
    return gulp.src('./static/**/*')
        .pipe(gulp.dest('./build/public/'));
});

gulp.task('files:frontend', ['clean'], function () {
    return gulp.src(['./src/frontend/**/*', '!./src/frontend/js/**'])
        .pipe(gulp.dest('./build/public/'));
});


gulp.task('browserify', ['clean'], function () {
    return browserify('./src/frontend/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/public/'));
});

gulp.task('prod', ['gen-snapshots']);


gulp.task('prod:build', ['clean', 'browserify-prod', 'files:server', 'files:static', 'files:frontend','files:components:fa', 'files:components:bs']);

gulp.task('gen-snapshots', ['prod:build'], function () {
    exec('node build/app', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });

    setTimeout(function(){
        console.log("EXEC snapshots");
        gulp.start('grunt-gen-snapshots');
    }, 2000)
});

gulp.task('browserify-prod', ['clean'], function () {
    return browserify('./src/frontend/js/main.js')
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(uglify())
        // Start piping stream to tasks!
        .pipe(gulp.dest('./build/public/'));
});